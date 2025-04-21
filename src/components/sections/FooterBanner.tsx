"use client";

export default function FooterBanner() {
  return (
    <div className='bg-[#6bccd5] h-fit flex flex-col items-center relative z-[10] w-full pt-0 mt-[-50px]'>
      <img src='/assets/Vector 19.svg' alt='FURREVERcoin' className='w-full'/>
      <div className='absolute bottom-10 right-[30%] text-white'> 
        <h2 className='text-2xl'>The best meme coin presale of 2025 is here</h2>
        <h2 className='2xl:text-6xl lg:text-5xl font-medium'>Begin a new journey<br/><span> With <span className='font-bold'>FURREVERcoin</span></span>
        </h2>
        <div className='flex items-center justify-between px-8 py-8'>
          <a href="https://t.me/FurreverCoinOfficial" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-200">
            <div className='flex items-center gap-4'>
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
  );
}
