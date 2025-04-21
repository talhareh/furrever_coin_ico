"use client";

import { ChangeEvent, useState } from 'react';
import Image from 'next/image';
import { PaymentMethod } from '@/types/wallet';
import { cn } from '@/lib/utils';

interface TokenInputProps {
  value: string;
  onChange: (value: string) => void;
  selectedPaymentMethod: PaymentMethod;
  onSelectPaymentMethod: (method: PaymentMethod) => void;
  tokenAmount?: string;
  className?: string;
  disabled?: boolean;
}

export default function TokenInput({
  value,
  onChange,
  selectedPaymentMethod,
  onSelectPaymentMethod,
  tokenAmount = '0',
  className,
  disabled = false,
}: TokenInputProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    // Only allow numbers and decimal point
    const value = e.target.value.replace(/[^0-9.]/g, '');
    
    // Prevent multiple decimal points
    if (value.split('.').length > 2) return;
    
    onChange(value);
  };

  const toggleDropdown = () => {
    if (!disabled) {
      setIsDropdownOpen(!isDropdownOpen);
    }
  };

  const selectPaymentMethod = (method: PaymentMethod) => {
    onSelectPaymentMethod(method);
    setIsDropdownOpen(false);
  };

  return (
    <div className={cn("w-full", className)}>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Amount
      </label>
      
      <div className="relative">
        {/* Input field */}
        <div className="flex rounded-lg border border-gray-300 overflow-hidden">
          <input
            type="text"
            value={value}
            onChange={handleInputChange}
            disabled={disabled}
            placeholder="0.00"
            className="flex-1 p-3 focus:outline-none disabled:bg-gray-100"
          />
          
          {/* Payment method selector */}
          <button
            type="button"
            onClick={toggleDropdown}
            disabled={disabled}
            className="flex items-center justify-between px-3 bg-gray-50 border-l border-gray-300 min-w-[100px] disabled:opacity-50"
          >
            <span>{selectedPaymentMethod}</span>
            <Image 
              src="/assets/arrow-drop-down-48px.svg" 
              alt="Dropdown" 
              width={24} 
              height={24} 
              className={`transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`}
            />
          </button>
        </div>
        
        {/* Dropdown menu */}
        {isDropdownOpen && (
          <div className="absolute right-0 mt-1 w-[100px] bg-white border border-gray-300 rounded-md shadow-lg z-10">
            <ul>
              <li
                className={`px-4 py-2 hover:bg-gray-100 cursor-pointer ${
                  selectedPaymentMethod === 'BNB' ? 'bg-gray-100' : ''
                }`}
                onClick={() => selectPaymentMethod('BNB')}
              >
                BNB
              </li>
              <li
                className={`px-4 py-2 hover:bg-gray-100 cursor-pointer ${
                  selectedPaymentMethod === 'USDT' ? 'bg-gray-100' : ''
                }`}
                onClick={() => selectPaymentMethod('USDT')}
              >
                USDT
              </li>
            </ul>
          </div>
        )}
      </div>
      
      {/* Token amount display */}
      <div className="mt-2 p-3 bg-gray-50 rounded-lg border border-gray-200">
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600">You will receive:</span>
          <span className="font-bold text-[#68D9DA]">{tokenAmount} FURREVER</span>
        </div>
      </div>
    </div>
  );
}
