import { useAccount } from 'wagmi';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Layout from '../components/Layout/Layout';
import { formatCurrency, formatAddress } from '../utils/helpers';

const Contributions = () => {
  const { isConnected } = useAccount();
  const router = useRouter();
  const [userContributions] = useState([]);
  const [isLoadingContributions] = useState(false);

  useEffect(() => {
    if (!isConnected) {
      router.push('/');
    }
  }, [isConnected, router]);

  if (!isConnected) {
    return (
      <Layout title="My Contributions">
        <div className="text-center py-12">
          <div className="text-gray-400 text-6xl mb-4">🔒</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Connect Your Wallet</h2>
          <p className="text-gray-600">Please connect your wallet to view your contributions.</p>
        </div>
      </Layout>
    );
  }

  const totalContributed = userContributions?.reduce(
    (sum, contribution) => sum + parseFloat(contribution.amount || 0), 0
  ) || 0;

  return (
    <Layout title="My Contributions">
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">My Contributions</h1>
          <p className="text-gray-600 mt-2">
            Track all your contributions to crowdfunding campaigns
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg p-6 shadow-md">
            <div className="text-2xl font-bold text-purple-600 mb-1">
              {formatCurrency(totalContributed)} ETH
            </div>
            <div className="text-gray-600">Total Contributed</div>
          </div>
          <div className="bg-white rounded-lg p-6 shadow-md">
            <div className="text-2xl font-bold text-blue-600 mb-1">
              {userContributions?.length || 0}
            </div>
            <div className="text-gray-600">Campaigns Supported</div>
          </div>
          <div className="bg-white rounded-lg p-6 shadow-md">
            <div className="text-2xl font-bold text-green-600 mb-1">
              {userContributions?.reduce((sum, c) => sum + parseFloat(c.amount || 0), 0) > 0 ? 
                (userContributions.reduce((sum, c) => sum + parseFloat(c.amount || 0), 0) / userContributions.length).toFixed(4) : 
                '0'} ETH
            </div>
            <div className="text-gray-600">Average Contribution</div>
          </div>
        </div>

        {/* Contributions List */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">Contribution History</h2>
          </div>
          
          {isLoadingContributions ? (
            <div className="p-6">
              <div className="animate-pulse space-y-4">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="flex items-center space-x-4">
                    <div className="h-12 w-12 bg-gray-300 rounded-full"></div>
                    <div className="flex-1 space-y-2">
                      <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                      <div className="h-3 bg-gray-300 rounded w-1/2"></div>
                    </div>
                    <div className="h-4 bg-gray-300 rounded w-20"></div>
                  </div>
                ))}
              </div>
            </div>
          ) : userContributions && userContributions.length > 0 ? (
            <div className="divide-y divide-gray-200">
              {userContributions.map((contribution, index) => (
                <div key={index} className="p-6 hover:bg-gray-50 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center">
                        <span className="text-white text-sm font-bold">
                          #{contribution.campaignId || index}
                        </span>
                      </div>
                      <div>
                        <h3 className="text-lg font-medium text-gray-900">
                          Campaign #{contribution.campaignId || index}
                        </h3>
                        <p className="text-sm text-gray-600">
                          Contributed on {contribution.timestamp ? 
                            new Date(contribution.timestamp * 1000).toLocaleDateString() : 
                            'Unknown date'
                          }
                        </p>
                        {contribution.transactionHash && (
                          <p className="text-xs text-gray-500">
                            Tx: {formatAddress(contribution.transactionHash)}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-semibold text-purple-600">
                        {formatCurrency(contribution.amount)} ETH
                      </div>
                      <div className="text-sm text-gray-500">
                        Contribution
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="text-gray-400 text-6xl mb-4">💝</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No contributions yet</h3>
              <p className="text-gray-600 mb-6">
                Start supporting amazing projects by making your first contribution.
              </p>
              <button
                onClick={() => router.push('/main')}
                className="px-6 py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors font-medium"
              >
                Explore Campaigns
              </button>
            </div>
          )}
        </div>

        {/* Impact Section */}
        {userContributions && userContributions.length > 0 && (
          <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg p-8 text-white">
            <h2 className="text-2xl font-bold mb-4">Your Impact</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <div className="text-3xl font-bold mb-2">
                  {userContributions.length}
                </div>
                <p className="text-purple-100">
                  Projects supported through your contributions
                </p>
              </div>
              <div>
                <div className="text-3xl font-bold mb-2">
                  {formatCurrency(totalContributed)} ETH
                </div>
                <p className="text-purple-100">
                  Total funding provided to innovative projects
                </p>
              </div>
            </div>
            <p className="mt-6 text-purple-100">
              Thank you for being part of the decentralized crowdfunding community! 
              Your contributions help bring innovative ideas to life.
            </p>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Contributions;
