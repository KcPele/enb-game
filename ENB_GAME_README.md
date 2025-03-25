# ENB Game

ENB Game is a task-based game on the Base network where users complete tasks to earn ENB tokens and rewards.

## Project Structure

The project is built using:

- [Next.js](https://nextjs.org/) with App Router
- [Farcaster Frames](https://docs.farcaster.xyz/reference/frames/spec) for cast integration
- [OnchainKit](https://onchainkit.xyz/) for wallet connections and blockchain interactions
- [Tailwind CSS](https://tailwindcss.com/) for styling

## Current Implementation Status

These are the components that have been implemented so far:

### Core Framework

- ✅ Base Network Configuration in providers.tsx
- ✅ Wallet Connection Interface using OnchainKit
- ✅ Farcaster Frame Integration
- ✅ Basic UI Styling with Tailwind CSS

### Task System

- ✅ Task Data Models and Interfaces
- ✅ Task List Component
- ✅ Task Detail Component
- ✅ Basic Task Status Tracking (not-started, in-progress, completed)
- ✅ Initial Task Types:
  - ✅ "Connect wallet" task
  - ✅ "Visit a page" task
  - ✅ "Follow a channel" task

### Next Steps

The following features need to be implemented next:

1. **Smart Contract Development**

   - Create contract for task verification
   - Implement ENB token reward mechanism
   - Deploy to Base testnet for testing

2. **Enhanced Task Verification**

   - "Visit a page" task needs actual verification mechanism
   - "Follow a channel" task needs Farcaster API integration

3. **User Progress Tracking**

   - Backend API for storing user progress
   - Profile management system
   - Task completion history

4. **ENB Token Integration**

   - Display ENB token balance
   - ENB token reward distribution
   - Transaction history

5. **UI/UX Enhancements**
   - ENB Game logo and branding assets
   - Animations for task completion
   - Improved game interface

## Setup Instructions

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   # or
   yarn
   ```
3. Copy the `.env.example` file to `.env.local` and fill in your values
4. Run the development server:
   ```
   npm run dev
   # or
   yarn dev
   ```

## Environment Variables

The following environment variables need to be set in `.env.local`:

- `NEXT_PUBLIC_ONCHAINKIT_API_KEY` - API key for OnchainKit
- `NEXT_PUBLIC_PROJECT_ID` - Project ID for wallet connections
- `NEXT_PUBLIC_HOST` - Host URL for the app
- `NEXT_PUBLIC_ENB_TOKEN_ADDRESS` - ENB token contract address

## Contributing

Contributions are welcome! Please check the todo.md file for specific tasks that need to be implemented.
