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
    src: "/window.svg",
    aspectRatio: "1:1"
  },
  postUrl: "/api/frame",
  version: "vNext",
  ogImage: "/window.svg"
};
