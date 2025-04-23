"use client";

import Image from 'next/image';
import CountdownTimer from '@/components/ui/CountdownTimer';
import PresaleCard from '@/components/presale/PresaleCard';
import usePresaleStore from '@/store/presaleStore';
import useWalletStore from '@/store/walletStore';
import HowToBuySection from './HowToBuySection';
import AboutSection from './AboutSection';
import TokenomicsSection from './TokenomicsSection';
import RoadmapContainer from './RoadmapContainer';
import FAQSection from './FAQSection';
import CombinedFooter from './CombinedFooter';

export default function HeroSection() {
  const { isConnected } = useWalletStore();
  
  return (
    <div className="w-full">
      {/* Mobile Hero Section */}
      <div className="lg:hidden bg-[#ffc909] w-full">
        <div className="relative">
          {/* Cloud image as background layer */}
          <div className="relative">
           
            
            {/* Content positioned on top of cloud */}
        
              <div className="flex flex-col items-center w-full pt-12 pb-16">
                {/* Presale card first on mobile */}
                <div className="sm:w-[80%] w-[99%]">
                          <PresaleCard />
                        </div>

            </div>
          </div>
          
          {/* How to Buy Section for Mobile */}
          <div className="w-full px-4">
            <HowToBuySection isMobile={true} />
          </div>
        </div>
      </div>
      
      {/* Desktop Hero Section */}
      <div className='hidden lg:block bg-[#FFC909] w-full pb-14'>
        <div className='relative'>
          {/* Cloud image as background layer */}
          <div className="relative ">
            <Image 
              src='/assets/Cloud.svg' 
              alt='cloud' 
              width={1400} 
              height={500} 
              className='w-full'
            />
            
            {/* Content positioned on top of cloud */}
            <div className='absolute top-0 left-0 w-full h-full pt-10'>
              <div className='flex justify-between w-full px-20 pt-20'>
                <Image 
                  src='/assets/Racoon 1.svg' 
                  width={500} 
                  height={527} 
                  className='w-[38%]' 
                  alt='Raccoon'
                />
                <PresaleCard />
              </div>
            </div>
          </div>
          
          {/* How to Buy Section for Desktop */}
          <div className="w-full px-20 -mt-10">
            <HowToBuySection isMobile={false} />
          </div>
        </div>
      </div>
      
      {/* Content Sections - Visible on all devices */}
      <div>
        <AboutSection/>
        <TokenomicsSection/>
        <RoadmapContainer/>
        <FAQSection/>
        <CombinedFooter/>
      </div>
    </div>
  );
}
