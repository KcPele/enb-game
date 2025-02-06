'use client';

import { useEffect, useState } from 'react';
import { WalletDefault } from '@coinbase/onchainkit/wallet';
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
    <div className="max-w-[300px] mx-auto py-4">
      <h1 className="text-2xl font-bold text-center mb-4">Base Mini App</h1>
      
      <div className="space-y-4">
        <div className="p-4 bg-gray-800 rounded-lg shadow-lg border border-gray-700">
          <h2 className="font-bold mb-2 text-gray-100">Your Wallet</h2>
          <div className="relative">
            <WalletDefault />
          </div>
        </div>

        <div className="p-4 bg-gray-800 rounded-lg shadow-lg border border-gray-700">
          <h2 className="font-bold mb-2 text-gray-100">Mint NFT</h2>
          <p className="text-sm mb-4 text-gray-300">
            Connect your wallet to mint an NFT.
          </p>
          <div className="relative">
            {mounted && isConnected ? (
              <NFTMintCardDefault
                contractAddress='0x03a4baf3c9450aa25ed21b042001f53d129caeb3'
                tokenId='1'
              />
            ) : (
              <div className="flex items-center justify-center h-full">
                <p className="text-lg">Connect your wallet to mint</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="mt-4 text-center text-xs text-gray-500">
        <p>Built with Frames v2 and OnchainKit</p>
      </div>
    </div>
  );
}
