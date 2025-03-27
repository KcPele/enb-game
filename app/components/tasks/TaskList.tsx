"use client";

import { useState, useEffect } from "react";
import { Task, TaskStatus } from "../../types/task";
import { mockTasks } from "../../data/mockTasks";
import { useAccount } from "wagmi";

export const TaskList = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const { isConnected } = useAccount();

  useEffect(() => {
    // In a real app, this would fetch tasks from an API
    setTasks(mockTasks);
    setLoading(false);
  }, [isConnected]);

  useEffect(() => {
    if (isConnected) {
      const updatedTasks = tasks.map((task) => {
        if (task.type === "connect_wallet") {
          return { ...task, status: TaskStatus.COMPLETED };
        }
        return task;
      });
      setTasks(updatedTasks);
    }
  }, [isConnected, tasks]);

  const getStatusClass = (status: TaskStatus) => {
    switch (status) {
      case TaskStatus.COMPLETED:
        return "bg-green-500/20 text-green-400";
      case TaskStatus.IN_PROGRESS:
        return "bg-yellow-500/20 text-yellow-400";
      case TaskStatus.NOT_STARTED:
      default:
        return "bg-gray-500/20 text-gray-400";
    }
  };

  if (loading) {
    return (
      <div className="glass-card p-6 rounded-xl w-full">
        <div className="animate-pulse flex space-y-4 flex-col">
          <div className="h-4 bg-white/10 rounded w-3/4"></div>
          <div className="h-4 bg-white/10 rounded w-1/2"></div>
          <div className="h-4 bg-white/10 rounded w-5/6"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4 w-full">
      <h2 className="text-xl font-medium text-white mb-4">Available Tasks</h2>

      {tasks.map((task) => (
        <div key={task.id} className="glass-card p-4 rounded-lg">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-md font-medium text-white">{task.title}</h3>
            <span
              className={`px-2 py-1 rounded-full text-xs ${getStatusClass(
                task.status
              )}`}
            >
              {task.status.replace("_", " ")}
            </span>
          </div>

          <p className="text-sm text-white/70 mb-3">{task.description}</p>

          <div className="flex justify-between items-center">
            <span className="text-xs text-white/50">{task.points} points</span>
            <button
              className="px-3 py-1 text-xs bg-cyan-500/20 text-cyan-400 hover:bg-cyan-500/30 rounded-full transition-colors"
              onClick={() => {
                // In a real app, this would trigger task completion logic
                // For now, just toggle the status for demonstration
                const updatedTasks = tasks.map((t) =>
                  t.id === task.id
                    ? {
                        ...t,
                        status:
                          t.status === TaskStatus.COMPLETED
                            ? TaskStatus.NOT_STARTED
                            : TaskStatus.COMPLETED,
                      }
                    : t
                );
                setTasks(updatedTasks);
              }}
            >
              {task.status === TaskStatus.COMPLETED
                ? "Completed"
                : "Complete Task"}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TaskList;
