'use client';
import { bscTestnet } from "@/config/chains";
import { wagmiAdapter, projectId } from "../config";
import { createAppKit, CreateAppKit } from "@reown/appkit";
import { mainnet, opBNBTestnet } from '@reown/appkit/networks';
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
    networks: [bscTestnet],
    features: {
        analytics: true
    },
    themeMode: 'light',
    themeVariables: {
      '--w3m-accent': '#FFBF00',
      '--w3m-font-family': 'Rubik, sans-serif',
      '--w3m-font-size-master': '10px',
    }
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