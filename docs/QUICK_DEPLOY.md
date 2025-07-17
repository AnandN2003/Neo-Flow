# 🚀 QUICK DEPLOYMENT COMMANDS

## Prerequisites Setup

### 1. Get Required API Keys
```bash
# Get these ready:
# 1. WalletConnect Project ID: https://cloud.walletconnect.com/
# 2. Pinata API Keys: https://pinata.cloud/
# 3. PolygonScan API Key: https://polygonscan.com/apis
```

### 2. Prepare Your Wallet
```bash
# Ensure you have:
# - MetaMask wallet installed
# - MATIC tokens for gas fees (for Polygon deployment)
# - Your private key ready (NEVER share this!)
```

## Smart Contract Deployment

### Step 1: Configure Environment
```bash
# Navigate to web3 directory
cd web3

# Create .env file
echo 'PRIVATE_KEY=your_private_key_here
POLYGON_RPC_URL=https://polygon-rpc.com
POLYGONSCAN_API_KEY=your_polygonscan_api_key' > .env
```

### Step 2: Deploy Contract
```bash
# Install dependencies
npm install

# Compile contracts
npx hardhat compile

# Deploy to Polygon Mainnet (Production)
npx hardhat run scripts/deploy.js --network polygon

# OR Deploy to Mumbai Testnet (Testing)
npx hardhat run scripts/deploy.js --network mumbai

# Save the contract address from output!
```

### Step 3: Verify Contract
```bash
# Verify on PolygonScan (replace with your contract address)
npx hardhat verify --network polygon 0xYourContractAddress
```

## Frontend Deployment

### Step 1: Configure Environment
```bash
# Go back to root directory
cd ..

# Create production environment file
echo 'NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID=your_project_id
NEXT_PUBLIC_RPC_URL=https://polygon-rpc.com
NEXT_PUBLIC_CHAIN_ID=137
NEXT_PUBLIC_CHAIN_NAME=Polygon
NEXT_PUBLIC_CHAIN_SYMBOL=MATIC
NEXT_PUBLIC_BLOCK_EXPLORER=https://polygonscan.com
NEXT_PUBLIC_NETWORK=polygon
NEXT_PUBLIC_BLOCK_EXPLORER_NAME=PolygonScan
NEXT_PUBLIC_PLATFORM_NAME=NeoFlow
NEXT_PUBLIC_CONTRACT_ADDRESS=YOUR_DEPLOYED_CONTRACT_ADDRESS
NEXT_PUBLIC_PINATA_API_KEY=your_pinata_key
NEXT_PUBLIC_PINATA_SECRET_API_KEY=your_pinata_secret
NEXT_PUBLIC_ADMIN_ADDRESS=your_admin_wallet' > .env.production
```

### Step 2: Test Build Locally
```bash
# Install frontend dependencies
npm install

# Build for production
npm run build

# Test production build
npm start
```

### Step 3: Deploy to Vercel

#### Option A: GitHub + Vercel (Recommended)
```bash
# Initialize git and push to GitHub
git init
git add .
git commit -m "NeoFlow production ready"
git branch -M main
git remote add origin https://github.com/yourusername/neoflow.git
git push -u origin main

# Then:
# 1. Go to vercel.com
# 2. Import GitHub repository
# 3. Add environment variables from .env.production
# 4. Deploy!
```

#### Option B: Direct Vercel CLI
```bash
# Install Vercel CLI globally
npm install -g vercel

# Login to Vercel
vercel login

# Deploy to production
vercel --prod

# Follow prompts and add environment variables when asked
```

## Domain Setup (Optional)

### Custom Domain Configuration
```bash
# In Vercel Dashboard:
# 1. Go to Project Settings
# 2. Click "Domains"
# 3. Add your domain (e.g., neoflow.app)
# 4. Follow DNS setup instructions

# For DNS (add these records to your domain provider):
# Type: A, Name: @, Value: 76.76.19.61
# Type: CNAME, Name: www, Value: cname.vercel-dns.com
```

## Post-Deployment Verification

### Test Your Live DApp
```bash
# Visit your deployed URL and test:
# 1. Wallet connection
# 2. Campaign creation
# 3. Donation functionality
# 4. NeoPoints system
# 5. Leaderboard updates
# 6. Redemption store
```

## Quick All-in-One Deployment

```bash
# Complete deployment script
#!/bin/bash

echo "🚀 NeoFlow Complete Deployment"

# Contract deployment
cd web3
npm install
npx hardhat compile
npx hardhat run scripts/deploy.js --network polygon
# Save contract address!

# Frontend deployment
cd ..
npm install
npm run build
vercel --prod

echo "✅ Deployment complete!"
echo "🔗 Don't forget to:"
echo "1. Update contract address in Vercel environment variables"
echo "2. Test all functionality"
echo "3. Set up custom domain (optional)"
```

## Environment Variables Summary

### For Vercel Dashboard:
```
NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID=your_project_id
NEXT_PUBLIC_RPC_URL=https://polygon-rpc.com
NEXT_PUBLIC_CHAIN_ID=137
NEXT_PUBLIC_CHAIN_NAME=Polygon
NEXT_PUBLIC_CHAIN_SYMBOL=MATIC
NEXT_PUBLIC_BLOCK_EXPLORER=https://polygonscan.com
NEXT_PUBLIC_NETWORK=polygon
NEXT_PUBLIC_BLOCK_EXPLORER_NAME=PolygonScan
NEXT_PUBLIC_PLATFORM_NAME=NeoFlow
NEXT_PUBLIC_CONTRACT_ADDRESS=YOUR_DEPLOYED_CONTRACT_ADDRESS
NEXT_PUBLIC_PINATA_API_KEY=your_pinata_key
NEXT_PUBLIC_PINATA_SECRET_API_KEY=your_pinata_secret
NEXT_PUBLIC_ADMIN_ADDRESS=your_admin_wallet
```

## Troubleshooting

```bash
# Contract deployment fails?
# - Check MATIC balance
# - Verify private key format
# - Check network connectivity

# Frontend build fails?
# - Verify all environment variables
# - Check for syntax errors
# - Run npm run lint

# Vercel deployment issues?
# - Check build logs
# - Verify environment variables
# - Test local build first
```

## Success! 🎉

Your NeoFlow platform should now be live at:
- Vercel URL: `https://your-project.vercel.app`
- Custom domain (if configured): `https://your-domain.com`

**Your deployed NeoFlow features:**
✅ Smart contract on Polygon
✅ Responsive web application
✅ NeoPoints reward system
✅ Community leaderboards
✅ Redemption store
✅ Mobile-optimized design
✅ Production-ready performance
