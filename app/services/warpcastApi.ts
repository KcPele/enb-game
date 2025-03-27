// Service for Warpcast API interactions
import {
  checkUserFollowsChannel,
  checkUserFollowsUser,
  getWalletFid,
  getUsersByFids,
  getUserProfile,
} from "./neynarApi";

const WARPCAST_API_BASE_URL = "https://api.warpcast.com";

/**
 * Fetch all channels from Warpcast
 * This endpoint doesn't require authentication
 */
export async function fetchAllChannels() {
  try {
    const response = await fetch(`${WARPCAST_API_BASE_URL}/v2/all-channels`);
    if (!response.ok) {
      throw new Error(`Failed to fetch channels: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching all channels:", error);
    throw error;
  }
}

/**
 * Fetch a specific channel by ID
 * This endpoint doesn't require authentication
 */
export async function fetchChannel(channelId: string) {
  try {
    const response = await fetch(
      `${WARPCAST_API_BASE_URL}/v1/channel?channelId=${channelId}`
    );
    if (!response.ok) {
      throw new Error(`Failed to fetch channel: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error(`Error fetching channel ${channelId}:`, error);
    throw error;
  }
}

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

    // Get user profile information to verify it's a valid FID
    const userProfile = await getUserProfile(userFid, userFid);

    if (!userProfile) {
      return {
        isFollowing: false,
        error:
          "Could not verify Farcaster user profile. Please check your FID.",
        needsFid: true,
      };
    }

    // Now verify the follow status
    let isFollowing = false;

    if (isChannel) {
      // Format channel name by adding leading slash if not present
      const formattedChannelName = targetToFollow.startsWith("/")
        ? targetToFollow
        : `/${targetToFollow}`;

      // Check if user follows the channel
      isFollowing = await checkUserFollowsChannel(
        userFid,
        formattedChannelName
      );
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
      username: userProfile.username,
      displayName: userProfile.display_name || userProfile.username,
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
