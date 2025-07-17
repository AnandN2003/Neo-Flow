import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useAccount } from 'wagmi';
import { parseEther } from 'ethers/lib/utils';
import { useContract } from '../../hooks/useContract';
import { fetchFromIPFS } from '../../utils/ipfs';
import { awardNeoPoints, showNeoPointsNotification, calculateNeoPoints, getUserNeoPoints } from '../../utils/rewards';
import {
  formatCurrency,
  calculatePercentage,
  formatTimeRemaining,
  getCampaignStatus,
  getStatusColor,
  formatAddress
} from '../../utils/helpers';
import toast from 'react-hot-toast';

const CampaignDetails = ({ campaign }) => {
  const { address, isConnected } = useAccount();
  const { fundCampaign, withdrawFunds, isFundingCampaign, isWithdrawing } = useContract();
  
  const [fundAmount, setFundAmount] = useState('');
  const [campaignMetadata, setCampaignMetadata] = useState(null);
  const [loadingMetadata, setLoadingMetadata] = useState(true);
  const [mounted, setMounted] = useState(false);
  const [estimatedPoints, setEstimatedPoints] = useState(0);
  const [userNeoPoints, setUserNeoPoints] = useState(0);

  // Handle hydration by waiting for component to mount
  useEffect(() => {
    setMounted(true);
  }, []);

  // Load user's current NeoPoints
  useEffect(() => {
    if (address) {
      const points = getUserNeoPoints(address);
      setUserNeoPoints(points);
    }
  }, [address]);

  // Calculate estimated points when fund amount changes
  useEffect(() => {
    if (fundAmount && parseFloat(fundAmount) > 0) {
      const amount = parseFloat(fundAmount);
      // Check if this would be first donation
      const userRewards = JSON.parse(localStorage.getItem(`neoflow_rewards_${address}`) || '{"transactions": []}');
      const isFirstDonation = userRewards.transactions.length === 0;
      const points = calculateNeoPoints(amount, isFirstDonation);
      setEstimatedPoints(points);
    } else {
      setEstimatedPoints(0);
    }
  }, [fundAmount, address]);

  if (!campaign) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="text-center py-8">
            <p className="text-gray-500">No campaign data available</p>
          </div>
        </div>
      </div>
    );
  }

  const {
    id,
    creator,
    target: targetAmount,
    raised: raisedAmount,
    deadline,
    isActive,
    metadataHash
  } = campaign;

  const percentage = calculatePercentage(raisedAmount, targetAmount);
  const timeLeft = formatTimeRemaining(deadline);
  const status = getCampaignStatus(campaign);
  const statusColor = getStatusColor(status);
  
  // Only show wallet-dependent UI after component mounts to avoid hydration issues
  const isCreator = mounted && address && creator && address.toLowerCase() === creator.toLowerCase();
  const canWithdraw = mounted && isCreator && (parseFloat(raisedAmount) > 0);
  const canFund = mounted && isConnected && !isCreator && isActive && new Date(deadline) > new Date();

  useEffect(() => {
    const loadMetadata = async () => {
      if (metadataHash) {
        try {
          const result = await fetchFromIPFS(metadataHash);
          if (result.success) {
            setCampaignMetadata(result.data);
          }
        } catch (error) {
          console.error('Error loading metadata:', error);
        }
      }
      setLoadingMetadata(false);
    };

    loadMetadata();
  }, [metadataHash]);

  const handleFund = async () => {
    if (!fundAmount || parseFloat(fundAmount) <= 0) {
      toast.error('Please enter a valid amount');
      return;
    }

    try {
      const amountInWei = parseEther(fundAmount);
      await fundCampaign({
        args: [id],
        value: amountInWei,
      });
      
      // Award NeoPoints for the donation
      if (address) {
        const pointsEarned = awardNeoPoints(address, fundAmount, id);
        showNeoPointsNotification(pointsEarned);
      }
      
      setFundAmount('');
      toast.success('Campaign funded successfully!');
    } catch (error) {
      console.error('Error funding campaign:', error);
      toast.error('Failed to fund campaign');
    }
  };

  const handleWithdraw = async () => {
    try {
      await withdrawFunds({
        args: [id],
      });
      
      toast.success('Funds withdrawn successfully!');
    } catch (error) {
      console.error('Error withdrawing funds:', error);
      toast.error('Failed to withdraw funds');
    }
  };

  if (loadingMetadata) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="animate-pulse">
            <div className="h-64 bg-gray-300 rounded-lg mb-6"></div>
            <div className="h-8 bg-gray-300 rounded mb-4"></div>
            <div className="h-4 bg-gray-300 rounded mb-2"></div>
            <div className="h-4 bg-gray-300 rounded mb-2"></div>
            <div className="h-4 bg-gray-300 rounded w-3/4"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        {/* Campaign Image */}
        <div className="relative h-64 md:h-80 bg-gray-200">
          {campaignMetadata?.image ? (
            <Image
              src={`https://gateway.pinata.cloud/ipfs/${campaignMetadata.image}`}
              alt={campaignMetadata.title}
              fill
              className="object-cover"
            />
          ) : (
            <div className="flex items-center justify-center h-full bg-gradient-to-br from-blue-400 to-purple-500">
              <span className="text-white text-6xl font-bold">
                {campaignMetadata?.title?.charAt(0) || 'C'}
              </span>
            </div>
          )}
          
          {/* Status Badge */}
          <div className="absolute top-4 right-4">
            <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${statusColor}`}>
              {status}
            </span>
          </div>
        </div>

        <div className="p-6 md:p-8">
          {/* Campaign Header */}
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-2">
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700">
                {campaignMetadata?.category || 'General'}
              </span>
              <span className="text-sm text-gray-500">Campaign #{id}</span>
            </div>
            
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              {campaignMetadata?.title || 'Loading...'}
            </h1>
            
            <p className="text-gray-600 text-lg leading-relaxed">
              {campaignMetadata?.description || 'Loading description...'}
            </p>
          </div>

          {/* Campaign Progress */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-2">
              <span className="text-2xl font-bold text-gray-900">
                {formatCurrency(raisedAmount)} ETH
              </span>
              <span className="text-lg font-semibold text-gray-600">
                {percentage.toFixed(1)}%
              </span>
            </div>
            
            <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
              <div
                className="bg-gradient-to-r from-blue-500 to-purple-600 h-3 rounded-full transition-all duration-300"
                style={{ width: `${Math.min(percentage, 100)}%` }}
              />
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div>
                <div className="text-lg font-semibold text-gray-900">
                  {formatCurrency(targetAmount)} ETH
                </div>
                <div className="text-sm text-gray-600">Goal</div>
              </div>
              <div>
                <div className="text-lg font-semibold text-gray-900">
                  {formatCurrency(raisedAmount)} ETH
                </div>
                <div className="text-sm text-gray-600">Raised</div>
              </div>
              <div>
                <div className={`text-lg font-semibold ${status === 'Expired' ? 'text-red-600' : 'text-green-600'}`}>
                  {timeLeft}
                </div>
                <div className="text-sm text-gray-600">Time Left</div>
              </div>
              <div>
                <div className="text-lg font-semibold text-gray-900">
                  {/* We'll add backer count when available */}
                  -
                </div>
                <div className="text-sm text-gray-600">Backers</div>
              </div>
            </div>
          </div>

          {/* Creator Information */}
          <div className="mb-8 p-4 bg-gray-50 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Campaign Creator</h3>
            <div className="flex items-center">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-bold">
                  {creator?.slice(2, 4).toUpperCase()}
                </span>
              </div>
              <div className="ml-3">
                <div className="text-sm font-medium text-gray-900">
                  {formatAddress(creator)}
                </div>
                <div className="text-xs text-gray-500">Campaign Creator</div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-4">
            {!mounted ? (
              // Show loading state during hydration
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="animate-pulse">
                  <div className="h-4 bg-gray-300 rounded w-1/2 mb-2"></div>
                  <div className="h-10 bg-gray-300 rounded"></div>
                </div>
              </div>
            ) : (
              <>
                {canFund && (
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-lg font-semibold text-gray-900">Fund This Campaign</h3>
                      <div className="flex items-center space-x-2 text-sm text-purple-600">
                        <span>💎</span>
                        <span>{userNeoPoints.toLocaleString()} NeoPoints</span>
                      </div>
                    </div>
                    
                    <div className="flex gap-3 mb-3">
                      <input
                        type="number"
                        step="0.001"
                        min="0"
                        value={fundAmount}
                        onChange={(e) => setFundAmount(e.target.value)}
                        placeholder="Amount in ETH"
                        className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                      />
                      <button
                        onClick={handleFund}
                        disabled={isFundingCampaign || !fundAmount}
                        className="px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isFundingCampaign ? 'Funding...' : 'Fund Campaign'}
                      </button>
                    </div>
                    
                    {estimatedPoints > 0 && (
                      <div className="bg-purple-50 border border-purple-200 rounded-lg p-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <span className="text-purple-600">🎁</span>
                            <span className="text-sm font-medium text-purple-800">You'll earn:</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <span className="text-lg font-bold text-purple-600">+{estimatedPoints.toLocaleString()}</span>
                            <span className="text-sm text-purple-600">NeoPoints</span>
                          </div>
                        </div>
                        {estimatedPoints >= 500 && fundAmount && parseFloat(fundAmount) > 0 && (
                          <div className="text-xs text-purple-600 mt-1">
                            {JSON.parse(localStorage.getItem(`neoflow_rewards_${address}`) || '{"transactions": []}').transactions.length === 0 && "🎉 First donation bonus included!"}
                            {parseFloat(fundAmount) >= 1 && " 🔥 Large donation 2x multiplier!"}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                )}

                {canWithdraw && (
                  <div className="p-4 bg-green-50 rounded-lg">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Withdraw Funds</h3>
                    <p className="text-sm text-gray-600 mb-3">
                      As the campaign creator, you can withdraw the raised funds.
                    </p>
                    <button
                      onClick={handleWithdraw}
                      disabled={isWithdrawing}
                      className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isWithdrawing ? 'Withdrawing...' : 'Withdraw Funds'}
                    </button>
                  </div>
                )}

                {!isConnected && (
                  <div className="p-4 bg-yellow-50 rounded-lg">
                    <p className="text-sm text-yellow-800">
                      Please connect your wallet to interact with this campaign.
                    </p>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CampaignDetails;
