"use client";

import { useState } from 'react';
import Link from 'next/link';
import WalletConnect from '@/components/ui/WalletConnect';

interface MobileMenuProps {
  isAdmin?: boolean;
}

export default function MobileMenu({ isAdmin = false }: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  
  const closeMenu = () => {
    setIsOpen(false);
  };
  
  const navItems = [
    { name: 'How To Buy', href: '#how-to-buy' },
    { name: 'About', href: '#about' },
    { name: 'Tokenomics', href: '#tokenomics' },
    { name: 'Roadmap', href: '#roadmap' },
    { name: 'FAQ', href: '#faq' },
  ];
  
  // Add admin link if user is admin
  if (isAdmin) {
    navItems.push({ name: 'Admin', href: '/admin' });
  }
  
  return (
    <>
      {/* Hamburger button */}
      <button
        type="button"
        className="text-white p-2"
        onClick={toggleMenu}
        aria-expanded={isOpen}
      >
        <span className="sr-only">Open menu</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
          />
        </svg>
      </button>
      
      {/* Mobile menu overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50" onClick={closeMenu}>
          <div
            className="fixed top-0 right-0 h-full w-64 bg-[#68D9DA] p-6 shadow-lg"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              type="button"
              className="absolute top-4 right-4 text-white"
              onClick={closeMenu}
            >
              <span className="sr-only">Close menu</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            
            {/* Navigation links */}
            <nav className="mt-8 flex flex-col space-y-4">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-white hover:text-[#FFD966] transition-colors"
                  onClick={closeMenu}
                >
                  {item.name}
                </Link>
              ))}
            </nav>
            
            {/* Wallet connect button */}
            <div className="mt-6">
            <appkit-button />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
