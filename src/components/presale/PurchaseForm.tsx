"use client";

import { useState, useEffect } from 'react';
import { parseEther, formatEther } from 'viem';
import { useAccount } from 'wagmi';
import Image from 'next/image';
import usePresale from '@/hooks/usePresale';
import usePresaleStore from '@/store/presaleStore';
import useWalletStore from '@/store/walletStore';
import { PaymentMethod } from '@/types/wallet';
import Alert from '@/components/ui/Alert';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ethers } from 'ethers';
import { CONTRACT_ADDRESSES } from '@/config/contract';
import { useAppKitAccount } from "@reown/appkit/react";
import { useAppKitNetwork } from "@reown/appkit/react";
export default function PurchaseForm() {
  
  const { address, isConnected, caipAddress, status, embeddedWalletInfo } =
  useAppKitAccount();
  const { isCorrectNetwork } = useWalletStore();
  const { currentStage } = usePresaleStore();
  const { buyTokens, buyTokensDirectBNB, isPending } = usePresale();
  const { caipNetwork, caipNetworkId, chainId, switchNetwork } = useAppKitNetwork()
  const [selected, setSelected] = useState<PaymentMethod>('BNB');
  const [inputAmount, setInputAmount] = useState<string>('');
  const [outputAmount, setOutputAmount] = useState<string>('0');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [bnbPrice, setBnbPrice] = useState<number>(0);
  const [tokenPerUsdPrice, setTokenPerUsdPrice] = useState<number>(0);
  
  // Icon mapping
  const iconMap: Record<string, string> = {
    'BNB': '/assets/binance.png',
    'USDT': '/assets/USDT.svg',
  };
  
  // Fetch token price and BNB price from contract
  useEffect(() => {
    const fetchPrices = async () => {
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
              "name": "currentStage",
              "outputs": [{ "internalType": "uint8", "name": "", "type": "uint8" }],
              "stateMutability": "view",
              "type": "function"
            }
          ],
          provider
        );
        
        // Get current stage
        const stage = await presaleContract.currentStage();
        console.log("Current stage from contract:", stage);
        
        // Get phase info for current stage
        const phaseInfo = await presaleContract.phases(stage);
        console.log("Phase info from contract:", {
          tokenPerUsdPrice: phaseInfo.tokenPerUsdPrice.toString(),
          tokensToSell: phaseInfo.tokensToSell.toString(),
          tokenSold: phaseInfo.tokenSold.toString()
        });
        
        // Get token price (tokens per USD)
        const tokensPerUsd = Number(ethers.formatUnits(phaseInfo.tokenPerUsdPrice, 18));
        console.log("Tokens per USD from contract:", tokensPerUsd);
        setTokenPerUsdPrice(tokensPerUsd);
        
        // Get BNB price
        const bnbPriceRaw = await presaleContract.getLatestPrice();
        const bnbPriceFormatted = Number(ethers.formatUnits(bnbPriceRaw, 8));
        console.log("BNB price from contract:", bnbPriceFormatted);
        setBnbPrice(bnbPriceFormatted);
      } catch (error) {
        console.error('Error fetching prices from contract:', error);
        // Set default values if fetch fails
        setTokenPerUsdPrice(2000000); // 2,000,000 tokens per USD (0.0000005 USD per token)
        setBnbPrice(300); // $300 per BNB
      }
    };
    
    fetchPrices();
  }, []);
  
  // Calculate token amount based on input
  useEffect(() => {
    if (!inputAmount) {
      setOutputAmount('0');
      return;
    }
    
    const amountValue = parseFloat(inputAmount);
    if (isNaN(amountValue) || amountValue <= 0) {
      setOutputAmount('0');
      return;
    }
    
    // Use token price from contract (or default if not available)
    const tokensPerUsd = tokenPerUsdPrice > 0 ? tokenPerUsdPrice : 2000000;
    
    let usdAmount;
    if (selected === 'BNB') {
      // Use BNB price from contract (or default if not available)
      const bnbPriceValue = bnbPrice > 0 ? bnbPrice : 300;
      usdAmount = amountValue * bnbPriceValue;
      console.log("BNB to USD:", amountValue, "BNB =", usdAmount, "USD (BNB price: $" + bnbPriceValue + ")");
    } else {
      // USDT is already in USD
      usdAmount = amountValue;
      console.log("USDT amount (USD):", usdAmount);
    }
    
    // Calculate tokens
    const tokens = usdAmount * tokensPerUsd;
    console.log("Calculated tokens:", tokens, "(using", tokensPerUsd, "tokens per USD)");
    
    // Format with commas
    setOutputAmount(tokens.toLocaleString(undefined, {
      maximumFractionDigits: 0
    }));
  }, [inputAmount, selected, tokenPerUsdPrice, bnbPrice]);
  
  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Only allow numbers and decimal point
    const value = e.target.value.replace(/[^0-9.]/g, '');
    
    // Prevent multiple decimal points
    if (value.split('.').length > 2) return;
    
    setInputAmount(value);
  };
  
  // Handle purchase
  const handleBuy = async () => {
    console.log("handleBuy called for USDT purchase");
    console.log("Wallet connected:", isConnected);
    console.log("Correct network:", isCorrectNetwork);
    console.log("Loading:", loading);
    console.log("isPending:", isPending);
    
    if (!isConnected) {
      toast.error('Please connect your wallet first', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
        style: { backgroundColor: '#013D43', color: 'white' }
      });
      return;
    }
    if (!inputAmount || parseFloat(inputAmount) <= 0) {
      toast.error('Please enter a valid amount', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
        style: { backgroundColor: '#013D43', color: 'white' }
      });
      return;
    }

    try {
      setLoading(true);
      setError('');
      setSuccess('');
      
      // Show pending toast
      const pendingToast = toast.loading(`Processing your purchase of ${outputAmount} FURR tokens...`, {
        position: "top-right",
      });
      
      // Call the buyTokens function from the usePresale hook
      const tx = await buyTokens(inputAmount, 'USDT');
      
      // Update the pending toast to success
      toast.update(pendingToast, { 
        render: `Successfully purchased ${outputAmount} FURR tokens!`, 
        type: "success", 
        isLoading: false,
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
        style: { backgroundColor: '#013D43', color: 'white' }
      });
      
      setSuccess(`Successfully purchased ${outputAmount} FURR tokens!`);
      setInputAmount('');
      setOutputAmount('0');
    } catch (err: Error | unknown) {
      console.error('Purchase error:', err);
      
      // Show error toast
      const errorMessage = err instanceof Error ? err.message : 'Failed to purchase tokens. Please try again.';
      toast.error(errorMessage, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
        style: { backgroundColor: '#013D43', color: 'white' }
      });
      
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };
  
  // Log component state on each render
  console.log("PurchaseForm render state:", {
    isConnected,
    isCorrectNetwork,
    loading,
    isPending,
    buttonDisabled: loading || isPending || !isConnected || !isCorrectNetwork
  });
  
  return (
    <div className="w-full flex flex-col items-center">
      {/* Token Selection Buttons */}
      <div className='flex w-[90%] justify-between mt-6 text-black font-bold font-poppins space-x-4 h-16 items-center'>
        {['BNB', 'USDT'].map((option) => (
          <button
            key={option}
            onClick={() => setSelected(option as PaymentMethod)}
            className={`rounded-3xl flex items-center justify-center space-x-3 px-5 py-2 w-1/2 ${
              selected === option ? 'border-4 border-[#013D43] bg-white scale-110 transform z-10' : 'border-2 border-[#013D43]/30 bg-white'
            }`}
            disabled={loading || isPending}
          >
            <p className={selected === option ? 'text-[#013D43]' : 'text-[#013D43]/70'}>{option}</p>
            <img 
              src={iconMap[option] || `/assets/Logo.svg`} 
              alt={`${option} icon`} 
              className='h-5 w-5' 
            />
          </button>
        ))}
      </div>

      {/* Inputs with dynamic icon */}
      <div className='flex w-[90%] justify-between mt-8 text-black font-bold font-poppins space-x-4'>
        {/* First input (icon changes based on selection) */}
        <div className='relative w-[45%]'>
          <input 
            className='bg-white border-2 border-[#013D43]/30 w-full px-4 py-2 pr-10 rounded-3xl text-[#013D43] placeholder-[#013D43]/50' 
            value={inputAmount}
            onChange={handleInputChange}
            placeholder="0.00"
            disabled={loading || isPending}
          />
          <div className='absolute right-3 top-1/2 transform -translate-y-1/2'>
            <span className="font-bold mr-1 text-[#013D43]">{selected}</span>
          </div>
        </div>

        {/* Second input (fixed logo) */}
        <div className='relative w-[45%]'>
          <input 
            className='bg-white border-2 border-[#013D43]/30 w-full px-4 py-2 pr-10 rounded-3xl text-[#013D43] placeholder-[#013D43]/50' 
            value={outputAmount}
            placeholder="0.00"
            readOnly
          />
          <div className='absolute right-3 top-1/2 transform -translate-y-1/2'>
            <span className="font-bold text-[#013D43]">FURR</span>
          </div>
        </div>
      </div>
   
      {/* Error message */}
      {error && (
        <p className="text-xs text-center mt-2 text-red-600">{error}</p>
      )}
      
      {/* Success message */}
      {success && (
        <p className=" text-center mt-4 text-green-600 p-3">{success}</p>
      )}
     
      {/* Buy Tokens Button */}
      <div className="mt-6 w-full">
      
        <button
          onClick={async (e) => {
            e.preventDefault();
            console.log("Debug button clicked");
            if (!isConnected) {
              console.log("Not connected, showing toast");
              toast.error('Please connect your wallet first', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                theme: "colored",
                style: { backgroundColor: '#013D43', color: 'white' }
              });
            } else if (chainId !== 97) {
              console.log("Wrong network, showing toast");
              toast.error('Please switch to Binance Smart Chain Testnet', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                theme: "colored",
                style: { backgroundColor: '#013D43', color: 'white' }
              });
            } else {
              console.log("All good, calling handleBuy");
              try {
                setLoading(true);
                setError(null);
                setSuccess('');
                
                // Show pending toast
                const pendingToast = toast.loading(`Processing your purchase of ${outputAmount} FURR tokens...`, {
                  position: "top-right",
                });
                
                // Use the standard buyTokens method for all purchases
                const tx = await buyTokens(inputAmount, selected);
                
                // Update the pending toast to success
                toast.update(pendingToast, { 
                  render: `Successfully purchased ${outputAmount} FURR tokens!`, 
                  type: "success", 
                  isLoading: false,
                  autoClose: 5000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  theme: "colored",
                  style: { backgroundColor: '#013D43', color: 'white' }
                });
                
                setSuccess(`Successfully purchased ${outputAmount} FURR tokens!`);
                setInputAmount('');
                setOutputAmount('0');
              } catch (err) {
                console.error('Purchase error:', err);
                
                // Show error toast
                const errorMessage = err instanceof Error ? err.message : 'Failed to purchase tokens. Please try again.';
                toast.error(errorMessage, {
                  position: "top-right",
                  autoClose: 5000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  theme: "colored",
                  style: { backgroundColor: '#013D43', color: 'white' }
                });
                
                setError(errorMessage);
              } finally {
                setLoading(false);
              }
            }
          }}
          className="w-full bg-[#FFC909] rounded-md text-black font-bold text-sm sm:text-base py-3 text-center hover:bg-[#e6b608] transition-colors"
        >
          {loading || isPending ? 'Processing...' : 'Buy Tokens'}
        </button>
      </div>
    </div>
  );
}
