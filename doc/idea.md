# ENB Game: An Onchain Task-Based Game on the Base Blockchain

## Overview

ENB Game is an on-chain, task-based game designed to onboard new users to the Base blockchain. Integrated within Warpcast via iframes, it enables players to acquire Base names, join communities, and complete on-chain tasks to develop NFT characters. Players are rewarded with ENB tokens upon task completion, fostering engagement and growth within the Base ecosystem.

## Key Components

1. **Base Names Acquisition**

   - Players can register unique Base names, such as `username.base.eth`, serving as their in-game identity.

2. **Community Participation**

   - Players can join various communities to collaborate on tasks and share rewards.
   - Communities are managed via smart contracts or existing platforms to ensure transparency and fairness.

3. **On-Chain Tasks and NFT Character Development**

   - Players complete on-chain tasks to develop and enhance their NFT characters.
   - Progression is tracked on-chain, ensuring transparency and security.

4. **External Task Integration**

   - External projects can introduce their own tasks by holding ENB tokens.
   - These tasks are displayed for users to complete, promoting ecosystem diversity and engagement.

5. **Reward System**
   - Upon completing 4 to 5 tasks, players are rewarded with ENB tokens.
   - The ENB token has already been launched with a market cap of approximately $65,000.

## Technical Implementation

The game is embedded within Warpcast using iframes for accessibility and leverages the platform's user base. To develop this integration, we will utilize the [OnchainKit Frames v2 Template](https://github.com/fakepixels/ock-frames-template), which offers:

- Built-in Farcaster Frames v2 support
- Dynamic frame state management
- Seamless wallet connection via OnchainKit
- NFT minting capabilities
- Integration with Next.js and Tailwind CSS
