import { create } from 'zustand';
import { WalletState } from '@/types/wallet';
import { BSC_CHAIN_ID } from '@/config/contract';

// Create wallet store
const useWalletStore = create<WalletState & {
  setAddress: (address: string | null) => void;
  setIsConnected: (isConnected: boolean) => void;
  setIsConnecting: (isConnecting: boolean) => void;
  setChainId: (chainId: number | null) => void;
  setIsCorrectNetwork: (isCorrectNetwork: boolean) => void;
  setIsOwner: (isOwner: boolean) => void;
  setError: (error: string | null) => void;
  reset: () => void;
}>((set) => ({
  address: null,
  isConnected: false,
  isConnecting: false,
  chainId: null,
  isCorrectNetwork: false,
  isOwner: false,
  error: null,
  
  setAddress: (address) => set({ address }),
  
  setIsConnected: (isConnected) => set({ isConnected }),
  
  setIsConnecting: (isConnecting) => set({ isConnecting }),
  
  setChainId: (chainId) => set({ chainId }),
  
  setIsCorrectNetwork: (isCorrectNetwork) => set({ isCorrectNetwork }),
  
  setIsOwner: (isOwner) => set({ isOwner }),
  
  setError: (error) => set({ error }),
  
  reset: () => set({
    address: null,
    isConnected: false,
    isConnecting: false,
    chainId: null,
    isCorrectNetwork: false,
    isOwner: false,
    error: null,
  }),
}));

export default useWalletStore;
