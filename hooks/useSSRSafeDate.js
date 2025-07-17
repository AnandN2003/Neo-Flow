import { useState, useEffect } from 'react';

export const useSSRSafeDate = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const formatTimeRemaining = (deadline) => {
    if (!isClient) {
      return 'Loading...';
    }

    try {
      const now = new Date();
      const deadlineDate = new Date(deadline);
      
      if (isNaN(deadlineDate.getTime())) {
        return 'Invalid date';
      }
      
      const diffTime = deadlineDate - now;
      
      if (diffTime <= 0) return 'Expired';
      
      const days = Math.floor(diffTime / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diffTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diffTime % (1000 * 60 * 60)) / (1000 * 60));
      
      if (days > 0) return `${days} days left`;
      if (hours > 0) return `${hours} hours left`;
      return `${minutes} minutes left`;
    } catch (error) {
      console.error('Error formatting time remaining:', error);
      return 'Error';
    }
  };

  const getCampaignStatus = (campaign) => {
    if (!isClient) {
      return 'Loading';
    }

    try {
      const { raised, target, deadline, isActive } = campaign || {};
      
      if (!isActive) return 'Inactive';
      
      const deadlineDate = new Date(deadline);
      if (isNaN(deadlineDate.getTime())) return 'Invalid';
      
      if (new Date() > deadlineDate) return 'Expired';
      if (parseFloat(raised || 0) >= parseFloat(target || 0)) return 'Successful';
      return 'Active';
    } catch (error) {
      console.error('Error getting campaign status:', error);
      return 'Unknown';
    }
  };

  return {
    isClient,
    formatTimeRemaining,
    getCampaignStatus
  };
};
