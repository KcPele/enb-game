import { NextRequest, NextResponse } from "next/server";
import { verifyFollowStatus } from "../../../services/warpcastApi";
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

    // Determine the type of task and verify accordingly
    if ("accountHandle" in metadata) {
      // This is an account follow task
      const verificationResult = await verifyFollowStatus(
        walletAddress,
        metadata.accountHandle,
        false, // Not a channel
        fid // Pass the FID if provided
      );

      // If verification needs FID, return proper response
      if (verificationResult.needsFid) {
        return NextResponse.json(
          {
            success: false,
            error: verificationResult.error,
            needsFid: true,
          },
          { status: 400 }
        );
      }

      return NextResponse.json({
        success: true,
        verified: verificationResult.isFollowing,
        taskId,
        fid: verificationResult.fid, // Return the FID used for verification

        message: verificationResult.isFollowing
          ? `Successfully verified that you follow ${metadata.accountHandle}`
          : `Could not verify that you follow ${metadata.accountHandle}. Please follow and try again.`,
      });
    } else if ("channelName" in metadata) {
      // This is a channel follow task
      const verificationResult = await verifyFollowStatus(
        walletAddress,
        metadata.channelName,
        true, // Is a channel
        fid // Pass the FID if provided
      );

      // If verification needs FID, return proper response
      if (verificationResult.needsFid) {
        return NextResponse.json(
          {
            success: false,
            error: verificationResult.error,
            needsFid: true,
          },
          { status: 400 }
        );
      }

      return NextResponse.json({
        success: true,
        verified: verificationResult.isFollowing,
        taskId,
        fid, // Return the FID used for verification

        message: verificationResult.isFollowing
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
