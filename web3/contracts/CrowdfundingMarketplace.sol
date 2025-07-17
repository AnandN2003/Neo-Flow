// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/Pausable.sol";

contract CrowdfundingMarketplace is ReentrancyGuard, Ownable, Pausable {
    
    struct Campaign {
        uint256 id;
        address creator;
        string title;
        string description;
        string category;
        string image;
        uint256 targetAmount;
        uint256 raisedAmount;
        uint256 deadline;
        bool isActive;
        string metadataHash;
        uint256 createdAt;
    }
    
    struct Contribution {
        uint256 campaignId;
        address contributor;
        uint256 amount;
        uint256 timestamp;
    }
    
    // State variables
    uint256 public campaignCounter;
    uint256 public platformFeePercentage = 250; // 2.5% (250 basis points)
    uint256 public totalFeesCollected;
    
    // Mappings
    mapping(uint256 => Campaign) public campaigns;
    mapping(address => uint256[]) public userCampaigns;
    mapping(address => Contribution[]) public userContributions;
    mapping(uint256 => Contribution[]) public campaignContributions;
    mapping(uint256 => address[]) public campaignContributors;
    mapping(uint256 => mapping(address => uint256)) public contributorAmounts;
    
    // Events
    event CampaignCreated(
        uint256 indexed campaignId,
        address indexed creator,
        uint256 targetAmount,
        uint256 deadline,
        string metadataHash
    );
    
    event CampaignFunded(
        uint256 indexed campaignId,
        address indexed contributor,
        uint256 amount,
        uint256 newTotalRaised
    );
    
    event FundsWithdrawn(
        uint256 indexed campaignId,
        address indexed creator,
        uint256 amount
    );
    
    event CampaignStatusUpdated(
        uint256 indexed campaignId,
        bool isActive
    );
    
    event PlatformFeeUpdated(uint256 newFeePercentage);
    
    event FeesWithdrawn(address indexed owner, uint256 amount);
    
    // Modifiers
    modifier campaignExists(uint256 _campaignId) {
        require(_campaignId > 0 && _campaignId <= campaignCounter, "Campaign does not exist");
        _;
    }
    
    modifier onlyCampaignCreator(uint256 _campaignId) {
        require(campaigns[_campaignId].creator == msg.sender, "Only campaign creator can perform this action");
        _;
    }
    
    modifier campaignActive(uint256 _campaignId) {
        require(campaigns[_campaignId].isActive, "Campaign is not active");
        require(campaigns[_campaignId].deadline > block.timestamp, "Campaign has expired");
        _;
    }
    
    constructor() {
        campaignCounter = 0;
    }
    
    // Create a new campaign
    function createCampaign(
        uint256 _targetAmount,
        uint256 _deadline,
        string memory _metadataHash
    ) external whenNotPaused returns (uint256) {
        require(_targetAmount > 0, "Target amount must be greater than 0");
        require(_deadline > block.timestamp, "Deadline must be in the future");
        require(bytes(_metadataHash).length > 0, "Metadata hash cannot be empty");
        
        campaignCounter++;
        
        Campaign storage newCampaign = campaigns[campaignCounter];
        newCampaign.id = campaignCounter;
        newCampaign.creator = msg.sender;
        newCampaign.targetAmount = _targetAmount;
        newCampaign.raisedAmount = 0;
        newCampaign.deadline = _deadline;
        newCampaign.isActive = true;
        newCampaign.metadataHash = _metadataHash;
        newCampaign.createdAt = block.timestamp;
        
        userCampaigns[msg.sender].push(campaignCounter);
        
        emit CampaignCreated(campaignCounter, msg.sender, _targetAmount, _deadline, _metadataHash);
        
        return campaignCounter;
    }
    
    // Fund a campaign
    function fundCampaign(uint256 _campaignId) 
        external 
        payable 
        campaignExists(_campaignId) 
        campaignActive(_campaignId) 
        nonReentrant 
        whenNotPaused 
    {
        require(msg.value > 0, "Contribution must be greater than 0");
        require(campaigns[_campaignId].creator != msg.sender, "Cannot fund your own campaign");
        
        Campaign storage campaign = campaigns[_campaignId];
        campaign.raisedAmount += msg.value;
        
        // Record contribution
        Contribution memory newContribution = Contribution({
            campaignId: _campaignId,
            contributor: msg.sender,
            amount: msg.value,
            timestamp: block.timestamp
        });
        
        userContributions[msg.sender].push(newContribution);
        campaignContributions[_campaignId].push(newContribution);
        
        // Track unique contributors
        if (contributorAmounts[_campaignId][msg.sender] == 0) {
            campaignContributors[_campaignId].push(msg.sender);
        }
        contributorAmounts[_campaignId][msg.sender] += msg.value;
        
        emit CampaignFunded(_campaignId, msg.sender, msg.value, campaign.raisedAmount);
    }
    
    // Withdraw funds (for campaign creators)
    function withdrawFunds(uint256 _campaignId) 
        external 
        campaignExists(_campaignId) 
        onlyCampaignCreator(_campaignId) 
        nonReentrant 
        whenNotPaused 
    {
        Campaign storage campaign = campaigns[_campaignId];
        require(campaign.raisedAmount > 0, "No funds to withdraw");
        
        uint256 amount = campaign.raisedAmount;
        uint256 platformFee = (amount * platformFeePercentage) / 10000;
        uint256 creatorAmount = amount - platformFee;
        
        campaign.raisedAmount = 0;
        totalFeesCollected += platformFee;
        
        (bool success, ) = payable(msg.sender).call{value: creatorAmount}("");
        require(success, "Transfer failed");
        
        emit FundsWithdrawn(_campaignId, msg.sender, creatorAmount);
    }
    
    // Emergency withdraw for contributors (if campaign is cancelled)
    function emergencyWithdraw(uint256 _campaignId) 
        external 
        campaignExists(_campaignId) 
        nonReentrant 
        whenNotPaused 
    {
        require(!campaigns[_campaignId].isActive, "Campaign is still active");
        require(contributorAmounts[_campaignId][msg.sender] > 0, "No contributions to withdraw");
        
        uint256 amount = contributorAmounts[_campaignId][msg.sender];
        contributorAmounts[_campaignId][msg.sender] = 0;
        
        (bool success, ) = payable(msg.sender).call{value: amount}("");
        require(success, "Transfer failed");
    }
    
    // Admin functions
    function toggleCampaignStatus(uint256 _campaignId) 
        external 
        onlyOwner 
        campaignExists(_campaignId) 
    {
        campaigns[_campaignId].isActive = !campaigns[_campaignId].isActive;
        emit CampaignStatusUpdated(_campaignId, campaigns[_campaignId].isActive);
    }
    
    function updatePlatformFee(uint256 _newFeePercentage) external onlyOwner {
        require(_newFeePercentage <= 1000, "Fee cannot exceed 10%"); // Max 10%
        platformFeePercentage = _newFeePercentage;
        emit PlatformFeeUpdated(_newFeePercentage);
    }
    
    function withdrawPlatformFees() external onlyOwner nonReentrant {
        require(totalFeesCollected > 0, "No fees to withdraw");
        
        uint256 amount = totalFeesCollected;
        totalFeesCollected = 0;
        
        (bool success, ) = payable(owner()).call{value: amount}("");
        require(success, "Transfer failed");
        
        emit FeesWithdrawn(owner(), amount);
    }
    
    function pause() external onlyOwner {
        _pause();
    }
    
    function unpause() external onlyOwner {
        _unpause();
    }
    
    // View functions
    function getAllCampaigns() external view returns (Campaign[] memory) {
        Campaign[] memory allCampaigns = new Campaign[](campaignCounter);
        for (uint256 i = 1; i <= campaignCounter; i++) {
            allCampaigns[i - 1] = campaigns[i];
        }
        return allCampaigns;
    }
    
    function getUserCampaigns(address _user) external view returns (Campaign[] memory) {
        uint256[] memory userCampaignIds = userCampaigns[_user];
        Campaign[] memory userCampaignsList = new Campaign[](userCampaignIds.length);
        
        for (uint256 i = 0; i < userCampaignIds.length; i++) {
            userCampaignsList[i] = campaigns[userCampaignIds[i]];
        }
        
        return userCampaignsList;
    }
    
    function getUserContributions(address _user) external view returns (Contribution[] memory) {
        return userContributions[_user];
    }
    
    function getCampaignDetails(uint256 _campaignId) 
        external 
        view 
        campaignExists(_campaignId) 
        returns (Campaign memory) 
    {
        return campaigns[_campaignId];
    }
    
    function getCampaignContributions(uint256 _campaignId) 
        external 
        view 
        campaignExists(_campaignId) 
        returns (Contribution[] memory) 
    {
        return campaignContributions[_campaignId];
    }
    
    function getCampaignContributors(uint256 _campaignId) 
        external 
        view 
        campaignExists(_campaignId) 
        returns (address[] memory) 
    {
        return campaignContributors[_campaignId];
    }
    
    function getContributorAmount(uint256 _campaignId, address _contributor) 
        external 
        view 
        campaignExists(_campaignId) 
        returns (uint256) 
    {
        return contributorAmounts[_campaignId][_contributor];
    }
    
    function getActiveCampaigns() external view returns (Campaign[] memory) {
        uint256 activeCount = 0;
        
        // Count active campaigns
        for (uint256 i = 1; i <= campaignCounter; i++) {
            if (campaigns[i].isActive && campaigns[i].deadline > block.timestamp) {
                activeCount++;
            }
        }
        
        Campaign[] memory activeCampaigns = new Campaign[](activeCount);
        uint256 index = 0;
        
        // Populate active campaigns
        for (uint256 i = 1; i <= campaignCounter; i++) {
            if (campaigns[i].isActive && campaigns[i].deadline > block.timestamp) {
                activeCampaigns[index] = campaigns[i];
                index++;
            }
        }
        
        return activeCampaigns;
    }
    
    function getPlatformStats() external view returns (
        uint256 totalCampaigns,
        uint256 totalActiveCampaigns,
        uint256 totalRaised,
        uint256 feesCollected
    ) {
        uint256 activeCount = 0;
        uint256 raised = 0;
        
        for (uint256 i = 1; i <= campaignCounter; i++) {
            if (campaigns[i].isActive && campaigns[i].deadline > block.timestamp) {
                activeCount++;
            }
            raised += campaigns[i].raisedAmount;
        }
        
        return (campaignCounter, activeCount, raised, totalFeesCollected);
    }
    
    // Emergency functions
    function emergencyPause() external onlyOwner {
        _pause();
    }
    
    receive() external payable {
        revert("Direct payments not accepted");
    }
    
    fallback() external payable {
        revert("Function does not exist");
    }
}