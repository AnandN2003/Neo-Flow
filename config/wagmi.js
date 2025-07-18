import { configureChains, createConfig } from 'wagmi';
import { hardhat, localhost, polygon, polygonMumbai } from 'wagmi/chains';
import { publicProvider } from 'wagmi/providers/public';
import { getDefaultWallets } from '@rainbow-me/rainbowkit';

// Determine which chains to use based on environment
const getChains = () => {
  // Always include local networks for demo purposes
  const localChains = [
    {
      id: 1337,
      name: 'Localhost',
      network: 'localhost',
      nativeCurrency: {
        decimals: 18,
        name: 'Ether',
        symbol: 'ETH',
      },
      rpcUrls: {
        public: { http: ['http://localhost:8545'] },
        default: { http: ['http://localhost:8545'] },
      },
    },
    localhost,
    hardhat,
  ];

  if (process.env.NODE_ENV === 'production' && process.env.NEXT_PUBLIC_CHAIN_ID !== '1337') {
    // Production: Use Polygon Mainnet + local for demo
    return [polygon, ...localChains];
  } else if (process.env.NEXT_PUBLIC_NETWORK === 'testnet') {
    // FREE Testnet: Use Mumbai testnet + local for demo
    return [polygonMumbai, ...localChains];
  } else {
    // Development: Use local networks + testnets
    return [...localChains, polygonMumbai, polygon];
  }
};

// Configure chains & providers
const { chains, publicClient } = configureChains(
  getChains(),
  [publicProvider()]
);

// Get default wallets
const { connectors } = getDefaultWallets({
  appName: process.env.NEXT_PUBLIC_PLATFORM_NAME || 'NeoFlow',
  projectId: process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID || 'default',
  chains,
});

// Create wagmi config
export const wagmiConfig = createConfig({
  autoConnect: process.env.NODE_ENV === 'production', // Enable autoConnect in production
  connectors,
  publicClient,
});

export { chains };