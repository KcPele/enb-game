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
    points: 10,
    createdAt: new Date("2024-03-20"),
    updatedAt: new Date("2024-03-20"),
  },
  {
    id: "2",
    title: "Visit the Base Ecosystem Page",
    description:
      "Explore the Base ecosystem to learn about projects and opportunities.",
    type: TaskType.VISIT_PAGE,
    status: TaskStatus.NOT_STARTED,
    points: 15,
    createdAt: new Date("2024-03-20"),
    updatedAt: new Date("2024-03-20"),
  },
  {
    id: "3",
    title: "Follow Base on Farcaster",
    description:
      "Follow the official Base channel on Farcaster to stay updated.",
    type: TaskType.FOLLOW_CHANNEL,
    status: TaskStatus.NOT_STARTED,
    points: 20,
    createdAt: new Date("2024-03-20"),
    updatedAt: new Date("2024-03-20"),
  },
];

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
