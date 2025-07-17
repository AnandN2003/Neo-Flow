import "../styles/globals.css";
import "@rainbow-me/rainbowkit/styles.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiConfig } from "wagmi";
import { RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { Toaster } from "react-hot-toast";
import { wagmiConfig, chains } from "../config/wagmi";
import GlobalErrorBoundary from "../components/Layout/GlobalErrorBoundary";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);

  // Set client-side flag and apply dark theme globally
  useEffect(() => {
    setIsClient(true);
    // Always apply dark theme
    if (typeof window !== 'undefined') {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    }
  }, []);

  return (
    <GlobalErrorBoundary>
      <WagmiConfig config={wagmiConfig}>
        <QueryClientProvider client={queryClient}>
          {isClient ? (
            <RainbowKitProvider chains={chains}>
              <Component {...pageProps} />
              <Toaster 
                position="top-right"
                toastOptions={{
                  duration: 4000,
                  style: {
                    background: '#363636',
                    color: '#fff',
                  },
                }}
              />
            </RainbowKitProvider>
          ) : (
            // Fallback for SSR
            <div>
              <Component {...pageProps} />
              <Toaster 
                position="top-right"
                toastOptions={{
                  duration: 4000,
                  style: {
                    background: '#363636',
                    color: '#fff',
                  },
                }}
              />
            </div>
          )}
        </QueryClientProvider>
      </WagmiConfig>
    </GlobalErrorBoundary>
  );
}

export default MyApp;
