// Service for Warpcast API interactions
import {
  checkUserFollowsChannel,
  checkUserFollowsUser,
  getWalletFid,
  getUserProfile,
  getUserFollowingChannels,
  getUserFollowers,
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

/**
 * Get a paginated list of followers for a Farcaster user
 *
 * @param fid The Farcaster ID of the user
 * @param viewerFid Optional FID of the viewer for contextual information
 * @param limit Number of followers to fetch per page (max 100)
 * @param cursor Pagination cursor for fetching more results
 * @returns Object with followers array, pagination info, and error if any
 */
export async function getFarcasterFollowers(
  fid: number,
  viewerFid?: number,
  limit: number = 20,
  cursor?: string
) {
  try {
    // Verify the FID is valid first
    const userProfile = await getUserProfile(fid);

    if (!userProfile) {
      return {
        followers: [],
        error: "Invalid Farcaster ID. User not found.",
        next: null,
      };
    }

    // Get the followers using the Neynar API
    const followersData = await getUserFollowers(fid, viewerFid, limit, cursor);

    if (!followersData) {
      return {
        followers: [],
        error:
          "Error fetching followers. The Neynar API may be experiencing issues.",
        next: null,
      };
    }

    return {
      followers: followersData.followers,
      username: userProfile.username,
      displayName: userProfile.display_name || userProfile.username,
      followerCount: userProfile.follower_count,
      next: followersData.next,
    };
  } catch (error) {
    console.error(`Error fetching followers for FID ${fid}:`, error);
    return {
      followers: [],
      error: "An unexpected error occurred while fetching followers.",
      next: null,
    };
  }
}

/**
 * Get a paginated list of channels that a Farcaster user follows
 *
 * @param fid The Farcaster ID of the user
 * @param limit Number of channels to fetch per page (max 100)
 * @param cursor Pagination cursor for fetching more results
 * @returns Object with channels array, pagination info, and error if any
 */
export async function getUserFollowedChannels(
  fid: number,
  limit: number = 25,
  cursor?: string
) {
  try {
    // Verify the FID is valid first
    const userProfile = await getUserProfile(fid);

    if (!userProfile) {
      return {
        channels: [],
        error: "Invalid Farcaster ID. User not found.",
        next: null,
      };
    }

    // Get the channels the user follows using the Neynar API
    const channelsData = await getUserFollowingChannels(fid, limit, cursor);

    if (!channelsData) {
      return {
        channels: [],
        error:
          "Error fetching followed channels. The Neynar API may be experiencing issues.",
        next: null,
      };
    }

    return {
      channels: channelsData.channels,
      username: userProfile.username,
      displayName: userProfile.display_name || userProfile.username,
      next: channelsData.next,
    };
  } catch (error) {
    console.error(`Error fetching followed channels for FID ${fid}:`, error);
    return {
      channels: [],
      error: "An unexpected error occurred while fetching followed channels.",
      next: null,
    };
  }
}
