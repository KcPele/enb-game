# Contributing to ENB Game

Thank you for your interest in contributing to ENB Game! This document provides guidelines and instructions for contributing to the project.

## Table of Contents

- [Project Overview](#project-overview)
- [Development Setup](#development-setup)
- [Project Structure](#project-structure)
- [Contribution Guidelines](#contribution-guidelines)
  - [Code Style](#code-style)
  - [Pull Request Process](#pull-request-process)
  - [Reporting Bugs](#reporting-bugs)
  - [Feature Requests](#feature-requests)
- [Task Implementation](#task-implementation)
- [Working with Neynar API](#working-with-neynar-api)
- [Testing](#testing)
- [Documentation](#documentation)

## Project Overview

ENB Game is a task-based game on the Base network where users complete tasks to earn ENB tokens and rewards. The project leverages Farcaster Frames integration and blockchain technology to create an engaging user experience.

### Technology Stack

- [Next.js](https://nextjs.org/) with App Router
- [Farcaster Frames](https://docs.farcaster.xyz/reference/frames/spec) for cast integration
- [OnchainKit](https://onchainkit.xyz/) for wallet connections and blockchain interactions
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [Neynar API](https://docs.neynar.com/) for Farcaster user verification
- TypeScript for type-safe code
- Base Network for blockchain interactions

## Development Setup

1. **Fork and Clone the Repository**

   ```bash
   git clone https://github.com/yourusername/enb-game.git
   cd enb-game
   ```

2. **Install Dependencies**

   ```bash
   npm install
   # or
   yarn
   ```

3. **Set Up Environment Variables**

   Copy the `.env.example` file to `.env.local` and fill in your values:

   ```bash
   cp .env.example .env.local
   ```

   Required environment variables:

   - `NEXT_PUBLIC_ONCHAINKIT_API_KEY` - API key for OnchainKit
   - `NEXT_PUBLIC_PROJECT_ID` - Project ID for wallet connections
   - `NEXT_PUBLIC_HOST` - Host URL for the app
   - `NEXT_PUBLIC_ENB_TOKEN_ADDRESS` - ENB token contract address
   - `NEXT_PUBLIC_NEYNAR_API_KEY` - API key for Neynar (obtain from [Neynar](https://neynar.com/))

4. **Start the Development Server**

   ```bash
   npm run dev
   # or
   yarn dev
   ```

   The application will be available at [http://localhost:3000](http://localhost:3000).

## Project Structure

The project follows the Next.js App Router structure:

```
app/
├── api/                  # API routes
│   ├── frame/           # Frame API endpoints
│   └── tasks/           # Task-related API endpoints
├── components/           # React components
│   ├── Frame.tsx        # Main frame component
│   ├── PointsDisplay.tsx # Points display component
│   ├── WalletComponents.tsx # Wallet connection components
│   └── tasks/           # Task-related components
├── data/                 # Data models and mock data
├── services/             # Service layer for API interactions
│   ├── neynarApi.ts     # Neynar API integration
│   └── warpcastApi.ts   # Warpcast API service
├── types/                # TypeScript type definitions
├── frames.ts            # Frame configuration
├── globals.css          # Global styles
├── layout.tsx           # Root layout
├── page.tsx             # Home page
└── providers.tsx        # Context providers
```

## Contribution Guidelines

### Code Style

- Follow the existing code style and patterns in the codebase
- Use TypeScript for all new code
- Add proper JSDoc comments to functions and components
- Follow the component naming conventions (PascalCase for components)
- Use Tailwind CSS for styling following the established patterns

### Pull Request Process

1. **Create a Feature Branch**

   Always create a new branch for your changes:

   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make Your Changes**

   Implement your feature or fix with adherence to the project's coding standards.

3. **Test Your Changes**

   Ensure your changes work as expected and don't break existing functionality.

4. **Commit Your Changes**

   Use clear and descriptive commit messages:

   ```bash
   git commit -m "Add feature: brief description of what you did"
   ```

5. **Push to Your Fork**

   ```bash
   git push origin feature/your-feature-name
   ```

6. **Submit a Pull Request**

   - Provide a clear description of the changes
   - Reference any related issues
   - Include screenshots if UI changes were made
   - Ensure all checks pass

7. **Code Review**

   Your PR will be reviewed, and changes may be requested before merging.

### Reporting Bugs

When reporting bugs, please include:

- A clear and descriptive title
- Steps to reproduce the issue
- Expected behavior
- Actual behavior
- Screenshots if applicable
- Browser/device information
- Any additional context

### Feature Requests

When suggesting features:

- Describe the feature in detail
- Explain the use case and benefits
- Provide examples of how it would work
- Consider implementation challenges

## Task Implementation

When implementing new tasks for the game, follow these guidelines:

1. **Task Structure**

   - Each task should implement the `Task` interface from `app/types/task.ts`
   - Task types should be added to the `TaskType` enum
   - Tasks should have unique IDs, clear titles, and descriptions

2. **Verification Logic**

   - Implement verification in the appropriate API endpoint
   - For Farcaster-related tasks, use the Neynar API
   - For on-chain tasks, implement verification through smart contracts

3. **UI Components**
   - Task UI should be consistent with existing components
   - Follow the glass-card styling pattern
   - Implement proper loading and error states

## Working with Neynar API

Neynar API is used for Farcaster user and channel verification. Follow these guidelines when working with the API:

### 1. API Services

- All Neynar API calls should go through the `app/services/neynarApi.ts` service
- Add new API endpoints as methods to this service
- Follow the existing pattern for error handling and response parsing

### 2. API Key Management

- Never hardcode the API key in your code
- Use the environment variable `NEXT_PUBLIC_NEYNAR_API_KEY` for all API calls
- Include the API key in request headers using the `x-api-key` header

### 3. Key Endpoints

The project currently uses these Neynar API endpoints:

- `/user/custody-address` - Maps wallet addresses to Farcaster FIDs
- `/user/by_username` - Looks up users by their username
- `/user/bulk` - Retrieves information about multiple users by FIDs
- `/followers` - Gets a list of a user's followers with pagination
- `/user/channels` - Gets all channels a user follows
- `/channel/search` - Searches for channels by name
- `/channel/member/list` - Checks if a user is a member of a channel

### 4. Rate Limiting and Caching

- Be mindful of Neynar API rate limits
- Implement caching for frequently accessed data
- Use client-side state management to reduce repeated API calls

### 5. Error Handling

- Handle API failures gracefully with clear user feedback
- Implement fallback mechanisms when possible
- Log detailed error information for debugging

### 6. Documentation

- Document any new Neynar API integrations you add
- Update the relevant sections in ENB_GAME_README.md
- Include examples of response formats in code comments

## Testing

- Add unit tests for new functionality
- Test components in isolation
- Ensure responsive design works on all screen sizes
- Test wallet connections and blockchain interactions
- Create mock responses for testing Neynar API integrations
- Verify task verification logic with different user scenarios

## Documentation

- Update relevant documentation when changing code
- Add JSDoc comments to exported functions and components
- Document props interfaces for all components
- Keep README.md and ENB_GAME_README.md up to date

## Resources

- [Farcaster Documentation](https://docs.farcaster.xyz/developers/)
- [Base Documentation](https://docs.base.org/)
- [Viem Documentation](https://viem.sh/docs/getting-started.html)
- [OnchainKit Documentation](https://onchainkit.xyz/)
- [Neynar API Documentation](https://docs.neynar.com/reference/getting-started-1)
- [Neynar API Dashboard](https://neynar.com/dashboard)

Thank you for contributing to ENB Game! Your efforts help make the project better for everyone.
