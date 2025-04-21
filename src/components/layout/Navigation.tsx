"use client";

import Link from 'next/link';

export default function Navigation() {
  const navItems = [
    { name: 'How To Buy', href: '#how-to-buy' },
    { name: 'About', href: '#about' },
    { name: 'Tokenomics', href: '#tokenomics' },
    { name: 'Roadmap', href: '#roadmap' },
    { name: 'FAQ', href: '#faq' },
  ];
  
  return (
    <nav className="flex space-x-6">
      {navItems.map((item) => (
        <Link
          key={item.name}
          href={item.href}
          className="text-white hover:text-[#FFD966] transition-colors"
        >
          {item.name}
        </Link>
      ))}
    </nav>
  );
}
