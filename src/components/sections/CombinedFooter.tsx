"use client";

import Image from 'next/image';

export default function CombinedFooter() {
  return (
    <div className="relative">
      {/* Footer Banner */}
      <div className='bg-[#6bccd5] h-[80vh] sm:h-full flex flex-col items-center relative z-[10] w-full'>
        <img src='/assets/Vector 19.svg' alt='FURREVERcoin' className='w-full'/>
        <div className='absolute bottom-10 md:right-[30%] text-white w-full md:w-auto text-center md:text-left'> 
          <h2 className='text-sm'>The best meme coin presale of 2025 is here</h2>
          <h2 className='2xl:text-6xl lg:text-5xl text-xl'>Begin a new journey<br/><span> With <span className='font-bold'>FURREVERcoin</span></span>
          </h2>
          <div className='flex items-center justify-center md:justify-between px-8 py-8 gap-14'>
            <a href="https://t.me/FurreverCoinOfficial" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-200">
              <div className='flex items-center'>
                <img src='/assets/mingcute_telegram-fill.svg' alt='FURREVERcoin Telegram'/>
                <h2>Telegram</h2>
              </div>
            </a>
            <a href="https://x.com/Furrevercoin11" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-200">
              <div className='flex items-center gap-4'>
                <img src='/assets/ri_twitter-x-line.svg' alt='FURREVERcoin twitter'/>
                <h2>Twitter</h2>
              </div>
            </a>
          </div>
        </div>
      </div>
      
      {/* Main Footer */}
      <div id='contact' className='bg-[#ffc909] w-full h-fit py-10 flex relative flex-col items-center z-[20]'>
        <Image src='/assets/Logo (1).svg' alt='FurrEver' width={100} height={100}/>
        <h2 className={`2xl:text-4xl font-rubik md:text-xl text-white font-bold`}>FURREVERcoin</h2>
        
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
        <h2 className="text-sm mt-6 text-center px-4 max-w-4xl text-white font-bold">Disclaimer: Cryptocurrency may be unregulated in your jurisdiction. The value of cryptocurrencies may go down as well as up. Profits may be subject to capital gains or other taxes applicable in your jurisdiction.</h2>
        <img src='/assets/Footerimage.svg' alt='FURREVERcoin footer' className='w-[300px] absolute bottom-0 right-4 hidden md:block'/>
      </div>
    </div>
  );
}
