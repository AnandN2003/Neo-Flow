# 🚀 Vercel Environment Variables Setup

## Add these Environment Variables in your Vercel Dashboard

Go to: `https://vercel.com/dashboard` → Your Project → Settings → Environment Variables

Add these **exactly**:

### Key: `NEXT_PUBLIC_CONTRACT_ADDRESS`
**Value**: `0x5FbDB2315678afecb367f032d93F642f64180aa3`

### Key: `NEXT_PUBLIC_CHAIN_ID` 
**Value**: `1337`

### Key: `NEXT_PUBLIC_NETWORK_NAME`
**Value**: `localhost`

### Key: `NEXT_PUBLIC_RPC_URL`
**Value**: `http://localhost:8545`

### Key: `NODE_ENV`
**Value**: `development`

## After Adding Variables:
1. Click "Redeploy" in Vercel
2. Wait 2-3 minutes for deployment
3. Your site will now connect to your local Hardhat contract!

## MetaMask Setup:
- Network Name: `Localhost 8545`
- RPC URL: `http://localhost:8545` 
- Chain ID: `1337`
- Currency: `ETH`

## Test Account Private Keys:
```
Account #0: 0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80
Account #1: 0x59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d
Account #2: 0x5de4111afa1a4b94908f83103eb1f1706367c2e68ca870fc3fb9a804cdab365a
```

✅ Keep your Hardhat node running: `npx hardhat node`
