"use client";

import useEvents from '@/hooks/useEvents';
import usePresaleStore from '@/store/presaleStore';
import { formatBigInt } from '@/lib/utils';
import { formatAddress } from '@/lib/web3/client';
import Image from 'next/image';

export default function SaleEvents() {
  const { recentEvents } = usePresaleStore();
  
  // Initialize event listener
  useEvents();
  
  if (recentEvents.length === 0) {
    return (
      <div className="bg-[#6BCCD5] rounded-3xl shadow-lg p-6 max-w-4xl mx-auto">
        <h3 className="text-2xl font-bold text-[#013D43] mb-4 text-center">
          Recent Transactions
        </h3>
        <p className="text-white text-center py-8 text-lg">No transactions yet</p>
      </div>
    );
  }
  
  return (
    <div className="bg-[#6BCCD5] rounded-3xl shadow-lg p-6 max-w-4xl mx-auto">
      <h3 className="text-2xl font-bold text-[#013D43] mb-6 text-center">
        Recent Transactions
      </h3>
      
      <div className="space-y-4">
        {recentEvents.map((event, index) => {
          // Check if it's a TokensPurchased event
          if ('buyer' in event) {
            return (
              <div key={index} className="bg-white rounded-2xl p-4 flex justify-between items-center hover:shadow-md transition-shadow">
                <div className="flex items-center">
                  <div className="bg-[#E8F9FA] p-2 rounded-full mr-3">
                    <Image 
                      src="/assets/Logo.svg" 
                      alt="FURREVER" 
                      width={24} 
                      height={24} 
                    />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">{formatAddress(event.buyer)}</span> purchased
                    </p>
                    <p className="font-bold text-[#013D43]">
                      {formatBigInt(event.tokens)} FURR
                    </p>
                  </div>
                </div>
                <a
                  href={`https://bscscan.com/tx/${event.transactionHash}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#013D43] hover:text-[#013D43]/80 bg-[#E8F9FA] px-3 py-1 rounded-full text-sm font-medium"
                >
                  View
                </a>
              </div>
            );
          }
          
          // Check if it's a StageUpdated event
          if ('stage' in event) {
            return (
              <div key={index} className="bg-white rounded-2xl p-4 flex justify-between items-center hover:shadow-md transition-shadow">
                <div className="flex items-center">
                  <div className="bg-[#E8F9FA] p-2 rounded-full mr-3">
                    <Image 
                      src="/assets/Logo.svg" 
                      alt="FURREVER" 
                      width={24} 
                      height={24} 
                    />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">
                      Presale stage updated
                    </p>
                    <p className="font-bold text-[#013D43]">
                      Stage {Number(event.stage) + 1} activated
                    </p>
                  </div>
                </div>
                <a
                  href={`https://bscscan.com/tx/${event.transactionHash}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#013D43] hover:text-[#013D43]/80 bg-[#E8F9FA] px-3 py-1 rounded-full text-sm font-medium"
                >
                  View
                </a>
              </div>
            );
          }
          
          return null;
        })}
      </div>
    </div>
  );
}
