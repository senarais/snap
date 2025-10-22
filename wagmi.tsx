// wagmi.tsx
'use client'; // Pastikan ini adalah Client Component

import { ReactNode } from 'react';
import { WagmiConfig, createConfig } from 'wagmi';
import { mainnet, sepolia } from 'wagmi/chains';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ConnectKitProvider, getDefaultConfig } from 'connectkit';

// 1. Buat QueryClient
const queryClient = new QueryClient();

// 2. Buat konfigurasi wagmi
const config = createConfig(
  getDefaultConfig({
    appName: 'Your App Name',
    walletConnectProjectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID ?? '', // fallback aman
    chains: [mainnet, sepolia],
    ssr: true, // jika pakai App Router
  })
);

// 3. Ekspor komponen Provider
export const Web3Provider = ({ children }: { children: ReactNode }) => {
  return (
    <WagmiConfig config={config}>
      <QueryClientProvider client={queryClient}>
        <ConnectKitProvider>{children}</ConnectKitProvider>
      </QueryClientProvider>
    </WagmiConfig>
  );
};
