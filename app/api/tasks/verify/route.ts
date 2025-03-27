import { NextRequest, NextResponse } from "next/server";
import { TaskType } from "../../../types/task";
import {
  checkUserFollowsChannel,
  checkUserFollowsUser,
  getWalletFid,
} from "../../../services/neynarApi";
import { taskMetadata } from "../../../data/mockTasks";

// Directly verify if a user follows an account or channel on Farcaster
export async function POST(req: NextRequest) {
  try {
    // Extract verification data
    const data = await req.json();
    const { taskId, walletAddress, fid } = data;

    // Basic validation
    if (!taskId || (!walletAddress && !fid)) {
      return NextResponse.json(
        { success: false, error: "Missing required parameters" },
        { status: 400 }
      );
    }

    // Get the task metadata with proper type checking
    const metadata = taskMetadata[taskId as keyof typeof taskMetadata];
    if (!metadata) {
      return NextResponse.json(
        { success: false, error: "Task metadata not found" },
        { status: 404 }
      );
    }

    let userFid = fid;

    // If user provided wallet address but not FID, try to get FID from wallet
    if (!userFid && walletAddress) {
      userFid = await getWalletFid(walletAddress);

      // If we couldn't get a FID from the wallet, prompt user to provide it
      if (!userFid) {
        return NextResponse.json(
          {
            success: false,
            error:
              "Could not determine Farcaster ID from wallet address. Please provide your Farcaster FID.",
            needsFid: true,
          },
          { status: 400 }
        );
      }
    }

    // Determine the type of task and verify accordingly
    if ("accountHandle" in metadata) {
      // This is an account follow task
      const isFollowing = await checkUserFollowsUser(
        userFid,
        metadata.accountHandle
      );

      return NextResponse.json({
        success: true,
        verified: isFollowing,
        taskId,
        message: isFollowing
          ? `Successfully verified that you follow ${metadata.accountHandle}`
          : `Could not verify that you follow ${metadata.accountHandle}. Please follow and try again.`,
      });
    } else if ("channelName" in metadata) {
      // This is a channel follow task
      const isFollowing = await checkUserFollowsChannel(
        userFid,
        metadata.channelName
      );

      return NextResponse.json({
        success: true,
        verified: isFollowing,
        taskId,
        message: isFollowing
          ? `Successfully verified that you follow ${metadata.channelName}`
          : `Could not verify that you follow ${metadata.channelName}. Please follow and try again.`,
      });
    } else {
      return NextResponse.json(
        {
          success: false,
          error: "Unknown task type",
          taskId,
        },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error("Verification error:", error);
    return NextResponse.json(
      { success: false, error: "Verification failed" },
      { status: 500 }
    );
  }
}

// Required for edge runtime
export const dynamic = "force-dynamic";
export const runtime = "edge";
