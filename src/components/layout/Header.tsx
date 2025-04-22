"use client";

import Link from 'next/link';
import Image from 'next/image';
import WalletConnect from '@/components/ui/WalletConnect';
import MobileMenu from './MobileMenu';
import useWalletStore from '@/store/walletStore';
import AppKitButton from '../ui/AppKitButton';

export default function Header() {
  const { isOwner } = useWalletStore();
  
  const scrollToBuyNow = () => {
    document.getElementById("buy-now")?.scrollIntoView({ behavior: "smooth" });
  };
  const scrollToAbout = () => {
    document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
  };
  const scrollToTokenomics = () => {
    document.getElementById("tokenomics")?.scrollIntoView({ behavior: "smooth" });
  };
  const scrollToFAQ = () => {
    document.getElementById("faq")?.scrollIntoView({ behavior: "smooth" });
  };
  const scrollToRoadmap = () => {
    document.getElementById("roadmap")?.scrollIntoView({ behavior: "smooth" });
  };
  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };
  
  return (
    <>
      {/* Mobile Header */}
      <header className="lg:hidden flex items-center justify-between bg-[#6BCCD5] w-full px-4 p-2 text-white">
        <div className="flex items-center">
          <Image src="/assets/Logo.svg" width={40} height={40} alt="Furrever logo" className="w-[18%]"/>
          <p className="font-rubik ml-1 text-white-900">FURREVERCoin</p>
        </div>
        <div className="flex items-center">
        <AppKitButton />
          <MobileMenu isAdmin={isOwner} />
        </div>
      </header>
      
      {/* Desktop Header */}
      <header className="hidden lg:flex items-center justify-center px-4 bg-[#6BCCD5] w-full min-h-[157px]">
        <div className='w-[90%]'>
          <div className='flex items-center justify-between'>
            <div className='flex items-center space-x-4'>
              <Image src="/assets/Logo.svg" width={60} height={60} alt='Furrever' />
              <h2 className='font-rubik 2xl:text-2xl 4xl:text-4xl md:text-lg'>FURREVERCoin</h2>
            </div>
            
            <div className='flex justify-center lg:text-xl 2xl:text-xl 4xl:text-2xl 6xl:text-4xl items-center 3xl:space-x-8 lg:space-x-6 flex-grow text-white'>
              <p className='cursor-pointer' onClick={scrollToBuyNow}>Buy now</p>
              <p className='cursor-pointer' onClick={scrollToAbout}>About</p>
              <p className='cursor-pointer' onClick={scrollToTokenomics}>Tokenomics</p>
              <p className='cursor-pointer' onClick={scrollToRoadmap}>Roadmap</p>
              <p className='cursor-pointer' onClick={scrollToFAQ}>FAQs</p>
              <p className='cursor-pointer' onClick={scrollToContact}>Contact</p>
              <p className="cursor-pointer">
                <a href="/assets/whitepaper.pdf" download="FurreverCoin Whitepaper.pdf">
                  Whitepaper
                </a>
              </p>
              
              {isOwner && (
                <Link href="/admin" className="text-white hover:text-[#FFD966] transition-colors">
                  Admin
                </Link>
              )}
            </div>

            <AppKitButton />
          </div>
        </div>
      </header>
      
      {/* Desktop Header Drip */}
      <div className="hidden lg:block relative">
        <Image 
          src="/assets/Rectangle3.svg" 
          alt="Header Drip" 
          width={1440} 
          height={100} 
          className="w-full absolute z-[999]" 
          priority
        />
      </div>
    </>
  );
}
