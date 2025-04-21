"use client";

import Image from 'next/image';

export default function Footer() {
  return (
    <div id='contact' className='bg-[#ffc909] w-full h-[308px] py-10 flex relative flex-col items-center z-[9999] mt-[1000px]'>
      <Image src='/assets/Logo (1).svg' alt='FurrEver' width={100} height={100}/>
      <h2 className={`2xl:text-4xl font-rubik md:text-xl`}>FURREVERcoin</h2>
      
      <div className="flex space-x-4 mt-4">
        <a href="https://www.tiktok.com/@furrevercoin" target="_blank" rel="noopener noreferrer">
          <Image src='/assets/TikTok.svg' alt="Furrever Facebook" width={50} height={100}/>
        </a>
        <a href="https://t.me/FurreverCoinOfficial" target="_blank" rel="noopener noreferrer">
          <Image src='/assets/Telegram.svg' alt="Furrever Telegram" width={50} height={100}/>
        </a>
        <a href="https://www.instagram.com/furrevercoin" target="_blank" rel="noopener noreferrer">
          <Image src='/assets/Intagram.svg' alt="Furrever Instagram" width={50} height={100}/>
        </a>
        <a href="https://x.com/Furrevercoin11" target="_blank" rel="noopener noreferrer">
          <Image src='/assets/Twitter.svg' alt="Furrever Twitter" width={50} height={100}/>
        </a>
      </div>
      <h2 className="text-sm mt-6 text-center px-4 max-w-4xl">Disclaimer: Cryptocurrency may be unregulated in your jurisdiction. The value of cryptocurrencies may go down as well as up. Profits may be subject to capital gains or other taxes applicable in your jurisdiction.</h2>
      <img src='/assets/Footerimage.svg' alt='FURREVERcoin footer' className='w-[300px] absolute bottom-0 right-4'/>
    </div>
  );
}
