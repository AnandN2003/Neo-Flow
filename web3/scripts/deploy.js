const { ethers } = require("hardhat");

async function main() {
  console.log("Deploying CrowdfundingMarketplace contract...");

  // Get the contract factory
  const CrowdfundingMarketplace = await ethers.getContractFactory("CrowdfundingMarketplace");
  
  // Deploy the contract
  console.log("Deploying contract...");
  const crowdfundingMarketplace = await CrowdfundingMarketplace.deploy();
  
  // Wait for deployment to complete (ethers v5 syntax)
  await crowdfundingMarketplace.deployed();
  
  const contractAddress = crowdfundingMarketplace.address;
  console.log("✅ CrowdfundingMarketplace deployed successfully!");
  console.log("📍 Contract address:", contractAddress);
  
  // Log network information
  const network = await ethers.provider.getNetwork();
  console.log("🌐 Network:", network.name);
  console.log("⛽ Chain ID:", network.chainId.toString());
  
  // Verify contract deployment
  console.log("\n🔍 Verifying deployment...");
  const owner = await crowdfundingMarketplace.owner();
  const campaignCounter = await crowdfundingMarketplace.campaignCounter();
  console.log("👤 Contract owner:", owner);
  console.log("📊 Initial campaign counter:", campaignCounter.toString());
  
  console.log("\n🎉 Deployment completed successfully!");
  console.log("\n📝 Next steps:");
  console.log("1. Update .env.local with contract address:", contractAddress);
  console.log("2. Update constants/abi.js with the contract ABI");
  console.log("3. Start the frontend: npm run dev");
  
  // Auto-update ABI
  try {
    console.log("\n🔄 Auto-updating ABI...");
    const fs = require('fs');
    const path = require('path');
    
    // Read the compiled contract artifact
    const artifactPath = path.join(__dirname, '../artifacts/contracts/CrowdfundingMarketplace.sol/CrowdfundingMarketplace.json');
    const artifact = JSON.parse(fs.readFileSync(artifactPath, 'utf8'));
    
    // Update the ABI file
    const abiPath = path.join(__dirname, '../../constants/abi.js');
    const abiContent = `// Auto-generated ABI - Do not edit manually
export const CROWDFUNDING_ABI = ${JSON.stringify(artifact.abi, null, 2)};
`;
    
    fs.writeFileSync(abiPath, abiContent);
    console.log("✅ ABI updated successfully!");
    
  } catch (error) {
    console.log("⚠️ Could not auto-update ABI:", error.message);
    console.log("Please update constants/abi.js manually");
  }
  
  return {
    contractAddress,
    contract: crowdfundingMarketplace
  };
}

// Error handling
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("❌ Deployment failed:");
    console.error(error);
    process.exit(1);
  });
