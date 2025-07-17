import { useEffect } from 'react';
import { useRouter } from 'next/router';

const IndexPage = () => {
  const router = useRouter();

  useEffect(() => {
    // Redirect to landing page immediately
    router.replace('/landing');
  }, [router]);

  // Return null as this component will redirect immediately
  return null;
};

export default IndexPage;
