import { useState, useEffect } from 'react';

const NeoPointsToast = ({ show, points, isFirstDonation, onClose }) => {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        onClose();
      }, 5000); // Auto close after 5 seconds

      return () => clearTimeout(timer);
    }
  }, [show, onClose]);

  if (!show) return null;

  return (
    <div className="fixed top-4 right-4 z-50 max-w-sm">
      <div className="bg-white rounded-lg shadow-xl border border-purple-200 p-4 transform transition-all duration-300 ease-in-out">
        <div className="flex items-start">
          <div className="flex-shrink-0">
            <div className="text-2xl animate-bounce">💎</div>
          </div>
          <div className="ml-3 flex-1">
            <div className="text-sm font-medium text-gray-900">
              NeoPoints Earned!
            </div>
            <div className="text-2xl font-bold text-purple-600 mt-1">
              +{points.toLocaleString()} Points
            </div>
            {isFirstDonation && (
              <div className="text-xs text-green-600 mt-1 font-medium">
                🎉 First donation bonus included!
              </div>
            )}
            <div className="text-xs text-gray-500 mt-1">
              Thank you for supporting the community!
            </div>
          </div>
          <div className="ml-4 flex-shrink-0">
            <button
              onClick={onClose}
              className="bg-white rounded-md inline-flex text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
            >
              <span className="sr-only">Close</span>
              <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NeoPointsToast;
