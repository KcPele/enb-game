import {
  ConnectWallet,
  Wallet,
  WalletDropdown,
  WalletDropdownDisconnect,
  WalletDropdownFundLink,
} from "@coinbase/onchainkit/wallet";
import { Address, Avatar, Name, Identity } from "@coinbase/onchainkit/identity";
import { color } from "@coinbase/onchainkit/theme";
import { getUserProgress } from "../data/mockTasks";
import { useAccount } from "wagmi";
import { useEffect, useState } from "react";

export function WalletComponents() {
  const { address, isConnected } = useAccount();
  const [points, setPoints] = useState(0);

  // Update points when wallet connection changes
  useEffect(() => {
    if (isConnected && address) {
      const progress = getUserProgress(address);
      setPoints(progress.totalPoints);
    } else {
      setPoints(0);
    }
  }, [address, isConnected]);

  // Listen for storage events to update points
  useEffect(() => {
    const handleStorageChange = () => {
      if (isConnected && address) {
        const progress = getUserProgress(address);
        setPoints(progress.totalPoints);
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

  return (
    <div className="flex relative">
      <Wallet>
        <ConnectWallet>
          <Avatar className="h-6 w-6" />
          <Name />
          {isConnected && points > 0 && (
            <span className="ml-2 text-xs bg-cyan-500/20 text-cyan-400 px-2 py-1 rounded-full">
              {points} pts
            </span>
          )}
        </ConnectWallet>
        <WalletDropdown className="absolute z-[9999]">
          <Identity className="px-4 pt-3 pb-2" hasCopyAddressOnClick>
            <Avatar />
            <div className="flex flex-col">
              <Name />
              <Address className={color.foregroundMuted} />
              {isConnected && (
                <span className="mt-1 text-xs text-cyan-400">
                  {points} points earned
                </span>
              )}
            </div>
          </Identity>
          <WalletDropdownFundLink />
          <WalletDropdownDisconnect />
        </WalletDropdown>
      </Wallet>
    </div>
  );
}
