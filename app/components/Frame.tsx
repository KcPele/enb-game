"use client";

import { useEffect, useState } from "react";
import { WalletComponents } from "./WalletComponents";
import { useAccount } from "wagmi";
import { NFTMintCardDefault } from "@coinbase/onchainkit/nft";
import { Github } from "lucide-react";
import sdk from "@farcaster/frame-sdk";
import TaskList from "./tasks/TaskList";
import TaskDetail from "./tasks/TaskDetail";
import { Task } from "../types/task";

// Task view modes to manage UI state
enum ViewMode {
  LIST = "list",
  DETAIL = "detail",
}

export const Frame: React.FC = () => {
  const [mounted, setMounted] = useState(false);
  const [isSDKLoaded, setIsSDKLoaded] = useState(false);
  const { isConnected } = useAccount();
  const [viewMode, setViewMode] = useState<ViewMode>(ViewMode.LIST);
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);

  // Initialize Frame SDK
  useEffect(() => {
    const initializeSDK = async () => {
      try {
        // Tell the parent Farcaster client that our frame is ready
        await sdk.actions.ready();
        setIsSDKLoaded(true);
      } catch (error) {
        console.error("Failed to initialize Frame SDK:", error);
      }
    };

    if (!isSDKLoaded) {
      initializeSDK();
    }
  }, [isSDKLoaded]);

  // Wait for component to mount to avoid hydration issues
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || !isSDKLoaded) {
    return null;
  }

  const handleTaskClick = (taskId: string) => {
    setSelectedTaskId(taskId);
    setViewMode(ViewMode.DETAIL);
  };

  const handleBackToList = () => {
    setViewMode(ViewMode.LIST);
    setSelectedTaskId(null);
  };

  const handleTaskComplete = (task: Task) => {
    console.log(`Task completed: ${task.title}`);

    // In a real app, this would trigger a reward or update user progress
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="text-3xl font-medium mb-2 text-white">ENB Game</h1>
      <p className="text-white/70 mb-4 text-center max-w-md">
        Complete tasks on Base to earn ENB tokens and rewards
      </p>

      <div className="space-y-4 w-full max-w-xl">
        <div className="glass-card p-6 rounded-xl relative z-50">
          <h2 className="font-medium text-base mb-3 text-white/90">
            Wallet Connection
          </h2>
          <div>
            <WalletComponents />
          </div>
        </div>

        <div className="glass-card p-6 rounded-xl relative z-40">
          <h2 className="font-medium text-base mb-3 text-white/90">
            {viewMode === ViewMode.LIST ? "Available Tasks" : "Task Details"}
          </h2>
          <div>
            {viewMode === ViewMode.LIST ? (
              <TaskList />
            ) : (
              selectedTaskId && (
                <TaskDetail
                  taskId={selectedTaskId}
                  onBack={handleBackToList}
                  onComplete={handleTaskComplete}
                />
              )
            )}
          </div>
        </div>

        {isConnected && (
          <div className="glass-card p-6 rounded-xl relative z-30">
            <h2 className="font-medium text-base mb-3 text-white/90">
              Collect ENB Token
            </h2>
            <div>
              <NFTMintCardDefault
                contractAddress="0x0b45d3c7f244d6c83f574fc04eda704ed736946b"
                tokenId="1"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Frame;
