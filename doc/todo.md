# ENB Game: Version 1 Todo List

This document outlines the specific tasks needed to complete Version 1 of the ENB Game, focusing on the core framework and basic task system. Tasks are organized by category and include priority indicators.

## Project Setup

- [x] **HIGH** - Clone and set up OnchainKit Frames v2 Template (if not already done)
- [x] **HIGH** - Configure environment variables for development
- [x] **HIGH** - Set up Base network configuration in project
- [x] **MEDIUM** - Create project documentation structure
- [ ] **LOW** - Set up monitoring and error tracking

## Branding & UI Design

- [ ] **HIGH** - Create ENB Game logo and basic branding assets
- [ ] **HIGH** - Design game landing page UI mockup
- [ ] **HIGH** - Design task list and task detail UI mockups
- [x] **MEDIUM** - Create UI component library with Tailwind
- [x] **MEDIUM** - Implement responsive design for mobile/desktop
- [ ] **LOW** - Design animations for task completion

## Warpcast/Farcaster Integration

- [x] **HIGH** - Update existing Frame component with ENB Game branding
- [x] **HIGH** - Customize Frame API route for ENB Game
- [x] **HIGH** - Implement proper Frame navigation flow
- [x] **MEDIUM** - Add auth state persistence
- [x] **MEDIUM** - Enhance Frame metadata with game information
- [ ] **LOW** - Add analytics for Frame usage

## Neynar API Integration

- [x] **HIGH** - Create Neynar API service layer
- [x] **HIGH** - Set up wallet address to FID mapping
- [x] **HIGH** - Implement user follow verification
- [x] **HIGH** - Implement channel follow verification
- [x] **MEDIUM** - Add error handling for API failures
- [x] **MEDIUM** - Implement FID prompting for unlinked wallets
- [ ] **MEDIUM** - Cache API responses to reduce API calls
- [ ] **LOW** - Add extended Farcaster profile information display
- [ ] **LOW** - Implement additional verification types (posts, casts)

## Task System

- [x] **HIGH** - Define task data model and interfaces
- [x] **HIGH** - Create task list component
- [x] **HIGH** - Implement task detail view
- [x] **HIGH** - Design and implement initial task types:
  - [x] "Connect wallet" task
  - [x] "Visit a page" task
  - [x] "Follow a channel" task
  - [x] "Follow a user" task
- [ ] **HIGH** - Create smart contract for task tracking
- [x] **MEDIUM** - Implement task completion verification for each task type
- [x] **MEDIUM** - Add task status tracking (not-started, in-progress, completed)
- [x] **MEDIUM** - Create task progression UI
- [ ] **LOW** - Implement task filtering and sorting

## Wallet Integration

- [x] **HIGH** - Configure wallet connection specifically for Base network
- [ ] **HIGH** - Implement ENB token balance display
- [ ] **HIGH** - Add network detection and switching if user is on wrong network
- [x] **MEDIUM** - Set up transaction signing for task completion
- [x] **MEDIUM** - Create wallet connection error handling
- [ ] **LOW** - Add wallet activity history

## Smart Contracts

- [ ] **HIGH** - Design and develop task tracking smart contract
- [ ] **HIGH** - Implement functions for task completion verification
- [ ] **HIGH** - Add ENB token integration for rewards
- [ ] **MEDIUM** - Create unit tests for smart contracts
- [ ] **MEDIUM** - Deploy contracts to Base testnet
- [ ] **LOW** - Document contract interfaces and functions

## Backend Services

- [x] **HIGH** - Implement API endpoints for task data
- [x] **MEDIUM** - Create task verification service
- [ ] **MEDIUM** - Set up user profile management
- [ ] **LOW** - Implement basic analytics tracking

## Testing & Quality Assurance

- [ ] **HIGH** - Create test plan for Version 1
- [ ] **HIGH** - Write unit tests for core components
- [ ] **MEDIUM** - Implement integration tests for task completion
- [ ] **MEDIUM** - Test on different devices and browsers
- [ ] **LOW** - Set up automated testing
- [ ] **LOW** - Create mock APIs for testing Neynar integrations

## Documentation

- [ ] **HIGH** - Write technical documentation for V1 features
- [ ] **HIGH** - Create user guide for basic functionality
- [x] **MEDIUM** - Document API endpoints and Neynar API usage
- [x] **LOW** - Create developer onboarding documentation

## Launch Preparation

- [ ] **HIGH** - Create Version 1 launch plan
- [ ] **MEDIUM** - Prepare user feedback collection system
- [ ] **MEDIUM** - Set up bug reporting process
- [ ] **LOW** - Prepare announcement materials

## Project Management

- [ ] **HIGH** - Set up project tracking in preferred tool
- [ ] **HIGH** - Create sprint structure and timeline
- [ ] **MEDIUM** - Define V1 success metrics
- [ ] **MEDIUM** - Schedule regular progress reviews
- [ ] **LOW** - Create risk management plan

## Progress Tracking

| Category               | Not Started | In Progress | Completed | Total  |
| ---------------------- | ----------- | ----------- | --------- | ------ |
| Project Setup          | 1           | 0           | 4         | 5      |
| Branding & UI          | 3           | 0           | 3         | 6      |
| Farcaster Integration  | 1           | 0           | 5         | 6      |
| Neynar API Integration | 3           | 0           | 6         | 9      |
| Task System            | 2           | 0           | 8         | 10     |
| Wallet Integration     | 3           | 0           | 3         | 6      |
| Smart Contracts        | 6           | 0           | 0         | 6      |
| Backend Services       | 2           | 0           | 2         | 4      |
| Testing & QA           | 6           | 0           | 0         | 6      |
| Documentation          | 2           | 0           | 2         | 4      |
| Launch Preparation     | 4           | 0           | 0         | 4      |
| Project Management     | 5           | 0           | 0         | 5      |
| **TOTAL**              | **38**      | **0**       | **33**    | **71** |

---

**Note:** This todo list should be reviewed and updated regularly during development. Tasks may be added, modified, or reprioritized based on progress and new requirements.
