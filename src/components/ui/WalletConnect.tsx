"use client";

import useWallet from '@/hooks/useWallet';
import useWalletStore from '@/store/walletStore';
import { formatAddress } from '@/lib/web3/client';

export default function WalletConnect() {
  const { isConnected, isCorrectNetwork } = useWalletStore();
  const { address, connectWallet, disconnectWallet, switchToBSC } = useWallet();
  
  // If not connected, show connect button
  if (!isConnected) {
    return (
      <button 
        onClick={connectWallet}
        className="bg-[#FFC909] hover:bg-[#e6b608] text-black font-bold py-2 px-4 rounded-full transition-colors text-sm sm:text-base"
      >
        Connect Wallet
      </button>
    );
  }
  
  // If connected but wrong network, show switch network button
  if (!isCorrectNetwork) {
    return (
      <button 
        onClick={switchToBSC}
        className="bg-[#FFC909] hover:bg-[#e6b608] text-black font-bold py-2 px-4 rounded-full transition-colors text-sm sm:text-base"
      >
        Switch to BSC
      </button>
    );
  }
  
  // If connected and correct network, show address and disconnect button
  return (
    <div className="flex items-center space-x-2">
      <div className="bg-[#E8F9FA] text-[#013D43] py-1 px-3 rounded-full font-medium text-xs sm:text-sm">
        {formatAddress(address || '')}
      </div>
      <button 
        onClick={disconnectWallet}
        className="bg-transparent hover:bg-[#013D43] text-[#013D43] hover:text-white font-semibold py-1 px-2 sm:px-3 border border-[#013D43] hover:border-transparent rounded-full transition-colors text-xs sm:text-sm"
      >
        Disconnect
      </button>
    </div>
  );
}
