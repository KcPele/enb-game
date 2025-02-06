'use client';

import { useEffect, useState } from 'react';
import { WalletComponents } from './WalletComponents';
import { useAccount } from 'wagmi';
import { NFTMintCardDefault } from '@coinbase/onchainkit/nft';
import { Github } from 'lucide-react';
import sdk from '@farcaster/frame-sdk';

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
        console.error('Failed to initialize Frame SDK:', error);
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
      <h1 className="text-2xl font-medium mb-4 text-white">Mini Art</h1>
      <a
        href="https://github.com/fakepixels/ock-frames-template"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 px-4 py-2 text-sm text-white/80 
        bg-white/5 hover:bg-white/10 backdrop-blur-sm rounded-lg transition-all 
        border border-white/10 hover:border-white/20"
      >
        <Github className="w-4 h-4" />
        <span>Fork on GitHub</span>
      </a>

      <div className="space-y-4 mt-4">
        <div className="glass-card p-6 rounded-xl relative z-50">
          <h2 className="font-medium text-base mb-3 text-white/90">
            Connect wallet
          </h2>
          <div>
            <WalletComponents />
          </div>
        </div>

        <div className="glass-card p-6 rounded-xl relative z-10">
          <h2 className="font-medium text-base mb-3 text-white/90">
            Collect art
          </h2>
          <div>
            {isConnected ? (
              <NFTMintCardDefault
                contractAddress="0x0b45d3c7f244d6c83f574fc04eda704ed736946b"
                tokenId="1"
              />
            ) : (
              <div className="flex items-center justify-center py-4">
                <p className="text-sm text-white/70">
                  Connect your wallet to mint
                </p>
              </div>
            )}
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
        </div>
      </div>
    </div>
  );
};

export default Frame;
