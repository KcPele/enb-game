interface FrameMetadata {
  buttons: {
    label: string;
    action: string;
  }[];
  image: {
    src: string;
    aspectRatio: string;
  };
  postUrl: string;
  version: string;
  ogImage: string;
}

export const frameMetadata: FrameMetadata = {
  buttons: [
    {
      label: "Mint NFT",
      action: "post"
    }
  ],
  image: {
    src: `${process.env.NEXT_PUBLIC_HOST || 'https://ock-frames-template.vercel.app'}/window.svg`,
    aspectRatio: "1:1"
  },
  postUrl: `${process.env.NEXT_PUBLIC_HOST || 'https://ock-frames-template.vercel.app'}/api/frame`,
  version: "2",
  ogImage: `${process.env.NEXT_PUBLIC_HOST || 'https://ock-frames-template.vercel.app'}/window.svg`
};
