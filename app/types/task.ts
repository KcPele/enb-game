// Task type enum to categorize different types of tasks
export enum TaskType {
  CONNECT_WALLET = "connect_wallet",
  VISIT_PAGE = "visit_page",
  FOLLOW_CHANNEL = "follow_channel",
  // Add more task types as needed
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

// Task that requires visiting a specific page
export interface VisitPageTask extends Task {
  type: TaskType.VISIT_PAGE;
  url: string; // The URL that needs to be visited
  requiresProof: boolean; // Whether a proof of visit is required (e.g., screenshot)
}

// Task that requires following a specific channel
export interface FollowChannelTask extends Task {
  type: TaskType.FOLLOW_CHANNEL;
  channelId: string; // ID of the channel to follow
  platformType: "farcaster" | "twitter" | "other"; // Platform where the channel exists
}

// Task progress tracking
export interface TaskProgress {
  userId: string; // User identifier (could be wallet address)
  taskId: string;
  status: TaskStatus;
  startedAt?: Date;
  completedAt?: Date;
  proof?: string; // Optional proof of completion (e.g., transaction hash)
}

// User profile with task progress
export interface UserProfile {
  id: string; // Usually wallet address
  totalPoints: number;
  tasksCompleted: number;
  taskProgress: Record<string, TaskProgress>; // Map of taskId to progress
}
