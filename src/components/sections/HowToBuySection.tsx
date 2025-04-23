"use client";

import Image from 'next/image';

export default function HowToBuySection({ isMobile = false }: { isMobile?: boolean }) {
  const steps = [
    {
      title: '1. Set Up Your Wallet',
      description: 'Choose a compatible cryptocurrency wallet. Recommended wallets include.',
    },
    {
      title: '2. Acquire Cryptocurrency',
      description: 'You will need cryptocurrency to buy FURREVERcoin coins. Accepted currencies include: ETH, USDT, USDC, BNB.',
    },
    {
      title: '3. Connect Your Wallet',
      description: [
        'Click on the "Connect Wallet" button.',
        'Select your wallet type (e.g., MetaMask, Trust Wallet) and follow the prompts to authorize the connection.',
      ],
    },
    {
      title: '4. Participate in the Presale',
      description: [
        'Enter the amount of FURREVERcoin tokens you wish to purchase.',
        'Confirm the transaction details and click on the "Buy" button.',
      ],
    },
    {
      title: '5. Complete the Transaction',
      description: [
        'Review and approve the transaction in your wallet.',
        'Once confirmed, your FURREVERcoin coins will be shown on the website dashboard.',
      ],
    },
  ];

  // Mobile-specific classes
  const mobileClasses = {
    container: 'text-black w-full flex flex-col px-4 pt-2',
    heading: 'font-poppins text-3xl sm:text-4xl font-semibold mb-6 self-center text-center',
    stepTitle: 'text-xl sm:text-2xl font-semibold',
  };

  // Desktop-specific classes
  const desktopClasses = {
    container: 'text-black w-full flex flex-col 2xl:px-44 lg:px-20',
    heading: 'font-poppins text-4xl xl:text-5xl 2xl:text-6xl font-semibold mb-10 self-center',
    stepTitle: 'text-2xl xl:text-3xl font-semibold',
  };

  // Select the appropriate classes based on device type
  const classes = isMobile ? mobileClasses : desktopClasses;

  return (
    <div className={classes.container}>
      <h2 className={classes.heading}>How to buy</h2>

      <div className='flex flex-col gap-10 max-w-3xl mb-26'>
        {steps.map((step, index) => (
          <div key={index}>
            <h3 className={classes.stepTitle}>{step.title}</h3>
            {Array.isArray(step.description) ? (
              <ul className='list-disc text-[#757474] list-inside text-lg mt-2 space-y-1'>
                {step.description.map((item, itemIndex) => (
                  <li key={itemIndex}>{item}</li>
                ))}
              </ul>
            ) : (
              <p className='text-lg text-[#757474] mt-2'>{step.description}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
