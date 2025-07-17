const fs = require('fs');
const path = require('path');

async function updateABI() {
  try {
    console.log("📋 Updating ABI...");
    
    // Path to the compiled contract artifact
    const artifactPath = path.join(__dirname, '../artifacts/contracts/CrowdfundingMarketplace.sol/CrowdfundingMarketplace.json');
    const constantsPath = path.join(__dirname, '../constants/abi.js');
    
    // Check if artifact exists
    if (!fs.existsSync(artifactPath)) {
      console.log("⚠️  Contract artifact not found. Please compile the contract first:");
      console.log("   npx hardhat compile");
      return;
    }
    
    // Read the artifact
    const artifact = JSON.parse(fs.readFileSync(artifactPath, 'utf8'));
    const abi = artifact.abi;
    
    // Create the ABI file content
    const abiFileContent = `export const CROWDFUNDING_ABI = ${JSON.stringify(abi, null, 2)};`;
    
    // Write to constants/abi.js
    fs.writeFileSync(constantsPath, abiFileContent);
    
    console.log("✅ ABI updated successfully!");
    console.log("📍 Updated:", constantsPath);
    
  } catch (error) {
    console.error("❌ Failed to update ABI:");
    console.error(error);
  }
}

// Run if called directly
if (require.main === module) {
  updateABI();
}

module.exports = { updateABI };
