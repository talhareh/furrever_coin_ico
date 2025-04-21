"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import StageControl from '@/components/admin/StageControl';
import WhitelistForm from '@/components/admin/WhitelistForm';
import PresaleCard from '@/components/presale/PresaleCard';
import Alert from '@/components/ui/Alert';

// This is a client component
export default function AdminPage() {
  const router = useRouter();
  
  // Check admin status on client side
  useEffect(() => {
    // This would be implemented with actual auth logic
    // For example, checking a JWT token or calling an API
    const checkAdminStatus = async () => {
      // Mock implementation - replace with actual auth check
      const isAdmin = false; // Set to true for testing or implement real check
      
      if (!isAdmin) {
        router.push('/'); // Redirect non-admins to home page
      }
    };
    
    checkAdminStatus();
  }, [router]);

  return (
    <div className="py-12 bg-[#E8F9FA] min-h-screen">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-[#68D9DA] mb-8">
          Admin Dashboard
        </h1>
        
        {/* Admin notice */}
        <Alert type="info" className="mb-8">
          <p>
            This admin panel is only accessible to the contract owner. All actions performed here
            will directly affect the presale contract on the Binance Smart Chain.
          </p>
        </Alert>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Current presale status */}
          <div>
            <h2 className="text-xl font-bold text-[#68D9DA] mb-4">
              Current Presale Status
            </h2>
            <PresaleCard />
          </div>
          
          {/* Stage control */}
          <div>
            <StageControl />
          </div>
          
          {/* Whitelist management */}
          <div className="md:col-span-2 mt-8">
            <WhitelistForm />
          </div>
        </div>
      </div>
    </div>
  );
}
