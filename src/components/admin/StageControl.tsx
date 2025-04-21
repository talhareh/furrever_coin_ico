"use client";

import { useState, FormEvent } from 'react';
import { useContractWrite } from 'wagmi';
import Button from '@/components/ui/Button';
import Alert from '@/components/ui/Alert';
import { CONTRACT_ADDRESSES, PRESALE_ABI } from '@/config/contract';

export default function StageControl() {
  // Form state
  const [stage, setStage] = useState('');
  const [price, setPrice] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [totalTokens, setTotalTokens] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);
  
  // Contract write hook
  const { write: setStageContract, isPending: isLoading } = useContractWrite({
    address: CONTRACT_ADDRESSES.PRESALE as `0x${string}`,
    abi: PRESALE_ABI,
    functionName: 'setStage',
  });
  
  // Handle form submission
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    // Reset status
    setError(null);
    setSuccess(false);
    
    // Validate inputs
    if (!stage || !price || !startTime || !endTime || !totalTokens) {
      setError('All fields are required');
      return;
    }
    
    // Parse inputs
    const stageNumber = parseInt(stage);
    const priceValue = parseFloat(price);
    const startTimeValue = new Date(startTime).getTime() / 1000; // Convert to seconds
    const endTimeValue = new Date(endTime).getTime() / 1000; // Convert to seconds
    const totalTokensValue = parseFloat(totalTokens);
    
    // Validate parsed values
    if (isNaN(stageNumber) || stageNumber < 0) {
      setError('Invalid stage number');
      return;
    }
    
    if (isNaN(priceValue) || priceValue <= 0) {
      setError('Invalid price');
      return;
    }
    
    if (isNaN(startTimeValue) || startTimeValue <= 0) {
      setError('Invalid start time');
      return;
    }
    
    if (isNaN(endTimeValue) || endTimeValue <= startTimeValue) {
      setError('End time must be after start time');
      return;
    }
    
    if (isNaN(totalTokensValue) || totalTokensValue <= 0) {
      setError('Invalid total tokens');
      return;
    }
    
    try {
      // Convert price to wei (18 decimals)
      const priceInWei = BigInt(Math.floor(priceValue * 10**18));
      
      // Convert total tokens to wei (18 decimals)
      const totalTokensInWei = BigInt(Math.floor(totalTokensValue * 10**18));
      
      // Call contract
      await setStageContract({
        args: [
          BigInt(stageNumber),
          priceInWei,
          BigInt(Math.floor(startTimeValue)),
          BigInt(Math.floor(endTimeValue)),
          totalTokensInWei,
        ],
      });
      
      // Show success message
      setSuccess(true);
      
      // Reset form
      setStage('');
      setPrice('');
      setStartTime('');
      setEndTime('');
      setTotalTokens('');
    } catch (error: Error | unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to set stage';
      console.error('Failed to set stage:', error);
      setError(errorMessage);
    }
  };
  
  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-bold text-[#68D9DA] mb-4">
        Manage Presale Stage
      </h3>
      
      {/* Error message */}
      {error && (
        <Alert variant="error" className="mb-4">
          {error}
        </Alert>
      )}
      
      {/* Success message */}
      {success && (
        <Alert variant="success" className="mb-4">
          Stage updated successfully!
        </Alert>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Stage Number
            </label>
            <input
              type="number"
              value={stage}
              onChange={(e) => setStage(e.target.value)}
              className="w-full rounded-lg border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-[#68D9DA]"
              min="0"
              placeholder="0"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Token Price (USD)
            </label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full rounded-lg border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-[#68D9DA]"
              min="0"
              step="0.0001"
              placeholder="0.01"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Start Time
            </label>
            <input
              type="datetime-local"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              className="w-full rounded-lg border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-[#68D9DA]"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              End Time
            </label>
            <input
              type="datetime-local"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              className="w-full rounded-lg border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-[#68D9DA]"
              required
            />
          </div>
          
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Total Tokens for Stage
            </label>
            <input
              type="number"
              value={totalTokens}
              onChange={(e) => setTotalTokens(e.target.value)}
              className="w-full rounded-lg border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-[#68D9DA]"
              min="0"
              placeholder="1000000"
              required
            />
          </div>
        </div>
        
        <Button
          type="submit"
          fullWidth
          isLoading={isLoading}
        >
          Update Stage
        </Button>
      </form>
    </div>
  );
}
