import { useState } from 'react';
import { fetchFromIPFS, getIPFSUrl } from '../../utils/ipfs';
import { useContract } from '../../hooks/useContract';

const IPFSDebug = () => {
  const [testHash, setTestHash] = useState('');
  const [testResult, setTestResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const { allCampaigns, refreshCampaignMetadata } = useContract();

  const testIPFSFetch = async () => {
    if (!testHash) return;
    
    setLoading(true);
    try {
      console.log('Testing IPFS fetch for hash:', testHash);
      const result = await fetchFromIPFS(testHash);
      console.log('IPFS fetch result:', result);
      setTestResult(result);
    } catch (error) {
      console.error('IPFS fetch error:', error);
      setTestResult({ success: false, error: error.message });
    }
    setLoading(false);
  };

  return (
    <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg m-4">
      <h3 className="text-lg font-bold mb-4">IPFS Debug Tool</h3>
      
      <div className="mb-4">
        <h4 className="font-semibold mb-2">Current Campaigns:</h4>
        <pre className="bg-gray-100 p-2 rounded text-xs overflow-x-auto">
          {JSON.stringify(allCampaigns.map(c => ({
            id: c.id,
            title: c.title,
            image: c.image,
            metadataHash: c.metadataHash
          })), null, 2)}
        </pre>
      </div>

      <div className="mb-4">
        <button 
          onClick={refreshCampaignMetadata}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Refresh Campaign Metadata
        </button>
      </div>

      <div className="mb-4">
        <h4 className="font-semibold mb-2">Test IPFS Hash:</h4>
        <div className="flex gap-2">
          <input
            type="text"
            value={testHash}
            onChange={(e) => setTestHash(e.target.value)}
            placeholder="Enter IPFS hash to test"
            className="flex-1 border border-gray-300 rounded px-3 py-2"
          />
          <button
            onClick={testIPFSFetch}
            disabled={loading || !testHash}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 disabled:opacity-50"
          >
            {loading ? 'Testing...' : 'Test Fetch'}
          </button>
        </div>
      </div>

      {testResult && (
        <div className="mb-4">
          <h4 className="font-semibold mb-2">Test Result:</h4>
          <pre className="bg-gray-100 p-2 rounded text-xs overflow-x-auto">
            {JSON.stringify(testResult, null, 2)}
          </pre>
          
          {testResult.success && testResult.data && testResult.data.image && (
            <div className="mt-2">
              <h5 className="font-semibold">Image URL Test:</h5>
              <p className="text-sm">Original: {testResult.data.image}</p>
              <p className="text-sm">Full URL: {getIPFSUrl(testResult.data.image)}</p>
              <img 
                src={getIPFSUrl(testResult.data.image)} 
                alt="Test" 
                className="mt-2 max-w-xs"
                onLoad={() => console.log('Test image loaded successfully')}
                onError={(e) => console.error('Test image failed to load:', e)}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default IPFSDebug;
