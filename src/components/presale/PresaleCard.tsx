"use client";

import { useState, useEffect, useRef, useCallback } from 'react';
import CountdownTimer from '@/components/ui/CountdownTimer';
import PurchaseForm from '@/components/presale/PurchaseForm';
import WalletConnect from '@/components/ui/WalletConnect';
import usePresaleStore from '@/store/presaleStore';
import useWalletStore from '@/store/walletStore';
import { formatBigInt } from '@/lib/utils';
import { ethers } from 'ethers';
import { CONTRACT_ADDRESSES } from '@/config/contract';
import AppKitButton from '../ui/AppKitButton';

export default function PresaleCard() {
  const { 
    currentStage, 
    presaleStatus, 
    isPresaleEnded, 
    soldToken, 
    amountRaised, 
    currentPhase, 
    isLoading 
  } = usePresaleStore();
  const { isConnected } = useWalletStore();
  const [progress, setProgress] = useState(0);
  const [formattedAmountRaised, setFormattedAmountRaised] = useState('0');
  const [tokenUsdValue, setTokenUsdValue] = useState(0.0000005);
  const [latestBnbPrice, setLatestBnbPrice] = useState(0);
  
  // Calculate progress directly from contract
  const calculateProgress = useCallback(async () => {
    try {
      // Create a provider
      const provider = new ethers.JsonRpcProvider('https://data-seed-prebsc-1-s1.binance.org:8545');
      
      // Create a contract instance
      const presaleContract = new ethers.Contract(
        CONTRACT_ADDRESSES.PRESALE,
        [
          {
            "inputs": [],
            "name": "currentStage",
            "outputs": [{ "internalType": "uint8", "name": "", "type": "uint8" }],
            "stateMutability": "view",
            "type": "function"
          },
          {
            "inputs": [{ "internalType": "uint8", "name": "", "type": "uint8" }],
            "name": "phases",
            "outputs": [
              { "internalType": "uint256", "name": "tokenPerUsdPrice", "type": "uint256" },
              { "internalType": "uint256", "name": "tokensToSell", "type": "uint256" },
              { "internalType": "uint256", "name": "tokenSold", "type": "uint256" }
            ],
            "stateMutability": "view",
            "type": "function"
          },
          {
            "inputs": [],
            "name": "getLatestPrice",
            "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
            "stateMutability": "view",
            "type": "function"
          }
        ],
        provider
      );
      
      try {
        // Get current stage
        const stage = await presaleContract.currentStage();
        
        
        // Get phase info for current stage
        const phaseInfo = await presaleContract.phases(stage);
        
        
        // Calculate progress
        const totalTokens = Number(ethers.formatUnits(phaseInfo.tokensToSell, 18));
        const soldTokens = Number(ethers.formatUnits(phaseInfo.tokenSold, 18));
        
        // Use BigInt for more accurate calculation with large numbers
        const totalTokensBigInt = BigInt(phaseInfo.tokensToSell);
        const soldTokensBigInt = BigInt(phaseInfo.tokenSold);
        
        // Calculate progress using BigInt for precision
        const progressRatio = Number((soldTokensBigInt * BigInt(10000)) / totalTokensBigInt) / 100;
        
        
        
        // Set progress (ensure it's between 0 and 100)
        setProgress(Math.min(Math.max(progressRatio, 0), 100));
        
        // Calculate USD raised based on tokens sold and token price
        try {
          // Get BNB price
          const bnbPriceRaw = await presaleContract.getLatestPrice();
          const bnbPrice = Number(ethers.formatUnits(bnbPriceRaw, 8));
         
          
          // Calculate USD raised based on tokens sold and token price
          const tokensPerUsd = Number(ethers.formatUnits(phaseInfo.tokenPerUsdPrice, 18));
          const usdRaised = soldTokens / tokensPerUsd;
          // Format and set the total USD raised
          setFormattedAmountRaised(usdRaised.toFixed(2));
        } catch (priceError) {
          console.error("Error calculating USD raised:", priceError);
          setFormattedAmountRaised("0.00");
        }
      } catch (phaseError) {
        console.error("Error getting phase info:", phaseError);
        setProgress(10); // Default to 10% if calculation fails
        setFormattedAmountRaised("0.00");
      }
    } catch (error) {
      console.error("Error calculating progress:", error);
      // Set default values
      setProgress(10); // Default to 10% if calculation fails
      setFormattedAmountRaised("0.00");
    }
  }, []);
  
  // Calculate progress on component mount and periodically
  useEffect(() => {
    calculateProgress();
    
    // Update progress every 30 seconds
    const intervalId = setInterval(calculateProgress, 30000);
    
    return () => clearInterval(intervalId);
  }, [calculateProgress]);
  
  // Fetch BNB price
  const fetchBnbPrice = useCallback(async () => {
    try {
      // Create a provider
      const provider = new ethers.JsonRpcProvider('https://data-seed-prebsc-1-s1.binance.org:8545');
      
      // Create a contract instance
      const presaleContract = new ethers.Contract(
        CONTRACT_ADDRESSES.PRESALE,
        [
          {
            "inputs": [],
            "name": "getLatestPrice",
            "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
            "stateMutability": "view",
            "type": "function"
          }
        ],
        provider
      );
      
      // Call the getLatestPrice function
      const bnbPriceRaw = await presaleContract.getLatestPrice();
      const bnbPrice = Number(ethers.formatUnits(bnbPriceRaw, 8));
      
      setLatestBnbPrice(bnbPrice);
    } catch (error) {
      console.error('Error fetching BNB price:', error);
      setLatestBnbPrice(587); // Fallback to a default value
    }
  }, []);
  
  // Fetch BNB price on component mount
  useEffect(() => {
    fetchBnbPrice();
  }, [fetchBnbPrice]);
  
  // Fetch token price directly from contract
  const fetchTokenPrice = useCallback(async () => {
    try {
      // Create a provider
      const provider = new ethers.JsonRpcProvider('https://data-seed-prebsc-1-s1.binance.org:8545');
      
      // Create a contract instance
      const presaleContract = new ethers.Contract(
        CONTRACT_ADDRESSES.PRESALE,
        [
          {
            "inputs": [],
            "name": "currentStage",
            "outputs": [{ "internalType": "uint8", "name": "", "type": "uint8" }],
            "stateMutability": "view",
            "type": "function"
          },
          {
            "inputs": [{ "internalType": "uint8", "name": "", "type": "uint8" }],
            "name": "phases",
            "outputs": [
              { "internalType": "uint256", "name": "tokenPerUsdPrice", "type": "uint256" },
              { "internalType": "uint256", "name": "tokensToSell", "type": "uint256" },
              { "internalType": "uint256", "name": "tokenSold", "type": "uint256" }
            ],
            "stateMutability": "view",
            "type": "function"
          }
        ],
        provider
      );
      
      // Get current stage
      const stage = await presaleContract.currentStage();
      
      
      // Get phase info for current stage
      const phaseInfo = await presaleContract.phases(stage);
      
      
      // Calculate token price (USD per token)
      const tokensPerUsd = Number(ethers.formatUnits(phaseInfo.tokenPerUsdPrice, 18));
      
      const usdPerToken = tokensPerUsd > 0 ? 1 / tokensPerUsd : 0;
      
      setTokenUsdValue(usdPerToken);
    } catch (error) {
      console.error("Error fetching token price:", error);
      // Set default value
      setTokenUsdValue(0.0000005); // Default to 0.0000005 USD per token
    }
  }, []);
  
  // Fetch token price on component mount
  useEffect(() => {
    fetchTokenPrice();
    
    // Update token price every 30 seconds
    const intervalId = setInterval(fetchTokenPrice, 30000);
    
    return () => clearInterval(intervalId);
  }, [fetchTokenPrice]);
  
  // Get stage label
  const getStageLabel = (stage: number) => {
    switch(stage) {
      case 0: return "Seed";
      case 1: return "Private";
      case 2: return "Public";
      default: return `Stage ${stage + 1}`;
    }
  };
  
  // Set the presale end date to April 28, 2025 at 10 PM GST (future date)
  const presaleEndDate = new Date('2025-04-28T22:00:00+04:00').getTime();
  
  return (
    <div className="bg-[#6BCCD5] rounded-3xl shadow-lg p-6 w-fit mx-auto">
      {isLoading ? (
        <div className="flex justify-center items-center h-40">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
        </div>
      ) : (
        <>
          <div className="text-center mb-6 items-center flex flex-col">
            <CountdownTimer targetTimestamp={presaleEndDate} />
            <h2 className="text-2xl font-bold text-[#013D43] mt-8">FURREVER Presale</h2>
            <p className="text-gray-600 mt-1">Current Stage: {getStageLabel(currentStage)} (Stage {currentStage + 1})</p>
            <div className='flex items-center gap-2'>
              <img src='/assets/Logo.svg' className='w-4'/>
              <p className="text-gray-600 mt-1">
                Token Price: ${tokenUsdValue > 0 ? tokenUsdValue.toFixed(9) : "0.0000005"}
              </p>
            </div>
            <p className="text-gray-600 mt-1">1 BNB = ${latestBnbPrice.toLocaleString(undefined, {maximumFractionDigits: 2})}</p>
          </div>
          
          {/* Progress bar */}
          <div className="w-full bg-white rounded-full h-2.5 mb-4">
            <div 
              className="bg-[#013D43] h-2.5 rounded-full" 
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          
          <div className="flex justify-between text-sm text-gray-600 mb-6">
            <span>{progress.toFixed(2)}% Filled</span>
            <span>Total Raised: ${formattedAmountRaised}</span>
          </div>
          
          <PurchaseForm />
          
          <div className="mt-4 flex justify-center items-center w-full">
              <AppKitButton />
            </div>

        </>
      )}
    </div>
  );
}
