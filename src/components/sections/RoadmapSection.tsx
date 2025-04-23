"use client";

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

export default function RoadmapSection() {
  const [phaseIndex, setPhaseIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  // Roadmap phases data
  const phases = [
    {
      title: 'Phase 1: Launch & Community Building (April 2024)',
      points: [
        'Define project scope and objectives',
        'Assemble development team',
        'Develop initial smart contract prototypes',
      ],
    },
    {
      title: 'Pre-Sale & Fund Allocation (July 2025)',
      points: [
        'Pre-sale launch with liquidity pool funding',
        'Strategic marketing and community incentives',
        'Airdrop distribution to animal saviors',
      ],
    },
    {
      title: 'Phase 3: Platform Expansion (August 2025)',
      points: [
        'Implementation of a decentralized governance model',
        'Exploration of L2, L1, or collaborative utilities based on community feedback',
        'Development of a donation portal for shelters and rescues',
      ],
    },
    {
      title: 'Phase 4: Long-Term Sustainability (November 2025)',
      points: [
        'Establishing a self-sustaining ecosystem',
        'Further blockchain integration and utility enhancements',
        'Continued burn mechanism to maintain scarcity and value'
      ],
    },
  ];

  // Handle phase navigation
  const changePhase = (dir: number) => {
    let newIndex = phaseIndex + dir;
    if (newIndex < 0) newIndex = phases.length - 1;
    if (newIndex >= phases.length) newIndex = 0;
    setDirection(dir);
    setPhaseIndex(newIndex);
  };

  // Animation variants
  const variants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 300 : -300,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.2 },
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -300 : 300,
      opacity: 0,
      transition: { duration: 0.2 },
    }),
  };
  
  return (
    <section id="roadmap" className="relative flex flex-col items-center px-4 w-full py-16 mb-4">
      {/* Background cloud */}
      <div className="absolute dm:top-[-40%] left-0 z-10 w-full">
        <Image 
          src="/assets/Cloudroadmap.svg" 
          alt="Cloud background" 
          width={1400} 
          height={500}
          className="w-full"
        />
      </div>
      
      {/* Card container */}
      <div className="relative opacity-75 min-h-[500px] w-full flex justify-center items-center z-10">
        <AnimatePresence custom={direction} mode="wait">
          <motion.div
            key={phaseIndex}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.2}
            onDragEnd={(event, info) => {
              if (info.offset.x < -100) {
                changePhase(1); // drag left
              } else if (info.offset.x > 100) {
                changePhase(-1); // drag right
              }
            }}
            className="2xl:w-[65%] lg:w-[80%] w-[95%] p-8 pb-14 bg-white rounded-3xl opacity-90 text-[#2287AA] flex flex-col items-center absolute shadow-2xl"
          >
            <h2 className="mt-4 text-2xl md:text-3xl 2xl:text-4xl font-bold md:w-[60%] text-center">
              {phases[phaseIndex].title}
            </h2>
            <ul className="list-disc text-start text-lg md:text-2xl mt-8 space-y-4 self-start md:px-24 px-8">
              {phases[phaseIndex].points.map((point, i) => (
                <li key={i}>{point}</li>
              ))}
            </ul>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation */}
      <div className="w-[40%] md:w-[20%] flex justify-between z-20 mt-4">
        <button
          onClick={() => changePhase(-1)}
          className="hover:cursor-pointer"
        >
          <Image
            src="/assets/leftbutton.svg"
            alt="Previous"
            width={70}
            height={70}
            className="lg:w-[70px] w-[50px]"
          />
        </button>
        <button
          onClick={() => changePhase(1)}
          className="hover:cursor-pointer"
        >
          <Image
            src="/assets/rightbutton.svg"
            alt="Next"
            width={70}
            height={70}
            className="lg:w-[70px] w-[50px]"
          />
        </button>
      </div>
    </section>
  );
}
