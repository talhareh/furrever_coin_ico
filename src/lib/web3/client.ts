"use client";

import { createPublicClient, http } from 'viem';
import { bscChain, bscTestnet } from '@/config/chains';

// Create a public client for BSC
export const publicClient = createPublicClient({
  chain: bscTestnet,
  transport: http(),
});

// Export a function to get the formatted address
export const formatAddress = (address: string): string => {
  if (!address) return '';
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
};
