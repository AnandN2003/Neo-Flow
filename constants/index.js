import { CROWDFUNDING_ABI } from "./abi";

// Contract Configuration
export const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS;
export const CROWDFUNDING_CONTRACT_ABI = CROWDFUNDING_ABI;

// Network Configuration
export const CHAIN_ID = parseInt(process.env.NEXT_PUBLIC_CHAIN_ID || "1337");
export const RPC_URL = process.env.NEXT_PUBLIC_RPC_URL || "http://localhost:8545";
export const ADMIN_ADDRESS = process.env.NEXT_PUBLIC_ADMIN_ADDRESS;

// Platform Configuration
export const PLATFORM_NAME = process.env.NEXT_PUBLIC_PLATFORM_NAME || "CrowdFund Pro";

// IPFS Configuration
export const PINATA_API_KEY = process.env.NEXT_PUBLIC_PINATA_API_KEY;
export const PINATA_SECRET_KEY = process.env.NEXT_PUBLIC_PINATA_SECRET_API_KEY;

// Campaign Categories
export const CAMPAIGN_CATEGORIES = [
  "Technology",
  "Arts & Crafts",
  "Music",
  "Film & Video",
  "Publishing",
  "Games",
  "Food & Beverage",
  "Fashion",
  "Health & Fitness",
  "Education",
  "Community",
  "Environment",
  "Others"
];

// Navigation Links
export const NAV_LINKS = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: "dashboard"
  },
  {
    name: "Create Campaign",
    href: "/create-campaign",
    icon: "plus"
  },
  {
    name: "My Campaigns",
    href: "/my-campaigns",
    icon: "user"
  },
  {
    name: "Contributions",
    href: "/contributions",
    icon: "heart"
  }
];
