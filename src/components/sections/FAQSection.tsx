"use client";

import { useState } from 'react';
import AccordionItem from '@/components/ui/AccordionItem';

export default function FAQSection() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    if (activeIndex === index) {
      setActiveIndex(null);
    } else {
      setActiveIndex(index);
    }
  };

  return (
    <div className="bg-[#6bccd5] w-full lg:h-fit flex relative flex-col items-center text-center">
      <h2 id='faq' className="text-5xl md:text-7xl font-semibold text-white z-40">FAQs</h2>
      
      <div className="flex w-[90%] z-40 md:w-[64%] text-[#1F2B5F] flex-col items-center mt-4">
        <div className='space-y-4'>
          <AccordionItem
            index={0}
            title="What is FurreverCoin?"
            content={(
              <>
                FurreverCoin (FURR) is a community-powered memecoin inspired by the love of pets. It's more than just a fun digital token—it's a movement to support pet adoption, raise awareness for animal welfare, and empower crypto users through an engaging ecosystem.
              </>
            )}
            isActive={activeIndex === 0}
            onToggle={() => toggleAccordion(0)}
          />
          <AccordionItem
            index={1}
            title="What makes FurreverCoin different from other meme coins?"
            content={(
              <>
                FurreverCoin has a real-world mission: helping animals in need. A portion of each transaction supports pet rescue organizations, while our community drives the project forward with energy, creativity, and heart.
              </>
            )}
            isActive={activeIndex === 1}
            onToggle={() => toggleAccordion(1)}
          />
          <AccordionItem
            index={2}
            title="Is FurreverCoin a real cryptocurrency?"
            content={(
              <>
                Yes! FURR is a fully functional, decentralized cryptocurrency deployed on a secure blockchain. It can be traded, held, and used in various utilities including NFTs, donations, and upcoming pet-themed games.
              </>
            )}
            isActive={activeIndex === 2}
            onToggle={() => toggleAccordion(2)}
          />
          <AccordionItem
            index={3}
            title="Where can I buy FurreverCoin?"
            content={(
              <>
                FurreverCoin will be available for presale on APRIL 11TH 2025 and in July it will be listed on one of the biggest decentralized platforms like PANCAKESWAP and more as the coin grows.
              </>
            )}
            isActive={activeIndex === 3}
            onToggle={() => toggleAccordion(3)}
          />
          <AccordionItem
            index={4}
            title="How can I store my FurreverCoin?"
            content={(
              <>
                You can store FURR tokens in any wallet compatible with our blockchain (e.g., MetaMask, Trust Wallet).
              </>
            )}
            isActive={activeIndex === 4}
            onToggle={() => toggleAccordion(4)}
          />
          <AccordionItem
            index={5}
            title="What is the Tokenomics of FurreverCoin?"
            content={(
              <>
                • Total Supply: 111 trillion tokens and refer to the white paper for more details
              </>
            )}
            isActive={activeIndex === 5}
            onToggle={() => toggleAccordion(5)}
          />
          <AccordionItem
            index={6}
            title="Can I use FurreverCoin for donations to pet charities?"
            content={(
              <>
                Yes! FURR holders can donate directly or contribute passively through every transaction. We publish transparency reports and updates from partnered shelters to show where your contributions go.
              </>
            )}
            isActive={activeIndex === 6}
            onToggle={() => toggleAccordion(6)}
          />
          <AccordionItem
            index={7}
            title="How do I join the FurreverCoin community?"
            content={(
              <>
                Follow us and get involved:
                <ul className="list-disc pl-5 mt-2">
                  <li>Website: <a href="https://furrevercoin.com" className="text-blue-600 hover:underline">furrevercoin.com</a></li>
                  <li>Telegram: <a href="https://t.me/FurreverCoinOfficial" className="text-blue-600 hover:underline">t.me/FurreverCoinOfficial</a></li>
                  <li>Twitter/X: <a href="https://x.com/CoinFurrev34431" className="text-blue-600 hover:underline">x.com/CoinFurrev34431</a></li>
                  <li>Instagram: <a href="https://www.instagram.com/furrevercoin?igsh=b3N5ejZxeXpndTNJ" className="text-blue-600 hover:underline">Instagram</a></li>
                </ul>
              </>
            )}
            isActive={activeIndex === 7}
            onToggle={() => toggleAccordion(7)}
          />
          <AccordionItem
            index={8}
            title="Is FurreverCoin a safe investment?"
            content={(
              <>
                FurreverCoin is built with transparency, but like all crypto assets, it carries risk. Always DYOR (Do Your Own Research) and never invest more than you can afford to lose.
              </>
            )}
            isActive={activeIndex === 8}
            onToggle={() => toggleAccordion(8)}
          />
          <AccordionItem
            index={9}
            title="How can I get involved in the project?"
            content={(
              <>
                We love community participation! If you're a developer, artist, marketer, or crypto enthusiast, reach out to our team via our website, X or Telegram. We're always open to new ideas and contributors.
              </>
            )}
            isActive={activeIndex === 9}
            onToggle={() => toggleAccordion(9)}
          />
          <AccordionItem
            index={10}
            title="Is FurreverCoin legit?"
            content={(
              <>
                Yes, FurreverCoin shows several green flags that highlight its legitimacy and community-first approach:
                <ul className="list-disc pl-5 mt-2">
                  <li>✅ Renounced Contract - The contract is fully renounced, meaning it's 100% decentralized and transparent. No single party has control, ensuring fair play for all holders.</li>
                  <li>✅ Community-Driven - There are no taxes, no hidden fees, and no centralized control. The power lies entirely with the community, making it a true grassroots project.</li>
                  <li>✅ Supporting Animal Shelters - FurreverCoin isn't just another meme coin. It aims to make a real-world impact by supporting animal shelters and causes that matter.</li>
                  <li>✅ Meme Coin Magic - It embraces the fun and viral nature of meme coins, backed by an enthusiastic and like-minded community.</li>
                  <li>🔥 Presale is for hype only - It's meant to build momentum and awareness. Importantly, team tokens will be vested to ensure long-term commitment, and all non-vested tokens will be in circulation, promoting fairness and transparency</li>
                </ul>
              </>
            )}
            isActive={activeIndex === 10}
            onToggle={() => toggleAccordion(10)}
          />
        </div>
      </div>
    </div>
  );
}