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
- **Smart Contract Integration** - Secure, transparent blockchain transactions

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
git clone https://github.com/nithyan-s/Neo-Flow.git
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

**Nithyan S**
- GitHub: [@nithyan-s](https://github.com/nithyan-s)
- Project: [Neo-Flow](https://github.com/nithyan-s/Neo-Flow)

## 🙏 Acknowledgments

- Built with ❤️ using Next.js and Web3 technologies
- Inspired by the need for transparent, decentralized fundraising
- Special thanks to the Ethereum and Polygon communities

---

<div align="center">
  <strong>🚀 Ready to revolutionize crowdfunding? Start your campaign today! 🚀</strong>
</div>
