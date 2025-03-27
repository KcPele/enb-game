// Service for Neynar API interactions

// Configure Neynar API key
const NEYNAR_API_KEY =
  process.env.NEXT_PUBLIC_NEYNAR_API_KEY || "NEYNAR_API_TEMP_KEY";
const NEYNAR_API_BASE_URL = "https://api.neynar.com/v2/farcaster";

/**
 * Make a request to the Neynar API
 */
async function fetchNeynarApi(
  endpoint: string,
  params?: Record<string, string>,
  experimental: boolean = false
) {
  const url = new URL(`${NEYNAR_API_BASE_URL}${endpoint}`);

  // Add query parameters if provided
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      url.searchParams.append(key, value);
    });
  }

  // Add the API key header and experimental header if enabled
  const headers = {
    accept: "application/json",
    "x-api-key": NEYNAR_API_KEY,
    "x-neynar-experimental": experimental ? "true" : "false",
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
    // Uses the user/custody-address endpoint to find a user by their custody address
    const response = await fetchNeynarApi("/user/custody-address", {
      custody_address: walletAddress,
    });

    if (response && response.user && response.user.fid) {
      return response.user.fid;
    }

    return null;
  } catch (error) {
    console.error("Error getting FID from wallet:", error);
    return null;
  }
}

/**
 * Look up a user by their username
 * @param username The username to lookup (without the @ symbol)
 * @param viewerFid Optional FID of the viewer for contextual information
 * @returns The user's FID or null if not found
 */
export async function lookupUserByUsername(
  username: string,
  viewerFid?: number
): Promise<number | null> {
  try {
    // Remove @ if present
    const normalizedUsername = username.startsWith("@")
      ? username.substring(1)
      : username;

    // Use the by_username endpoint to find a user by their exact username
    try {
      const params: Record<string, string> = {
        username: normalizedUsername,
      };

      // Add viewer_fid if provided
      if (viewerFid) {
        params.viewer_fid = viewerFid.toString();
      }

      const response = await fetchNeynarApi(`/user/by_username`, params);

      if (response && response.user) {
        return response.user.fid;
      }
    } catch (usernameError) {
      // If exact lookup fails, fallback to search
      console.error(`Error looking up user by username: ${usernameError}`);
    }

    // Fallback to search
    const searchParams: Record<string, string> = {
      q: normalizedUsername,
      limit: "10",
    };

    // Add viewer_fid to search params if provided
    if (viewerFid) {
      searchParams.viewer_fid = viewerFid.toString();
    }

    const searchResponse = await fetchNeynarApi("/user/search", searchParams);

    if (
      searchResponse &&
      searchResponse.users &&
      searchResponse.users.length > 0
    ) {
      // Find the exact match
      const exactMatch = searchResponse.users.find(
        (user: { username: string; fid: number }) =>
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
    // First, get the target user's FID, passing followerFid as viewer for context
    const targetFid = await lookupUserByUsername(targetUsername, followerFid);
    if (!targetFid) {
      console.error(`Target user not found: ${targetUsername}`);
      return false;
    }

    // Get the user with viewer context to check if following
    const response = await fetchNeynarApi(`/user`, {
      fid: targetFid.toString(),
      viewer_fid: followerFid.toString(),
    });

    // Check if the viewer (follower) is following the target user
    if (response && response.user && response.user.viewer_context) {
      return response.user.viewer_context.following === true;
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

    // First, search for the channel using the /channel/search endpoint
    const channelResponse = await fetchNeynarApi("/channel/search", {
      q: normalizedChannelName,
      limit: "10",
    });

    if (
      !channelResponse ||
      !channelResponse.channels ||
      channelResponse.channels.length === 0
    ) {
      console.error(`Channel not found: ${channelName}`);
      return false;
    }

    // Find the exact channel match
    const exactChannel = channelResponse.channels.find(
      (channel: { id: string; name: string }) =>
        channel.id.toLowerCase() === normalizedChannelName.toLowerCase() ||
        (channel.name &&
          channel.name.toLowerCase() === normalizedChannelName.toLowerCase())
    );

    if (!exactChannel) {
      console.error(`Exact channel match not found for: ${channelName}`);
      return false;
    }

    // Use the channel/member/list endpoint to directly check if the user is a member
    // This is more efficient than fetching all channels the user follows
    const memberResponse = await fetchNeynarApi("/channel/member/list", {
      channel_id: exactChannel.id,
      fid: followerFid.toString(),
    });

    // If the API returns a non-empty members array, the user is a member of the channel
    if (
      memberResponse &&
      memberResponse.members &&
      memberResponse.members.length > 0
    ) {
      // Additional check to verify the returned member is the one we're looking for
      return memberResponse.members.some(
        (member: { user: { fid: number } }) => member.user.fid === followerFid
      );
    }

    // If we received a response but no members, the user is not a member
    return false;
  } catch (error) {
    console.error(
      `Error checking if user ${followerFid} follows channel ${channelName}:`,
      error
    );
    return false;
  }
}

/**
 * Get a user's following list (channels)
 * @param fid The FID of the user
 * @param limit Number of channels to fetch (default: 25, max: 100)
 * @param cursor Pagination cursor for fetching more results
 * @returns Object with channels array and next cursor, or null if error
 */
export async function getUserFollowingChannels(
  fid: number,
  limit: number = 25,
  cursor?: string
) {
  try {
    const params: Record<string, string> = {
      fid: fid.toString(),
      limit: Math.min(limit, 100).toString(),
    };

    if (cursor) {
      params.cursor = cursor;
    }

    const response = await fetchNeynarApi("/user/channels", params);

    if (response) {
      return {
        channels: response.channels || [],
        next: response.next || null,
      };
    }

    return { channels: [], next: null };
  } catch (error) {
    console.error(`Error fetching following channels for fid ${fid}:`, error);
    return null;
  }
}
