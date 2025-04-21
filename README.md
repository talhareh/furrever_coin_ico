# FURREVER ICO Dashboard

A Web3 ICO dashboard built with Next.js 15, focusing on managing and displaying a presale with multiple stages. The application integrates with Binance Smart Chain (BSC) and allows users to purchase tokens directly through the interface.

## Features

- **Countdown Timer**: Displays time until presale starts/ends
- **Presale Progress**: Visual representation of current presale progress
- **Token Purchase**: Buy tokens directly with BNB or USDT
- **Wallet Integration**: Connect to Web3 wallets (primarily MetaMask)
- **How To Buy Guide**: Step-by-step instructions for users
- **Admin Panel**: Accessible only to the contract owner
- **Informational Sections**: About, Tokenomics, Roadmap, and FAQs
- **Real-time Updates**: Listen to blockchain events for sale transactions
- **Network Detection**: Alert users and enable switching to BSC if on the wrong network

## Technology Stack

- **Frontend Framework**: Next.js 15 with App Router
- **Styling**: Tailwind CSS
- **Web3 Integration**: viem, wagmi, ethers.js
- **State Management**: Zustand
- **Network**: Binance Smart Chain (BSC)

## Getting Started

First, install the dependencies:

```bash
npm install
```

Then, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

```
src/
├── app/                  # Next.js App Router
│   ├── admin/            # Admin routes
│   │   └── page.tsx      # Admin dashboard
│   ├── page.tsx          # Main ICO landing page
│   └── layout.tsx        # Root layout
├── components/
│   ├── ui/               # Reusable UI components
│   ├── layout/           # Layout components
│   ├── sections/         # Page sections
│   ├── presale/          # Presale-specific components
│   └── admin/            # Admin-specific components
├── config/
│   ├── contract.ts       # Contract addresses, ABIs
│   └── chains.ts         # BSC chain configuration
├── hooks/
│   ├── usePresale.ts     # Presale-related hooks
│   ├── useWallet.ts      # Wallet connection hooks
│   ├── useCountdown.ts   # Countdown timer hook
│   └── useEvents.ts      # Contract event listeners
├── lib/
│   ├── web3/             # Web3 utilities
│   └── utils.ts          # General utilities
├── store/                # Zustand stores
└── types/                # TypeScript types
```

## Contract Integration

The dashboard integrates with a presale smart contract deployed on the Binance Smart Chain. The contract addresses and ABIs are defined in `src/config/contract.ts`.

## Browser Support

- Chrome
- iPhone Safari
