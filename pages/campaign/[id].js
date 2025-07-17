import { useRouter } from 'next/router';
import { useEffect } from 'react';

const CampaignRedirect = () => {
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (id) {
      // Redirect to the correct campaigns route
      const campaignId = Array.isArray(id) ? id[0] : id;
      router.replace(`/campaigns/${campaignId}`);
    }
  }, [id, router]);

  return <div>Redirecting...</div>;
};

export default CampaignRedirect;
