# ENB Game

ENB Game is a task-based game on the Base network where users complete tasks to earn ENB tokens and rewards.

## Project Structure

The project is built using:

- [Next.js](https://nextjs.org/) with App Router
- [Farcaster Frames](https://docs.farcaster.xyz/reference/frames/spec) for cast integration
- [OnchainKit](https://onchainkit.xyz/) for wallet connections and blockchain interactions
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [Neynar API](https://docs.neynar.com/) for Farcaster user verification

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
  - ✅ "Follow a user" task with Neynar verification

### Farcaster Integration

- ✅ Frame Integration for sharing
- ✅ Neynar API Integration for user follow verification
- ✅ Channel follow verification

### Next Steps

The following features need to be implemented next:

1. **Smart Contract Development**

   - Create contract for task verification
   - Implement ENB token reward mechanism
   - Deploy to Base testnet for testing

2. **Enhanced Task Verification**

   - "Visit a page" task needs actual verification mechanism

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
- `NEXT_PUBLIC_NEYNAR_API_KEY` - API key for Neynar (obtain from [Neynar](https://neynar.com/))

### Neynar API Setup

This project uses Neynar API for Farcaster user and channel verification. To set up:

1. Visit [Neynar](https://neynar.com/) and create an account
2. Generate an API key from the dashboard
3. Add the API key to your `.env.local` file as `NEXT_PUBLIC_NEYNAR_API_KEY`

The API key is sent as the `x-api-key` header to the Neynar API endpoints.

#### Farcaster API Features Implemented

The Neynar API integration provides the following features:

- **User Verification**: Verify if a user's wallet has a linked Farcaster account
- **Follow Verification**: Check if a user follows another user or channel
- **User Profile Data**: Retrieve detailed user profile information
- **Follower List**: Get paginated list of a user's followers
- **Following Channels**: Get all channels a user follows

The implementation leverages the following Neynar API endpoints:

- `/user/custody-address` - Maps wallet addresses to Farcaster FIDs
- `/user/by_username` - Looks up users by their username
- `/user/bulk` - Retrieves information about multiple users by FIDs
- `/followers` - Gets a list of a user's followers with pagination
- `/user/channels` - Gets all channels a user follows
- `/channel/search` - Searches for channels by name

This robust integration ensures reliable verification for game tasks related to Farcaster activity.

## Contributing

Contributions are welcome! Please check the todo.md file for specific tasks that need to be implemented.
