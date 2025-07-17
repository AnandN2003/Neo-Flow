import { useContractRead, useContractWrite, usePrepareContractWrite, useAccount } from 'wagmi';
import { parseEther, formatEther } from 'ethers/lib/utils';
import { CONTRACT_ADDRESS, CROWDFUNDING_CONTRACT_ABI } from '../constants';
import { fetchFromIPFS, getIPFSUrl } from '../utils/ipfs';
import toast from 'react-hot-toast';
import { useState, useEffect, useCallback, useMemo } from 'react';

export const useContract = () => {
  const { address } = useAccount();
  const [isClient, setIsClient] = useState(false);
  const [enrichedCampaigns, setEnrichedCampaigns] = useState([]);
  const [contractStatus, setContractStatus] = useState({
    isDeployed: false,
    isConnected: false,
    error: null
  });

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Check if contract address is set
  const isContractAvailable = Boolean(CONTRACT_ADDRESS && CONTRACT_ADDRESS !== 'undefined');

  // Check contract status
  useEffect(() => {
    const checkContractStatus = async () => {
      if (!isContractAvailable) {
        setContractStatus({
          isDeployed: false,
          isConnected: false,
          error: 'Contract address not set. Please deploy the contract first.'
        });
        return;
      }

      try {
        // Try to call a simple contract function to verify it's working
        setContractStatus({
          isDeployed: true,
          isConnected: true,
          error: null
        });
      } catch (error) {
        setContractStatus({
          isDeployed: false,
          isConnected: false,
          error: error.message
        });
      }
    };

    if (isClient) {
      checkContractStatus();
    }
  }, [isContractAvailable, isClient]);

  // Actual wagmi hooks
  const { writeAsync: createCampaign, isLoading: isCreatingCampaign } = useContractWrite({
    address: CONTRACT_ADDRESS,
    abi: CROWDFUNDING_CONTRACT_ABI,
    functionName: 'createCampaign',
  });

  const { writeAsync: fundCampaign, isLoading: isFundingCampaign } = useContractWrite({
    address: CONTRACT_ADDRESS,
    abi: CROWDFUNDING_CONTRACT_ABI,
    functionName: 'fundCampaign',
  });

  const { writeAsync: withdrawFunds, isLoading: isWithdrawing } = useContractWrite({
    address: CONTRACT_ADDRESS,
    abi: CROWDFUNDING_CONTRACT_ABI,
    functionName: 'withdrawFunds',
  });

  // Enhanced write functions with proper error handling
  const createCampaignWrapper = async (args) => {
    try {
      console.log('Creating campaign with args:', args);
      const result = await createCampaign(args);
      toast.success('Campaign created successfully!');
      
      // Refetch campaigns after successful creation with multiple attempts
      setTimeout(() => {
        console.log('First refetch after campaign creation');
        refetchCampaigns();
      }, 1000); // Wait 1 second for blockchain to update
      
      setTimeout(() => {
        console.log('Second refetch after campaign creation');
        refetchCampaigns();
      }, 3000); // Wait 3 seconds for IPFS propagation
      
      return result;
    } catch (error) {
      console.error('Campaign creation error:', error);
      const errorMessage = parseContractError(error);
      toast.error('Failed to create campaign: ' + errorMessage);
      throw error;
    }
  };

  const fundCampaignWrapper = async (args) => {
    try {
      console.log('Funding campaign with args:', args);
      const result = await fundCampaign(args);
      
      // Wait for transaction to be mined
      if (result?.wait) {
        console.log('Waiting for transaction to be mined...');
        await result.wait();
        console.log('Transaction mined successfully');
      }
      
      toast.success('Campaign funded successfully!');
      
      // Force immediate refresh of all data
      console.log('Force refetching all campaign data...');
      await Promise.all([
        refetchCampaigns?.(),
        refetchUserCampaigns?.(),
        refetchContributions?.()
      ]);
      
      // Additional refetches with shorter intervals
      setTimeout(async () => {
        console.log('First delayed refetch after funding');
        await Promise.all([
          refetchCampaigns?.(),
          refetchUserCampaigns?.(),
          refetchContributions?.()
        ]);
      }, 500);
      
      setTimeout(async () => {
        console.log('Second delayed refetch after funding');
        await Promise.all([
          refetchCampaigns?.(),
          refetchUserCampaigns?.(),
          refetchContributions?.()
        ]);
      }, 2000);
      
      return result;
    } catch (error) {
      console.error('Fund campaign error:', error);
      const errorMessage = parseContractError(error);
      toast.error('Failed to fund campaign: ' + errorMessage);
      throw error;
    }
  };

  const withdrawFundsWrapper = async (args) => {
    try {
      console.log('Withdrawing funds with args:', args);
      const result = await withdrawFunds(args);
      
      // Wait for transaction to be mined
      if (result?.wait) {
        console.log('Waiting for withdrawal transaction to be mined...');
        await result.wait();
        console.log('Withdrawal transaction mined successfully');
      }
      
      toast.success('Funds withdrawn successfully!');
      
      // Force immediate refresh of all data
      console.log('Force refetching all data after withdrawal...');
      await Promise.all([
        refetchCampaigns?.(),
        refetchUserCampaigns?.(),
        refetchContributions?.()
      ]);
      
      // Additional refetches
      setTimeout(async () => {
        console.log('Delayed refetch after withdrawal');
        await Promise.all([
          refetchCampaigns?.(),
          refetchUserCampaigns?.(),
          refetchContributions?.()
        ]);
      }, 1000);
      
      return result;
    } catch (error) {
      console.error('Withdraw funds error:', error);
      const errorMessage = parseContractError(error);
      toast.error('Failed to withdraw funds: ' + errorMessage);
      throw error;
    }
  };

  // Get All Campaigns - RE-ENABLED since contract is working
  const { 
    data: rawAllCampaigns, 
    isLoading: isLoadingCampaigns, 
    refetch: refetchCampaigns, 
    error: campaignsError 
  } = useContractRead({
    address: CONTRACT_ADDRESS,
    abi: CROWDFUNDING_CONTRACT_ABI,
    functionName: 'getAllCampaigns',
    enabled: isContractAvailable,
    retry: false,
    refetchInterval: 1000, // Refresh every 1 second for immediate updates
    cacheTime: 0, // Disable caching completely
    staleTime: 0, // Always consider data stale
    refetchOnMount: true,
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
    onError: (error) => {
      // Only log real errors, not "no data" responses
      if (!error.message.includes('returned no data')) {
        console.error('Error fetching campaigns:', error.message);
      }
    },
  });

  // Handle the case where no campaigns exist or error occurred
  const allCampaigns = useMemo(() => {
    console.log('Processing raw campaigns data:', {
      rawData: rawAllCampaigns,
      hasError: !!campaignsError,
      isArray: Array.isArray(rawAllCampaigns)
    });
    
    // If there's an error (including "0x" responses), return empty array
    if (campaignsError) {
      return [];
    }
    // If data exists and is an array, return it
    if (rawAllCampaigns && Array.isArray(rawAllCampaigns)) {
      console.log('Campaigns from contract:', rawAllCampaigns.map(c => ({
        id: c.id?.toString(),
        title: c.title,
        metadataHash: c.metadataHash
      })));
      return rawAllCampaigns;
    }
    // Default to empty array
    return [];
  }, [rawAllCampaigns, campaignsError]);

  // Refetch campaigns when account changes to ensure all campaigns are visible
  useEffect(() => {
    if (isClient && refetchCampaigns) {
      console.log('Account changed, refetching all campaigns to ensure visibility');
      refetchCampaigns();
    }
  }, [address, isClient, refetchCampaigns]);

  // Get User Campaigns - RE-ENABLED since contract is working
  const { 
    data: userCampaigns, 
    isLoading: isLoadingUserCampaigns, 
    refetch: refetchUserCampaigns, 
    error: userCampaignsError 
  } = useContractRead({
    address: CONTRACT_ADDRESS,
    abi: CROWDFUNDING_CONTRACT_ABI,
    functionName: 'getUserCampaigns',
    args: address ? [address] : undefined,
    enabled: !!address && isContractAvailable,
    retry: false,
    refetchInterval: 1000, // Refresh every 1 second for immediate updates
    cacheTime: 0,
    staleTime: 0,
    refetchOnMount: true,
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
    onError: (error) => {
      // Only log real errors, not "no data" responses
      if (!error.message.includes('returned no data')) {
        console.error('Error fetching user campaigns:', error.message);
      }
    },
  });

  // Get Campaign Details
  const getCampaignDetails = (campaignId) => {
    return useContractRead({
      address: CONTRACT_ADDRESS,
      abi: CROWDFUNDING_CONTRACT_ABI,
      functionName: 'getCampaignDetails',
      args: campaignId ? [campaignId] : undefined,
      enabled: !!campaignId,
    });
  };

  // Get User Contributions - RE-ENABLED since contract is working
  const { 
    data: userContributions, 
    isLoading: isLoadingContributions, 
    refetch: refetchContributions 
  } = useContractRead({
    address: CONTRACT_ADDRESS,
    abi: CROWDFUNDING_CONTRACT_ABI,
    functionName: 'getUserContributions',
    args: address ? [address] : undefined,
    enabled: !!address && isContractAvailable,
    retry: false,
    refetchInterval: 1000, // Refresh every 1 second for immediate updates
    cacheTime: 0,
    staleTime: 0,
    refetchOnMount: true,
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
    onError: (error) => {
      // Only log real errors, not "no data" responses
      if (!error.message.includes('returned no data')) {
        console.error('Error fetching user contributions:', error.message);
      }
    },
  });

  // Helper functions (define before using in useMemo)
  const parseContractError = (error) => {
    if (error?.message?.includes('user rejected')) {
      return 'Transaction was rejected by user';
    }
    if (error?.message?.includes('insufficient funds')) {
      return 'Insufficient funds for transaction';
    }
    return error?.message || 'An unknown error occurred';
  };

  const formatCampaignData = useCallback((campaigns) => {
    if (!campaigns || !Array.isArray(campaigns)) {
      return [];
    }
    
    try {
      return campaigns.map((campaign, index) => {
        if (!campaign) {
          return null;
        }
        
        // Handle deadline formatting consistently - use ISO string for consistency
        let formattedDeadline;
        try {
          if (campaign.deadline) {
            const timestamp = Number(campaign.deadline);
            const date = new Date(timestamp * 1000);
            formattedDeadline = date.toISOString();
          } else {
            formattedDeadline = new Date().toISOString();
          }
        } catch (error) {
          formattedDeadline = new Date().toISOString();
        }
        
        // Parse amounts for comparison
        const targetAmount = campaign.targetAmount ? Number(formatEther(campaign.targetAmount)) : 0;
        const raisedAmount = campaign.raisedAmount ? Number(formatEther(campaign.raisedAmount)) : 0;
        
        // Check if campaign is fully funded
        const isFullyFunded = raisedAmount >= targetAmount && targetAmount > 0;
        
        // Check if deadline has passed
        const isDeadlinePassed = new Date() > new Date(formattedDeadline);
        
        // Campaign is active if it's explicitly active AND not fully funded AND deadline hasn't passed
        const isActive = Boolean(campaign.isActive) && !isFullyFunded && !isDeadlinePassed;
        
        // Campaign is successful if target is met
        const isSuccessful = isFullyFunded;
        
        // Campaign status for UI
        let status = 'Active';
        if (isFullyFunded) {
          status = 'Successful';
        } else if (isDeadlinePassed) {
          status = 'Expired';
        }
        
        // Debug logging for campaign status
        if (process.env.NODE_ENV === 'development') {
          console.log(`Campaign ${campaign.id} Status:`, {
            targetAmount,
            raisedAmount,
            isFullyFunded,
            isDeadlinePassed,
            isActive,
            status,
            contractIsActive: Boolean(campaign.isActive)
          });
        }
        
        return {
          id: campaign.id?.toString() || (index + 1).toString(),
          creator: campaign.creator || '',
          title: campaign.title || 'Untitled Campaign',
          description: campaign.description || '',
          target: targetAmount.toString(),
          raised: raisedAmount.toString(),
          deadline: formattedDeadline,
          image: campaign.image || '',
          category: campaign.category || 'Other',
          isActive: isActive,
          isFullyFunded: isFullyFunded,
          isDeadlinePassed: isDeadlinePassed,
          isSuccessful: isSuccessful,
          status: status,
          metadataHash: campaign.metadataHash || '',
        };
      }).filter(Boolean);
    } catch (error) {
      console.error('Error formatting campaign data:', error);
      return [];
    }
  }, []);

  // Function to enrich campaigns with IPFS metadata
  const enrichCampaignsWithMetadata = useCallback(async (campaigns) => {
    if (!campaigns || !Array.isArray(campaigns) || campaigns.length === 0) {
      return [];
    }

    console.log('Starting to enrich campaigns:', campaigns.length);

    const enrichedData = await Promise.all(
      campaigns.map(async (campaign, index) => {
        // Use already formatted campaign data directly
        const targetAmount = campaign.targetAmount ? Number(formatEther(campaign.targetAmount)) : 0;
        const raisedAmount = campaign.raisedAmount ? Number(formatEther(campaign.raisedAmount)) : 0;
        const deadlineDate = campaign.deadline ? new Date(Number(campaign.deadline) * 1000) : new Date();
        const isFullyFunded = raisedAmount >= targetAmount && targetAmount > 0;
        const isDeadlinePassed = new Date() > deadlineDate;
        const isActive = Boolean(campaign.isActive) && !isFullyFunded && !isDeadlinePassed;
        const isSuccessful = isFullyFunded;
        
        let status = 'Active';
        if (isFullyFunded) {
          status = 'Successful';
        } else if (isDeadlinePassed) {
          status = 'Expired';
        }
        
        const formattedCampaign = {
          id: campaign.id?.toString() || (index + 1).toString(),
          creator: campaign.creator || '',
          title: campaign.title || 'Untitled Campaign',
          description: campaign.description || '',
          target: targetAmount.toString(),
          raised: raisedAmount.toString(),
          deadline: deadlineDate.toISOString(),
          image: campaign.image || '',
          category: campaign.category || 'Other',
          isActive: isActive,
          isFullyFunded: isFullyFunded,
          isDeadlinePassed: isDeadlinePassed,
          isSuccessful: isSuccessful,
          status: status,
          metadataHash: campaign.metadataHash || '',
        };
        
        if (!campaign.metadataHash) {
          console.log(`Campaign ${campaign.id} has no metadata hash`);
          return formattedCampaign;
        }

        try {
          console.log(`Fetching metadata for campaign ${campaign.id} with hash:`, campaign.metadataHash);
          
          // Fetch metadata from IPFS
          const metadataResult = await fetchFromIPFS(campaign.metadataHash);
          
          if (metadataResult.success && metadataResult.data) {
            const metadata = metadataResult.data;
            
            // Convert IPFS hash to full URL if needed
            let imageUrl = metadata.image || formattedCampaign.image;
            if (imageUrl && !imageUrl.startsWith('http')) {
              // If it's just a hash, convert to full IPFS URL
              imageUrl = getIPFSUrl(imageUrl);
            }
            
            console.log('Successfully enriched campaign with metadata:', {
              campaignId: campaign.id,
              originalImage: metadata.image,
              finalImageUrl: imageUrl,
              title: metadata.title
            });
            
            // Merge IPFS metadata with campaign data
            return {
              ...formattedCampaign,
              title: metadata.title || formattedCampaign.title,
              description: metadata.description || formattedCampaign.description,
              image: imageUrl,
              category: metadata.category || formattedCampaign.category,
            };
          } else {
            console.error(`Failed to fetch metadata for campaign ${campaign.id}:`, metadataResult.error);
          }
        } catch (error) {
          console.error('Error fetching metadata for campaign:', campaign.id, error);
        }

        return formattedCampaign;
      })
    );

    console.log('Finished enriching campaigns:', enrichedData.length);
    return enrichedData.filter(Boolean);
  }, []);

  // Memoize the formatted campaign data to prevent unnecessary recalculations
  const formattedAllCampaigns = useMemo(() => {
    return formatCampaignData(allCampaigns);
  }, [allCampaigns, formatCampaignData]);
  
  const formattedUserCampaigns = useMemo(() => {
    // Handle user campaigns errors the same way
    if (userCampaignsError || !userCampaigns) {
      return [];
    }
    return formatCampaignData(userCampaigns);
  }, [userCampaigns, formatCampaignData, userCampaignsError]);

  // Enrich campaigns with IPFS metadata
  useEffect(() => {
    const enrichCampaigns = async () => {
      if (formattedAllCampaigns.length > 0) {
        console.log('Enriching campaigns triggered, formatted campaigns:', formattedAllCampaigns.length);
        const enriched = await enrichCampaignsWithMetadata(allCampaigns);
        console.log('Enrichment completed, setting enriched campaigns:', enriched.length);
        setEnrichedCampaigns(enriched);
      } else {
        console.log('No formatted campaigns to enrich');
        setEnrichedCampaigns([]);
      }
    };

    enrichCampaigns();
  }, [formattedAllCampaigns, allCampaigns, enrichCampaignsWithMetadata]);

  // Manual refresh function for debugging
  const refreshCampaignMetadata = useCallback(async () => {
    console.log('Manual metadata refresh triggered');
    if (allCampaigns.length > 0) {
      const enriched = await enrichCampaignsWithMetadata(allCampaigns);
      setEnrichedCampaigns(enriched);
    }
  }, [allCampaigns, enrichCampaignsWithMetadata]);

  // Helper functions to categorize campaigns
  const getActiveCampaigns = useCallback(() => {
    const campaigns = enrichedCampaigns.length > 0 ? enrichedCampaigns : formattedAllCampaigns;
    return campaigns.filter(campaign => campaign.isActive);
  }, [enrichedCampaigns, formattedAllCampaigns]);

  const getSuccessfulCampaigns = useCallback(() => {
    const campaigns = enrichedCampaigns.length > 0 ? enrichedCampaigns : formattedAllCampaigns;
    return campaigns.filter(campaign => campaign.isFullyFunded);
  }, [enrichedCampaigns, formattedAllCampaigns]);

  const getExpiredCampaigns = useCallback(() => {
    const campaigns = enrichedCampaigns.length > 0 ? enrichedCampaigns : formattedAllCampaigns;
    return campaigns.filter(campaign => campaign.isDeadlinePassed && !campaign.isFullyFunded);
  }, [enrichedCampaigns, formattedAllCampaigns]);

  // Debug logging only in development (after all hooks are defined)
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      console.log('Contract Status:', {
        CONTRACT_ADDRESS,
        isContractAvailable,
        connectedAccount: address,
        campaignsCount: formattedAllCampaigns?.length || 0,
        enrichedCampaignsCount: enrichedCampaigns?.length || 0,
        rawCampaignsCount: rawAllCampaigns?.length || 0,
        isLoadingCampaigns,
        hasError: !!campaignsError
      });
    }
  }, [CONTRACT_ADDRESS, isContractAvailable, address, formattedAllCampaigns?.length, enrichedCampaigns?.length, rawAllCampaigns?.length, isLoadingCampaigns, campaignsError]);

  // Helper function to get a single campaign by ID - no need for useCallback here
  const getCampaignById = async (campaignId) => {
    if (!campaignId || !isContractAvailable) {
      console.log('getCampaignById: Missing ID or contract not available');
      return null;
    }

    try {
      // Use the memoized formatted campaigns
      if (formattedAllCampaigns && Array.isArray(formattedAllCampaigns)) {
        const campaign = formattedAllCampaigns.find(c => c.id?.toString() === campaignId.toString());
        console.log('Found campaign by ID:', campaign);
        return campaign || null;
      }
      
      console.log('No campaigns available yet');
      return null;
    } catch (error) {
      console.error('Error getting campaign by ID:', error);
      return null;
    }
  };

  return {
    // Contract status
    isContractAvailable,
    contractAddress: CONTRACT_ADDRESS,
    contractStatus,
    
    // Write functions
    createCampaign: createCampaignWrapper,
    fundCampaign: fundCampaignWrapper,
    withdrawFunds: withdrawFundsWrapper,
    
    // Read functions
    allCampaigns: enrichedCampaigns.length > 0 ? enrichedCampaigns : formattedAllCampaigns,
    activeCampaigns: getActiveCampaigns(),
    successfulCampaigns: getSuccessfulCampaigns(),
    expiredCampaigns: getExpiredCampaigns(),
    userCampaigns: formattedUserCampaigns,
    userContributions,
    getCampaignDetails,
    getCampaignById,
    
    // Loading states
    isCreatingCampaign,
    isFundingCampaign,
    isWithdrawing,
    isLoadingCampaigns: isClient ? isLoadingCampaigns : true,
    isLoadingUserCampaigns,
    isLoadingContributions,
    
    // Refetch functions
    refetchCampaigns,
    refetchUserCampaigns,
    refetchContributions,
    refreshCampaignMetadata,
    
    // Helper functions
    parseContractError,
    formatCampaignData,
  };
};