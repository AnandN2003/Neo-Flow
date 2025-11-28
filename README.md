# 🚀 NeoFlow - Decentralized Crowdfunding Platform

<div align="center">
  <img src="https://img.shields.io/badge/Next.js-13.2.4-black?style=for-the-badge&logo=next.js"/>
  <img src="https://img.shields.io/badge/React-18.2.0-blue?style=for-the-badge&logo=react"/>
  <img src="https://img.shields.io/badge/Tailwind-CSS-38B2AC?style=for-the-badge&logo=tailwind-css"/>
  <img src="https://img.shields.io/badge/Web3-Ethereum-627EEA?style=for-the-badge&logo=ethereum"/>
  <img src="https://img.shields.io/badge/Wagmi-1.4.13-FF6B35?style=for-the-badge"/>
</div>

## 🌟 Features

### 🏆 **Core Platform**
- **Campaign Creation & Management** - Create and manage fundraising campaigns
- **Secure Wallet Integration** - Connect with MetaMask and other Web3 wallets
- **Real-time Campaign Tracking** - Live updates on funding progress
- **Smart Contract Integration** - Secure and transparent blockchain transactions

### 🎯 **NeoFlow Exclusive Features**
- **🏅 Leaderboard System** - Track top donators and fundraisers
- **🎁 NeoPoints Rewards** - Earn points for donations and activities
- **🛍️ Redemption Store** - Redeem points for exclusive merchandise
- **📊 Advanced Analytics** - Beautiful charts and activity tracking
- **🏆 Tier System** - Bronze, Silver, Gold, and Platinum tiers

### 💡 **User Experience**
- **📱 Responsive Design** - Perfect on desktop, tablet, and mobile
- **🎨 Modern UI/UX** - Clean, intuitive interface with smooth animations
- **⚡ Fast Performance** - Optimized for speed and efficiency
- **🔐 Secure & Transparent** - Blockchain-powered security

## 🛠️ Tech Stack

### **Frontend**
- **Next.js 13.2.4** - React framework with SSR and optimization
- **React 18.2.0** - Modern React with hooks and concurrent features
- **Tailwind CSS** - Utility-first CSS framework for styling
- **Wagmi 1.4.13** - React hooks for Ethereum wallet integration

### **Web3 Integration**
- **Ethers.js 5.7.2** - Ethereum library for blockchain interactions
- **RainbowKit** - Beautiful wallet connection components
- **Hardhat** - Ethereum development environment
- **Polygon Network** - Fast, low-cost blockchain transactions

### **Smart Contracts**
- **Solidity 0.8.19** - Smart contract programming language
- **OpenZeppelin** - Secure, audited smart contract libraries
- **Hardhat Toolbox** - Complete development toolkit

## 🚀 Quick Start

### Prerequisites
- Node.js 16.0 or later
- npm or yarn package manager
- MetaMask or compatible Web3 wallet

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/AnandN2003/Neo-Flow.git
cd Neo-Flow
```

2. **Install dependencies**
```bash
npm install
```

3. **Start development server**
```bash
npm run dev
```

4. **Open in browser**
```
http://localhost:3000
```

## 🌐 Deployment

### Frontend Deployment (Vercel)
The frontend is optimized for Vercel deployment:

```bash
# Build the project
npm run build

# Deploy to Vercel
vercel
```

### Smart Contract Deployment
For contract deployment, see `/web3` directory:

```bash
cd web3
npm install
npx hardhat compile
npx hardhat run scripts/deploy.js --network [network]
```

## 📁 Project Structure

```
Neo-Flow/
├── components/           # React components
│   ├── Campaign/        # Campaign-related components
│   ├── common/          # Shared components
│   ├── Dashboard/       # Dashboard components
│   └── Layout/          # Layout components
├── pages/               # Next.js pages
│   ├── dashboard.js     # User dashboard with analytics
│   ├── leaderboard.js   # Community leaderboard
│   ├── rewards.js       # NeoPoints rewards system
│   └── redeem.js        # Merchandise redemption
├── utils/               # Utility functions
│   ├── helpers.js       # General helpers
│   └── rewards.js       # NeoPoints system
├── web3/                # Smart contracts
│   ├── contracts/       # Solidity contracts
│   ├── scripts/         # Deployment scripts
│   └── hardhat.config.js
└── config/              # Configuration files
```

## 🎨 Key Features Showcase

### 🏆 Leaderboard System
Track and celebrate top contributors with:
- **Top Donators** - Users who contribute the most
- **Top Fundraisers** - Creators with highest raised amounts
- **Real-time Updates** - Live leaderboard updates
- **Community Recognition** - Public acknowledgment

### 🎁 NeoPoints Rewards
Gamified donation experience:
- **100 points per 0.01 ETH** donated
- **500 bonus points** for first donation
- **2x multiplier** for donations ≥ 1 ETH
- **Tier progression** system

### 🛍️ Redemption Store
Exclusive merchandise with 12 products across 4 categories:
- **👕 Apparel** - T-shirts, hoodies, caps
- **💼 Accessories** - Bags, bottles, stickers
- **💻 Digital** - NFTs, premium features
- **🌟 Special** - Limited edition items

### 📊 Advanced Dashboard
Comprehensive analytics including:
- **Funding trends** charts
- **Category distribution** visualization
- **Recent activity** feed
- **Quick actions** panel

## 🔗 Live Demo

- **Frontend**: [Coming Soon - Will be deployed on Vercel]
- **Testnet Version**: Available on Polygon Mumbai testnet

## 🤝 Contributing

We welcome contributions! Please see our contributing guidelines:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Developer

**Anand N**
- GitHub : [@AnandN2003](https://github.com/AnandN2003)
- Project: [Neo-Flow](https://github.com/AnandN2003/Neo-Flow)

## 🙏 Acknowledgments

- Built with ❤️ using Next.js and Web3 technologies
- Inspired by the need for transparent, decentralized fundraising

# 🏗️ Neo-Flow DApp Architecture Flow Diagrams

## Overview

Neo-Flow is a decentralized crowdfunding platform built on Ethereum/Polygon blockchain using Next.js frontend and Solidity smart contracts. This document visualizes the complete system flow through interactive diagrams.

## 🔄 Complete System Flow Diagram

```mermaid
flowchart TD
    %% User Actions
    START([👤 User Opens Neo-Flow]) --> CONNECT{🔗 Connect Wallet?}
    
    %% Wallet Connection Flow
    CONNECT -->|Yes| WALLET[🦊 MetaMask/WalletConnect]
    WALLET --> AUTH[✅ Wallet Connected]
    CONNECT -->|Browse Only| BROWSE[👁️ Browse Campaigns]
    
    %% Main User Flows
    AUTH --> CHOICE{📋 What to do?}
    CHOICE -->|Create| CREATE[📝 Create Campaign]
    CHOICE -->|Fund| FUND[💰 Fund Campaign]
    CHOICE -->|View| VIEW[👀 View Dashboard]
    CHOICE -->|Withdraw| WITHDRAW[💸 Withdraw Funds]
    
    %% Campaign Creation Flow
    CREATE --> FORM[📝 Fill Campaign Form]
    FORM --> UPLOAD[🖼️ Upload Image to IPFS]
    UPLOAD --> METADATA[📄 Create Metadata JSON]
    METADATA --> IPFS_STORE[☁️ Store on Pinata IPFS]
    IPFS_STORE --> HASH[🔗 Get IPFS Hash]
    HASH --> CONTRACT_CREATE[📋 Call Smart Contract]
    CONTRACT_CREATE --> SIGN_CREATE[✍️ Sign Transaction]
    SIGN_CREATE --> MINE_CREATE[⛏️ Mine Transaction]
    MINE_CREATE --> EVENT_CREATE[📡 Emit CampaignCreated Event]
    EVENT_CREATE --> SUCCESS_CREATE[🎉 Campaign Created!]
    
    %% Campaign Funding Flow
    FUND --> SELECT[🎯 Select Campaign]
    SELECT --> AMOUNT[💵 Enter Amount]
    AMOUNT --> CONTRACT_FUND[📋 Call fundCampaign]
    CONTRACT_FUND --> SIGN_FUND[✍️ Sign Transaction + Send ETH]
    SIGN_FUND --> MINE_FUND[⛏️ Mine Transaction]
    MINE_FUND --> UPDATE_RAISED[📈 Update Raised Amount]
    UPDATE_RAISED --> EVENT_FUND[📡 Emit CampaignFunded Event]
    EVENT_FUND --> SUCCESS_FUND[🎉 Funding Successful!]
    
    %% Withdrawal Flow
    WITHDRAW --> CHECK_OWNER{👑 Campaign Owner?}
    CHECK_OWNER -->|Yes| CONTRACT_WITHDRAW[📋 Call withdrawFunds]
    CHECK_OWNER -->|No| ERROR_OWNER[❌ Access Denied]
    CONTRACT_WITHDRAW --> CALC_FEE[📊 Calculate Platform Fee 2.5%]
    CALC_FEE --> SIGN_WITHDRAW[✍️ Sign Transaction]
    SIGN_WITHDRAW --> MINE_WITHDRAW[⛏️ Mine Transaction]
    MINE_WITHDRAW --> TRANSFER[💸 Transfer ETH to Creator]
    TRANSFER --> SUCCESS_WITHDRAW[🎉 Withdrawal Successful!]
    
    %% Data Flow
    SUCCESS_CREATE --> REFRESH[🔄 Refresh Campaign List]
    SUCCESS_FUND --> REFRESH
    SUCCESS_WITHDRAW --> REFRESH
    REFRESH --> UI_UPDATE[🎨 Update React UI]
    
    %% Browse Flow
    BROWSE --> CAMPAIGNS[📋 View All Campaigns]
    CAMPAIGNS --> DETAILS[🔍 View Campaign Details]
    DETAILS --> CONNECT
    
    %% Error Handling
    ERROR_OWNER --> CHOICE
    
    %% Styling
    classDef userAction fill:#e3f2fd,stroke:#1976d2,stroke-width:2px
    classDef walletAction fill:#f3e5f5,stroke:#7b1fa2,stroke-width:2px
    classDef contractAction fill:#e8f5e8,stroke:#388e3c,stroke-width:2px
    classDef ipfsAction fill:#fff3e0,stroke:#f57c00,stroke-width:2px
    classDef successAction fill:#e8f5e8,stroke:#4caf50,stroke-width:3px
    classDef errorAction fill:#ffebee,stroke:#d32f2f,stroke-width:2px
    
    class START,CHOICE,FORM,AMOUNT,SELECT userAction
    class CONNECT,WALLET,AUTH,SIGN_CREATE,SIGN_FUND,SIGN_WITHDRAW walletAction
    class CONTRACT_CREATE,CONTRACT_FUND,CONTRACT_WITHDRAW,MINE_CREATE,MINE_FUND,MINE_WITHDRAW contractAction
    class UPLOAD,METADATA,IPFS_STORE,HASH ipfsAction
    class SUCCESS_CREATE,SUCCESS_FUND,SUCCESS_WITHDRAW successAction
    class ERROR_OWNER errorAction
```

## 🔄 Technical Data Flow Architecture

```mermaid
flowchart LR
    %% Frontend Layer
    subgraph "🖥️ FRONTEND LAYER"
        UI[🎨 React Components]
        HOOKS[🔧 Custom Hooks]
        STATE[📊 React State]
    end
    
    %% Web3 Layer
    subgraph "🌐 WEB3 LAYER"
        WAGMI[⚡ Wagmi Hooks]
        ETHERS[📡 Ethers.js]
        PROVIDER[🌍 RPC Provider]
    end
    
    %% Storage Layer
    subgraph "☁️ STORAGE LAYER"
        PINATA[📦 Pinata IPFS]
        GATEWAY[🌐 IPFS Gateway]
        METADATA[📄 JSON Metadata]
        IMAGES[🖼️ Campaign Images]
    end
    
    %% Blockchain Layer
    subgraph "⛓️ BLOCKCHAIN LAYER"
        NETWORK[🌐 Blockchain Network]
        CONTRACT[📋 Smart Contract]
        EVENTS[📡 Contract Events]
        STORAGE_BC[💾 Blockchain Storage]
    end
    
    %% Wallet Layer
    subgraph "🔐 WALLET LAYER"
        METAMASK[🦊 MetaMask]
        WALLETCONNECT[🔗 WalletConnect]
        SIGNER[✍️ Transaction Signer]
    end
    
    %% Data Flow Connections
    UI --> HOOKS
    HOOKS --> WAGMI
    WAGMI --> ETHERS
    ETHERS --> PROVIDER
    PROVIDER --> NETWORK
    
    UI --> PINATA
    PINATA --> GATEWAY
    GATEWAY --> METADATA
    GATEWAY --> IMAGES
    
    WAGMI --> METAMASK
    WAGMI --> WALLETCONNECT
    METAMASK --> SIGNER
    WALLETCONNECT --> SIGNER
    SIGNER --> NETWORK
    
    NETWORK --> CONTRACT
    CONTRACT --> EVENTS
    CONTRACT --> STORAGE_BC
    EVENTS --> WAGMI
    WAGMI --> STATE
    STATE --> UI
```

## 📱 User Journey Flow

```mermaid
journey
    title Neo-Flow User Journey
    section Discovery
      Visit Website: 5: User
      Browse Campaigns: 4: User
      Read About Platform: 3: User
    section Onboarding
      Connect Wallet: 3: User, MetaMask
      Verify Connection: 5: User, Platform
      First Time Setup: 4: User
    section Campaign Creation
      Plan Campaign: 5: Creator
      Fill Form: 4: Creator
      Upload Content: 3: Creator, IPFS
      Submit to Blockchain: 2: Creator, Smart Contract
      Campaign Live: 5: Creator, Platform
    section Campaign Funding
      Discover Campaign: 5: Backer
      Review Details: 4: Backer
      Decide Amount: 4: Backer
      Send Transaction: 3: Backer, MetaMask
      Confirmation: 5: Backer, Platform
    section Campaign Management
      Monitor Progress: 4: Creator
      Engage with Backers: 5: Creator
      Withdraw Funds: 4: Creator, Smart Contract
      Campaign Complete: 5: Creator, Platform
```

## 🔧 Smart Contract Function Flow

```mermaid
stateDiagram-v2
    [*] --> ContractDeployed: Deploy Contract
    ContractDeployed --> CampaignCreation: createCampaign()
    
    state CampaignCreation {
        [*] --> ValidateInputs
        ValidateInputs --> IncrementCounter
        IncrementCounter --> StoreCampaign
        StoreCampaign --> EmitEvent
        EmitEvent --> [*]
    }
    
    CampaignCreation --> CampaignActive: Campaign Created
    
    state CampaignActive {
        [*] --> AcceptingFunds
        AcceptingFunds --> FundingReceived: fundCampaign()
        FundingReceived --> UpdateAmount
        UpdateAmount --> RecordContribution
        RecordContribution --> CheckTarget
        CheckTarget --> AcceptingFunds: Target Not Reached
        CheckTarget --> TargetReached: Target Reached
        AcceptingFunds --> DeadlineReached: Time Expires
    }
    
    CampaignActive --> WithdrawalProcess: withdrawFunds()
    
    state WithdrawalProcess {
        [*] --> ValidateOwner
        ValidateOwner --> CalculateFees
        CalculateFees --> TransferToCreator
        TransferToCreator --> UpdateState
        UpdateState --> [*]
    }
    
    WithdrawalProcess --> CampaignClosed: Funds Withdrawn
    CampaignActive --> CampaignExpired: Deadline Passed
    CampaignExpired --> EmergencyWithdraw: emergencyWithdraw()
    EmergencyWithdraw --> RefundContributors
    RefundContributors --> CampaignClosed
    
    CampaignClosed --> [*]
```

## 🔐 Security & Access Control Flow

```mermaid
flowchart TD
    USER[👤 User Action] --> AUTH{🔐 Authentication Check}
    
    AUTH -->|Wallet Connected| ROLE{👑 Role Check}
    AUTH -->|No Wallet| PUBLIC[👁️ Public View Only]
    
    ROLE -->|Contract Owner| ADMIN[🛡️ Admin Functions]
    ROLE -->|Campaign Creator| CREATOR[📝 Creator Functions]
    ROLE -->|Regular User| USER_FUNCS[💰 User Functions]
    
    %% Admin Functions
    ADMIN --> PAUSE[⏸️ Pause Contract]
    ADMIN --> FEE_UPDATE[💸 Update Platform Fee]
    ADMIN --> WITHDRAW_FEES[💰 Withdraw Platform Fees]
    ADMIN --> TOGGLE_CAMPAIGN[🔄 Toggle Campaign Status]
    
    %% Creator Functions
    CREATOR --> CREATE_CAMPAIGN[📝 Create Campaign]
    CREATOR --> WITHDRAW_FUNDS[💸 Withdraw Campaign Funds]
    CREATOR --> VIEW_STATS[📊 View Campaign Stats]
    
    %% User Functions
    USER_FUNCS --> FUND_CAMPAIGN[💰 Fund Campaign]
    USER_FUNCS --> VIEW_CONTRIBUTIONS[👁️ View My Contributions]
    USER_FUNCS --> EMERGENCY_WITHDRAW[🆘 Emergency Withdraw]
    
    %% Security Checks
    CREATE_CAMPAIGN --> VALIDATE_INPUT[✅ Validate Campaign Data]
    FUND_CAMPAIGN --> CHECK_ACTIVE[✅ Check Campaign Active]
    FUND_CAMPAIGN --> CHECK_NOT_CREATOR[✅ Check Not Self-Funding]
    WITHDRAW_FUNDS --> CHECK_OWNER[✅ Check Campaign Ownership]
    WITHDRAW_FUNDS --> CHECK_BALANCE[✅ Check Available Balance]
    
    %% Reentrancy Protection
    WITHDRAW_FUNDS --> REENTRANCY[🛡️ ReentrancyGuard]
    FUND_CAMPAIGN --> REENTRANCY
    WITHDRAW_FEES --> REENTRANCY
    EMERGENCY_WITHDRAW --> REENTRANCY
    
    REENTRANCY --> EXECUTE[⚡ Execute Function]
    EXECUTE --> SUCCESS[✅ Success]
    
    %% Error Handling
    VALIDATE_INPUT -->|Invalid| ERROR[❌ Revert Transaction]
    CHECK_ACTIVE -->|Inactive| ERROR
    CHECK_NOT_CREATOR -->|Self-funding| ERROR
    CHECK_OWNER -->|Not Owner| ERROR
    CHECK_BALANCE -->|No Balance| ERROR
    
    ERROR --> REVERT[🔄 Transaction Reverted]
```

## 💾 Data Storage Architecture

```mermaid
flowchart TD
    %% Data Types
    USER_DATA[👤 User Interactions] --> SPLIT{📊 Data Type Split}
    
    SPLIT -->|Sensitive/Financial| BLOCKCHAIN[⛓️ Blockchain Storage]
    SPLIT -->|Media/Metadata| IPFS[☁️ IPFS Storage]
    SPLIT -->|UI State| FRONTEND[🖥️ Frontend Storage]
    
    %% Blockchain Storage Details
    BLOCKCHAIN --> CAMPAIGNS[📋 Campaign Data]
    BLOCKCHAIN --> CONTRIBUTIONS[💰 Contribution Records]
    BLOCKCHAIN --> FEES[💸 Platform Fees]
    BLOCKCHAIN --> MAPPINGS[🗺️ User Mappings]
    
    CAMPAIGNS --> CAMP_STRUCT[Campaign Struct:<br/>• ID, Creator<br/>• Target, Raised<br/>• Deadline, Active<br/>• Metadata Hash]
    
    CONTRIBUTIONS --> CONTRIB_STRUCT[Contribution Struct:<br/>• Campaign ID<br/>• Contributor<br/>• Amount, Timestamp]
    
    %% IPFS Storage Details
    IPFS --> PINATA[📦 Pinata Service]
    PINATA --> METADATA_JSON[📄 Campaign Metadata]
    PINATA --> IMAGES[🖼️ Campaign Images]
    
    METADATA_JSON --> JSON_CONTENT[JSON Content:<br/>• Title, Description<br/>• Category, Goals<br/>• Creator Info]
    
    IMAGES --> IMG_CONTENT[Image Content:<br/>• Campaign Banner<br/>• Creator Photo<br/>• Proof Images]
    
    %% Frontend Storage Details
    FRONTEND --> REACT_STATE[⚛️ React State]
    FRONTEND --> LOCAL_STORAGE[💾 Browser Storage]
    
    REACT_STATE --> TEMP_DATA[Temporary Data:<br/>• Form Inputs<br/>• UI State<br/>• Loading States]
    
    LOCAL_STORAGE --> PERSIST_DATA[Persistent Data:<br/>• Wallet Connection<br/>• User Preferences<br/>• Draft Campaigns]
    
    %% Data Flow
    CAMP_STRUCT --> HASH_LINK[🔗 Links to IPFS Hash]
    HASH_LINK --> METADATA_JSON
    JSON_CONTENT --> REACT_STATE
    IMG_CONTENT --> REACT_STATE
```

## 🌐 Network & Deployment Flow

```mermaid
flowchart TD
    %% Development Flow
    DEV_START[💻 Local Development] --> HARDHAT[🔨 Hardhat Node]
    HARDHAT --> LOCAL_DEPLOY[📋 Deploy Contract Locally]
    LOCAL_DEPLOY --> LOCAL_TEST[🧪 Test Functionality]
    
    %% Testing Flow
    LOCAL_TEST --> TEST_PASS{✅ Tests Pass?}
    TEST_PASS -->|No| DEBUG[🐛 Debug & Fix]
    DEBUG --> LOCAL_TEST
    TEST_PASS -->|Yes| TESTNET_DEPLOY[🌐 Deploy to Testnet]
    
    %% Testnet Flow
    TESTNET_DEPLOY --> MUMBAI[🧪 Mumbai Testnet]
    MUMBAI --> TESTNET_TEST[🔍 Testnet Testing]
    TESTNET_TEST --> TESTNET_PASS{✅ Testnet OK?}
    TESTNET_PASS -->|No| TESTNET_FIX[🔧 Fix Issues]
    TESTNET_FIX --> TESTNET_DEPLOY
    TESTNET_PASS -->|Yes| MAINNET_READY[🚀 Ready for Mainnet]
    
    %% Mainnet Flow
    MAINNET_READY --> MAINNET_DEPLOY[🌍 Deploy to Polygon Mainnet]
    MAINNET_DEPLOY --> CONTRACT_VERIFY[✅ Verify Contract]
    CONTRACT_VERIFY --> FRONTEND_UPDATE[🎨 Update Frontend Config]
    
    %% Frontend Deployment
    FRONTEND_UPDATE --> VERCEL_BUILD[⚡ Vercel Build]
    VERCEL_BUILD --> CDN_DEPLOY[🌐 CDN Deployment]
    CDN_DEPLOY --> PROD_LIVE[🎉 Production Live!]
    
    %% Environment Configuration
    subgraph "🔧 Environment Configs"
        LOCAL_ENV[.env.local<br/>• Local RPC<br/>• Test Contract<br/>• Dev Keys]
        
        TESTNET_ENV[.env.testnet<br/>• Mumbai RPC<br/>• Test Contract<br/>• Test Keys]
        
        PROD_ENV[.env.production<br/>• Polygon RPC<br/>• Main Contract<br/>• Prod Keys]
    end
    
    LOCAL_DEPLOY --> LOCAL_ENV
    MUMBAI --> TESTNET_ENV
    MAINNET_DEPLOY --> PROD_ENV
```

## 📁 Project Structure

```
Neo-Flow/
├── 📱 Frontend Application
│   ├── components/               # React UI components
│   │   ├── Campaign/            # Campaign-related components
│   │   │   ├── CampaignCard.js
│   │   │   ├── CreateCampaignForm.js
│   │   │   └── CampaignDetails.js
│   │   ├── Dashboard/           # Dashboard components
│   │   │   ├── DashboardStats.js
│   │   │   └── StatsCard.js
│   │   ├── Layout/              # Layout components
│   │   │   ├── Header.js
│   │   │   ├── Footer.js
│   │   │   ├── Sidebar.js
│   │   │   └── GlobalErrorBoundary.js
│   │   └── common/              # Shared components
│   │       ├── Loading.js
│   │       ├── LoadingAnimation.js
│   │       └── NeoPointsToast.js
│   ├── pages/                   # Next.js pages
│   │   ├── _app.js             # Global app configuration
│   │   ├── index.js            # Landing page
│   │   ├── dashboard.js        # User dashboard
│   │   ├── create-campaign.js  # Campaign creation
│   │   ├── my-campaigns.js     # User's campaigns
│   │   └── contributions.js    # User's donations
│   ├── hooks/                   # Custom React hooks
│   │   ├── useContract.js      # Main contract interaction
│   │   ├── useCampaignDetails.js
│   │   └── useSSRSafeDate.js
│   ├── utils/                   # Utility functions
│   │   ├── ipfs.js             # IPFS operations
│   │   ├── helpers.js          # General utilities
│   │   └── rewards.js          # NeoPoints system
│   ├── constants/               # Configuration constants
│   │   ├── abi.js              # Smart contract ABI
│   │   └── index.js            # Platform constants
│   ├── config/                  # Configuration files
│   │   └── wagmi.js            # Web3 configuration
│   └── styles/                  # CSS styles
│       └── globals.css         # Global styles
│
├── ⛓️ Blockchain Infrastructure
│   └── web3/                    # Smart contract development
│       ├── contracts/           # Solidity contracts
│       │   └── CrowdfundingMarketplace.sol
│       ├── scripts/             # Deployment scripts
│       │   └── deploy.js
│       ├── hardhat.config.js    # Hardhat configuration
│       └── package.json         # Blockchain dependencies
│
├── 📝 Documentation
│   ├── README.md               # Project overview
│   ├── Architecture.md         # This file
│   ├── DEPLOYMENT_GUIDE.md     # Deployment instructions
│   └── docs/                   # Additional documentation
│
└── ⚙️ Configuration Files
    ├── package.json            # Frontend dependencies
    ├── next.config.js          # Next.js configuration
    ├── tailwind.config.js      # Tailwind CSS config
    ├── .env.local              # Environment variables
    └── vercel.json             # Vercel deployment config
```

## 🔄 Data Flow Architecture

### Campaign Creation Flow

```mermaid
sequenceDiagram
    participant User
    participant UI as React UI
    participant Hook as useContract Hook
    participant IPFS as Pinata IPFS
    participant Wallet as MetaMask
    participant Contract as Smart Contract
    participant Blockchain

    User->>UI: Fill campaign form
    UI->>IPFS: Upload image
    IPFS-->>UI: Return image hash
    UI->>IPFS: Upload metadata JSON
    IPFS-->>UI: Return metadata hash
    UI->>Hook: createCampaign(target, deadline, hash)
    Hook->>Wallet: Request transaction signature
    Wallet-->>Hook: Signed transaction
    Hook->>Contract: Execute createCampaign()
    Contract->>Blockchain: Mine transaction
    Blockchain-->>Contract: Transaction confirmed
    Contract-->>Hook: Emit CampaignCreated event
    Hook-->>UI: Update campaign list
    UI-->>User: Show success notification
```

### Campaign Funding Flow

```mermaid
sequenceDiagram
    participant User
    participant UI as Campaign Details
    participant Hook as useContract Hook
    participant Wallet as MetaMask
    participant Contract as Smart Contract
    participant Blockchain

    User->>UI: Enter donation amount
    UI->>Hook: fundCampaign(campaignId, amount)
    Hook->>Wallet: Request payment signature
    Wallet-->>Hook: Signed transaction + ETH
    Hook->>Contract: Execute fundCampaign()
    Contract->>Contract: Update raisedAmount
    Contract->>Contract: Record contribution
    Contract->>Blockchain: Mine transaction
    Blockchain-->>Contract: Transaction confirmed
    Contract-->>Hook: Emit CampaignFunded event
    Hook-->>UI: Refresh campaign data
    UI-->>User: Show success notification
```

## 🔧 Technical Stack

### Frontend Technologies
```
🎨 Frontend Stack
├── ⚛️ React 18.2.0                 # UI framework
├── ⚡ Next.js 13.2.4              # React framework with SSR
├── 🎨 Tailwind CSS                # Utility-first CSS
├── 🔥 React Hot Toast             # Notifications
├── 📊 React Icons                 # Icon library
└── 🎭 GSAP                        # Animations
```

### Web3 Technologies
```
🌐 Web3 Stack
├── ⚡ Wagmi 1.4.13               # React hooks for Ethereum
├── 🌈 RainbowKit 1.3.6          # Wallet connection UI
├── 📡 Ethers.js 5.7.2            # Ethereum library
├── 🔗 Viem 1.21.4                # TypeScript Ethereum library
└── 🌐 Web3Modal 1.9.12           # Multi-wallet support
```

### Blockchain Infrastructure
```
⛓️ Blockchain Stack
├── 🔨 Hardhat 2.13.0             # Development environment
├── 📋 Solidity 0.8.19            # Smart contract language
├── 🛡️ OpenZeppelin Contracts     # Security libraries
├── 🟣 Polygon Network             # L2 scaling solution
└── 🧪 Mumbai Testnet              # Testing environment
```

### Storage & Services
```
💾 Storage & Services
├── 📦 Pinata Cloud               # IPFS pinning service
├── 🌐 IPFS                       # Decentralized storage
├── 🚀 Vercel                     # Frontend deployment
└── 🔧 GitHub                     # Code repository
```

## 🔒 Security Architecture

### Smart Contract Security

```mermaid
graph TD
    subgraph "🛡️ Security Layers"
        A[🔐 OpenZeppelin Contracts]
        B[🚫 ReentrancyGuard]
        C[👑 Ownable Access Control]
        D[⏸️ Pausable Emergency Stop]
    end
    
    subgraph "💰 Financial Controls"
        E[💸 Platform Fee Limits]
        F[🚪 Withdrawal Restrictions]
        G[🆘 Emergency Withdrawals]
    end
    
    subgraph "✅ Input Validation"
        H[📊 Parameter Validation]
        I[💯 Amount Checks]
        J[⏰ Deadline Validation]
    end
    
    A --> B
    A --> C
    A --> D
    E --> F
    F --> G
    H --> I
    I --> J
```

### Security Features

1. **ReentrancyGuard**: Prevents reentrancy attacks on payable functions
2. **Ownable**: Access control for administrative functions
3. **Pausable**: Emergency stop mechanism for the entire contract
4. **Input Validation**: Comprehensive validation of all inputs
5. **Financial Controls**: Platform fee limits and withdrawal restrictions
6. **Emergency Features**: Contributor protection mechanisms

## 🌊 Data Flow Patterns

### Real-time Data Synchronization

```mermaid
graph LR
    subgraph "📡 Event System"
        A[Contract Events] --> B[Wagmi Listeners]
        B --> C[React State Updates]
        C --> D[UI Re-renders]
    end
    
    subgraph "🔄 Data Enrichment"
        E[Contract Data] --> F[IPFS Metadata Fetch]
        F --> G[Combined State]
        G --> H[Enhanced UI Display]
    end
    
    subgraph "⚡ Performance Optimization"
        I[1-second Refetch Intervals]
        J[Caching Strategies]
        K[Selective Updates]
    end
```

### State Management Flow

1. **Contract Events**: Smart contract emits events for all state changes
2. **Wagmi Hooks**: Automatically listen for events and refetch data
3. **React State**: Component state updates trigger UI re-renders
4. **IPFS Integration**: Metadata fetched and cached for enhanced display
5. **Performance**: Optimized refetch intervals and caching strategies

## 🚀 Deployment Architecture

### Development Environment

```mermaid
graph TB
    subgraph "💻 Local Development"
        A[VS Code Editor] --> B[Node.js Runtime]
        B --> C[NPM Dependencies]
        C --> D[3 Terminal Setup]
        D --> E[Terminal 1: Hardhat Node]
        D --> F[Terminal 2: Next.js Dev Server]
        D --> G[Terminal 3: Deployment Commands]
    end
    
    subgraph "🔨 Hardhat Blockchain"
        H[Local Blockchain] --> I[10,000 ETH Test Accounts]
        I --> J[Instant Mining]
        J --> K[Contract Deployment]
    end
    
    subgraph "🌐 Frontend Development"
        L[Next.js Dev Server] --> M[Hot Module Reloading]
        M --> N[Real-time Updates]
        N --> O[Component Testing]
    end
```

### Production Deployment

```mermaid
graph TB
    subgraph "🚀 Frontend Deployment (Vercel)"
        A[GitHub Repository] --> B[Vercel CI/CD]
        B --> C[Build Process]
        C --> D[Static Site Generation]
        D --> E[Global CDN Distribution]
    end
    
    subgraph "⛓️ Blockchain Deployment"
        F[Smart Contract] --> G[Network Selection]
        G --> H[Mumbai Testnet / Polygon Mainnet]
        H --> I[Contract Verification]
        I --> J[ABI Generation]
    end
    
    subgraph "🔧 Configuration Management"
        K[Environment Variables] --> L[Network RPC URLs]
        L --> M[Contract Addresses]
        M --> N[IPFS API Keys]
    end
```

## 📊 Platform Economics

### Fee Structure

```
💰 Platform Economics
├── Platform Fee: 2.5% (250 basis points)
├── Fee Collection: On fund withdrawal
├── Fee Destination: Contract owner wallet
├── Maximum Fee: 10% (safety limit)
└── Fee Adjustment: Owner-only function
```

### Revenue Streams

1. **Platform Fees**: 2.5% of all successfully withdrawn funds
2. **Potential Premium Features**: Advanced analytics, promoted campaigns
3. **NFT Integration**: Special campaign rewards and certificates

## 🎯 Key Features

### Core Platform Features

- ✅ **Campaign Creation & Management**
- ✅ **Secure Wallet Integration**
- ✅ **Real-time Progress Tracking**
- ✅ **Smart Contract Security**
- ✅ **IPFS Decentralized Storage**
- ✅ **Multi-chain Support**
- ✅ **Mobile Responsive Design**

### NeoFlow Exclusive Features

- 🏆 **Leaderboard System**
- 🎁 **NeoPoints Rewards**
- 🛍️ **Redemption Store**
- 📊 **Advanced Analytics**
- 🏅 **Tier System**
- 📱 **Mobile App Support**

## 🔮 Future Roadmap

### Planned Enhancements

1. **Multi-chain Expansion**: Ethereum, BSC, Avalanche support
2. **NFT Integration**: Campaign completion certificates
3. **DAO Governance**: Community-driven platform decisions
4. **Advanced Analytics**: AI-powered success predictions
5. **Social Features**: Campaign sharing and networking
6. **Mobile App**: Native iOS and Android applications

### Technical Improvements

1. **GraphQL Integration**: Enhanced data querying
2. **Serverless Functions**: Backend API development
3. **Push Notifications**: Real-time campaign updates
4. **Advanced Caching**: Improved performance optimization
5. **Testing Suite**: Comprehensive automated testing

## 📞 Support & Documentation

### Development Resources

- 📚 **Smart Contract Documentation**: Inline comments and NatSpec
- 🎥 **Video Tutorials**: Step-by-step setup guides
- 📖 **API Documentation**: Frontend hook usage examples
- 🔧 **Deployment Guides**: Multiple environment setups
- 🐛 **Troubleshooting**: Common issues and solutions

### Community & Support

- 💬 **Discord Community**: Developer discussions
- 📧 **Email Support**: Technical assistance
- 🐙 **GitHub Issues**: Bug reports and feature requests
- 📝 **Documentation Wiki**: Comprehensive guides
- 🎓 **Developer Workshops**: Regular training sessions

---

**Built with ❤️ by Anand N**  
**GitHub**: [@AnandN2003](https://github.com/AnandN2003)  
**Project**: [Neo-Flow](https://github.com/AnandN2003/Neo-Flow)



---

<div align="center">
  <strong>🚀 Ready to revolutionize crowdfunding? Start your campaign today! 🚀</strong>
</div>
