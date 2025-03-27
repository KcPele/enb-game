import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export async function GET(req: NextRequest): Promise<NextResponse> {
  const host = process.env.NEXT_PUBLIC_HOST || req.nextUrl.origin;

  // Initial frame view for ENB Game
  return NextResponse.json({
    version: "vNext",
    title: "ENB Game - Follow & Earn",
    ogImage: `${host}/preview.png`,
    // This is the important part - setting the homeUrl makes this a full app frame
    homeUrl: `${host}`,
    frames: [
      {
        version: "vNext",
        image: `${host}/preview.png`,
        buttons: [
          {
            label: "Start ENB Game",
            action: "post",
          },
        ],
        postUrl: `${host}/api/frame`,
      },
    ],
  });
}

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    const host = process.env.NEXT_PUBLIC_HOST || req.nextUrl.origin;

    // After the user clicks "Start ENB Game", show the onboarding instructions
    return NextResponse.json({
      version: "vNext",
      frames: [
        {
          version: "vNext",
          image: `${host}/preview.png`,
          buttons: [
            {
              label: "Open ENB Game",
              action: "link",
              target: `${host}`,
            },
          ],
          title: "ENB Game Onboarding",
          text: "Follow Farcaster accounts and channels to earn points: @kokocodes, @kcpele.eth, /base, @baseafrica",
        },
      ],
    });
  } catch (error) {
    console.error("Frame error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

// Required for frame validation
export const dynamic = "force-dynamic";
export const runtime = "edge";
