# OnchainKit Frames v2 Template

[![](/public/miniart.gif)](https://enb-game.vercel.app)

Fork it on [Replit](https://replit.com/@tina-he/ock-frames-template?v=1#README.md).

A modern, full-featured template for building Farcaster Frames v2 applications with OnchainKit. This template provides everything you need to create interactive frame experiences with wallet integration and NFT minting capabilities.

## ✨ Features

### Frame Integration

- 🖼️ Built-in Farcaster Frames v2 support
- 🔄 Dynamic frame state management
- 🎨 Customizable frame metadata
- 🖱️ Interactive button handling
- 🏃‍♂️ Edge runtime support

### Wallet Features

- 👛 Seamless wallet connection via OnchainKit
- 👤 User profile display with avatars
- 💰 Built-in fund linking
- 🔌 Easy disconnect functionality

### NFT Integration

- 🎨 NFT minting via OnchainKit
- 💎 Base network support
- 🔒 Secure transaction handling
- 📱 Mobile-responsive design

### Technical Stack

- [Frames v2](https://docs.farcaster.xyz/developers/frames/v2)
- [OnchainKit](https://onchainkit.xyz)
- [Next.js](https://nextjs.org)
- [Tailwind CSS](https://tailwindcss.com)

## 🚀 Quick Start

1. **Clone and Install**

```bash
git clone https://github.com/fakepixels/ock-frames-template.git
cd ock-frames-template
npm install
```

2. **Set Up Environment**
   Create a `.env.local` file:

```env
NEXT_PUBLIC_ONCHAINKIT_API_KEY=your_api_key_here
NEXT_PUBLIC_HOST=your_host_url # Optional, for production
```

3. **Start Development**

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to see your app.

## 📁 Project Structure

```
app/
├── components/           # React components
│   ├── Frame.tsx        # Main frame component
│   └── WalletComponents.tsx
├── api/                 # API routes
│   └── frame/          # Frame endpoints
├── frames.ts           # Frame configuration
├── layout.tsx          # Root layout
└── page.tsx            # Home page
```

## 🛠️ Configuration

### Frame Configuration

Edit `app/frames.ts` to customize your frame:

```typescript
export const frameMetadata = {
  buttons: [
    {
      label: "Mint NFT",
      action: "post",
    },
  ],
  image: {
    src: "/window.svg",
    aspectRatio: "1:1",
  },
  // ... additional options
};
```

### NFT Settings

Update the NFT contract in `app/components/Frame.tsx`:

```typescript
<NFTMintCardDefault
  contractAddress="your_contract_address"
  tokenId="your_token_id"
/>
```

## 🎨 Styling

The template uses Tailwind CSS with custom animations and glass-morphism effects. Customize the look in:

- `app/globals.css` - Global styles and animations
- `tailwind.config.ts` - Tailwind configuration

## 📚 API Reference

### Frame Endpoint

- `POST /api/frame`
  - Handles frame interactions
  - Returns updated frame state
  - Supports dynamic image generation

### Wallet Integration

The `WalletComponents` component provides:

- Wallet connection/disconnection
- Profile display
- Address management
- Fund linking

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with [OnchainKit](https://onchainkit.xyz)
- Powered by [Farcaster Frames](https://docs.farcaster.xyz/developers/frames/v2)
- Created with [Next.js](https://nextjs.org)
