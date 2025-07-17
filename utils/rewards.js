// NeoPoints Rewards System Utility Functions

/**
 * Calculate NeoPoints earned from a donation
 * @param {number} donationAmount - Donation amount in ETH
 * @param {boolean} isFirstDonation - Whether this is the user's first donation
 * @returns {number} Points earned
 */
export const calculateNeoPoints = (donationAmount, isFirstDonation = false) => {
  const baseRate = 100; // 100 points per 0.01 ETH
  const amount = parseFloat(donationAmount);
  
  // Calculate base points (100 points per 0.01 ETH)
  let points = Math.floor((amount * 100) * baseRate);
  
  // First donation bonus
  if (isFirstDonation) {
    points += 500;
  }
  
  // Large donation multiplier (2x for 1+ ETH)
  if (amount >= 1.0) {
    points *= 2;
  }
  
  // Minimum points for any donation
  return Math.max(points, 50);
};

/**
 * Award NeoPoints to a user and store in localStorage
 * @param {string} userAddress - User's wallet address
 * @param {number} donationAmount - Donation amount in ETH
 * @param {string} campaignId - Campaign ID (optional)
 */
export const awardNeoPoints = (userAddress, donationAmount, campaignId = null) => {
  try {
    // Get existing user rewards
    const existingRewards = JSON.parse(
      localStorage.getItem(`neoflow_rewards_${userAddress}`) || 
      '{"points": 0, "totalEarned": 0, "transactions": []}'
    );
    
    // Check if this is first donation
    const isFirstDonation = existingRewards.transactions.length === 0;
    
    // Calculate points earned
    const pointsEarned = calculateNeoPoints(donationAmount, isFirstDonation);
    
    // Create transaction record
    const transaction = {
      timestamp: Date.now(),
      donationAmount: parseFloat(donationAmount),
      points: pointsEarned,
      campaignId,
      isFirstDonation
    };
    
    // Update user rewards
    const updatedRewards = {
      points: existingRewards.points + pointsEarned,
      totalEarned: existingRewards.totalEarned + pointsEarned,
      transactions: [transaction, ...existingRewards.transactions]
    };
    
    // Save to localStorage
    localStorage.setItem(`neoflow_rewards_${userAddress}`, JSON.stringify(updatedRewards));
    
    // Update donator leaderboard
    updateDonatorLeaderboard(userAddress, donationAmount);
    
    return pointsEarned;
  } catch (error) {
    console.error('Error awarding NeoPoints:', error);
    return 0;
  }
};

/**
 * Update the donator leaderboard
 * @param {string} userAddress - User's wallet address
 * @param {number} donationAmount - Donation amount in ETH
 */
export const updateDonatorLeaderboard = (userAddress, donationAmount) => {
  try {
    const donators = JSON.parse(localStorage.getItem('neoflow_donators') || '[]');
    const existingDonator = donators.find(d => d.address === userAddress);
    
    if (existingDonator) {
      existingDonator.totalDonated = (parseFloat(existingDonator.totalDonated) + parseFloat(donationAmount)).toString();
      existingDonator.donationCount = (existingDonator.donationCount || 0) + 1;
      existingDonator.lastDonation = Date.now();
    } else {
      donators.push({
        address: userAddress,
        totalDonated: donationAmount.toString(),
        donationCount: 1,
        lastDonation: Date.now()
      });
    }
    
    localStorage.setItem('neoflow_donators', JSON.stringify(donators));
  } catch (error) {
    console.error('Error updating donator leaderboard:', error);
  }
};

/**
 * Update the fundraiser leaderboard
 * @param {string} userAddress - User's wallet address
 * @param {number} raisedAmount - Amount raised in ETH
 */
export const updateFundraiserLeaderboard = (userAddress, raisedAmount) => {
  try {
    const raisers = JSON.parse(localStorage.getItem('neoflow_raisers') || '[]');
    const existingRaiser = raisers.find(r => r.address === userAddress);
    
    if (existingRaiser) {
      existingRaiser.totalRaised = (parseFloat(existingRaiser.totalRaised) + parseFloat(raisedAmount)).toString();
      existingRaiser.campaignCount = (existingRaiser.campaignCount || 0) + 1;
      existingRaiser.lastCampaign = Date.now();
    } else {
      raisers.push({
        address: userAddress,
        totalRaised: raisedAmount.toString(),
        campaignCount: 1,
        lastCampaign: Date.now()
      });
    }
    
    localStorage.setItem('neoflow_raisers', JSON.stringify(raisers));
  } catch (error) {
    console.error('Error updating fundraiser leaderboard:', error);
  }
};

/**
 * Get user's current NeoPoints balance
 * @param {string} userAddress - User's wallet address
 * @returns {number} Current points balance
 */
export const getUserNeoPoints = (userAddress) => {
  try {
    const rewards = JSON.parse(
      localStorage.getItem(`neoflow_rewards_${userAddress}`) || 
      '{"points": 0}'
    );
    return rewards.points || 0;
  } catch (error) {
    console.error('Error getting user NeoPoints:', error);
    return 0;
  }
};

/**
 * Deduct NeoPoints from user's balance (for redemptions)
 * @param {string} userAddress - User's wallet address
 * @param {number} pointsToDeduct - Points to deduct
 * @returns {boolean} Success status
 */
export const deductNeoPoints = (userAddress, pointsToDeduct) => {
  try {
    const rewards = JSON.parse(
      localStorage.getItem(`neoflow_rewards_${userAddress}`) || 
      '{"points": 0, "totalEarned": 0, "transactions": []}'
    );
    
    if (rewards.points >= pointsToDeduct) {
      rewards.points -= pointsToDeduct;
      
      // Add redemption transaction
      const redemptionTransaction = {
        timestamp: Date.now(),
        type: 'redemption',
        points: -pointsToDeduct,
        description: 'Item redeemed'
      };
      
      rewards.transactions = [redemptionTransaction, ...rewards.transactions];
      
      localStorage.setItem(`neoflow_rewards_${userAddress}`, JSON.stringify(rewards));
      return true;
    }
    
    return false;
  } catch (error) {
    console.error('Error deducting NeoPoints:', error);
    return false;
  }
};

/**
 * Get leaderboard data
 * @param {string} type - 'donators' or 'raisers'
 * @param {number} limit - Number of top entries to return
 * @returns {Array} Leaderboard entries
 */
export const getLeaderboardData = (type, limit = 10) => {
  try {
    const storageKey = type === 'donators' ? 'neoflow_donators' : 'neoflow_raisers';
    const data = JSON.parse(localStorage.getItem(storageKey) || '[]');
    
    const sortKey = type === 'donators' ? 'totalDonated' : 'totalRaised';
    
    return data
      .sort((a, b) => parseFloat(b[sortKey]) - parseFloat(a[sortKey]))
      .slice(0, limit);
  } catch (error) {
    console.error('Error getting leaderboard data:', error);
    return [];
  }
};

/**
 * Show NeoPoints notification (can be enhanced with toast libraries)
 * @param {number} pointsEarned - Points earned
 * @param {boolean} isFirstDonation - Whether this was first donation
 */
export const showNeoPointsNotification = (pointsEarned, isFirstDonation = false) => {
  let message = `🎉 You earned ${pointsEarned} NeoPoints!`;
  
  if (isFirstDonation) {
    message += ' (includes 500 first donation bonus!)';
  }
  
  // In a real app, you'd use a proper notification system like react-hot-toast
  console.log(message);
  
  // Dispatch custom event for components to listen to
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('neoPointsEarned', {
      detail: { points: pointsEarned, isFirstDonation }
    }));
  }
};

/**
 * Get user's current NeoPoints balance (alias for dashboard compatibility)
 * @param {string} userAddress - User's wallet address
 * @returns {number} Current points balance
 */
export const getNeoPoints = (userAddress) => {
  return getUserNeoPoints(userAddress);
};

/**
 * Get user's tier based on NeoPoints
 * @param {number} points - User's NeoPoints
 * @returns {Object} Tier information
 */
export const getTier = (points) => {
  if (points >= 10000) {
    return {
      name: 'Platinum',
      color: 'bg-gradient-to-r from-purple-500 to-pink-500',
      textColor: 'text-purple-600',
      icon: '💎',
      minPoints: 10000,
      benefits: ['Exclusive NFTs', 'Priority Support', 'Special Events', 'Custom Badges']
    };
  } else if (points >= 5000) {
    return {
      name: 'Gold',
      color: 'bg-gradient-to-r from-yellow-400 to-orange-500',
      textColor: 'text-yellow-600',
      icon: '🏆',
      minPoints: 5000,
      benefits: ['Premium Merchandise', 'Early Access', 'Gold Badge']
    };
  } else if (points >= 2000) {
    return {
      name: 'Silver',
      color: 'bg-gradient-to-r from-gray-400 to-gray-600',
      textColor: 'text-gray-600',
      icon: '🥈',
      minPoints: 2000,
      benefits: ['Merchandise Discounts', 'Silver Badge', 'Community Access']
    };
  } else {
    return {
      name: 'Bronze',
      color: 'bg-gradient-to-r from-orange-400 to-red-500',
      textColor: 'text-orange-600',
      icon: '🥉',
      minPoints: 0,
      benefits: ['Basic Rewards', 'Community Access']
    };
  }
};
