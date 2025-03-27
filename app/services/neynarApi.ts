// Service for Neynar API interactions

// Replace this with your actual Neynar API key
// In production, this should be stored in environment variables
const NEYNAR_API_KEY =
  process.env.NEXT_PUBLIC_NEYNAR_API_KEY || "NEYNAR_API_TEMP_KEY";
const NEYNAR_API_BASE_URL = "https://api.neynar.com/v2";

/**
 * Make a request to the Neynar API
 */
async function fetchNeynarApi(
  endpoint: string,
  params?: Record<string, string>
) {
  const url = new URL(`${NEYNAR_API_BASE_URL}${endpoint}`);

  // Add query parameters if provided
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      url.searchParams.append(key, value);
    });
  }

  // Add the API key header
  const headers = {
    accept: "application/json",
    api_key: NEYNAR_API_KEY,
  };

  try {
    const response = await fetch(url.toString(), { headers });
    if (!response.ok) {
      throw new Error(`API request failed: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching from Neynar API:", error);
    throw error;
  }
}

/**
 * Map a wallet address to a Farcaster FID using Neynar's API
 * @param walletAddress The wallet address to lookup
 * @returns The FID associated with the wallet, or null if not found
 */
export async function getWalletFid(
  walletAddress: string
): Promise<number | null> {
  try {
    // Note: Neynar may not have a direct endpoint for wallet-to-FID lookup
    // This would need to be implemented using alternative approaches
    // For demonstration purposes, we're returning null
    console.log(`Looking up FID for wallet: ${walletAddress}`);
    return null;
  } catch (error) {
    console.error("Error getting FID from wallet:", error);
    return null;
  }
}

/**
 * Look up a user by their username
 * @param username The username to lookup (without the @ symbol)
 * @returns The user's FID or null if not found
 */
export async function lookupUserByUsername(
  username: string
): Promise<number | null> {
  try {
    // Remove @ if present
    const normalizedUsername = username.startsWith("@")
      ? username.substring(1)
      : username;

    const response = await fetchNeynarApi("/user/search", {
      q: normalizedUsername,
      limit: "1",
    });

    if (response.users && response.users.length > 0) {
      // Find the exact match
      const exactMatch = response.users.find(
        (user: any) =>
          user.username.toLowerCase() === normalizedUsername.toLowerCase()
      );

      if (exactMatch) {
        return exactMatch.fid;
      }
    }

    return null;
  } catch (error) {
    console.error(`Error looking up user ${username}:`, error);
    return null;
  }
}

/**
 * Checks if a user follows another user on Farcaster
 * @param followerFid The FID of the follower
 * @param targetUsername The username of the user being followed (without the @ symbol)
 * @returns True if following, false otherwise
 */
export async function checkUserFollowsUser(
  followerFid: number,
  targetUsername: string
): Promise<boolean> {
  try {
    // First, get the target user's FID
    const targetFid = await lookupUserByUsername(targetUsername);
    if (!targetFid) {
      console.error(`Target user not found: ${targetUsername}`);
      return false;
    }

    // Now check if follower follows target
    // Note: This endpoint may need to be adjusted based on Neynar's actual API structure
    const response = await fetchNeynarApi(`/user/followers`, {
      fid: targetFid.toString(),
      limit: "100", // Set a reasonable limit
    });

    // Check if follower is in the list of followers
    if (response.followers) {
      return response.followers.some(
        (follower: any) => follower.fid === followerFid
      );
    }

    return false;
  } catch (error) {
    console.error(
      `Error checking if user ${followerFid} follows ${targetUsername}:`,
      error
    );
    return false;
  }
}

/**
 * Checks if a user follows a channel on Farcaster
 * @param followerFid The FID of the follower
 * @param channelName The name of the channel (without the leading '/')
 * @returns True if following, false otherwise
 */
export async function checkUserFollowsChannel(
  followerFid: number,
  channelName: string
): Promise<boolean> {
  try {
    // Remove leading '/' if present
    const normalizedChannelName = channelName.startsWith("/")
      ? channelName.substring(1)
      : channelName;

    // First, check if the channel exists
    const channelResponse = await fetchNeynarApi("/channel", {
      id: normalizedChannelName,
    });

    if (!channelResponse || !channelResponse.channel) {
      console.error(`Channel not found: ${channelName}`);
      return false;
    }

    // Now check if the user follows the channel
    // Note: The actual endpoint will depend on Neynar's API structure
    const followResponse = await fetchNeynarApi("/user/channels", {
      fid: followerFid.toString(),
      limit: "100", // Set a reasonable limit
    });

    // Check if the channel is in the list of followed channels
    if (followResponse.channels) {
      return followResponse.channels.some(
        (channel: any) =>
          channel.id.toLowerCase() === normalizedChannelName.toLowerCase()
      );
    }

    return false;
  } catch (error) {
    console.error(
      `Error checking if user ${followerFid} follows channel ${channelName}:`,
      error
    );
    return false;
  }
}
