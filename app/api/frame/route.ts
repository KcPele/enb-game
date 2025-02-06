import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { frameMetadata } from '../../frames';

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    // Return the initial frame state
    return new NextResponse(
      JSON.stringify({
        ...frameMetadata,
        image: {
          src: `${process.env.NEXT_PUBLIC_HOST || req.nextUrl.origin}/window.svg`,
          aspectRatio: "1:1"
        },
        buttons: [
          {
            label: "Mint NFT",
            action: "post"
          }
        ]
      }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  } catch (error) {
    console.error('Frame error:', error);
    return new NextResponse(
      JSON.stringify({ error: 'Internal Server Error' }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  }
}

// Required for frame validation
export const dynamic = 'force-dynamic';
export const runtime = 'edge';
