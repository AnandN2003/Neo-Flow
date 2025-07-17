import React from 'react';

// Loading Spinner Component
export const LoadingSpinner = ({ size = 'md', className = '' }) => {
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-6 w-6',
    lg: 'h-8 w-8',
    xl: 'h-12 w-12'
  };

  return (
    <div className={`animate-spin rounded-full border-2 border-gray-200 border-t-blue-600 ${sizeClasses[size]} ${className}`} />
  );
};

// Loading Card Skeleton
export const LoadingCard = () => (
  <div className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse">
    <div className="h-48 bg-gray-200"></div>
    <div className="p-6">
      <div className="h-4 bg-gray-200 rounded mb-3"></div>
      <div className="h-3 bg-gray-200 rounded mb-2 w-3/4"></div>
      <div className="h-3 bg-gray-200 rounded mb-4 w-1/2"></div>
      
      <div className="flex justify-between items-center mb-4">
        <div className="h-3 bg-gray-200 rounded w-20"></div>
        <div className="h-3 bg-gray-200 rounded w-16"></div>
      </div>
      
      <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
        <div className="bg-gray-300 h-2 rounded-full w-1/3"></div>
      </div>
      
      <div className="flex justify-between items-center">
        <div className="h-3 bg-gray-200 rounded w-24"></div>
        <div className="h-3 bg-gray-200 rounded w-20"></div>
      </div>
    </div>
  </div>
);

// Loading State for Lists
export const LoadingGrid = ({ count = 6 }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {[...Array(count)].map((_, index) => (
      <LoadingCard key={index} />
    ))}
  </div>
);

// Page Loading Component
export const PageLoading = ({ message = 'Loading...' }) => (
  <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4">
    <LoadingSpinner size="xl" />
    <p className="text-gray-600 text-lg">{message}</p>
  </div>
);

// Button Loading State
export const LoadingButton = ({ children, loading, disabled, className = '', ...props }) => (
  <button
    disabled={disabled || loading}
    className={`flex items-center justify-center space-x-2 ${className} ${
      loading || disabled ? 'opacity-50 cursor-not-allowed' : ''
    }`}
    {...props}
  >
    {loading && <LoadingSpinner size="sm" />}
    <span>{children}</span>
  </button>
);

// Full Screen Loading Overlay
export const LoadingOverlay = ({ message = 'Processing...', visible = false }) => {
  if (!visible) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 flex flex-col items-center space-y-4 max-w-sm mx-4">
        <LoadingSpinner size="lg" />
        <p className="text-gray-700 text-center">{message}</p>
      </div>
    </div>
  );
};

// Error Boundary Component
export const ErrorFallback = ({ error, resetError }) => (
  <div className="min-h-[400px] flex items-center justify-center">
    <div className="text-center space-y-4 max-w-md mx-auto px-4">
      <div className="text-red-500 text-6xl">⚠️</div>
      <h2 className="text-2xl font-bold text-gray-900">Something went wrong</h2>
      <p className="text-gray-600">{error?.message || 'An unexpected error occurred'}</p>
      <button
        onClick={resetError}
        className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
      >
        Try Again
      </button>
    </div>
  </div>
);

// Empty State Component
export const EmptyState = ({ 
  title = 'No items found', 
  description = 'There are no items to display at the moment.',
  action,
  icon = '📭'
}) => (
  <div className="text-center py-12">
    <div className="text-6xl mb-4">{icon}</div>
    <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
    <p className="text-gray-600 mb-6 max-w-md mx-auto">{description}</p>
    {action && action}
  </div>
);

// Toast Notification (simple version)
export const Toast = ({ message, type = 'info', visible = false, onClose }) => {
  const typeStyles = {
    success: 'bg-green-50 text-green-800 border-green-200',
    error: 'bg-red-50 text-red-800 border-red-200',
    warning: 'bg-yellow-50 text-yellow-800 border-yellow-200',
    info: 'bg-blue-50 text-blue-800 border-blue-200'
  };

  if (!visible) return null;

  return (
    <div className="fixed top-4 right-4 z-50 max-w-sm">
      <div className={`border rounded-lg p-4 shadow-lg ${typeStyles[type]}`}>
        <div className="flex items-center justify-between">
          <p className="font-medium">{message}</p>
          <button
            onClick={onClose}
            className="ml-4 text-gray-400 hover:text-gray-600"
          >
            ×
          </button>
        </div>
      </div>
    </div>
  );
};
