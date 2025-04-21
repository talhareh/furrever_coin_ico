"use client";

import { http, createConfig } from 'wagmi';
import { bscChain, bscTestnet } from '@/config/chains';
import { injected, metaMask } from 'wagmi/connectors';

// Set up wagmi config
export const wagmiConfig = createConfig({
  chains: [bscTestnet],
  transports: {
    [bscTestnet.id]: http(),
  },
  connectors: [
    metaMask(),
    injected(),
  ],
});

export const chains = [bscTestnet];
