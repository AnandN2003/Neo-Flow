import { useState, useEffect } from 'react';
import Layout from '../components/Layout/Layout';
import { useAccount } from 'wagmi';

const Rewards = () => {
  const { address } = useAccount();
  const [userNeoPoints, setUserNeoPoints] = useState(0);
  const [totalEarned, setTotalEarned] = useState(0);
  const [recentTransactions, setRecentTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (address) {
      loadUserRewards();
    }
  }, [address]);

  const loadUserRewards = () => {
    try {
      // Load user's NeoPoints from localStorage
      const userRewards = JSON.parse(localStorage.getItem(`neoflow_rewards_${address}`) || '{"points": 0, "totalEarned": 0, "transactions": []}');
      setUserNeoPoints(userRewards.points || 0);
      setTotalEarned(userRewards.totalEarned || 0);
      setRecentTransactions(userRewards.transactions || []);
      setLoading(false);
    } catch (error) {
      console.error('Error loading user rewards:', error);
      setLoading(false);
    }
  };

  const formatDate = (timestamp) => {
    return new Date(timestamp).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const rewardTiers = [
    { name: 'Bronze Supporter', minPoints: 0, maxPoints: 999, color: 'from-orange-400 to-orange-600', icon: '🥉', benefits: ['Basic recognition', 'Community access'] },
    { name: 'Silver Contributor', minPoints: 1000, maxPoints: 4999, color: 'from-gray-400 to-gray-600', icon: '🥈', benefits: ['Priority support', 'Exclusive updates', 'Silver badge'] },
    { name: 'Gold Champion', minPoints: 5000, maxPoints: 19999, color: 'from-yellow-400 to-yellow-600', icon: '🥇', benefits: ['VIP treatment', 'Early access', 'Gold badge', 'Special perks'] },
    { name: 'Platinum Legend', minPoints: 20000, maxPoints: Infinity, color: 'from-purple-400 to-purple-600', icon: '💎', benefits: ['Ultimate status', 'Exclusive events', 'Platinum badge', 'Premium rewards'] }
  ];

  const getCurrentTier = () => {
    return rewardTiers.find(tier => userNeoPoints >= tier.minPoints && userNeoPoints <= tier.maxPoints) || rewardTiers[0];
  };

  const getNextTier = () => {
    const currentTier = getCurrentTier();
    const currentIndex = rewardTiers.indexOf(currentTier);
    return currentIndex < rewardTiers.length - 1 ? rewardTiers[currentIndex + 1] : null;
  };

  const getProgressToNextTier = () => {
    const nextTier = getNextTier();
    if (!nextTier) return 100;
    
    const currentTier = getCurrentTier();
    const progress = ((userNeoPoints - currentTier.minPoints) / (nextTier.minPoints - currentTier.minPoints)) * 100;
    return Math.min(100, Math.max(0, progress));
  };

  const currentTier = getCurrentTier();
  const nextTier = getNextTier();
  const progressPercentage = getProgressToNextTier();

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">🎁 NeoPoints Rewards</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Earn NeoPoints for every donation you make and unlock exclusive rewards!
          </p>
        </div>

        {!address ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔗</div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Connect Your Wallet</h3>
            <p className="text-gray-600">Please connect your wallet to view your NeoPoints and rewards.</p>
          </div>
        ) : (
          <>
            {/* User Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl p-6 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-3xl font-bold">{userNeoPoints.toLocaleString()}</div>
                    <div className="text-blue-100">Current NeoPoints</div>
                  </div>
                  <div className="text-4xl">💎</div>
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-green-500 to-teal-600 rounded-xl p-6 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-3xl font-bold">{totalEarned.toLocaleString()}</div>
                    <div className="text-green-100">Total Earned</div>
                  </div>
                  <div className="text-4xl">🏆</div>
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl p-6 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-3xl font-bold">{recentTransactions.length}</div>
                    <div className="text-purple-100">Total Donations</div>
                  </div>
                  <div className="text-4xl">❤️</div>
                </div>
              </div>
            </div>

            {/* Current Tier & Progress */}
            <div className="bg-white rounded-xl shadow-lg p-6 mb-8 border border-gray-200">
              <h3 className="text-xl font-bold text-gray-800 mb-6">Your Reward Tier</h3>
              
              <div className={`bg-gradient-to-r ${currentTier.color} rounded-lg p-6 mb-6`}>
                <div className="flex items-center justify-between text-white">
                  <div className="flex items-center space-x-4">
                    <div className="text-4xl">{currentTier.icon}</div>
                    <div>
                      <div className="text-2xl font-bold">{currentTier.name}</div>
                      <div className="text-white/80">Your current tier</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold">{userNeoPoints.toLocaleString()}</div>
                    <div className="text-white/80">NeoPoints</div>
                  </div>
                </div>
              </div>

              {nextTier && (
                <div className="mb-6">
                  <div className="flex justify-between text-sm text-gray-600 mb-2">
                    <span>Progress to {nextTier.name}</span>
                    <span>{userNeoPoints.toLocaleString()} / {nextTier.minPoints.toLocaleString()}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div 
                      className="bg-gradient-to-r from-blue-500 to-indigo-600 h-3 rounded-full transition-all duration-300"
                      style={{ width: `${progressPercentage}%` }}
                    ></div>
                  </div>
                  <div className="text-center text-sm text-gray-500 mt-2">
                    {(nextTier.minPoints - userNeoPoints).toLocaleString()} points to next tier
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">Current Benefits:</h4>
                  <ul className="space-y-1">
                    {currentTier.benefits.map((benefit, index) => (
                      <li key={index} className="flex items-center text-sm text-gray-600">
                        <span className="text-green-500 mr-2">✓</span>
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </div>
                {nextTier && (
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">Next Tier Benefits:</h4>
                    <ul className="space-y-1">
                      {nextTier.benefits.map((benefit, index) => (
                        <li key={index} className="flex items-center text-sm text-gray-500">
                          <span className="text-gray-400 mr-2">○</span>
                          {benefit}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>

            {/* How to Earn Points */}
            <div className="bg-white rounded-xl shadow-lg p-6 mb-8 border border-gray-200">
              <h3 className="text-xl font-bold text-gray-800 mb-6">How to Earn NeoPoints</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg border border-blue-200">
                  <div className="text-3xl mb-2">💰</div>
                  <div className="font-semibold text-gray-800">Donate to Campaigns</div>
                  <div className="text-sm text-gray-600 mt-1">100 points per 0.01 ETH</div>
                </div>
                
                <div className="text-center p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg border border-green-200">
                  <div className="text-3xl mb-2">🎯</div>
                  <div className="font-semibold text-gray-800">First Donation</div>
                  <div className="text-sm text-gray-600 mt-1">500 bonus points</div>
                </div>
                
                <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg border border-purple-200">
                  <div className="text-3xl mb-2">🔥</div>
                  <div className="font-semibold text-gray-800">Large Donations</div>
                  <div className="text-sm text-gray-600 mt-1">2x multiplier for 1+ ETH</div>
                </div>
                
                <div className="text-center p-4 bg-gradient-to-br from-yellow-50 to-orange-50 rounded-lg border border-yellow-200">
                  <div className="text-3xl mb-2">🎉</div>
                  <div className="font-semibold text-gray-800">Special Events</div>
                  <div className="text-sm text-gray-600 mt-1">Seasonal bonus points</div>
                </div>
              </div>
            </div>

            {/* Recent Transactions */}
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
              <h3 className="text-xl font-bold text-gray-800 mb-6">Recent NeoPoints Activity</h3>
              
              {loading ? (
                <div className="space-y-4">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="animate-pulse flex items-center space-x-4">
                      <div className="rounded-full bg-gray-300 h-10 w-10"></div>
                      <div className="flex-1 space-y-2">
                        <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                        <div className="h-3 bg-gray-300 rounded w-1/2"></div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : recentTransactions.length === 0 ? (
                <div className="text-center py-8">
                  <div className="text-gray-400 text-4xl mb-4">🎁</div>
                  <p className="text-gray-500">No rewards earned yet</p>
                  <p className="text-gray-400 text-sm">Make your first donation to start earning NeoPoints!</p>
                  <button
                    onClick={() => window.location.href = '/main'}
                    className="mt-4 bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors"
                  >
                    Explore Campaigns
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {recentTransactions.slice(0, 10).map((transaction, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200">
                      <div className="flex items-center space-x-4">
                        <div className="bg-green-500 text-white rounded-full p-2">
                          <div className="text-lg">💎</div>
                        </div>
                        <div>
                          <div className="font-semibold text-gray-800">
                            Donation Reward
                          </div>
                          <div className="text-sm text-gray-600">
                            {formatDate(transaction.timestamp)}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-green-600">
                          +{transaction.points} NeoPoints
                        </div>
                        <div className="text-sm text-gray-500">
                          {transaction.donationAmount} ETH donated
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </Layout>
  );
};

export default Rewards;
