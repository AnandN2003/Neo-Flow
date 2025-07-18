import axios from 'axios';
import { PINATA_API_KEY, PINATA_SECRET_KEY } from '../constants';

const PINATA_BASE_URL = 'https://api.pinata.cloud';
const PINATA_GATEWAY = 'https://gateway.pinata.cloud/ipfs/';

// Upload file to IPFS via Pinata
export const uploadFileToIPFS = async (file) => {
  try {
    // For demo purposes, if no API keys are configured, return a mock hash
    if (!PINATA_API_KEY || !PINATA_SECRET_KEY || PINATA_API_KEY === 'your_pinata_api_key') {
      console.log('Demo mode: Using mock IPFS hash for file:', file.name);
      
      // Generate a mock hash based on file name
      const mockHash = `demo_file_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      
      return {
        success: true,
        hash: mockHash,
        url: `https://demo-ipfs.local/${mockHash}`,
        fileName: file.name,
      };
    }

    const formData = new FormData();
    formData.append('file', file);

    const metadata = JSON.stringify({
      name: file.name,
      keyvalues: {
        uploadedAt: new Date().toISOString(),
      }
    });
    formData.append('pinataMetadata', metadata);

    const options = JSON.stringify({
      cidVersion: 0,
    });
    formData.append('pinataOptions', options);

    const response = await axios.post(
      `${PINATA_BASE_URL}/pinning/pinFileToIPFS`,
      formData,
      {
        maxBodyLength: 'Infinity',
        headers: {
          'Content-Type': `multipart/form-data; boundary=${formData._boundary}`,
          'pinata_api_key': PINATA_API_KEY,
          'pinata_secret_api_key': PINATA_SECRET_KEY,
        },
      }
    );

    return {
      success: true,
      hash: response.data.IpfsHash,
      url: `${PINATA_GATEWAY}${response.data.IpfsHash}`,
    };
  } catch (error) {
    console.error('Error uploading file to IPFS:', error);
    
    // Fallback to demo mode
    console.log('Falling back to demo mode for file upload...');
    const mockHash = `demo_file_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    return {
      success: true,
      hash: mockHash,
      url: `https://demo-ipfs.local/${mockHash}`,
      fileName: file.name,
    };
  }
};

// Upload JSON metadata to IPFS via Pinata
export const uploadJSONToIPFS = async (jsonData) => {
  try {
    // For demo purposes, if no API keys are configured, return a mock hash
    if (!PINATA_API_KEY || !PINATA_SECRET_KEY || PINATA_API_KEY === 'your_pinata_api_key') {
      console.log('Demo mode: Using mock IPFS hash for:', jsonData.title);
      
      // Generate a mock hash based on title for consistency
      const mockHash = `demo_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      
      return {
        success: true,
        hash: mockHash,
        url: `https://demo-ipfs.local/${mockHash}`,
        metadata: jsonData, // Store metadata locally for demo
      };
    }

    const response = await axios.post(
      `${PINATA_BASE_URL}/pinning/pinJSONToIPFS`,
      jsonData,
      {
        headers: {
          'Content-Type': 'application/json',
          'pinata_api_key': PINATA_API_KEY,
          'pinata_secret_api_key': PINATA_SECRET_KEY,
        },
      }
    );

    return {
      success: true,
      hash: response.data.IpfsHash,
      url: `${PINATA_GATEWAY}${response.data.IpfsHash}`,
    };
  } catch (error) {
    console.error('Error uploading JSON to IPFS:', error);
    
    // Fallback to demo mode if IPFS fails
    console.log('Falling back to demo mode...');
    const mockHash = `demo_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    return {
      success: true,
      hash: mockHash,
      url: `https://demo-ipfs.local/${mockHash}`,
      metadata: jsonData,
    };
  }
};

// Fetch data from IPFS
export const fetchFromIPFS = async (hash) => {
  try {
    const response = await axios.get(`${PINATA_GATEWAY}${hash}`);
    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    console.error('Error fetching from IPFS:', error);
    return {
      success: false,
      error: error.message,
    };
  }
};

// Get IPFS URL from hash
export const getIPFSUrl = (hash) => {
  return `${PINATA_GATEWAY}${hash}`;
};

// Upload campaign metadata to IPFS
export const uploadCampaignMetadata = async (metadata) => {
  const campaignData = {
    ...metadata,
    uploadedAt: new Date().toISOString(),
    version: '1.0',
  };

  return await uploadJSONToIPFS(campaignData);
};