// Task type enum to categorize different types of tasks
export enum TaskType {
  CONNECT_WALLET = "connect_wallet",
  FOLLOW_ACCOUNT = "follow_account",
  FOLLOW_CHANNEL = "follow_channel",
  VISIT_PAGE = "visit_page",
}

// Task status enum to track progress
export enum TaskStatus {
  NOT_STARTED = "not_started",
  IN_PROGRESS = "in_progress",
  COMPLETED = "completed",
}

// Base interface for all tasks
export interface Task {
  id: string;
  title: string;
  description: string;
  type: TaskType;
  status: TaskStatus;
  points: number; // Reward points for completing the task
  createdAt: Date;
  updatedAt: Date;
}

// Task with wallet connection verification
export interface ConnectWalletTask extends Task {
  type: TaskType.CONNECT_WALLET;
  // No additional fields needed, completion is verified by wallet connection
}

// Task that requires following a Farcaster account
export interface FollowAccountTask extends Task {
  type: TaskType.FOLLOW_ACCOUNT;
  accountHandle: string; // Farcaster handle to follow (e.g., @kokocodes)
}

// Task that requires following a Farcaster channel
export interface FollowChannelTask extends Task {
  type: TaskType.FOLLOW_CHANNEL;
  channelName: string; // Channel name to follow (e.g., /base)
}

// Task that requires visiting a page
export interface VisitPageTask extends Task {
  type: TaskType.VISIT_PAGE;
  pageUrl: string; // URL to visit
  minTimeSeconds: number; // Minimum time to spend on page (in seconds)
}

// User progress and points tracking
export interface UserProgress {
  walletAddress: string;
  totalPoints: number;
  completedTasks: string[]; // Array of completed task IDs
}
