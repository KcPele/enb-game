"use client";

import { useState, useEffect } from "react";
import { Task, TaskStatus, TaskType } from "../../types/task";
import {
  mockTasks,
  saveUserProgress,
  getUserProgress,
} from "../../data/mockTasks";
import { useAccount } from "wagmi";

export const TaskList = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [verifying, setVerifying] = useState<string | null>(null);
  const { address, isConnected } = useAccount();
  const [walletTaskSaved, setWalletTaskSaved] = useState(false);
  const [farcasterFid, setFarcasterFid] = useState<number | null>(null);

  // Load tasks and check for completed tasks in localStorage
  useEffect(() => {
    if (isConnected && address) {
      const userProgress = getUserProgress(address);

      // Update task status based on completed tasks in localStorage
      const updatedTasks = mockTasks.map((task) => {
        // Auto-complete wallet connection task if connected
        if (task.type === TaskType.CONNECT_WALLET) {
          return { ...task, status: TaskStatus.COMPLETED };
        }

        // Set task status based on localStorage
        if (userProgress.completedTasks.includes(task.id)) {
          return { ...task, status: TaskStatus.COMPLETED };
        }

        return task;
      });

      setTasks(updatedTasks);
    } else {
      setTasks(mockTasks);
    }

    setLoading(false);
  }, [address, isConnected]);

  // Handle the wallet connection task completion automatically
  useEffect(() => {
    if (isConnected && address && !walletTaskSaved) {
      // Get the wallet connection task
      const walletTask = mockTasks.find(
        (task) => task.type === TaskType.CONNECT_WALLET
      );

      if (walletTask) {
        // Check if this task is already saved to avoid duplicating
        const userProgress = getUserProgress(address);

        if (!userProgress.completedTasks.includes(walletTask.id)) {
          // Save the wallet connection task progress
          saveUserProgress(address, walletTask.id, walletTask.points);

          // Update the walletTaskSaved flag to prevent duplicates
          setWalletTaskSaved(true);

          // Dispatch custom event to notify points were updated
          window.dispatchEvent(new Event("pointsUpdated"));

          console.log(
            `Wallet task completed automatically! You earned ${walletTask.points} points.`
          );
        } else {
          // Still set the flag to avoid checking again
          setWalletTaskSaved(true);
        }
      }
    }
  }, [isConnected, address, walletTaskSaved]);

  // Handle manual FID input if needed
  const handleFidInput = () => {
    const fidInput = prompt("Please enter your Farcaster ID (FID) number:");
    if (fidInput) {
      const parsedFid = parseInt(fidInput, 10);
      if (!isNaN(parsedFid)) {
        setFarcasterFid(parsedFid);
        return parsedFid;
      } else {
        alert("Please enter a valid number for your Farcaster ID.");
      }
    }
    return null;
  };

  const handleVerifyTask = async (task: Task) => {
    if (!isConnected || !address) {
      alert("Please connect your wallet first to verify tasks");
      return;
    }

    if (task.status === TaskStatus.COMPLETED) {
      alert("You have already completed this task!");
      return;
    }

    // Set verifying state to show loading indicator
    setVerifying(task.id);

    try {
      // For follow tasks, use the verification API
      if (
        task.type === TaskType.FOLLOW_ACCOUNT ||
        task.type === TaskType.FOLLOW_CHANNEL
      ) {
        // Prepare verification data
        const verificationData = {
          taskId: task.id,
          walletAddress: address,
          // Include FID if available
          ...(farcasterFid && { fid: farcasterFid }),
        };

        // Call the verification API
        const response = await fetch("/api/tasks/verify", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(verificationData),
        });

        const result = await response.json();

        // If API indicates we need a FID, prompt user for it
        if (!response.ok && result.needsFid) {
          const manualFid = handleFidInput();
          if (manualFid) {
            // Try again with the provided FID
            handleVerifyTask(task);
            return;
          } else {
            alert(
              "Verification requires your Farcaster ID (FID). Please try again and provide your FID when prompted."
            );
            setVerifying(null);
            return;
          }
        }

        // Check verification result
        if (response.ok && result.verified) {
          // Save progress to localStorage
          saveUserProgress(address, task.id, task.points);

          // Update local task state
          setTasks((prevTasks) =>
            prevTasks.map((t) =>
              t.id === task.id ? { ...t, status: TaskStatus.COMPLETED } : t
            )
          );

          // Dispatch custom event to notify points were updated
          window.dispatchEvent(new Event("pointsUpdated"));

          alert(`Task verified! You earned ${task.points} points.`);
        } else {
          // Show error message from API if verification failed
          alert(
            result.message ||
              "Verification failed. Please make sure you've followed the account/channel and try again."
          );
        }
      } else {
        // For other task types (not currently used)
        const updatedTask = { ...task, status: TaskStatus.COMPLETED };

        // Save progress to localStorage
        saveUserProgress(address, task.id, task.points);

        // Update local task state
        setTasks((prevTasks) =>
          prevTasks.map((t) => (t.id === task.id ? updatedTask : t))
        );

        // Dispatch custom event to notify points were updated
        window.dispatchEvent(new Event("pointsUpdated"));

        alert(`Task verified! You earned ${task.points} points.`);
      }
    } catch (error) {
      console.error("Verification error:", error);
      alert("An error occurred during verification. Please try again.");
    } finally {
      // Reset verifying state
      setVerifying(null);
    }
  };

  const getStatusClass = (status: TaskStatus) => {
    switch (status) {
      case TaskStatus.COMPLETED:
        return "bg-green-500/20 text-green-400";
      case TaskStatus.NOT_STARTED:
      default:
        return "bg-gray-500/20 text-gray-400";
    }
  };

  if (loading) {
    return (
      <div className="animate-pulse space-y-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="glass-card p-6 rounded-xl w-full">
            <div className="flex space-y-4 flex-col">
              <div className="h-4 bg-white/10 rounded w-3/4"></div>
              <div className="h-4 bg-white/10 rounded w-1/2"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  // Filter out any tasks that shouldn't be shown based on current state
  const visibleTasks = tasks.filter((task) => {
    // First task should always be visible
    if (task.id === "1") return true;

    // If wallet not connected, hide other tasks
    if (!isConnected && task.id !== "1") return false;

    return true;
  });

  return (
    <div className="space-y-4 w-full">
      {!isConnected && (
        <p className="text-white/70 mb-4 text-sm">
          Connect your wallet to start earning points by completing Farcaster
          follow tasks.
        </p>
      )}

      {isConnected && (
        <p className="text-white/70 mb-4 text-sm">
          Follow these Farcaster accounts and channels, then verify each task to
          earn points.
        </p>
      )}

      {visibleTasks.map((task) => (
        <div key={task.id} className="glass-card p-4 rounded-lg">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-md font-medium text-white">{task.title}</h3>
            <span
              className={`px-2 py-1 rounded-full text-xs ${getStatusClass(
                task.status
              )}`}
            >
              {task.status === TaskStatus.COMPLETED
                ? "Completed"
                : "Not Started"}
            </span>
          </div>

          <p className="text-sm text-white/70 mb-3">{task.description}</p>

          <div className="flex justify-between items-center">
            <span className="text-xs text-white/50">{task.points} points</span>

            {task.type !== TaskType.CONNECT_WALLET || !isConnected ? (
              <button
                className={`px-3 py-1 text-xs rounded-full transition-colors ${
                  task.status === TaskStatus.COMPLETED
                    ? "bg-green-500/20 text-green-400"
                    : "bg-cyan-500/20 text-cyan-400 hover:bg-cyan-500/30"
                } ${
                  task.status === TaskStatus.COMPLETED ||
                  (task.type === TaskType.CONNECT_WALLET && isConnected) ||
                  verifying === task.id
                    ? "opacity-50 cursor-not-allowed"
                    : ""
                }`}
                disabled={
                  task.status === TaskStatus.COMPLETED ||
                  (task.type === TaskType.CONNECT_WALLET && isConnected) ||
                  verifying === task.id
                }
                onClick={() => handleVerifyTask(task)}
              >
                {verifying === task.id
                  ? "Verifying..."
                  : task.status === TaskStatus.COMPLETED
                  ? "Verified"
                  : "Verify"}
              </button>
            ) : null}
          </div>
        </div>
      ))}
    </div>
  );
};

export default TaskList;
