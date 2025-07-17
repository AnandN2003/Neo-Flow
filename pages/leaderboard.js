import { useState, useEffect } from 'react';
import Layout from '../components/Layout/Layout';
import { useAccount } from 'wagmi';

const Leaderboard = () => {
  const { address } = useAccount();
  const [topDonators, setTopDonators] = useState([]);
  const [topRaisers, setTopRaisers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load leaderboard data from localStorage
    const loadLeaderboardData = () => {
      try {
        const donators = JSON.parse(localStorage.getItem('neoflow_donators') || '[]');
        const raisers = JSON.parse(localStorage.getItem('neoflow_raisers') || '[]');
        
        // Sort and get top 10
        const sortedDonators = donators
          .sort((a, b) => parseFloat(b.totalDonated) - parseFloat(a.totalDonated))
          .slice(0, 10);
        
        const sortedRaisers = raisers
          .sort((a, b) => parseFloat(b.totalRaised) - parseFloat(a.totalRaised))
          .slice(0, 10);
        
        setTopDonators(sortedDonators);
        setTopRaisers(sortedRaisers);
        setLoading(false);
      } catch (error) {
        console.error('Error loading leaderboard data:', error);
        setLoading(false);
      }
    };

    loadLeaderboardData();
  }, []);

  const formatAddress = (addr) => {
    if (!addr) return 'Anonymous';
    return `${addr.substring(0, 6)}...${addr.substring(addr.length - 4)}`;
  };

  const formatAmount = (amount) => {
    return parseFloat(amount || 0).toFixed(4);
  };

  const LeaderboardCard = ({ title, data, type, icon, color }) => (
    <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
      <div className={`flex items-center justify-between mb-6 p-4 ${color} rounded-lg`}>
        <div>
          <h2 className="text-xl font-bold text-white">{title}</h2>
          <p className="text-white/80 text-sm">Top contributors in our community</p>
        </div>
        <div className="text-white text-3xl">{icon}</div>
      </div>
      
      {loading ? (
        <div className="space-y-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="animate-pulse flex items-center space-x-4">
              <div className="rounded-full bg-gray-300 h-10 w-10"></div>
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                <div className="h-3 bg-gray-300 rounded w-1/2"></div>
              </div>
            </div>
          ))}
        </div>
      ) : data.length === 0 ? (
        <div className="text-center py-8">
          <div className="text-gray-400 text-4xl mb-4">📊</div>
          <p className="text-gray-500">No data available yet</p>
          <p className="text-gray-400 text-sm">Start {type === 'donator' ? 'donating' : 'creating campaigns'} to appear here!</p>
        </div>
      ) : (
        <div className="space-y-4">
          {data.map((item, index) => (
            <div
              key={item.address || index}
              className={`flex items-center justify-between p-4 rounded-lg border-2 transition-all duration-200 hover:shadow-md ${
                index === 0 ? 'border-yellow-400 bg-yellow-50' :
                index === 1 ? 'border-gray-400 bg-gray-50' :
                index === 2 ? 'border-orange-400 bg-orange-50' :
                'border-gray-200 bg-gray-50'
              }`}
            >
              <div className="flex items-center space-x-4">
                <div className={`flex items-center justify-center w-10 h-10 rounded-full font-bold text-white ${
                  index === 0 ? 'bg-yellow-500' :
                  index === 1 ? 'bg-gray-500' :
                  index === 2 ? 'bg-orange-500' :
                  'bg-blue-500'
                }`}>
                  {index === 0 ? '👑' : index + 1}
                </div>
                <div>
                  <div className="font-semibold text-gray-800">
                    {formatAddress(item.address)}
                    {item.address === address && (
                      <span className="ml-2 px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">You</span>
                    )}
                  </div>
                  <div className="text-sm text-gray-600">
                    {type === 'donator' ? 'Total Donated' : 'Total Raised'}
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="font-bold text-lg text-gray-800">
                  {formatAmount(type === 'donator' ? item.totalDonated : item.totalRaised)} ETH
                </div>
                <div className="text-sm text-gray-500">
                  {type === 'donator' ? `${item.donationCount || 0} donations` : `${item.campaignCount || 0} campaigns`}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">🏆 Community Leaderboard</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Celebrating our top contributors who make NeoFlow a thriving crowdfunding community
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl p-6 text-white">
            <div className="text-3xl mb-2">💰</div>
            <div className="text-2xl font-bold">{topDonators.length}</div>
            <div className="text-purple-100">Active Donators</div>
          </div>
          <div className="bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl p-6 text-white">
            <div className="text-3xl mb-2">🚀</div>
            <div className="text-2xl font-bold">{topRaisers.length}</div>
            <div className="text-blue-100">Campaign Creators</div>
          </div>
          <div className="bg-gradient-to-r from-green-500 to-teal-500 rounded-xl p-6 text-white">
            <div className="text-3xl mb-2">🎯</div>
            <div className="text-2xl font-bold">
              {formatAmount(
                topDonators.reduce((sum, d) => sum + parseFloat(d.totalDonated || 0), 0) +
                topRaisers.reduce((sum, r) => sum + parseFloat(r.totalRaised || 0), 0)
              )}
            </div>
            <div className="text-green-100">Total Volume (ETH)</div>
          </div>
        </div>

        {/* Leaderboards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <LeaderboardCard
            title="🎯 Top Donators"
            data={topDonators}
            type="donator"
            icon="💝"
            color="bg-gradient-to-r from-purple-500 to-pink-500"
          />
          
          <LeaderboardCard
            title="🚀 Top Fundraisers"
            data={topRaisers}
            type="raiser"
            icon="📈"
            color="bg-gradient-to-r from-blue-500 to-indigo-500"
          />
        </div>

        {/* Community Message */}
        <div className="mt-12 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-8 text-center border border-indigo-200">
          <h3 className="text-2xl font-bold text-gray-800 mb-4">Join the Community!</h3>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Every contribution matters. Whether you're supporting amazing projects or creating your own, 
            you're helping build a better future through decentralized crowdfunding.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={() => window.location.href = '/main'}
              className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors"
            >
              Explore Campaigns
            </button>
            <button
              onClick={() => window.location.href = '/create-campaign'}
              className="border border-indigo-600 text-indigo-600 px-6 py-3 rounded-lg font-semibold hover:bg-indigo-50 transition-colors"
            >
              Create Campaign
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Leaderboard;
