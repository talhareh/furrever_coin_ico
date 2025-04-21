"use client";

import { useState, FormEvent } from 'react';
import { useContractWrite } from 'wagmi';
import Button from '@/components/ui/Button';
import Alert from '@/components/ui/Alert';
import { CONTRACT_ADDRESSES, PRESALE_ABI } from '@/config/contract';

export default function WhitelistForm() {
  // Form state
  const [addresses, setAddresses] = useState('');
  const [action, setAction] = useState<'add' | 'remove'>('add');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);
  
  // Contract write hooks
  const { write: addToWhitelist, isPending: isAddLoading } = useContractWrite({
    address: CONTRACT_ADDRESSES.PRESALE as `0x${string}`,
    abi: PRESALE_ABI,
    functionName: 'addToWhitelist',
  });
  
  const { write: removeFromWhitelist, isPending: isRemoveLoading } = useContractWrite({
    address: CONTRACT_ADDRESSES.PRESALE as `0x${string}`,
    abi: PRESALE_ABI,
    functionName: 'removeFromWhitelist',
  });
  
  // Check if loading
  const isLoading = isAddLoading || isRemoveLoading;
  
  // Handle form submission
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    // Reset status
    setError(null);
    setSuccess(false);
    
    // Validate input
    if (!addresses.trim()) {
      setError('Please enter at least one address');
      return;
    }
    
    // Parse addresses
    const addressList = addresses
      .split('\n')
      .map((addr) => addr.trim())
      .filter((addr) => addr !== '');
    
    // Validate addresses
    const invalidAddresses = addressList.filter((addr) => !addr.match(/^0x[a-fA-F0-9]{40}$/));
    
    if (invalidAddresses.length > 0) {
      setError(`Invalid addresses: ${invalidAddresses.join(', ')}`);
      return;
    }
    
    try {
      // Call contract based on action
      if (action === 'add') {
        await addToWhitelist({
          args: [addressList],
        });
      } else {
        await removeFromWhitelist({
          args: [addressList],
        });
      }
      
      // Show success message
      setSuccess(true);
      
      // Reset form
      setAddresses('');
    } catch (error: Error | unknown) {
      const errorMessage = error instanceof Error ? error.message : `Failed to ${action} addresses to whitelist`;
      console.error(`Failed to ${action} addresses to whitelist:`, error);
      setError(errorMessage);
    }
  };
  
  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-bold text-[#68D9DA] mb-4">
        Manage Whitelist
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
          {action === 'add' ? 'Addresses added to whitelist' : 'Addresses removed from whitelist'} successfully!
        </Alert>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Action
          </label>
          <div className="flex space-x-4">
            <label className="inline-flex items-center">
              <input
                type="radio"
                className="form-radio text-[#68D9DA]"
                name="action"
                value="add"
                checked={action === 'add'}
                onChange={() => setAction('add')}
              />
              <span className="ml-2">Add to Whitelist</span>
            </label>
            <label className="inline-flex items-center">
              <input
                type="radio"
                className="form-radio text-[#68D9DA]"
                name="action"
                value="remove"
                checked={action === 'remove'}
                onChange={() => setAction('remove')}
              />
              <span className="ml-2">Remove from Whitelist</span>
            </label>
          </div>
        </div>
        
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Wallet Addresses (one per line)
          </label>
          <textarea
            value={addresses}
            onChange={(e) => setAddresses(e.target.value)}
            className="w-full rounded-lg border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-[#68D9DA]"
            rows={5}
            placeholder="0x1234...5678&#10;0xabcd...efgh"
            required
          />
          <p className="text-xs text-gray-500 mt-1">
            Enter one Ethereum address per line, starting with 0x
          </p>
        </div>
        
        <Button
          type="submit"
          fullWidth
          isLoading={isLoading}
        >
          {action === 'add' ? 'Add to Whitelist' : 'Remove from Whitelist'}
        </Button>
      </form>
    </div>
  );
}
