'use client';

import { wagmiAdapter, projectId } from "../config";
import { createAppKit, CreateAppKit } from "@reown/appkit";
import { mainnet, arbitrum } from '@reown/appkit/networks';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React, {type ReactNode} from 'react';

import { cookieToInitialState, WagmiProvider, type Config } from "wagmi";

const queryClient = new QueryClient();


if (!projectId) {
    throw new Error('Project Id is not defined')
}

const metadata = {name: 'appkit-example', 
    description: "AppKit Example - EVM", 
    url: "https://exampleapp.com", 
    icons: ["https://avatars.githubuserconent.com/u/37784886"]
}

const modal = createAppKit({
    adapters: [wagmiAdapter],
    projectId: projectId,
    networks: [mainnet, arbitrum],
    features: {
        analytics: true,
        email: true,
        socials: ['google', 'x', 'apple', 'discord', 'github'],
        emailShowWallets: true
    },
    themeMode: 'light'
})

interface ContextProducerProps {
    children: ReactNode;
    cookies: string | null;
  }
function ContextProvider({ children, cookies }: ContextProducerProps) {
    const initialState = cookieToInitialState(wagmiAdapter.wagmiConfig, cookies);
  
    return (
        <WagmiProvider config={wagmiAdapter.wagmiConfig} initialState={initialState}>
         <QueryClientProvider client={queryClient}>
        
          {children}
      
        </QueryClientProvider>
      </WagmiProvider>
    );
  }

  export default ContextProvider;