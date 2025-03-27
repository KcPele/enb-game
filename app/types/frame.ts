// Types for Farcaster Frame SDK context

export interface FrameUser {
  fid: number;
  username: string;
  displayName: string;
  pfpUrl: string;
  location: {
    placeId: string;
    description: string;
  };
}

export interface FrameClient {
  clientFid: number;
  added: boolean;
  safeAreaInsets: {
    top: number;
    left: number;
    right: number;
    bottom: number;
  };
}

export interface FrameContext {
  user: FrameUser;
  client: FrameClient;
}
