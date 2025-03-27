"use client";

import { useState, useEffect } from "react";
import { Task, TaskStatus, TaskType } from "../../types/task";
import { getTaskById, updateTaskStatus } from "../../data/mockTasks";
import { useAccount } from "wagmi";

interface TaskDetailProps {
  taskId: string;
  onComplete?: (task: Task) => void;
  onBack?: () => void;
}

export const TaskDetail = ({ taskId, onComplete, onBack }: TaskDetailProps) => {
  const [task, setTask] = useState<Task | null>(null);
  const [loading, setLoading] = useState(true);
  const { isConnected } = useAccount();

  useEffect(() => {
    // In a real app, this would fetch the task from an API
    const fetchedTask = getTaskById(taskId);
    if (fetchedTask) {
      setTask(fetchedTask);
    }
    setLoading(false);
  }, [taskId]);

  // Auto-complete wallet connection task if wallet is connected
  useEffect(() => {
    if (
      isConnected &&
      task?.type === TaskType.CONNECT_WALLET &&
      task.status !== TaskStatus.COMPLETED
    ) {
      const updatedTask = updateTaskStatus(taskId, TaskStatus.COMPLETED);
      if (updatedTask) {
        setTask(updatedTask);
        onComplete?.(updatedTask);
      }
    }
  }, [isConnected, task, taskId, onComplete]);

  const handleCompleteTask = () => {
    if (task) {
      const newStatus =
        task.status === TaskStatus.COMPLETED
          ? TaskStatus.NOT_STARTED
          : TaskStatus.COMPLETED;

      const updatedTask = updateTaskStatus(taskId, newStatus);
      if (updatedTask) {
        setTask(updatedTask);
        if (newStatus === TaskStatus.COMPLETED) {
          onComplete?.(updatedTask);
        }
      }
    }
  };

  if (loading) {
    return (
      <div className="glass-card p-6 rounded-xl w-full">
        <div className="animate-pulse flex space-y-4 flex-col">
          <div className="h-6 bg-white/10 rounded w-3/4"></div>
          <div className="h-4 bg-white/10 rounded w-1/2"></div>
          <div className="h-24 bg-white/10 rounded w-full"></div>
        </div>
      </div>
    );
  }

  if (!task) {
    return (
      <div className="glass-card p-6 rounded-xl w-full">
        <p className="text-white/70">Task not found</p>
        {onBack && (
          <button
            onClick={onBack}
            className="mt-4 px-4 py-2 text-sm bg-white/5 hover:bg-white/10 rounded-lg transition-colors"
          >
            Go Back
          </button>
        )}
      </div>
    );
  }

  const getTaskInstructions = () => {
    switch (task.type) {
      case TaskType.CONNECT_WALLET:
        return "Connect your wallet to complete this task. Your wallet connection will be verified automatically.";
      case TaskType.VISIT_PAGE:
        return "Visit the specified page and spend at least 30 seconds browsing to complete this task. Click the verify button when done.";
      case TaskType.FOLLOW_CHANNEL:
        return "Follow the specified channel and verify your follow to complete this task.";
      case TaskType.FOLLOW_ACCOUNT:
        return "Follow the specified Farcaster account and verify your follow to complete this task.";
      default:
        return "Complete the requirements to earn points for this task.";
    }
  };

  return (
    <div className="glass-card p-6 rounded-xl w-full">
      <div className="flex justify-between items-start mb-4">
        <h2 className="text-xl font-medium text-white">{task.title}</h2>
        <span
          className={`px-2 py-1 rounded-full text-xs ${
            task.status === TaskStatus.COMPLETED
              ? "bg-green-500/20 text-green-400"
              : task.status === TaskStatus.IN_PROGRESS
              ? "bg-yellow-500/20 text-yellow-400"
              : "bg-gray-500/20 text-gray-400"
          }`}
        >
          {task.status.replace("_", " ")}
        </span>
      </div>

      <p className="text-md text-white/70 mb-6">{task.description}</p>

      <div className="bg-black/30 p-4 rounded-lg mb-6">
        <h3 className="text-sm font-medium text-white/90 mb-2">
          Task Instructions
        </h3>
        <p className="text-sm text-white/70">{getTaskInstructions()}</p>
      </div>

      <div className="flex justify-between items-center">
        <div>
          <span className="block text-sm text-white/50">Reward</span>
          <span className="text-lg font-medium text-cyan-400">
            {task.points} points
          </span>
        </div>

        <div className="flex gap-2">
          {onBack && (
            <button
              onClick={onBack}
              className="px-4 py-2 text-sm bg-white/5 hover:bg-white/10 rounded-lg transition-colors"
            >
              Go Back
            </button>
          )}

          <button
            onClick={handleCompleteTask}
            disabled={task.type === TaskType.CONNECT_WALLET && !isConnected}
            className={`px-4 py-2 text-sm rounded-lg transition-colors ${
              task.status === TaskStatus.COMPLETED
                ? "bg-red-500/20 text-red-400 hover:bg-red-500/30"
                : "bg-cyan-500/20 text-cyan-400 hover:bg-cyan-500/30"
            } ${
              task.type === TaskType.CONNECT_WALLET && !isConnected
                ? "opacity-50 cursor-not-allowed"
                : ""
            }`}
          >
            {task.status === TaskStatus.COMPLETED
              ? "Reset Task"
              : "Complete Task"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskDetail;
