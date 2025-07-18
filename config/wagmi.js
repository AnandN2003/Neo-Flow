import { configureChains, createConfig } from 'wagmi';
import { hardhat, localhost, polygon, polygonMumbai } from 'wagmi/chains';
import { publicProvider } from 'wagmi/providers/public';
import { getDefaultWallets } from '@rainbow-me/rainbowkit';

// Determine which chains to use based on environment
const getChains = () => {
  // ALWAYS include local networks first for demo
  const localChains = [
    {
      id: 1337,
      name: 'Localhost 8545',
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
      blockExplorers: {
        default: { name: 'Local', url: 'http://localhost:8545' },
      },
    },
    localhost,
    hardhat,
  ];

  // ALWAYS return local chains + others for maximum compatibility
  return [...localChains, polygonMumbai, polygon];
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