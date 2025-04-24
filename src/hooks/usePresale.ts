"use client";

import { useCallback, useEffect, useState } from 'react';
import { useReadContract, useWriteContract, useAccount, usePublicClient } from 'wagmi';
import { parseEther } from 'viem';
import { CONTRACT_ADDRESSES, PRESALE_ABI, USDT_ABI } from '@/config/contract';
import usePresaleStore from '@/store/presaleStore';
import useWalletStore from '@/store/walletStore';
import { PaymentMethod } from '@/types/wallet';
import { ethers } from 'ethers';

const usePresale = () => {
  const { address } = useAccount();
  const publicClient = usePublicClient();
  
  const { 
    setCurrentStage, 
    setPresaleStatus, 
    setIsPresaleEnded, 
    setSoldToken, 
    setAmountRaised, 
    setMaxBuy, 
    setCooldownPeriod, 
    setLastBuyTimestamp, 
    setCurrentPhase,
    setUserContribution
  } = usePresaleStore();

  // Read current stage
  const { data: currentStageData } = useReadContract({
    address: CONTRACT_ADDRESSES.PRESALE,
    abi: PRESALE_ABI,
    functionName: 'currentStage',
  });

  // Read presale status
  const { data: presaleStatusData } = useReadContract({
    address: CONTRACT_ADDRESSES.PRESALE,
    abi: PRESALE_ABI,
    functionName: 'presaleStatus',
  });

  // Read if presale is ended
  const { data: isPresaleEndedData } = useReadContract({
    address: CONTRACT_ADDRESSES.PRESALE,
    abi: PRESALE_ABI,
    functionName: 'isPresaleEnded',
  });

  // Read total sold tokens
  const { data: soldTokenData } = useReadContract({
    address: CONTRACT_ADDRESSES.PRESALE,
    abi: PRESALE_ABI,
    functionName: 'soldToken',
  });

  // Read amount raised
  const { data: amountRaisedData } = useReadContract({
    address: CONTRACT_ADDRESSES.PRESALE,
    abi: PRESALE_ABI,
    functionName: 'amountRaised',
  });

  // Read max buy per transaction
  const { data: maxBuyData } = useReadContract({
    address: CONTRACT_ADDRESSES.PRESALE,
    abi: PRESALE_ABI,
    functionName: 'maxBuyPerTransaction',
  });

  // Read cooldown period
  const { data: cooldownPeriodData } = useReadContract({
    address: CONTRACT_ADDRESSES.PRESALE,
    abi: PRESALE_ABI,
    functionName: 'COOLDOWN_PERIOD',
  });

  // Read last buy timestamp for current user
  const { data: lastBuyTimestampData } = useReadContract({
    address: CONTRACT_ADDRESSES.PRESALE,
    abi: PRESALE_ABI,
    functionName: 'lastBuyTimestamp',
    args: [address],
    enabled: !!address,
  });

  // Read current phase info
  const { data: currentPhaseData } = useReadContract({
    address: CONTRACT_ADDRESSES.PRESALE,
    abi: PRESALE_ABI,
    functionName: 'phases',
    args: [currentStageData || 0],
    enabled: currentStageData !== undefined,
  });

  // Get user contribution
  const { data: userContributionData } = useReadContract({
    address: CONTRACT_ADDRESSES.PRESALE,
    abi: PRESALE_ABI,
    functionName: 'getUserContribution',
    args: [address],
    enabled: !!address,
  });

  // Write contract functions
  const { writeContractAsync: writeBuyWithBNB, isPending: isPendingBNB } = useWriteContract();
  const { writeContractAsync: writeApproveUSDT, isPending: isPendingApprove } = useWriteContract();
  const { writeContractAsync: writeBuyWithUSDT, isPending: isPendingUSDT } = useWriteContract();

  // Combined pending state
  const isPending = isPendingBNB || isPendingApprove || isPendingUSDT;
  //console.log("isPending states:", { isPendingBNB, isPendingApprove, isPendingUSDT, isPending });

  // Buy tokens
  const buyTokens = useCallback(async (amount: string, paymentMethod: PaymentMethod) => {
    console.log("buyTokens called with:", { amount, paymentMethod });
    console.log("Wallet address:", address);
    
    if (!address) throw new Error('Wallet not connected');
    
    try {
      if (paymentMethod === 'BNB') {
        console.log("Buying with BNB");
        // Buy with BNB
        const tx = await writeBuyWithBNB({
          address: CONTRACT_ADDRESSES.PRESALE,
          abi: PRESALE_ABI,
          functionName: 'buyToken',
          args: ["0xE2e2cF5Ce02EA7a0Bf196517d5F69DC0Ffee8aB2"], // Use owner address as referrer
          value: parseEther(amount),
        });
        
        console.log("BNB transaction hash:", tx);
        return tx;
      } else if (paymentMethod === 'USDT') {
        console.log("Buying with USDT");
        // Convert amount to USDT amount (assuming 1:1 for simplicity)
        const usdtAmount = parseEther(amount);
        
        console.log("Approving USDT amount:", usdtAmount.toString());
        // Approve USDT first
        const approveTx = await writeApproveUSDT({
          address: CONTRACT_ADDRESSES.USDT,
          abi: USDT_ABI,
          functionName: 'approve',
          args: [CONTRACT_ADDRESSES.PRESALE, usdtAmount],
        });
        
        console.log("USDT approval transaction hash:", approveTx);
        
        // Wait for approval to be mined
        console.log("Waiting for approval transaction to be mined...");
        await publicClient.waitForTransactionReceipt({ hash: approveTx });
        
        console.log("Approval confirmed, buying with USDT");
        // Buy with USDT
        const buyTx = await writeBuyWithUSDT({
          address: CONTRACT_ADDRESSES.PRESALE,
          abi: PRESALE_ABI,
          functionName: 'buyTokenUSDT',
          args: [usdtAmount, "0xE2e2cF5Ce02EA7a0Bf196517d5F69DC0Ffee8aB2"], // Use owner address as referrer
        });
        
        console.log("USDT buy transaction hash:", buyTx);
        return buyTx;
      }
    } catch (error) {
      console.error('Error buying tokens:', error);
      throw error;
    }
  }, [address, writeBuyWithBNB, writeApproveUSDT, writeBuyWithUSDT, publicClient]);

  // Buy tokens with direct contract call (for debugging)
  const buyTokensDirectBNB = useCallback(async (amount: string) => {
    console.log("buyTokensDirectBNB called with:", { amount });
    
    if (!address) {
      console.error("Wallet not connected");
      throw new Error('Wallet not connected');
    }
    
    try {
      console.log("Creating contract instance");
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      
      console.log("Signer address:", await signer.getAddress());
      
      const contract = new ethers.Contract(
        CONTRACT_ADDRESSES.PRESALE,
        PRESALE_ABI,
        signer
      );
      
      console.log("Contract instance created");
      console.log("Calling buyToken function");
      
      const tx = await contract.buyToken(
        "0xE2e2cF5Ce02EA7a0Bf196517d5F69DC0Ffee8aB2", // Use owner address as referrer
        { value: parseEther(amount) }
      );
      
      console.log("Transaction sent:", tx);
      return tx;
    } catch (error) {
      console.error("Error in direct BNB purchase:", error);
      throw error;
    }
  }, [address]);

  // Update store with contract data
  useEffect(() => {
    if (currentStageData !== undefined) setCurrentStage(Number(currentStageData));
    if (presaleStatusData !== undefined) setPresaleStatus(presaleStatusData);
    if (isPresaleEndedData !== undefined) setIsPresaleEnded(isPresaleEndedData);
    if (soldTokenData !== undefined) setSoldToken(soldTokenData.toString());
    if (amountRaisedData !== undefined) setAmountRaised(amountRaisedData.toString());
    if (maxBuyData !== undefined) setMaxBuy(maxBuyData.toString());
    if (cooldownPeriodData !== undefined) setCooldownPeriod(cooldownPeriodData.toString());
    if (lastBuyTimestampData !== undefined) setLastBuyTimestamp(Number(lastBuyTimestampData) * 1000);
    if (currentPhaseData !== undefined) setCurrentPhase(currentPhaseData);
    if (userContributionData !== undefined) setUserContribution(userContributionData.toString());
  }, [
    currentStageData,
    presaleStatusData,
    isPresaleEndedData,
    soldTokenData,
    amountRaisedData,
    maxBuyData,
    cooldownPeriodData,
    lastBuyTimestampData,
    currentPhaseData,
    userContributionData,
    setCurrentStage,
    setPresaleStatus,
    setIsPresaleEnded,
    setSoldToken,
    setAmountRaised,
    setMaxBuy,
    setCooldownPeriod,
    setLastBuyTimestamp,
    setCurrentPhase,
    setUserContribution
  ]);

  return {
    buyTokens,
    buyTokensDirectBNB,
    isPending,
  };
};

export default usePresale;
