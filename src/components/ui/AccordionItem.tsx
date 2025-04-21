"use client";

import { useRef } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

interface AccordionItemProps {
  index: number;
  title: string;
  content: React.ReactNode;
  isActive: boolean;
  onToggle: (index: number) => void;
}

export default function AccordionItem({
  index,
  title,
  content,
  isActive,
  onToggle,
}: AccordionItemProps) {
  const itemRef = useRef<HTMLDivElement>(null);

  return (
    <div 
      className={`w-full text-start rounded-md p-4 ${
        isActive ? 'bg-[#e2fdff] text-black' : 'bg-white'
      }`} 
      ref={itemRef}
    >
      <button
        onClick={() => onToggle(index)}
        className={`flex justify-between w-full p-4 rounded-md
             text-black text-left font-semibold 
             focus:outline-none ${
          isActive ? 'bg-[#e2fdff] text-black' : 'bg-white'
        }`}
      >
        {title}
        <span>
          <Image 
            src='/assets/arrow-drop-down-48px.svg' 
            alt='FURREVER dropdown' 
            width={24} 
            height={24} 
          />
        </span>
      </button>
      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: isActive ? 'auto' : 0, opacity: isActive ? 1 : 0 }}
        transition={{ duration: 0.2, ease: 'easeInOut' }}
        className="overflow-hidden"
      >
        <div className="p-4 -mt-4 text-[#606267] text-sm">{content}</div>
      </motion.div>
    </div>
  );
}
