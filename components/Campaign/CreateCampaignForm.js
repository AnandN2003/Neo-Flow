import { useState } from 'react';
import { useRouter } from 'next/router';
import { parseEther } from 'ethers/lib/utils';
import { useContract } from '../../hooks/useContract';
import { uploadFileToIPFS, uploadCampaignMetadata } from '../../utils/ipfs';
import { validateFile } from '../../utils/helpers';
import { updateFundraiserLeaderboard } from '../../utils/rewards';
import { CAMPAIGN_CATEGORIES } from '../../constants';
import { useAccount } from 'wagmi';
import toast from 'react-hot-toast';

const CreateCampaignForm = () => {
  const router = useRouter();
  const { address } = useAccount();
  const { createCampaign, isCreatingCampaign, isContractAvailable, contractAddress } = useContract();
  
  // Debug logging
  console.log('Contract Debug:', {
    isContractAvailable,
    contractAddress,
    createCampaign: !!createCampaign,
    isCreatingCampaign
  });
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    target: '',
    deadline: '',
    category: '',
    image: null,
  });
  
  const [imagePreview, setImagePreview] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const validation = validateFile(file);
    if (!validation.valid) {
      toast.error(validation.error);
      return;
    }

    setFormData(prev => ({ ...prev, image: file }));
    
    // Create preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!isContractAvailable) {
      toast.error('Smart contract is not available. Please check your network connection and contract deployment.');
      return;
    }

    if (!createCampaign) {
      toast.error('Contract function not available. Please ensure your wallet is connected and the contract is deployed.');
      return;
    }
    
    if (!formData.title || !formData.description || !formData.target || !formData.deadline || !formData.category) {
      toast.error('Please fill in all required fields');
      return;
    }

    if (parseFloat(formData.target) <= 0) {
      toast.error('Target amount must be greater than 0');
      return;
    }

    if (new Date(formData.deadline) <= new Date()) {
      toast.error('Deadline must be in the future');
      return;
    }

    setIsUploading(true);
    
    try {
      let imageHash = '';
      
      // Upload image to IPFS if provided
      if (formData.image) {
        const imageResult = await uploadFileToIPFS(formData.image);
        if (!imageResult.success) {
          throw new Error('Failed to upload image');
        }
        imageHash = imageResult.hash;
      }

      // Create metadata object
      const metadata = {
        title: formData.title,
        description: formData.description,
        category: formData.category,
        image: imageHash,
        target: formData.target,
        deadline: formData.deadline,
      };

      // Upload metadata to IPFS
      const metadataResult = await uploadCampaignMetadata(metadata);
      if (!metadataResult.success) {
        throw new Error('Failed to upload campaign metadata');
      }

      // Create campaign on blockchain
      const targetInWei = parseEther(formData.target);
      const deadlineTimestamp = Math.floor(new Date(formData.deadline).getTime() / 1000);

      const result = await createCampaign({
        args: [targetInWei, deadlineTimestamp, metadataResult.hash],
      });

      // Update fundraiser leaderboard (campaign starts with 0 raised initially)
      if (address) {
        updateFundraiserLeaderboard(address, 0);
      }

      console.log('Campaign creation result:', result);
      toast.success('Campaign created successfully!');
      router.push('/my-campaigns');
      
    } catch (error) {
      console.error('Error creating campaign:', error);
      toast.error('Failed to create campaign: ' + error.message);
    } finally {
      setIsUploading(false);
    }
  };

  const isLoading = isCreatingCampaign || isUploading;
  const isButtonDisabled = isLoading || !isContractAvailable || !createCampaign;
  
  // Debug button state
  console.log('Button State:', {
    isLoading,
    isContractAvailable,
    createCampaign: !!createCampaign,
    isButtonDisabled
  });

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white shadow rounded-lg">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Create New Campaign</h2>
          <p className="mt-1 text-sm text-gray-600">
            Fill out the form below to create your crowdfunding campaign
          </p>
          
          {/* Contract Status Warning */}
          {!isContractAvailable && (
            <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-md">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-yellow-800">Contract Not Available</h3>
                  <p className="mt-1 text-sm text-yellow-700">
                    The smart contract is not deployed or not accessible. Please check your network connection and ensure the contract is deployed.
                    <br />
                    <span className="font-mono text-xs">Contract Address: {contractAddress || 'Not set'}</span>
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
        
        <form onSubmit={handleSubmit} className="px-6 py-4 space-y-6">
          {/* Campaign Title */}
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">
              Campaign Title *
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              placeholder="Enter your campaign title"
            />
          </div>

          {/* Description */}
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
              Description *
            </label>
            <textarea
              id="description"
              name="description"
              rows={4}
              value={formData.description}
              onChange={handleInputChange}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              placeholder="Describe your campaign in detail"
            />
          </div>

          {/* Category */}
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700">
              Category *
            </label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            >
              <option value="">Select a category</option>
              {CAMPAIGN_CATEGORIES.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          {/* Target Amount and Deadline */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="target" className="block text-sm font-medium text-gray-700">
                Target Amount (ETH) *
              </label>
              <input
                type="number"
                id="target"
                name="target"
                step="0.001"
                min="0"
                value={formData.target}
                onChange={handleInputChange}
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                placeholder="0.0"
              />
            </div>

            <div>
              <label htmlFor="deadline" className="block text-sm font-medium text-gray-700">
                Deadline *
              </label>
              <input
                type="datetime-local"
                id="deadline"
                name="deadline"
                value={formData.deadline}
                onChange={handleInputChange}
                required
                min={new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().slice(0, 16)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Campaign Image
            </label>
            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
              <div className="space-y-1 text-center">
                {imagePreview ? (
                  <div className="relative">
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="mx-auto h-32 w-32 object-cover rounded-md"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setImagePreview(null);
                        setFormData(prev => ({ ...prev, image: null }));
                      }}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs"
                    >
                      ×
                    </button>
                  </div>
                ) : (
                  <>
                    <svg
                      className="mx-auto h-12 w-12 text-gray-400"
                      stroke="currentColor"
                      fill="none"
                      viewBox="0 0 48 48"
                    >
                      <path
                        d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <div className="flex text-sm text-gray-600">
                      <label
                        htmlFor="image"
                        className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                      >
                        <span>Upload a file</span>
                        <input
                          id="image"
                          name="image"
                          type="file"
                          accept="image/*"
                          onChange={handleImageChange}
                          className="sr-only"
                        />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs text-gray-500">PNG, JPG, GIF up to 5MB</p>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={() => router.back()}
              className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isButtonDisabled}
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading 
                ? 'Creating...' 
                : !isContractAvailable 
                  ? 'Contract Not Available' 
                  : !createCampaign
                    ? 'Contract Function Not Ready'
                    : 'Create Campaign'
              }
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateCampaignForm;
