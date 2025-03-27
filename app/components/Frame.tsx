"use client";

import { useEffect, useState } from "react";
import { WalletComponents } from "./WalletComponents";
import { useAccount } from "wagmi";
import sdk from "@farcaster/frame-sdk";
import TaskList from "./tasks/TaskList";
import PointsDisplay from "./PointsDisplay";

export const Frame: React.FC = () => {
  const [mounted, setMounted] = useState(false);
  const [isSDKLoaded, setIsSDKLoaded] = useState(false);
  const { isConnected } = useAccount();

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

  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="text-3xl font-medium mb-2 text-white">ENB Game</h1>
      <p className="text-white/70 mb-4 text-center max-w-md">
        Connect your wallet to get started and complete tasks to earn ENB
      </p>

      <div className="space-y-4 w-full max-w-xl">
        <div className="glass-card text-center p-6 rounded-xl relative z-50">
          <h2 className="font-medium text-base mb-3 text-white/90">
            Wallet Connection
          </h2>
          <div className="flex justify-center">
            <WalletComponents />
          </div>
        </div>

        {isConnected && (
          <div className="glass-card p-6 rounded-xl relative z-45">
            <h2 className="font-medium text-base mb-3 text-white/90">
              Your Progress
            </h2>
            <PointsDisplay />
          </div>
        )}

        <div className="glass-card p-6 rounded-xl relative z-40">
          <h2 className="font-medium text-base mb-3 text-white/90">
            Onboarding Tasks
          </h2>
          <div>
            <TaskList />
          </div>
        </div>
      </div>

      <div className="mt-6 text-center text-xs text-white/50">
        <div className="mt-2 space-x-2">
          <a
            href="https://onchainkit.xyz"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/50 hover:text-white/80 transition-colors"
          >
            OnchainKit
          </a>
          <span>·</span>
          <a
            href="https://docs.farcaster.xyz/reference/frames/spec"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/50 hover:text-white/80 transition-colors"
          >
            Frames v2
          </a>
          <span>·</span>
          <a
            href="https://docs.base.org"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/50 hover:text-white/80 transition-colors"
          >
            Base
          </a>
        </div>
      </div>
    </div>
  );
};

export default Frame;
