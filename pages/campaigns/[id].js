import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Layout from '../../components/Layout/Layout';
import CampaignDetails from '../../components/Campaign/CampaignDetails';
import { useContract } from '../../hooks/useContract';

const CampaignPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const { getCampaignById, isLoading: isLoadingContract } = useContract();
  const [campaign, setCampaign] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCampaign = async () => {
      if (!id || !getCampaignById) {
        return;
      }

      try {
        setLoading(true);
        setError(null);
        console.log('Fetching campaign with ID:', id);
        
        const campaignData = await getCampaignById(id);
        console.log('Campaign data received:', campaignData);
        
        if (campaignData) {
          setCampaign(campaignData);
        } else {
          setError('Campaign not found');
        }
      } catch (err) {
        console.error('Error fetching campaign:', err);
        setError('Failed to load campaign');
      } finally {
        setLoading(false);
      }
    };

    fetchCampaign();
  }, [id]); // Only depend on id since getCampaignById is now a simple function

  if (loading || isLoadingContract) {
    return (
      <Layout title="Campaign Details">
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
      </Layout>
    );
  }

  if (error || !campaign) {
    return (
      <Layout title="Campaign Not Found">
        <div className="text-center py-12">
          <div className="text-gray-400 text-6xl mb-4">❌</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            {error || 'Campaign Not Found'}
          </h2>
          <p className="text-gray-600 mb-6">
            {error === 'Campaign not found' 
              ? "The campaign you're looking for doesn't exist or has been removed."
              : "There was an error loading this campaign. Please try again."
            }
          </p>
          <div className="space-x-4">
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-3 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors font-medium"
            >
              Try Again
            </button>
            <button
              onClick={() => router.push('/')}
              className="px-6 py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors font-medium"
            >
              Back to Campaigns
            </button>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout title={`Campaign #${Array.isArray(id) ? id[0] : id || 'Loading'}`}>
      <div className="max-w-6xl mx-auto">
        {/* Back Button */}
        <div className="mb-6">
          <button
            onClick={() => router.back()}
            className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Campaigns
          </button>
        </div>

        <CampaignDetails campaign={campaign} />
      </div>
    </Layout>
  );
};

export default CampaignPage;
