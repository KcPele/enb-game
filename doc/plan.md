# ENB Game Development Plan

This document outlines a phased approach to developing the ENB Game, an on-chain task-based game on the Base blockchain integrated with Warpcast via iframes. The plan breaks down the implementation into versions, starting with the simplest components and progressively incorporating more complex features.

## Version 1: Core Framework and Basic Task System

### 1.1 Project Setup ✅

- ✅ Set up project using [OnchainKit Frames v2 Template](https://github.com/fakepixels/ock-frames-template)
- ✅ Configure Next.js and Tailwind CSS
- ✅ Establish Base blockchain connection
- ✅ Set up development, staging, and production environments

### 1.2 Warpcast/Farcaster Integration ✅

- ✅ Implement iframe integration with Warpcast
- ✅ Set up Frame state management
- ✅ Configure user authentication via Farcaster
- ✅ Implement basic UI/UX elements and navigation

### 1.3 Basic Task System ⚠️ (Partially Complete)

- ⏩ Create smart contracts for basic task tracking
- ✅ Implement simple task types (e.g., "Connect wallet", "Visit a page", "Follow a channel", "Follow a user")
- ✅ Develop task display interface within Frames
- ✅ Implement task completion verification mechanisms
- ✅ Set up basic task progression tracking

### 1.4 Simple Wallet Integration ⚠️ (Partially Complete)

- ✅ Implement wallet connection functionality
- ⏩ Allow users to view their Base blockchain balance
- ✅ Set up transaction signing for basic operations
- ⏩ Implement ENB token balance display

### 1.5 Farcaster Social Tasks via Neynar API ✅

- ✅ Set up Neynar API integration for task verification
- ✅ Implement wallet-to-FID mapping
- ✅ Create follow user verification functionality
- ✅ Implement channel follow verification
- ✅ Build robust error handling for API interactions

## Version 2: Character System and Base Names

### 2.1 NFT Character System

- Develop smart contracts for character NFTs
- Create basic character attributes and metadata structure
- Implement character minting functionality
- Design basic character progression system
- Create character visualization in the UI

### 2.2 Base Names Integration

- Integrate with Base Names service
- Implement name availability checking
- Create name registration/claiming process
- Link Base names to user profiles and characters
- Set up name verification system

### 2.3 Enhanced Task System

- Expand task types to include character-related activities
- Implement task difficulty levels
- Create task categories
- Develop smart contracts for task-character interaction
- Add task completion history and statistics

## Version 3: Community Features and Advanced Rewards

### 3.1 Community System

- Develop community smart contracts
- Create community joining/creation mechanisms
- Implement community dashboards
- Add community-specific task types
- Develop community progression metrics

### 3.2 Advanced Reward System

- Implement ENB token reward distribution mechanism
- Create reward pools based on task completion
- Develop tiered reward structures
- Implement reward claim functionality
- Add reward history and analytics

### 3.3 Character Advancement

- Enhance NFT characters with more attributes
- Implement character leveling system
- Add character customization options
- Create character performance metrics
- Develop character-based achievements

## Version 4: External Integration and Ecosystem Expansion

### 4.1 External Project Task Integration

- Create API for external projects to submit tasks
- Implement ENB token staking for external projects
- Develop task review and approval system
- Create external task discovery interface
- Implement external task incentive structure

### 4.2 Advanced Analytics and Gamification

- Build comprehensive user analytics dashboard
- Implement leaderboards and competitions
- Create achievement system
- Add social features (sharing, referrals)
- Develop season-based gameplay mechanics

### 4.3 Enhanced User Experience

- Improve UI/UX based on user feedback
- Optimize performance and loading times
- Add advanced customization options
- Implement progressive onboarding
- Create detailed help/tutorial system

## Future Considerations

### Governance System

- ENB token holder voting mechanisms
- Community proposal system
- Decentralized task creation and management

### Multi-Chain Support

- Expansion to other EVM-compatible chains
- Cross-chain asset management
- Unified identity across chains

### Mobile Application

- Native mobile application development
- Push notifications for task completion
- Mobile-specific features

## Technical Infrastructure

### Smart Contracts

- Task management contracts
- NFT character contracts
- Community management contracts
- Reward distribution contracts
- External integration contracts

### Frontend Development

- Responsive design using Tailwind CSS
- Frame-based UI components
- Character visualization system
- Task interaction components
- Wallet integration components

### Backend Services

- Task verification system
- User profile management
- Analytics and metrics tracking
- External integration API
- Security and monitoring services

### External API Integrations

- Neynar API for Farcaster verification
- Base blockchain RPC endpoints
- Wallet connection providers
- Content delivery networks for assets

## Current Implementation Status & Next Steps

Based on the examination of the existing codebase, significant progress has been made on Version 1. Here's the current status and immediate next steps:

### Current Status:

1. **Basic Project Setup** ✅

   - Next.js framework is installed and configured
   - Tailwind CSS is set up for styling
   - Basic project structure is in place
   - Environment variables configured

2. **Farcaster/Frames Integration** ✅

   - Full Farcaster Frame SDK integration is implemented
   - Frame initialization and state management are complete
   - Frame navigation flow is properly implemented
   - Auth state persistence is working

3. **Wallet Integration** ⚠️ (Partially Complete)

   - Wallet connection functionality is implemented
   - User profile display with avatars is functioning
   - Address management and fund linking are available
   - Transaction signing for task completion is implemented
   - ENB token balance display needs implementation
   - Network detection and switching needs implementation

4. **Task System** ⚠️ (Partially Complete)

   - Task data model and interfaces are defined
   - Task list UI is implemented
   - Simple task types are implemented (wallet connection, follow accounts/channels)
   - Basic task verification is implemented
   - Task progression tracking is working
   - Smart contract for task tracking needs to be developed
   - Task filtering and sorting need implementation

5. **Neynar API Integration** ✅
   - Full implementation of Neynar API services
   - Wallet address to Farcaster FID mapping
   - User follow verification for accounts and channels
   - Comprehensive error handling for API failures
   - FID collection via prompt when not available
   - Key API endpoints integrated:
     - `/user/custody-address` - Maps wallet addresses to FIDs
     - `/user/by_username` - Looks up users by username
     - `/channel/search` - Searches for channels by name
     - `/channel/member/list` - Checks channel membership
     - `/user/channels` - Gets all channels a user follows

### Immediate Next Steps (Sprint 1):

1. **Complete Smart Contract Development** (4-5 days)

   - Create and deploy basic task tracking smart contract
   - Implement functions for task completion verification
   - Add ENB token integration for rewards
   - Deploy contracts to Base testnet

2. **Enhance Wallet Integration** (2-3 days)

   - Implement ENB token balance display
   - Add network detection and switching functionality
   - Create wallet activity history display

3. **Improve Task System** (3-4 days)

   - Implement task filtering and sorting
   - Enhance task UI with animations for task completion
   - Add more detailed task progression metrics
   - Add additional Neynar API-based task types (post verifications, cast interactions)

4. **Documentation and Testing** (3-4 days)
   - Write technical documentation for V1 features
   - Create user guide for basic functionality
   - Document API endpoints
   - Write unit tests for core components
   - Implement integration tests for task completion
   - Test Neynar API integration thoroughly with different user scenarios

### Sprint 2 (After completing Sprint 1):

1. **Begin NFT Character System** (4-5 days)

   - Design basic character NFT structure
   - Implement character display in UI
   - Create character attributes and progression system
   - Add character minting functionality

2. **Base Name Integration** (2-3 days)

   - Add Base Name availability checking
   - Create name registration flow
   - Link Base names to user profiles

3. **User Profile Management** (3-4 days)
   - Create user profile page
   - Implement user progression tracking
   - Add user achievements
   - Design and implement user profile customization
   - Show Farcaster profile details using Neynar API

### Technical Debt & Testing:

1. **Security Auditing** (Ongoing)

   - Smart contract reviews before deployment
   - Penetration testing of web interfaces
   - Transaction signing security
   - API key protection and rate limiting

2. **Performance Optimization** (Ongoing)

   - Page load optimization
   - Smart contract gas optimization
   - Image and asset optimization
   - Neynar API caching to reduce API calls

3. **Testing Framework** (Setup in Sprint 1)
   - Unit tests for smart contracts
   - Integration tests for web components
   - End-to-end testing for user flows
   - Mock Neynar API responses for testing

This development plan reflects the current progress and outlines the next steps for completing Version 1 and transitioning to Version 2 of the ENB Game.
