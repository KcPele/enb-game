import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export async function GET(req: NextRequest): Promise<NextResponse> {
  const host = process.env.NEXT_PUBLIC_HOST || req.nextUrl.origin;
  
  // Initial frame view - this should be your app's home page
  return NextResponse.json({
    version: "vNext",
    title: "Frames v2 Demo",
    ogImage: `${host}/preview.png`,
    // This is the important part - setting the homeUrl makes this a full app frame
    homeUrl: `${host}`,
    frames: [{
      version: "vNext",
      image: `${host}/preview.png`,
      buttons: [
        {
          label: "Launch App",
          action: "post"
        }
      ],
      postUrl: `${host}/api/frame`
    }]
  });
}

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    const host = process.env.NEXT_PUBLIC_HOST || req.nextUrl.origin;
    
    // After the user clicks "Launch App", redirect them to the full app
    return NextResponse.json({
      version: "vNext",
      frames: [{
        version: "vNext",
        image: `${host}/preview.png`,
        action: "link", 
        target: `${host}`
      }]
    });
  } catch (error) {
    console.error('Frame error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

// Required for frame validation
export const dynamic = 'force-dynamic';
export const runtime = 'edge';
