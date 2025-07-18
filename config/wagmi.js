import { configureChains, createConfig } from 'wagmi';
import { hardhat, localhost, polygon, polygonMumbai } from 'wagmi/chains';
import { publicProvider } from 'wagmi/providers/public';
import { getDefaultWallets } from '@rainbow-me/rainbowkit';

// Define localhost chain explicitly
const localhostChain = {
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
  testnet: true,
};

// ALWAYS include ALL networks for maximum compatibility
const supportedChains = [
  localhostChain,    // Localhost first for demo
  localhost,         // Wagmi's localhost
  hardhat,           // Hardhat network
  polygonMumbai,     // Mumbai testnet
  polygon,           // Polygon mainnet
];

// Configure chains & providers
const { chains, publicClient } = configureChains(
  supportedChains,
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