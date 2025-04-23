"use client";

import Image from 'next/image';

export default function AboutSection() {
  return (
    <div id='about' className='bg-[#6bccd5] w-full pb-4 flex flex-col items-center relative text-white'>
      {/* Cloud image */}
      <div className="relative w-full mt-[-26px] 2xl:mt-[-140px] xl:[-100px] lg:mt-[-78px] md:mt-[-60px] sm:mt-[-40px]">
        <img src='/assets/Clouds.svg' alt='FURREVERcoin Clouds' className='w-full'/>
      </div>
      
      {/* About heading - responsive font sizes */}
      <h2 className='text-3xl sm:text-4xl lg:text-6xl font-poppins mt-8 font-semibold'>About</h2>
      
      {/* About text - responsive width and font sizes */}
      <p className='text-center w-[90%] md:w-[80%] lg:w-[60%] text-base md:text-lg lg:text-xl 2xl:text-2xl mt-8 lg:mt-14'>
        FURREVERcoin (FURR), the best crypto meme coin of 2025, unfolds as a groundbreaking mission,
        transforming digital currency into a force for animal welfare.
        Guided by our passionate community, FURREVERcoin invites you to embark on a journey of compassion, where every transaction becomes a step toward rescuing, sheltering, and protecting animals in need.
      </p>
      
      {/* Mascot image - responsive sizing and positioning */}
      <div className="w-full flex justify-center items-center mt-8">
        <img 
          src='/assets/Heart beating.svg' 
          alt='FURREVERcoin mascot' 
          className='w-[200px] md:w-[280px] lg:w-[360px] animate-float z-40'
        />
      </div>
      
      {/* Marquee animation */}
      <div className="relative w-full overflow-hidden">
        <div className="flex animate-marquee">
          <img src="/assets/Group 2616.svg" alt="FURREVERcoin" className="w-full shrink-0" />
          <img src="/assets/Group 2616.svg" alt="FURREVERcoin" className="w-full shrink-0" />
        </div>
      </div>
    </div>
  );
}
