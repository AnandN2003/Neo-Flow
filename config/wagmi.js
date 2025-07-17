import { configureChains, createConfig } from 'wagmi';
import { hardhat, localhost, polygon, polygonMumbai } from 'wagmi/chains';
import { publicProvider } from 'wagmi/providers/public';
import { getDefaultWallets } from '@rainbow-me/rainbowkit';

// Determine which chains to use based on environment
const getChains = () => {
  if (process.env.NODE_ENV === 'production') {
    // Production: Use Polygon Mainnet (costs ~$2-5)
    return [polygon];
  } else if (process.env.NEXT_PUBLIC_NETWORK === 'testnet') {
    // FREE Testnet: Use Mumbai testnet (100% free!)
    return [polygonMumbai];
  } else {
    // Development: Use local networks
    return [
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