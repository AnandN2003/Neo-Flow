import { useAccount } from 'wagmi';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Layout from '../components/Layout/Layout';
import { formatCurrency, formatAddress, getCampaignStatus } from '../utils/helpers';
import { ADMIN_ADDRESS } from '../constants';

const AdminPanel = () => {
  const { address, isConnected } = useAccount();
  const router = useRouter();
  const [allCampaigns] = useState([]);
  const [isLoadingCampaigns] = useState(false);

  useEffect(() => {
    if (!isConnected) {
      router.push('/');
    } else if (address && address.toLowerCase() !== ADMIN_ADDRESS?.toLowerCase()) {
      router.push('/');
    }
  }, [isConnected, address, router]);

  if (!isConnected) {
    return (
      <Layout title="Admin Panel">
        <div className="text-center py-12">
          <div className="text-gray-400 text-6xl mb-4">🔒</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Access Denied</h2>
          <p className="text-gray-600">Please connect your wallet to access the admin panel.</p>
        </div>
      </Layout>
    );
  }

  if (address && address.toLowerCase() !== ADMIN_ADDRESS?.toLowerCase()) {
    return (
      <Layout title="Admin Panel">
        <div className="text-center py-12">
          <div className="text-gray-400 text-6xl mb-4">⛔</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Access Denied</h2>
          <p className="text-gray-600">You don't have permission to access the admin panel.</p>
        </div>
      </Layout>
    );
  }

  const totalCampaigns = allCampaigns?.length || 0;
  const activeCampaigns = allCampaigns?.filter(c => c.isActive && new Date(c.deadline) > new Date()) || [];
  const totalRaised = allCampaigns?.reduce((sum, c) => sum + parseFloat(c.raised || 0), 0) || 0;
  const successfulCampaigns = allCampaigns?.filter(c => parseFloat(c.raised) >= parseFloat(c.target)) || [];

  return (
    <Layout title="Admin Panel">
      <div className="space-y-6">
        {/* Header */}
        <div className="bg-gradient-to-r from-red-600 to-pink-600 rounded-lg p-6 text-white">
          <h1 className="text-3xl font-bold mb-2">Admin Panel</h1>
          <p className="text-red-100">
            Platform administration and management dashboard
          </p>
        </div>

        {/* Platform Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white rounded-lg p-6 shadow-md">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-md">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-4m-5 0H9m0 0H5m0 0h2M7 7h10M7 11h10M7 15h10" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-2xl font-semibold text-gray-900">{totalCampaigns}</p>
                <p className="text-gray-600">Total Campaigns</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-md">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-md">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-2xl font-semibold text-gray-900">{activeCampaigns.length}</p>
                <p className="text-gray-600">Active Campaigns</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-md">
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 rounded-md">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-2xl font-semibold text-gray-900">{formatCurrency(totalRaised)} ETH</p>
                <p className="text-gray-600">Total Raised</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-md">
            <div className="flex items-center">
              <div className="p-2 bg-yellow-100 rounded-md">
                <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-2xl font-semibold text-gray-900">{successfulCampaigns.length}</p>
                <p className="text-gray-600">Successful Campaigns</p>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Campaigns Table */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">All Campaigns</h2>
          </div>
          
          {isLoadingCampaigns ? (
            <div className="p-6">
              <div className="animate-pulse space-y-4">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="flex items-center space-x-4">
                    <div className="h-4 bg-gray-300 rounded w-8"></div>
                    <div className="h-4 bg-gray-300 rounded w-32"></div>
                    <div className="h-4 bg-gray-300 rounded w-24"></div>
                    <div className="h-4 bg-gray-300 rounded w-20"></div>
                    <div className="h-4 bg-gray-300 rounded w-16"></div>
                  </div>
                ))}
              </div>
            </div>
          ) : allCampaigns && allCampaigns.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      ID
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Title
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Creator
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Target
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Raised
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Deadline
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {allCampaigns.map((campaign) => (
                    <tr key={campaign.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        #{campaign.id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900 truncate max-w-xs">
                          {campaign.title || 'Untitled Campaign'}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {formatAddress(campaign.creator)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {formatCurrency(campaign.target)} ETH
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {formatCurrency(campaign.raised)} ETH
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          getCampaignStatus(campaign) === 'Active' ? 'bg-green-100 text-green-800' :
                          getCampaignStatus(campaign) === 'Successful' ? 'bg-blue-100 text-blue-800' :
                          getCampaignStatus(campaign) === 'Expired' ? 'bg-red-100 text-red-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {getCampaignStatus(campaign)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(campaign.deadline).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="text-gray-400 text-6xl mb-4">📊</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No campaigns yet</h3>
              <p className="text-gray-600">Campaigns will appear here once users start creating them.</p>
            </div>
          )}
        </div>

        {/* Platform Information */}
        <div className="bg-white rounded-lg p-6 shadow-md">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Platform Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Contract Details</h3>
              <div className="space-y-2 text-sm">
                <div>
                  <span className="text-gray-600">Contract Address:</span>
                  <div className="font-mono text-gray-900 break-all">
                    {process.env.NEXT_PUBLIC_CONTRACT_ADDRESS}
                  </div>
                </div>
                <div>
                  <span className="text-gray-600">Network:</span>
                  <span className="ml-2 text-gray-900">{process.env.NEXT_PUBLIC_CHAIN_NAME}</span>
                </div>
                <div>
                  <span className="text-gray-600">Admin Address:</span>
                  <div className="font-mono text-gray-900 break-all">
                    {ADMIN_ADDRESS}
                  </div>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Success Metrics</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Success Rate:</span>
                  <span className="text-gray-900">
                    {totalCampaigns > 0 ? ((successfulCampaigns.length / totalCampaigns) * 100).toFixed(1) : 0}%
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Average Raised:</span>
                  <span className="text-gray-900">
                    {totalCampaigns > 0 ? formatCurrency(totalRaised / totalCampaigns) : 0} ETH
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Active Rate:</span>
                  <span className="text-gray-900">
                    {totalCampaigns > 0 ? ((activeCampaigns.length / totalCampaigns) * 100).toFixed(1) : 0}%
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminPanel;
