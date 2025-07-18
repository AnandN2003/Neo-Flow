import { useAccount } from 'wagmi';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Layout from '../components/Layout/Layout';
import CampaignCard from '../components/Campaign/CampaignCard';
import ClientOnly from '../components/common/ClientOnly';
import { formatCurrency, formatAddress } from '../utils/helpers';
import { getNeoPoints, getTier } from '../utils/rewards';

const Dashboard = () => {
  const { address, isConnected } = useAccount();
  const router = useRouter();
  
  // Use mock data for now to avoid infinite loops
  const [userCampaigns] = useState([]);
  const [userContributions] = useState([]);
  const [allCampaigns] = useState([]);
  const [isLoadingCampaigns] = useState(false);
  const [isLoadingUserCampaigns] = useState(false);

  useEffect(() => {
    if (!isConnected) {
      router.push('/');
    }
  }, [isConnected, router]);

  if (!isConnected) {
    return (
      <Layout title="Dashboard">
        <div className="text-center py-12">
          <div className="text-gray-400 text-6xl mb-4">🔒</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Connect Your Wallet</h2>
          <p className="text-gray-600">Please connect your wallet to access your dashboard.</p>
        </div>
      </Layout>
    );
  }

  const totalContributions = userContributions?.reduce(
    (sum, contribution) => sum + parseFloat(contribution.amount || 0), 0
  ) || 0;

  const totalRaised = userCampaigns?.reduce(
    (sum, campaign) => sum + parseFloat(campaign.raised || 0), 0
  ) || 0;

  const activeCampaigns = userCampaigns?.filter(campaign => campaign.isActive) || [];
  const recentCampaigns = allCampaigns?.slice(0, 6) || [];

  // Get user's NeoPoints and tier
  const userNeoPoints = getNeoPoints(address);
  const userTier = getTier(userNeoPoints);

  // Mock data for charts (static for now)
  const mockFundingData = [
    { month: 'Jan', amount: 12000 },
    { month: 'Feb', amount: 19000 },
    { month: 'Mar', amount: 30000 },
    { month: 'Apr', amount: 50000 },
    { month: 'May', amount: 45000 },
    { month: 'Jun', amount: 60000 },
  ];

  const mockCategoryData = [
    { name: 'Technology', value: 35, color: 'bg-blue-500' },
    { name: 'Health', value: 25, color: 'bg-green-500' },
    { name: 'Education', value: 20, color: 'bg-purple-500' },
    { name: 'Environment', value: 15, color: 'bg-yellow-500' },
    { name: 'Other', value: 5, color: 'bg-red-500' },
  ];

  return (
    <Layout title="Dashboard">
      <ClientOnly fallback={
        <div className="animate-pulse space-y-6">
          <div className="h-32 bg-gray-200 rounded-lg"></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-48 bg-gray-200 rounded-lg"></div>
            ))}
          </div>
        </div>
      }>
      
      {/* Welcome Section */}
      <div className="mb-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Welcome back! 👋</h1>
            <p className="text-blue-100">
              Address: {formatAddress(address)} | Tier: <span className="font-bold">{userTier.name}</span>
            </p>
            <p className="text-blue-100">NeoPoints: <span className="font-bold">{userNeoPoints}</span></p>
          </div>
          <div className="hidden md:block">
            <div className="text-6xl opacity-20">🚀</div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Raised</p>
              <p className="text-2xl font-bold text-gray-900">{formatCurrency(totalRaised)}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Contributed</p>
              <p className="text-2xl font-bold text-gray-900">{formatCurrency(totalContributions)}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg">
              <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Active Campaigns</p>
              <p className="text-2xl font-bold text-gray-900">{activeCampaigns.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v13m0-13V6a2 2 0 112 0v1m-2 0V6a2 2 0 00-2 0v1m2 0V6a2 2 0 012 0v1M6 18h12" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">NeoPoints</p>
              <p className="text-2xl font-bold text-gray-900">{userNeoPoints}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Funding Trends Chart */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Funding Trends</h3>
          <div className="space-y-4">
            {mockFundingData.map((item, index) => (
              <div key={item.month} className="flex items-center">
                <div className="w-12 text-sm text-gray-600">{item.month}</div>
                <div className="flex-1 mx-4">
                  <div className="bg-gray-200 rounded-full h-4 relative overflow-hidden">
                    <div 
                      className="bg-gradient-to-r from-blue-500 to-purple-500 h-full rounded-full transition-all duration-1000 ease-out"
                      style={{ width: `${(item.amount / 60000) * 100}%` }}
                    ></div>
                  </div>
                </div>
                <div className="w-20 text-sm text-gray-900 font-medium text-right">
                  ${(item.amount / 1000).toFixed(0)}K
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Category Distribution */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Popular Categories</h3>
          <div className="space-y-4">
            {mockCategoryData.map((category) => (
              <div key={category.name} className="flex items-center">
                <div className="w-20 text-sm text-gray-600">{category.name}</div>
                <div className="flex-1 mx-4">
                  <div className="bg-gray-200 rounded-full h-3 relative overflow-hidden">
                    <div 
                      className={`${category.color} h-full rounded-full transition-all duration-1000 ease-out`}
                      style={{ width: `${category.value}%` }}
                    ></div>
                  </div>
                </div>
                <div className="w-12 text-sm text-gray-900 font-medium text-right">
                  {category.value}%
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Activity Feed */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
            <div className="space-y-4">
              {[
                { type: 'contribution', amount: '0.5 ETH', campaign: 'Clean Water Project', time: '2 hours ago', icon: '💧' },
                { type: 'campaign', amount: '2.3 ETH', campaign: 'Tech Education Initiative', time: '1 day ago', icon: '🎓' },
                { type: 'reward', amount: '150 Points', campaign: 'NeoPoints Earned', time: '2 days ago', icon: '🎁' },
                { type: 'contribution', amount: '1.0 ETH', campaign: 'Medical Research Fund', time: '3 days ago', icon: '🔬' },
              ].map((activity, index) => (
                <div key={index} className="flex items-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-2xl mr-4">{activity.icon}</div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">{activity.campaign}</p>
                    <p className="text-xs text-gray-600">{activity.amount} • {activity.time}</p>
                  </div>
                  <div className="text-right">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      activity.type === 'contribution' ? 'bg-green-100 text-green-800' :
                      activity.type === 'campaign' ? 'bg-blue-100 text-blue-800' :
                      'bg-purple-100 text-purple-800'
                    }`}>
                      {activity.type}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
          <div className="space-y-3">
            <button
              onClick={() => router.push('/create-campaign')}
              className="w-full flex items-center justify-center px-4 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
              </svg>
              Create Campaign
            </button>
            
            <button
              onClick={() => router.push('/main')}
              className="w-full flex items-center justify-center px-4 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              Explore Campaigns
            </button>
            
            <button
              onClick={() => router.push('/rewards')}
              className="w-full flex items-center justify-center px-4 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v13m0-13V6a2 2 0 112 0v1m-2 0V6a2 2 0 00-2 0v1m2 0V6a2 2 0 012 0v1M6 18h12" />
              </svg>
              View Rewards
            </button>
            
            <button
              onClick={() => router.push('/leaderboard')}
              className="w-full flex items-center justify-center px-4 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
              </svg>
              Leaderboard
            </button>
          </div>
        </div>
      </div>

      {/* Recent Campaigns Section */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900">Recent Campaigns</h2>
          <button 
            onClick={() => router.push('/main')}
            className="text-indigo-600 hover:text-indigo-800 text-sm font-medium"
          >
            View All →
          </button>
        </div>
        
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
        ) : recentCampaigns.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recentCampaigns.map((campaign) => (
              <CampaignCard key={campaign.id} campaign={campaign} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">🚀</div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No campaigns yet</h3>
            <p className="text-gray-600 mb-6">Start by creating your first campaign and make a difference!</p>
            <button
              onClick={() => router.push('/create-campaign')}
              className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium"
            >
              Create Your First Campaign
            </button>
          </div>
        )}
      </div>
      </ClientOnly>
    </Layout>
  );
};

export default Dashboard;
