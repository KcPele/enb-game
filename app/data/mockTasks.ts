import { Task, TaskStatus, TaskType } from "../types/task";

// Mock tasks for development
export const mockTasks: Task[] = [
  {
    id: "1",
    title: "Connect Your Wallet",
    description:
      "Connect your wallet to the ENB Game to start earning rewards.",
    type: TaskType.CONNECT_WALLET,
    status: TaskStatus.NOT_STARTED,
    points: 100,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "2",
    title: "Follow @kokocodes on Farcaster",
    description:
      "Follow @kokocodes on Farcaster to stay connected with the community.",
    type: TaskType.FOLLOW_ACCOUNT,
    status: TaskStatus.NOT_STARTED,
    points: 100,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "3",
    title: "Follow @kcpele.eth on Farcaster",
    description: "Follow @kcpele.eth on Farcaster to join the conversation.",
    type: TaskType.FOLLOW_ACCOUNT,
    status: TaskStatus.NOT_STARTED,
    points: 100,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "4",
    title: "Follow /base channel on Farcaster",
    description:
      "Join the /base channel on Farcaster to stay updated on Base network developments.",
    type: TaskType.FOLLOW_CHANNEL,
    status: TaskStatus.NOT_STARTED,
    points: 100,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "5",
    title: "Follow @baseafrica on Farcaster",
    description:
      "Follow @baseafrica on Farcaster to connect with the Base community in Africa.",
    type: TaskType.FOLLOW_ACCOUNT,
    status: TaskStatus.NOT_STARTED,
    points: 100,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

// Task metadata for verification
export const taskMetadata = {
  "2": { accountHandle: "@kokocodes" },
  "3": { accountHandle: "@kcpele.eth" },
  "4": { channelName: "/base" },
  "5": { accountHandle: "@baseafrica" },
};

// Helper function to get a task by ID
export const getTaskById = (id: string): Task | undefined => {
  return mockTasks.find((task) => task.id === id);
};

// Helper function to update a task status
export const updateTaskStatus = (
  id: string,
  status: TaskStatus
): Task | undefined => {
  const task = mockTasks.find((task) => task.id === id);
  if (task) {
    task.status = status;
    task.updatedAt = new Date();
  }
  return task;
};

// User progress storage functions (using localStorage)
export const saveUserProgress = (
  walletAddress: string,
  completedTaskId: string,
  points: number
) => {
  if (typeof localStorage !== "undefined") {
    // Get existing progress or create new
    const progressKey = `enb_progress_${walletAddress}`;
    const existingProgressJson = localStorage.getItem(progressKey);
    const existingProgress = existingProgressJson
      ? JSON.parse(existingProgressJson)
      : { walletAddress, totalPoints: 0, completedTasks: [] };

    // Update if task not already completed
    if (!existingProgress.completedTasks.includes(completedTaskId)) {
      existingProgress.completedTasks.push(completedTaskId);
      existingProgress.totalPoints += points;
      localStorage.setItem(progressKey, JSON.stringify(existingProgress));
    }

    return existingProgress;
  }
  return null;
};

export const getUserProgress = (walletAddress: string) => {
  if (typeof localStorage !== "undefined") {
    const progressKey = `enb_progress_${walletAddress}`;
    const progressJson = localStorage.getItem(progressKey);
    return progressJson
      ? JSON.parse(progressJson)
      : { walletAddress, totalPoints: 0, completedTasks: [] };
  }
  return { walletAddress, totalPoints: 0, completedTasks: [] };
};
