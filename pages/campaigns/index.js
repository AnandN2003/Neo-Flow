import { useRouter } from 'next/router';
import { useEffect } from 'react';

const CampaignsIndex = () => {
  const router = useRouter();

  useEffect(() => {
    // Redirect to main explore page
    router.replace('/');
  }, [router]);

  return null;
};

export default CampaignsIndex;
