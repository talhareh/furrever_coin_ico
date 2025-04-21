"use client";

import { injected, metaMask } from 'wagmi/connectors';
import { bscChain, bscTestnet } from '@/config/chains';

// MetaMask connector
export const metaMaskConnector = metaMask();

// Injected connector (for other wallets)
export const injectedConnector = injected();
