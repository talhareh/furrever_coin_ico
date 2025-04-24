"use client";

import { http, createConfig } from 'wagmi';
import { bscChain, bscTestnet } from '@/config/chains';
import { walletConnectConnector, metaMaskConnector, injectedConnector } from './connectors';

// Set up wagmi config
export const wagmiConfig = createConfig({
  chains: [bscTestnet],
  transports: {
    [bscTestnet.id]: http(),
  },
  connectors: [
    metaMaskConnector,
    walletConnectConnector,
    injectedConnector,
  ],
});

export const chains = [bscTestnet];
