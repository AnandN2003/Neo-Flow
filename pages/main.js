import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Layout from '../components/Layout/Layout';
import CampaignCard from '../components/Campaign/CampaignCard';
import { LoadingGrid, EmptyState } from '../components/common/Loading';
import { CAMPAIGN_CATEGORIES } from '../constants';
import { useContract } from '../hooks/useContract';
import ClientOnly from '../components/common/ClientOnly';

const HomePage = () => {
  const router = useRouter();
  const { 
    allCampaigns, 
    activeCampaigns,
    successfulCampaigns,
    expiredCampaigns,
    isLoadingCampaigns, 
    refetchCampaigns 
  } = useContract();
  const [filteredCampaigns, setFilteredCampaigns] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [campaignFilter, setCampaignFilter] = useState('All'); // 'All', 'Active', 'Successful', 'Expired'

  const handleCreateCampaignClick = () => {
    console.log('Navigating to create campaign...');
    router.push('/create-campaign');
  };

  // Refetch campaigns when component mounts
  useEffect(() => {
    // Only refetch if we have a valid refetch function
    if (refetchCampaigns) {
      refetchCampaigns();
    }
  }, [refetchCampaigns]);

  useEffect(() => {
    // Filter campaigns based on status, category and search
    let filtered = allCampaigns || [];

    console.log('Filtering campaigns:', {
      totalCampaigns: filtered.length,
      campaignFilter,
      selectedCategory,
      searchTerm
    });

    // Filter by campaign status
    if (campaignFilter === 'Active') {
      filtered = activeCampaigns || [];
    } else if (campaignFilter === 'Successful') {
      filtered = successfulCampaigns || [];
    } else if (campaignFilter === 'Expired') {
      filtered = expiredCampaigns || [];
    }

    // Filter by category
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(campaign => campaign.category === selectedCategory);
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(campaign =>
        campaign.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        campaign.description?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    console.log('Filtered campaigns result:', {
      filteredCount: filtered.length,
      campaigns: filtered.map(c => ({ id: c.id, title: c.title, status: c.status }))
    });

    setFilteredCampaigns(filtered);
  }, [allCampaigns, activeCampaigns, successfulCampaigns, expiredCampaigns, campaignFilter, selectedCategory, searchTerm]);

  return (
    <Layout title="Explore Campaigns">
      <div className="space-y-6">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-8 text-white">
          <div className="max-w-3xl">
            <h1 className="text-4xl font-bold mb-4">
              Fund the Future with Blockchain
            </h1>
            <p className="text-xl mb-6">
              Discover innovative projects and help bring them to life through decentralized crowdfunding.
            </p>
            <div className="flex gap-4">
              <button 
                onClick={() => document.getElementById('campaigns-section')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-white text-blue-600 px-6 py-3 rounded-md font-semibold hover:bg-gray-100 transition-colors"
              >
                Explore Campaigns
              </button>
              <button 
                onClick={handleCreateCampaignClick}
                className="border border-white text-white px-6 py-3 rounded-md font-semibold hover:bg-white hover:text-blue-600 transition-colors"
              >
                Start a Campaign
              </button>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <ClientOnly fallback={
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white rounded-lg p-6 shadow-md">
                <div className="h-8 w-16 bg-gray-200 rounded animate-pulse mb-2"></div>
                <div className="h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
              </div>
            ))}
          </div>
        }>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg p-6 shadow-md">
              <div className="text-3xl font-bold text-blue-600 mb-2" suppressHydrationWarning>
                {allCampaigns?.length || 0}
              </div>
              <div className="text-gray-600">Total Campaigns</div>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-md">
              <div className="text-3xl font-bold text-green-600 mb-2" suppressHydrationWarning>
                {allCampaigns?.filter(campaign => 
                  campaign.isActive && new Date(campaign.deadline) > new Date()
                ).length || 0}
              </div>
              <div className="text-gray-600">Active Campaigns</div>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-md">
              <div className="text-3xl font-bold text-purple-600 mb-2" suppressHydrationWarning>
                {allCampaigns?.reduce((total, campaign) => 
                  total + parseFloat(campaign.raised || 0), 0
                ).toFixed(2) || "0.00"} ETH
              </div>
              <div className="text-gray-600">Total Raised</div>
            </div>
          </div>
        </ClientOnly>

        {/* Filters */}
        <div className="bg-white rounded-lg p-6 shadow-md">
          {/* Campaign Status Filter */}
          <div className="mb-4">
            <h4 className="text-sm font-medium text-gray-700 mb-2">Campaign Status</h4>
            <div className="flex flex-wrap gap-2">
              {['All', 'Active', 'Successful', 'Expired'].map((status) => (
                <button
                  key={status}
                  onClick={() => setCampaignFilter(status)}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    campaignFilter === status
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {status}
                  <span suppressHydrationWarning>
                    {status === 'All' && ` (${allCampaigns?.length || 0})`}
                    {status === 'Active' && ` (${activeCampaigns?.length || 0})`}
                    {status === 'Successful' && ` (${successfulCampaigns?.length || 0})`}
                    {status === 'Expired' && ` (${expiredCampaigns?.length || 0})`}
                  </span>
                </button>
              ))}
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
            {/* Search */}
            <div className="flex-1 max-w-md">
              <input
                type="text"
                placeholder="Search campaigns..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-2 items-center">
              <button
                onClick={() => setSelectedCategory('All')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  selectedCategory === 'All'
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                All
              </button>
              {CAMPAIGN_CATEGORIES.slice(0, 6).map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    selectedCategory === category
                      ? 'bg-indigo-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {category}
                </button>
              ))}
              
              {/* Refresh Button */}
              <button
                onClick={() => refetchCampaigns && refetchCampaigns()}
                className="px-4 py-2 rounded-md text-sm font-medium bg-green-100 text-green-700 hover:bg-green-200 transition-colors"
                title="Refresh campaigns"
              >
                🔄 Refresh
              </button>
            </div>
          </div>
        </div>

        {/* Campaigns Grid */}
        <div id="campaigns-section">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              {selectedCategory === 'All' ? 'All Campaigns' : `${selectedCategory} Campaigns`}
            </h2>
            <ClientOnly fallback={
              <div className="h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
            }>
              <div className="text-sm text-gray-600" suppressHydrationWarning>
                {filteredCampaigns.length} campaign{filteredCampaigns.length !== 1 ? 's' : ''} found
              </div>
            </ClientOnly>
          </div>

          <ClientOnly fallback={<LoadingGrid count={6} />}>
            {isLoadingCampaigns ? (
              <LoadingGrid count={6} />
            ) : filteredCampaigns.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCampaigns.map((campaign) => (
                  <CampaignCard key={campaign.id} campaign={campaign} />
                ))}
              </div>
            ) : (
              <EmptyState
                title="No campaigns found"
                description="Ready to create the first campaign? Smart contract is deployed and waiting!"
                icon="🚀"
                action={
                  <button 
                    onClick={handleCreateCampaignClick}
                    className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
                  >
                    Create First Campaign
                  </button>
                }
              />
            )}
          </ClientOnly>
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;
