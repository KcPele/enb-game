"use client";

import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { getUserProgress } from "../data/mockTasks";

export const PointsDisplay = () => {
  const { address, isConnected } = useAccount();
  const [points, setPoints] = useState(0);
  const [tasksCompleted, setTasksCompleted] = useState(0);

  useEffect(() => {
    if (isConnected && address) {
      const progress = getUserProgress(address);
      setPoints(progress.totalPoints);
      setTasksCompleted(progress.completedTasks.length);
    } else {
      setPoints(0);
      setTasksCompleted(0);
    }
  }, [address, isConnected]);

  // Listen for storage events to update points when changed in another component
  useEffect(() => {
    const handleStorageChange = () => {
      if (isConnected && address) {
        const progress = getUserProgress(address);
        setPoints(progress.totalPoints);
        setTasksCompleted(progress.completedTasks.length);
      }
    };

    window.addEventListener("storage", handleStorageChange);
    window.addEventListener(
      "pointsUpdated",
      handleStorageChange as EventListener
    );

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener(
        "pointsUpdated",
        handleStorageChange as EventListener
      );
    };
  }, [address, isConnected]);

  if (!isConnected) {
    return null;
  }

  return (
    <div className="flex items-center justify-between w-full">
      <div className="flex flex-col items-center justify-center bg-black/20 p-4 rounded-lg w-1/2 mr-2">
        <h3 className="text-sm font-medium text-white/70">Points Earned</h3>
        <p className="text-2xl font-bold text-cyan-400">{points}</p>
      </div>
      <div className="flex flex-col items-center justify-center bg-black/20 p-4 rounded-lg w-1/2 ml-2">
        <h3 className="text-sm font-medium text-white/70">Tasks Completed</h3>
        <p className="text-2xl font-bold text-white">{tasksCompleted}/5</p>
      </div>
    </div>
  );
};

export default PointsDisplay;
