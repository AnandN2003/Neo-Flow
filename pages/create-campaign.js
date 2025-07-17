import { useAccount } from 'wagmi';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import Layout from '../components/Layout/Layout';
import CreateCampaignForm from '../components/Campaign/CreateCampaignForm';

const CreateCampaign = () => {
  const { isConnected } = useAccount();
  const router = useRouter();

  useEffect(() => {
    if (!isConnected) {
      router.push('/');
    }
  }, [isConnected, router]);

  if (!isConnected) {
    return (
      <Layout title="Create Campaign">
        <div className="text-center py-12">
          <div className="text-gray-400 text-6xl mb-4">🔒</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Connect Your Wallet</h2>
          <p className="text-gray-600">Please connect your wallet to create a campaign.</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout title="Create Campaign">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Create New Campaign</h1>
          <p className="text-lg text-gray-600">
            Launch your project and start raising funds from the community. 
            Make sure to provide detailed information about your campaign to attract supporters.
          </p>
        </div>
        
        <CreateCampaignForm />
      </div>
    </Layout>
  );
};

export default CreateCampaign;