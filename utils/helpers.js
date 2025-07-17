// Format Ethereum address (show first 6 and last 4 characters)
export const formatAddress = (address) => {
  if (!address) return '';
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
};

// Calculate days remaining from deadline
export const calculateDaysLeft = (deadline) => {
  try {
    const now = new Date();
    const deadlineDate = new Date(deadline);
    
    // Check if deadline is valid
    if (isNaN(deadlineDate.getTime())) {
      return 0;
    }
    
    const diffTime = deadlineDate - now;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 0;
  } catch (error) {
    console.error('Error calculating days left:', error);
    return 0;
  }
};

// Calculate percentage of goal reached
export const calculatePercentage = (raised, target) => {
  if (!target || target === 0) return 0;
  return Math.min((raised / target) * 100, 100);
};

// Format currency with proper decimals
export const formatCurrency = (amount, decimals = 4) => {
  if (!amount) return '0';
  const num = parseFloat(amount);
  return num.toFixed(decimals);
};

// Check if campaign is expired
export const isCampaignExpired = (deadline) => {
  try {
    const deadlineDate = new Date(deadline);
    if (isNaN(deadlineDate.getTime())) {
      return true; // Consider invalid dates as expired
    }
    return new Date() > deadlineDate;
  } catch (error) {
    console.error('Error checking if campaign expired:', error);
    return true;
  }
};

// Check if campaign goal is reached
export const isGoalReached = (raised, target) => {
  return parseFloat(raised) >= parseFloat(target);
};

// Format time remaining
export const formatTimeRemaining = (deadline) => {
  try {
    if (typeof window === 'undefined') {
      // On server, return a consistent value
      return 'Loading...';
    }
    
    const now = new Date();
    const deadlineDate = new Date(deadline);
    
    // Check if deadline is valid
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

// Validate Ethereum address
export const isValidAddress = (address) => {
  return /^0x[a-fA-F0-9]{40}$/.test(address);
};

// Format large numbers
export const formatLargeNumber = (num) => {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M';
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K';
  }
  return num.toString();
};

// Get campaign status
export const getCampaignStatus = (campaign) => {
  try {
    if (typeof window === 'undefined') {
      // On server, return a consistent value
      return 'Loading';
    }
    
    const { raised, target, deadline, isActive } = campaign || {};
    
    if (!isActive) return 'Inactive';
    if (isCampaignExpired(deadline)) return 'Expired';
    if (isGoalReached(raised, target)) return 'Successful';
    return 'Active';
  } catch (error) {
    console.error('Error getting campaign status:', error);
    return 'Unknown';
  }
};

// Get status color
export const getStatusColor = (status) => {
  switch (status) {
    case 'Active':
      return 'text-green-600 bg-green-100';
    case 'Successful':
      return 'text-blue-600 bg-blue-100';
    case 'Expired':
      return 'text-red-600 bg-red-100';
    case 'Inactive':
      return 'text-gray-600 bg-gray-100';
    case 'Loading':
      return 'text-gray-600 bg-gray-100';
    case 'Unknown':
      return 'text-gray-600 bg-gray-100';
    default:
      return 'text-gray-600 bg-gray-100';
  }
};

// File validation
export const validateFile = (file, maxSize = 5 * 1024 * 1024) => { // 5MB default
  const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];
  
  if (!validTypes.includes(file.type)) {
    return { valid: false, error: 'Please upload a valid image file (JPEG, PNG, GIF)' };
  }
  
  if (file.size > maxSize) {
    return { valid: false, error: 'File size must be less than 5MB' };
  }
  
  return { valid: true };
};

// Copy to clipboard
export const copyToClipboard = async (text) => {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (err) {
    console.error('Failed to copy: ', err);
    return false;
  }
};

// Generate random ID
export const generateId = () => {
  return Math.random().toString(36).substr(2, 9);
};