// Service for Warpcast API interactions
import {
  checkUserFollowsChannel,
  checkUserFollowsUser,
  getWalletFid,
  getUserFollowingChannels,
} from "./neynarApi";

/**
 * Verify if a user follows an account or channel on Farcaster
 * Uses the Neynar API for verification
 *
 * @param walletAddress The wallet address of the user
 * @param targetToFollow The username or channel name to verify following status
 * @param isChannel Whether the target is a channel (true) or user (false)
 * @param fid Optional FID to use directly, bypassing wallet lookup
 * @returns Object with follow status and error if any
 */
export async function verifyFollowStatus(
  walletAddress: string,
  targetToFollow: string,
  isChannel = false,
  fid?: number
) {
  try {
    // First, get the user's FID
    let userFid = fid;

    if (!userFid) {
      const walletFid = await getWalletFid(walletAddress);

      if (!walletFid) {
        return {
          isFollowing: false,
          error:
            "Could not find Farcaster ID associated with this wallet. Please provide your Farcaster FID.",
          needsFid: true,
        };
      }

      userFid = walletFid;
    }

    // // Get user profile information to verify it's a valid FID

    // Now verify the follow status
    let isFollowing = false;

    if (isChannel) {
      // Format channel name by adding leading slash if not present
      const formattedChannelName = targetToFollow.startsWith("/")
        ? targetToFollow
        : `/${targetToFollow}`;

      // Remove leading slash for comparison with API response
      const channelId = formattedChannelName.startsWith("/")
        ? formattedChannelName.substring(1)
        : formattedChannelName;

      // First try using the direct channel check
      isFollowing = await checkUserFollowsChannel(
        userFid,
        formattedChannelName
      );

      // If the direct check fails, try using the new getUserFollowingChannels function
      if (!isFollowing) {
        const followingChannels = await getUserFollowingChannels(userFid);

        if (followingChannels && followingChannels.channels) {
          isFollowing = followingChannels.channels.some(
            (channel: { id: string; name: string }) =>
              (channel.id &&
                channel.id.toLowerCase() === channelId.toLowerCase()) ||
              (channel.name &&
                channel.name.toLowerCase() === channelId.toLowerCase())
          );
        }
      }
    } else {
      // Format account handle by adding @ if not present
      const formattedUsername = targetToFollow.startsWith("@")
        ? targetToFollow
        : `@${targetToFollow}`;

      // Check if user follows the account
      isFollowing = await checkUserFollowsUser(userFid, formattedUsername);
    }

    return {
      isFollowing,
      fid: userFid,
    };
  } catch (error) {
    console.error("Error verifying follow status:", error);
    return {
      isFollowing: false,
      error:
        "Error verifying follow status. The Neynar API may be experiencing issues.",
    };
  }
}
