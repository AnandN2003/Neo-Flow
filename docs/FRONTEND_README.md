# Decentralized Crowdfunding Marketplace DApp

A comprehensive decentralized crowdfunding platform built with Next.js, React, and blockchain technology.

## 🚀 Features

- **Campaign Creation**: Create and manage crowdfunding campaigns
- **Secure Funding**: Fund campaigns using ETH with smart contract security
- **IPFS Integration**: Decentralized storage for campaign metadata and images
- **Admin Panel**: Administrative oversight and platform management
- **Responsive Design**: Modern, mobile-friendly interface
- **Wallet Integration**: Connect with MetaMask and other Web3 wallets

## 📋 Prerequisites

Before running this application, make sure you have:

- Node.js 16+ installed
- A Web3 wallet (MetaMask recommended)
- Access to a local blockchain (Hardhat) or testnet

## 🛠️ Installation & Setup

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Install Additional Required Packages**
   ```bash
   npm install @headlessui/react
   ```

3. **Environment Configuration**
   The `.env.local` file is already configured with:
   - Local Hardhat network settings
   - Contract address (update if redeployed)
   - Pinata IPFS credentials
   - Admin wallet address

4. **Smart Contract Deployment**
   Navigate to the `web3` directory and deploy the contract:
   ```bash
   cd web3
   npm install
   npx hardhat node
   # In another terminal:
   npx hardhat run scripts/deploy.js --network localhost
   ```

5. **Start the Development Server**
   ```bash
   npm run dev
   ```

6. **Access the Application**
   Open [http://localhost:3000](http://localhost:3000) in your browser

## 🎯 Usage

### For Users:
1. **Connect Wallet**: Click "Connect Wallet" to link your Web3 wallet
2. **Explore Campaigns**: Browse available crowdfunding campaigns
3. **Fund Projects**: Support campaigns by contributing ETH
4. **Create Campaigns**: Launch your own crowdfunding projects
5. **Track Progress**: Monitor your campaigns and contributions

### For Campaign Creators:
1. **Create Campaign**: Fill out the campaign form with details, images, and funding goals
2. **Set Deadline**: Choose a realistic timeframe for your campaign
3. **Upload Media**: Add compelling images to attract supporters
4. **Manage Campaign**: Track funding progress and engage with supporters
5. **Withdraw Funds**: Collect raised funds when campaign goals are met

### For Administrators:
- Access the admin panel at `/admin` (requires admin wallet address)
- Monitor platform statistics and campaign performance
- Oversee platform operations and user activity

## 🔧 Configuration

### Environment Variables (.env.local)
```
NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID=your_project_id
NEXT_PUBLIC_RPC_URL=http://localhost:8545
NEXT_PUBLIC_CHAIN_ID=1337
NEXT_PUBLIC_CONTRACT_ADDRESS=deployed_contract_address
NEXT_PUBLIC_ADMIN_ADDRESS=admin_wallet_address
NEXT_PUBLIC_PINATA_API_KEY=your_pinata_key
NEXT_PUBLIC_PINATA_SECRET_API_KEY=your_pinata_secret
```

### Smart Contract Functions
The platform uses these main contract functions:
- `createCampaign()`: Create new crowdfunding campaigns
- `fundCampaign()`: Contribute ETH to campaigns
- `withdrawFunds()`: Withdraw raised funds (creator only)
- `getAllCampaigns()`: Retrieve all platform campaigns
- `getUserCampaigns()`: Get user's created campaigns
- `getUserContributions()`: Get user's funding history

## 🏗️ Project Structure

```
├── components/           # React components
│   ├── Campaign/        # Campaign-related components
│   └── Layout/          # Layout and navigation components
├── pages/               # Next.js pages
├── hooks/               # Custom React hooks
├── utils/               # Utility functions
├── constants/           # App constants and configuration
├── styles/              # CSS styles
└── web3/                # Smart contracts and deployment scripts
```

## 🌟 Key Features Explained

### Campaign Management
- Create campaigns with detailed information
- Upload images to IPFS for decentralized storage
- Set funding goals and deadlines
- Track real-time funding progress

### Secure Funding
- Smart contract-based fund handling
- Transparent transaction history
- Automatic fund release mechanisms
- Protection against common vulnerabilities

### User Dashboard
- Personal campaign management
- Contribution tracking
- Performance analytics
- Quick action shortcuts

### IPFS Integration
- Decentralized image storage
- Metadata preservation
- Content addressing
- Resilient data availability

## 🔐 Security Features

- Smart contract-based fund management
- Reentrancy attack protection
- Input validation and sanitization
- Secure wallet connection handling
- IPFS for decentralized storage

## 🚨 Important Notes

1. **Local Development**: The app is configured for local Hardhat network
2. **Contract Deployment**: Ensure the smart contract is deployed before using the frontend
3. **Wallet Connection**: Users need a Web3 wallet to interact with the platform
4. **IPFS Storage**: Campaign images are stored on IPFS via Pinata
5. **Admin Access**: Admin features require the specified admin wallet address

## 📱 Responsive Design

The application is fully responsive and works on:
- Desktop computers
- Tablets
- Mobile devices
- All modern web browsers

## 🤝 Contributing

This is a college project, but contributions and suggestions are welcome for educational purposes.

## 📄 License

This project is for educational purposes. See the LICENSE file for details.

## 🆘 Troubleshooting

### Common Issues:
1. **Wallet Connection Issues**: Ensure MetaMask is installed and connected to the correct network
2. **Contract Errors**: Verify the contract is deployed and the address is correct in `.env.local`
3. **IPFS Upload Failures**: Check Pinata API credentials
4. **Transaction Failures**: Ensure sufficient ETH balance for gas fees

### Support:
For issues or questions, please check the console for error messages and ensure all prerequisites are met.

---

**Built with ❤️ for educational purposes**
