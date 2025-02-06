'use client';

import { useEffect, useState } from 'react';
import { WalletComponents } from './WalletComponents';
import { useAccount } from 'wagmi';
import { NFTMintCardDefault } from '@coinbase/onchainkit/nft';

export default function Frame() {
  const [mounted, setMounted] = useState(false);
  const { isConnected } = useAccount();
  // Wait for component to mount to avoid hydration issues
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div className="max-w-[300px] mx-auto py-8">
      <h1 className="text-xl font-medium text-center mb-2 text-white/90">Base Mini App</h1>
      
      <a 
        href="https://github.com/fakepixels/ock-frames-template" 
        target="_blank" 
        rel="noopener noreferrer"
        className="flex items-center justify-center gap-2 mx-auto mb-8 px-4 py-1.5 
                  bg-white/[0.06] border border-white/[0.08]
                  rounded-full 
                  text-xs text-white/70
                  transition-all duration-300 ease-out
                  hover:bg-white/[0.08] 
                  hover:border-white/[0.12] hover:text-white/90
                  hover:shadow-[0_0_20px_rgba(255,255,255,0.05)]"
      >
        <svg 
          className="w-4 h-4" 
          viewBox="0 0 24 24" 
          fill="currentColor"
          aria-label="GitHub logo"
          title="GitHub logo"
        >
          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
        </svg>
        Fork on GitHub
      </a>

      <div className="space-y-4">
        <div className="glass-card p-6 rounded-xl relative z-50">
          <h2 className="font-medium text-base mb-3 text-white/90">Connect wallet</h2>
          <div>
            <WalletComponents />
          </div>
        </div>

        <div className="glass-card p-6 rounded-xl relative z-10">
          <h2 className="font-medium text-base mb-3 text-white/90">Collect art</h2>
          <div>
            {isConnected ? (
              <NFTMintCardDefault
                contractAddress='0x0b45d3c7f244d6c83f574fc04eda704ed736946b'
                tokenId='1'
              />
            ) : (
              <div className="flex items-center justify-center py-4">
                <p className="text-sm text-white/70">Connect your wallet to mint</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="mt-6 text-center text-xs text-white/50">
        <p>Built with <a href="https://docs.farcaster.xyz/developers/frames/v2/getting-started" target="_blank" rel="noopener noreferrer">Frames v2</a> and <a href="https://onchainkit.xyz" target="_blank" rel="noopener noreferrer">OnchainKit</a></p>
      </div>
    </div>
  );
}
