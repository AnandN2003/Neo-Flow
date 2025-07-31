// hardhat.config.js
require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: {
    version: "0.8.19",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
      viaIR: true,
    },
  },
  networks: {
    hardhat: {
      chainId: 1337,
    },
    localhost: {
      url: "http://127.0.0.1:8545",
      chainId: 1337,
    },
    // Commented out for local development
    // holesky: {
    //   url: process.env.NETWORK_RPC_URL || process.env.NETWORK_RPC_URL,
    //   accounts:
    //     process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
    //   chainId: 17000,
    // },
    // polygon: {
    //   url: process.env.POLYGON_RPC_URL || "https://polygon-rpc.com",
    //   accounts:
    //     process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
    //   chainId: 137,
    //   gasPrice: 30000000000, // 30 gwei
    // },
    // mumbai: {
    //   url: process.env.MUMBAI_RPC_URL || "https://rpc-mumbai.maticvigil.com",
    //   accounts:
    //     process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
    //   chainId: 80001,
    //   gasPrice: 30000000000, // 30 gwei
    // },
  },
  etherscan: {
    apiKey: {
      polygon: process.env.POLYGONSCAN_API_KEY,
      polygonMumbai: process.env.POLYGONSCAN_API_KEY,
    },
  },
  paths: {
    artifacts: "./artifacts",
    sources: "./contracts",
    cache: "./cache",
    tests: "./test",
  },

  sourcify: {
    enabled: true,
  },
};
