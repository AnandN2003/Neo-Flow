# 🚀 Local Development Setup Guide

## 📋 Quick Setup for Testing

Your contract is successfully deployed! Here's how to test it locally:

### 🔧 Contract Information
- **Contract Address**: `0x5FbDB2315678afecb367f032d93F642f64180aa3`
- **Network**: Hardhat Local (Chain ID: 1337)
- **RPC URL**: `http://localhost:8545`

### 💰 Test Accounts (Hardhat Default Accounts)

Import these accounts into MetaMask for testing:

#### Account #0 (Contract Owner)
- **Address**: `0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266`
- **Private Key**: `0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80`
- **Balance**: 10,000 ETH

#### Account #1 (Test User)
- **Address**: `0x70997970C51812dc3A010C7d01b50e0d17dc79C8`
- **Private Key**: `0x59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d`
- **Balance**: 10,000 ETH

#### Account #2 (Another Test User)
- **Address**: `0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC`
- **Private Key**: `0x5de4111afa1a4b94908f83103eb1f1706367c2e68ca870fc3fb9a804cdab365a`
- **Balance**: 10,000 ETH

### 🦊 MetaMask Setup

1. **Add Local Network to MetaMask**:
   - Network Name: `Localhost 8545`
   - RPC URL: `http://localhost:8545`
   - Chain ID: `1337`
   - Currency Symbol: `ETH`

2. **Import Test Accounts**:
   - Click "Import Account" in MetaMask
   - Paste any of the private keys above
   - You'll see 10,000 ETH balance

### 🚀 Testing Steps

1. **Start Hardhat Node** (keep running):
   ```bash
   cd web3
   npx hardhat node
   ```

2. **Deploy Contract** (if not done):
   ```bash
   cd web3
   npm run deploy-local
   ```

3. **Start Frontend**:
   ```bash
   npm run dev
   ```

4. **Connect & Test**:
   - Go to `http://localhost:3000`
   - Connect MetaMask with imported account
   - Switch to Localhost 8545 network
   - Create campaigns and test donations!

### 🎯 What You Can Test

- ✅ Create campaigns
- ✅ Donate to campaigns
- ✅ View campaign details
- ✅ Check balances
- ✅ NeoPoints system
- ✅ Leaderboard features

### 🔄 Reset Instructions

If you need to reset:
1. Restart Hardhat node: `npx hardhat node`
2. Redeploy contract: `npm run deploy-local`
3. Reset MetaMask account (Settings > Advanced > Reset Account)

### 🎉 Ready to Test!

Your environment is now configured for local testing. Enjoy testing the donation features! 🚀
