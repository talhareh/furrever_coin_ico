import { create } from 'zustand';
import { PresaleEvent, PresaleStats, StageInfo } from '@/types/contract';

interface PresaleState {
  currentStage: number;
  presaleStatus: boolean;
  isPresaleEnded: boolean;
  soldToken: string;
  amountRaised: string;
  maxBuy: string;
  cooldownPeriod: string;
  lastBuyTimestamp: number;
  currentPhase: {
    tokenPerUsdPrice: bigint;
    tokensToSell: bigint;
    tokenSold: bigint;
  } | null;
  userContribution: string;
  recentEvents: PresaleEvent[];
  isLoading: boolean;
  error: string | null;
}

interface PresaleActions {
  setCurrentStage: (stage: number) => void;
  setPresaleStatus: (status: boolean) => void;
  setIsPresaleEnded: (ended: boolean) => void;
  setSoldToken: (soldToken: string) => void;
  setAmountRaised: (amountRaised: string) => void;
  setMaxBuy: (maxBuy: string) => void;
  setCooldownPeriod: (cooldownPeriod: string) => void;
  setLastBuyTimestamp: (timestamp: number) => void;
  setCurrentPhase: (phase: { tokenPerUsdPrice: bigint; tokensToSell: bigint; tokenSold: bigint }) => void;
  setUserContribution: (contribution: string) => void;
  addEvent: (event: PresaleEvent) => void;
  setIsLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
  reset: () => void;
}

// Create presale store
const usePresaleStore = create<PresaleState & PresaleActions>((set) => ({
  currentStage: 0,
  presaleStatus: false,
  isPresaleEnded: false,
  soldToken: '0',
  amountRaised: '0',
  maxBuy: '0',
  cooldownPeriod: '0',
  lastBuyTimestamp: 0,
  currentPhase: null,
  userContribution: '0',
  recentEvents: [],
  isLoading: false,
  error: null,
  
  setCurrentStage: (currentStage) => set({ currentStage }),
  
  setPresaleStatus: (presaleStatus) => set({ presaleStatus }),
  
  setIsPresaleEnded: (isPresaleEnded) => set({ isPresaleEnded }),
  
  setSoldToken: (soldToken) => set({ soldToken }),
  
  setAmountRaised: (amountRaised) => set({ amountRaised }),
  
  setMaxBuy: (maxBuy) => set({ maxBuy }),
  
  setCooldownPeriod: (cooldownPeriod) => set({ cooldownPeriod }),
  
  setLastBuyTimestamp: (lastBuyTimestamp) => set({ lastBuyTimestamp }),
  
  setCurrentPhase: (currentPhase) => set({ currentPhase }),
  
  setUserContribution: (userContribution) => set({ userContribution }),
  
  addEvent: (event) => set((state) => ({ 
    recentEvents: [event, ...state.recentEvents].slice(0, 10) 
  })),
  
  setIsLoading: (isLoading) => set({ isLoading }),
  
  setError: (error) => set({ error }),
  
  reset: () => set({
    currentStage: 0,
    presaleStatus: false,
    isPresaleEnded: false,
    soldToken: '0',
    amountRaised: '0',
    maxBuy: '0',
    cooldownPeriod: '0',
    lastBuyTimestamp: 0,
    currentPhase: null,
    userContribution: '0',
    recentEvents: [],
    isLoading: false,
    error: null,
  }),
}));

export default usePresaleStore;
