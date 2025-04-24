"use client";

import { injected, metaMask, walletConnect } from 'wagmi/connectors';
import { bscChain, bscTestnet } from '@/config/chains';

// Project ID from environment variable
const projectId = process.env.NEXT_PUBLIC_PROJECT_ID;

if (!projectId) {
  throw new Error('NEXT_PUBLIC_PROJECT_ID is not defined');
}

// MetaMask connector
export const metaMaskConnector = metaMask();

// WalletConnect connector for mobile
export const walletConnectConnector = walletConnect({
  projectId,
  showQrModal: true,
  metadata: {
    name: 'FURREVER ICO',
    description: 'FURREVER ICO Dashboard',
    url: 'https://furrever.io',
    icons: ['https://furrever.io/favicon.ico']
  }
});

// Injected connector (for other wallets)
export const injectedConnector = injected();
