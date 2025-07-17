import { useState, useEffect } from 'react';
import Head from 'next/head';
import Header from './Header';
import Sidebar from './Sidebar';
import NeoPointsToast from '../common/NeoPointsToast';
import { PLATFORM_NAME } from '../../constants';

const Layout = ({ children, title = 'Decentralized Crowdfunding Platform' }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showNeoPointsToast, setShowNeoPointsToast] = useState(false);
  const [toastData, setToastData] = useState({ points: 0, isFirstDonation: false });

  // Listen for NeoPoints earned events
  useEffect(() => {
    const handleNeoPointsEarned = (event) => {
      setToastData(event.detail);
      setShowNeoPointsToast(true);
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('neoPointsEarned', handleNeoPointsEarned);
      return () => window.removeEventListener('neoPointsEarned', handleNeoPointsEarned);
    }
  }, []);

  // Ensure title is always a string to prevent React hydration warnings
  const safeTitle = Array.isArray(title) ? title[0] : title || 'Decentralized Crowdfunding Platform';

  return (
    <>
      <Head>
        <title>{safeTitle} - {PLATFORM_NAME}</title>
        <meta name="description" content="Decentralized crowdfunding platform built on blockchain" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/logo.png" />
      </Head>
      
      <div className="min-h-screen bg-gray-50">
        {/* Sidebar */}
        <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
        
        {/* Main Content */}
        <div className="lg:pl-72">
          {/* Header */}
          <Header onMenuClick={() => setSidebarOpen(true)} />
          
          {/* Page Content */}
          <main className="py-6">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              {children}
            </div>
          </main>
        </div>
        
        {/* NeoPoints Toast Notification */}
        <NeoPointsToast
          show={showNeoPointsToast}
          points={toastData.points}
          isFirstDonation={toastData.isFirstDonation}
          onClose={() => setShowNeoPointsToast(false)}
        />
      </div>
    </>
  );
};

export default Layout;
