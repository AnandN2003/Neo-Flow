import { useAccount } from 'wagmi';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Layout from '../components/Layout/Layout';
import CampaignCard from '../components/Campaign/CampaignCard';
import { formatCurrency } from '../utils/helpers';
import { useContract } from '../hooks/useContract';

const MyCampaigns = () => {
  const { isConnected } = useAccount();
  const router = useRouter();
  const { userCampaigns, isLoadingUserCampaigns, refetchUserCampaigns } = useContract();
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    if (!isConnected) {
      router.push('/');
    } else if (refetchUserCampaigns) {
      // Refetch user campaigns when wallet connects
      refetchUserCampaigns();
    }
  }, [isConnected, router]); // Remove refetchUserCampaigns from dependencies

  if (!isConnected) {
    return (
      <Layout title="My Campaigns">
        <div className="text-center py-12">
          <div className="text-gray-400 text-6xl mb-4">🔒</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Connect Your Wallet</h2>
          <p className="text-gray-600">Please connect your wallet to view your campaigns.</p>
        </div>
      </Layout>
    );
  }

  const filteredCampaigns = userCampaigns?.filter(campaign => {
    switch (filter) {
      case 'active':
        return campaign.isActive && new Date(campaign.deadline) > new Date();
      case 'expired':
        return new Date(campaign.deadline) <= new Date();
      case 'successful':
        return parseFloat(campaign.raised) >= parseFloat(campaign.target);
      default:
        return true;
    }
  }) || [];

  const totalRaised = userCampaigns?.reduce(
    (sum, campaign) => sum + parseFloat(campaign.raised || 0), 0
  ) || 0;

  const activeCampaigns = userCampaigns?.filter(
    campaign => campaign.isActive && new Date(campaign.deadline) > new Date()
  ) || [];

  const successfulCampaigns = userCampaigns?.filter(
    campaign => parseFloat(campaign.raised) >= parseFloat(campaign.target)
  ) || [];

  return (
    <Layout title="My Campaigns">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">My Campaigns</h1>
            <p className="text-gray-600 mt-2">
              Manage and track your crowdfunding campaigns
            </p>
          </div>
          <button
            onClick={() => router.push('/create-campaign')}
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
          >
            Create New Campaign
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white rounded-lg p-6 shadow-md">
            <div className="text-2xl font-bold text-gray-900 mb-1">
              {userCampaigns?.length || 0}
            </div>
            <div className="text-gray-600">Total Campaigns</div>
          </div>
          <div className="bg-white rounded-lg p-6 shadow-md">
            <div className="text-2xl font-bold text-green-600 mb-1">
              {activeCampaigns.length}
            </div>
            <div className="text-gray-600">Active</div>
          </div>
          <div className="bg-white rounded-lg p-6 shadow-md">
            <div className="text-2xl font-bold text-blue-600 mb-1">
              {successfulCampaigns.length}
            </div>
            <div className="text-gray-600">Successful</div>
          </div>
          <div className="bg-white rounded-lg p-6 shadow-md">
            <div className="text-2xl font-bold text-purple-600 mb-1">
              {formatCurrency(totalRaised)} ETH
            </div>
            <div className="text-gray-600">Total Raised</div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg p-4 shadow-md">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                filter === 'all'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              All ({userCampaigns?.length || 0})
            </button>
            <button
              onClick={() => setFilter('active')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                filter === 'active'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Active ({activeCampaigns.length})
            </button>
            <button
              onClick={() => setFilter('successful')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                filter === 'successful'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Successful ({successfulCampaigns.length})
            </button>
            <button
              onClick={() => setFilter('expired')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                filter === 'expired'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Expired
            </button>
          </div>
        </div>

        {/* Campaigns Grid */}
        <div>
          {isLoadingUserCampaigns ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="bg-white rounded-lg shadow-md overflow-hidden">
                  <div className="animate-pulse">
                    <div className="h-48 bg-gray-300"></div>
                    <div className="p-4">
                      <div className="h-6 bg-gray-300 rounded mb-2"></div>
                      <div className="h-4 bg-gray-300 rounded mb-2"></div>
                      <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : filteredCampaigns.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCampaigns.map((campaign) => (
                <CampaignCard key={campaign.id} campaign={campaign} />
              ))}
            </div>
          ) : userCampaigns?.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-gray-400 text-6xl mb-4">📝</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No campaigns yet</h3>
              <p className="text-gray-600 mb-6">
                Start your crowdfunding journey by creating your first campaign.
              </p>
              <button
                onClick={() => router.push('/create-campaign')}
                className="px-6 py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors font-medium"
              >
                Create Your First Campaign
              </button>
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="text-gray-400 text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No campaigns found</h3>
              <p className="text-gray-600 mb-6">
                No campaigns match the selected filter.
              </p>
              <button
                onClick={() => setFilter('all')}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
              >
                Show All Campaigns
              </button>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default MyCampaigns;