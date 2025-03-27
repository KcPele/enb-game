import "@coinbase/onchainkit/styles.css";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import type { JSX } from "react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const frameMetadata = {
  version: "next",
  imageUrl: "https://enb-game.vercel.app/preview.png",
  button: {
    title: "Play Game",
    action: {
      type: "launch_frame",
      name: "Everybody Needs Base",
      url: "https://enb-game.vercel.app",
      splashImageUrl: "https://enb-game.vercel.app/splash.png",
      splashBackgroundColor: "#000000",
    },
  },
};

export const metadata: Metadata = {
  title: "Everybody Needs Base",
  description: "Everybody Needs Base is a game about the importance of Base",
  other: {
    "fc:frame": JSON.stringify(frameMetadata),
    "og:image": frameMetadata.imageUrl,
  },
};

interface RootLayoutProps {
  children: React.ReactNode;
}

const RootLayout = ({ children }: RootLayoutProps): JSX.Element => {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="background-gradient" />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
};

export default RootLayout;
