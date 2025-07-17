import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { useSSRSafeDate } from '../../hooks/useSSRSafeDate';
import { 
  formatCurrency, 
  calculatePercentage,
  getStatusColor 
} from '../../utils/helpers';

const CampaignCard = ({ campaign }) => {
  const { id, title, description, image, creator, target, raised, deadline, category, status: campaignStatus } = campaign;
  const { formatTimeRemaining, getCampaignStatus, isClient } = useSSRSafeDate();
  const [imageError, setImageError] = useState(false);
  
  const percentage = calculatePercentage(raised, target);
  const timeLeft = formatTimeRemaining(deadline);
  // Use the status from campaign data if available, otherwise calculate it
  const status = campaignStatus || getCampaignStatus(campaign);
  const statusColor = getStatusColor(status);

  const handleImageError = () => {
    console.log('Image failed to load:', image);
    setImageError(true);
  };

  return (
    <Link href={`/campaigns/${id}`} className="group">
      <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-200">
        {/* Campaign Image */}
        <div className="relative h-48 bg-gray-200">
          {image && !imageError ? (
            <>
              {/* Debug info */}
              {process.env.NODE_ENV === 'development' && (
                <div className="absolute top-0 left-0 bg-black bg-opacity-50 text-white text-xs p-1 z-10">
                  IMG: {image.substring(0, 30)}...
                </div>
              )}
              {/* Use regular img tag for IPFS images */}
              <img
                src={image}
                alt={title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                onError={handleImageError}
                onLoad={() => console.log('Image loaded successfully:', image)}
              />
            </>
          ) : (
            <div className="flex items-center justify-center h-full bg-gradient-to-br from-blue-400 to-purple-500">
              <span className="text-white text-4xl font-bold">{title?.charAt(0)}</span>
              {/* Debug info for fallback */}
              {process.env.NODE_ENV === 'development' && image && (
                <div className="absolute bottom-0 left-0 bg-red-500 text-white text-xs p-1">
                  IMG FAILED: {image.substring(0, 20)}...
                </div>
              )}
            </div>
          )}
          
          {/* Status Badge */}
          <div className="absolute top-3 right-3">
            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${statusColor}`} suppressHydrationWarning>
              {status}
            </span>
          </div>
          
          {/* Category Badge */}
          <div className="absolute top-3 left-3">
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-white/90 text-gray-700">
              {category}
            </span>
          </div>
        </div>

        {/* Campaign Content */}
        <div className="p-4">
          {/* Title */}
          <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
            {title}
          </h3>

          {/* Description */}
          <p className="text-gray-600 text-sm mb-3 line-clamp-2">
            {description}
          </p>

          {/* Progress Bar */}
          <div className="mb-3">
            <div className="flex justify-between text-sm text-gray-600 mb-1">
              <span>{formatCurrency(raised)} ETH raised</span>
              <span>{percentage.toFixed(1)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${Math.min(percentage, 100)}%` }}
              />
            </div>
          </div>

          {/* Campaign Stats */}
          <div className="flex justify-between items-center text-sm">
            <div className="text-gray-600">
              <span className="font-medium text-gray-900">{formatCurrency(target)} ETH</span>
              <span className="ml-1">goal</span>
            </div>
            <div className={`font-medium ${status === 'Expired' ? 'text-red-600' : 'text-green-600'}`} suppressHydrationWarning>
              {timeLeft}
            </div>
          </div>

          {/* Creator Info */}
          <div className="mt-3 pt-3 border-t border-gray-100">
            <div className="flex items-center">
              <div className="w-6 h-6 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center">
                <span className="text-white text-xs font-bold">
                  {creator?.slice(2, 4).toUpperCase()}
                </span>
              </div>
              <span className="ml-2 text-xs text-gray-500">
                by {creator?.slice(0, 6)}...{creator?.slice(-4)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CampaignCard;
