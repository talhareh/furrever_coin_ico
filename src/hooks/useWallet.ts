"use client";

import { useEffect, useRef } from 'react';
import { useAccount, useConnect, useDisconnect, useChainId, useSwitchChain } from 'wagmi';
import { metaMaskConnector } from '@/lib/web3/connectors';
import useWalletStore from '@/store/walletStore';
import { BSC_CHAIN_ID } from '@/config/contract';
import { bscChain } from '@/config/chains';
import { toast } from 'react-toastify';
import { useAppKitAccount } from "@reown/appkit/react";
import { useAppKitNetwork } from "@reown/appkit/react";

const useWallet = () => {
  const { address, isConnected } = useAppKitAccount();
  const { connect } = useConnect();
  const { disconnect } = useDisconnect();
  const { switchChain } = useSwitchChain();
  const { chainId } = useAppKitNetwork()
  const { setAddress, setIsConnected, setChainId, setIsCorrectNetwork } = useWalletStore();

  // Ref to track previous connection state
  const prevConnectedRef = useRef(false);

  // Update wallet store when account changes
  useEffect(() => {
    if (address) {
      setAddress(address);
      setIsConnected(isConnected);
      
      // Show success toast only when wallet is newly connected
      if (isConnected && !prevConnectedRef.current) {
        
      }
    } else {
      setAddress('');
      setIsConnected(false);
    }
    
    // Update previous connection state
    prevConnectedRef.current = isConnected;
  }, [address, isConnected, setAddress, setIsConnected]);

  // Update chain ID and network status
  useEffect(() => {
    if (chainId) {
      setChainId(chainId);
      setIsCorrectNetwork(chainId === BSC_CHAIN_ID);
    }
  }, [chainId, setChainId, setIsCorrectNetwork]);

  // Connect to wallet
  const connectWallet = async () => {
    try {
      disconnect();
      await new Promise((resolve) => setTimeout(resolve, 100));
      await connect({ connector: metaMaskConnector });
    } catch (error) {
      console.error('Failed to connect wallet:', error);
      toast.error('Failed to connect wallet. Please try again.', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
        style: { backgroundColor: '#013D43', color: 'white' }
      });
    }
  };

  // Disconnect wallet
  const disconnectWallet = () => {
    try {
      disconnect();
      toast.info('Wallet disconnected', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
        style: { backgroundColor: '#013D43', color: 'white' }
      });
    } catch (error) {
      console.error('Failed to disconnect wallet:', error);
      toast.error('Failed to disconnect wallet. Please try again.', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
        style: { backgroundColor: '#013D43', color: 'white' }
      });
    }
  };

  // Switch to BSC network
  const switchToBSC = async () => {
    if (chainId !== BSC_CHAIN_ID) {
      try {
        await switchChain({ chainId: BSC_CHAIN_ID });
        toast.success('Switched to Binance Smart Chain Testnet', {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "colored",
          style: { backgroundColor: '#013D43', color: 'white' }
        });
      } catch (error) {
        console.error('Failed to switch network:', error);
        toast.error('Failed to switch network. Please try again.', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "colored",
          style: { backgroundColor: '#013D43', color: 'white' }
        });
      }
    }
  };

  return {
    address,
    isConnected,
    chainId,
    isCorrectNetwork: chainId === BSC_CHAIN_ID,
    connectWallet,
    disconnectWallet,
    switchToBSC,
  };
};

export default useWallet;
