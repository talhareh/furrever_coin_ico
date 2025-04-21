# Furview ICO Dashboard - Project Specification

## Project Overview
Furview (FURREVERcoin) is a Web3 ICO dashboard built with Next.js 15, focusing on managing and displaying a presale with multiple stages. The application integrates with Binance Smart Chain (BSC) and allows users to purchase tokens directly through the interface. The UI features a bright, colorful design with a fox/dog mascot character wearing a superhero cape.

## Technology Stack
- **Frontend Framework**: Next.js 15 with App Router
- **Styling**: Tailwind CSS
- **Web3 Integration**: viem, wagmi, ethers.js
- **State Management**: Zustand
- **Network**: Binance Smart Chain (BSC)

## Key Features
1. **Countdown Timer**: Prominent display showing time until presale starts/ends
2. **Presale Progress**: Visual representation of current presale progress (percentage)
3. **Token Purchase**: Allow users to buy tokens directly through the interface with BNB/USDT/CARD
4. **Wallet Integration**: Connect to Web3 wallets (primarily MetaMask)
5. **How To Buy Guide**: Step-by-step instructions for users
6. **Admin Panel**: Accessible only to the contract owner
7. **Informational Sections**: About, Tokenomics, Roadmap, and FAQs
8. **Real-time Updates**: Listen to blockchain events for sale transactions
9. **Network Detection**: Alert users and enable switching to BSC if on the wrong network

## Design Specifications
Based on the provided Figma designs:

1. **Color Scheme**:
   - Primary Background: Light blue/teal (#68D9DA or similar)
   - Secondary Colors: Yellow accents (#FFD966 or similar)
   - Action Buttons: Yellow (#FFD966) with white text
   - Card Backgrounds: White or light blue (#E8F9FA or similar)

2. **Typography**:
   - Heading Font: Bold, possibly custom font for branding
   - Body Text: Clean, readable font
   - Emphasis on readability across all device sizes

3. **UI Elements**:
   - Mascot Character: Fox/dog superhero character as brand identity
   - Wave Patterns: Decorative wave elements separating sections
   - Circular Charts: For tokenomics representation
   - Accordion: For FAQ section
   - Social Media Icons: At footer

## Responsive Design Strategy
The design requires different layouts for mobile and desktop:

### Mobile Design:
- Single-column layout with stacked sections
- Full-width components
- Hamburger menu for navigation
- Simplified countdown timer and progress display
- Optimized touch targets for buttons and interactive elements

### Desktop Design:
- Two-column layout for main sections
- Wider display of countdown timer and presale progress
- Side-by-side arrangement for some content blocks
- Expanded navigation in header
- Larger visualization for tokenomics chart

## File Structure
```
furview/
├── public/
│   └── assets/               # Images, mascot graphics, logo, etc.
├── src/
│   ├── app/                  # Next.js App Router
│   │   ├── admin/            # Admin routes
│   │   │   └── page.tsx      # Admin dashboard
│   │   ├── api/              # API routes if needed
│   │   ├── page.tsx          # Main ICO landing page
│   │   └── layout.tsx        # Root layout
│   ├── components/
│   │   ├── ui/               # Reusable UI components
│   │   │   ├── Button.tsx
│   │   │   ├── ProgressBar.tsx
│   │   │   ├── CountdownTimer.tsx
│   │   │   ├── WalletConnect.tsx
│   │   │   ├── TokenInput.tsx
│   │   │   └── Alert.tsx
│   │   ├── layout/           # Layout components
│   │   │   ├── Header.tsx
│   │   │   ├── Footer.tsx
│   │   │   ├── Navigation.tsx
│   │   │   └── MobileMenu.tsx
│   │   ├── sections/         # Page sections
│   │   │   ├── HeroSection.tsx
│   │   │   ├── HowToBuySection.tsx
│   │   │   ├── AboutSection.tsx
│   │   │   ├── TokenomicsSection.tsx
│   │   │   ├── RoadmapSection.tsx
│   │   │   └── FaqSection.tsx
│   │   ├── presale/          # Presale-specific components
│   │   │   ├── PresaleCard.tsx
│   │   │   ├── PurchaseForm.tsx
│   │   │   └── SaleEvents.tsx
│   │   └── admin/            # Admin-specific components
│   │       ├── StageControl.tsx
│   │       └── WhitelistForm.tsx
│   ├── config/
│   │   ├── contract.ts       # Contract addresses, ABIs
│   │   └── chains.ts         # BSC chain configuration
│   ├── hooks/
│   │   ├── usePresale.ts     # Presale-related hooks
│   │   ├── useWallet.ts      # Wallet connection hooks
│   │   ├── useCountdown.ts   # Countdown timer hook
│   │   └── useEvents.ts      # Contract event listeners
│   ├── lib/
│   │   ├── web3/             # Web3 utilities
│   │   │   ├── client.ts     # viem client setup
│   │   │   ├── wagmi.ts      # Wagmi configuration
│   │   │   └── connectors.ts # Wallet connectors
│   │   └── utils.ts          # General utilities
│   ├── store/                # Zustand stores
│   │   ├── walletStore.ts    # Wallet and network state
│   │   └── presaleStore.ts   # Presale data state
│   └── types/                # TypeScript types
│       ├── contract.ts       # Contract-related types
│       └── wallet.ts         # Wallet-related types
├── tailwind.config.ts
├── next.config.mjs
└── tsconfig.json

## Component Details

### Pages
1. **Main Landing Page** (`src/app/page.tsx`)
   - Hero section with countdown timer and presale progress
   - Token purchase form
   - How To Buy guide
   - About, Tokenomics, Roadmap, and FAQ sections

2. **Admin Dashboard** (`src/app/admin/page.tsx`)
   - Controls for managing presale stages
   - Whitelist management interface

### Components
1. **Layout Components**
   - Header: Navigation with wallet connection button and conditional admin panel link
   - Footer: Social media links, copyright info, and logo
   - Navigation: Desktop navigation menu
   - MobileMenu: Responsive hamburger menu for mobile devices

2. **UI Components**
   - CountdownTimer: Displays time until presale starts/ends
   - ProgressBar: Visual representation of presale progress
   - Button: Styled button components
   - WalletConnect: Wallet connection interface
   - TokenInput: Form input for token purchase with currency selection
   - Alert: Notification component for network warnings and other messages

3. **Section Components**
   - HeroSection: Main banner with countdown and purchase form
   - HowToBuySection: Step-by-step guide with numbered steps
   - AboutSection: Information about the project
   - TokenomicsSection: Token distribution chart and information
   - RoadmapSection: Project timeline and milestones
   - FaqSection: Accordion-style frequently asked questions

4. **Presale Components**
   - PresaleCard: Display presale information and progress
   - PurchaseForm: Form for users to buy tokens with connected wallet
   - SaleEvents: Display recent sales/events from the contract

5. **Admin Components**
   - StageControl: Interface for the admin to manage presale stages
   - WhitelistForm: Interface for adding/removing addresses from whitelist

### State Management
1. **walletStore.ts**
   - Wallet connection state
   - Network detection and switching
   - Owner/admin detection

2. **presaleStore.ts**
   - Current presale stage
   - Stage information (from contract)
   - Recent events/purchases
   - Whitelist status

### Hooks
1. **usePresale.ts**
   - Functions to interact with presale contract
   - Fetch stage data
   - Purchase tokens

2. **useWallet.ts**
   - Connect/disconnect wallet
   - Check network
   - Switch network

3. **useCountdown.ts**
   - Calculate and format time remaining until presale starts/ends

4. **useEvents.ts**
   - Listen to contract events
   - Process and store event data

## Web3 Integration Details

### Contract Integration
- All presale stage data is retrieved directly from the smart contract
- No off-chain storage of presale data
- Contract owner is determined by checking against the owner address in the contract

### Wallet Functionality
- Users must connect a Web3 wallet (primarily MetaMask) to interact with the dashboard
- Network detection ensures users are on BSC mainnet
- Automatic network switching prompt if user is on wrong network

### Admin Access
- Admin functionality is strictly determined by checking if the connected wallet is the contract owner
- Admin panel link is only visible to the contract owner
- No middleware or additional authentication is required

### Payment Options
- BNB: Direct payment with BSC native token
- USDT: Payment with USDT token on BSC
- CARD: Integration with a payment processor for credit card purchases

## Responsive Implementation Notes
1. **Breakpoints**:
   - Mobile: Up to 640px
   - Tablet: 641px to 1024px
   - Desktop: 1025px and above

2. **Layout Transformations**:
   - Navigation transforms to hamburger menu on mobile
   - Two-column layouts stack vertically on mobile
   - Font sizes adjust appropriately for each screen size
   - Touch targets (buttons, links) increase in size on mobile

3. **Images and Graphics**:
   - Mascot character size adjusts based on viewport
   - Wave decorations adapt to container width
   - Tokenomics chart simplifies on smaller screens

4. **Content Prioritization**:
   - Purchase form and countdown timer remain prominent across all devices
   - Less critical sections may be condensed on mobile

5. **Testing Strategy**:
   - Test across multiple device sizes and orientations
   - Use Chrome DevTools device emulation during development
   - Verify functionality on actual mobile devices

## Implementation Notes
1. No special caching strategy is needed for blockchain data
2. Admin authentication is simply checking if connected wallet matches contract owner address
3. All presale stage data comes directly from the contract
4. The application should detect the network and provide a way to switch to BSC mainnet
5. No off-chain database is required

## Implementation Clarifications

### Contract and Web3 Integration
- Contract is already written and deployed
- Create placeholders for contract ABI and address
- Create separate files for token ABI, USDT ABI, and presale contract ABI
- Actual contract addresses and ABIs will be provided later
- Presale stage details will come from the contract

### Payment Options
- Remove CARD payment option completely
- Focus only on BNB and USDT payment methods

### Admin Authentication
- Wallet authentication is sufficient
- Admin access is determined by checking if connected wallet matches contract owner address
- No additional security measures needed

### Content and Assets
- Use placeholder data for tokenomics chart
- SVG files for mascot character will be provided
- Use placeholder URLs for social media links
- Create placeholder data for roadmap section
- Create placeholder FAQs relevant to the ICO/presale context
- Implement "How To Buy" steps as shown in the design

### Development Priorities
1. Project setup and file structure
2. Creating UI components first
3. Web3 integration

### Browser Compatibility
- Must support Chrome and iPhone Safari

### Deployment
- No need to worry about deployment details at this stage

## Presale Component Implementation

### Overview
The presale component allows users to purchase FURR tokens using either BNB or USDT. The component displays the current presale stage, progress, token price, and allows users to input an amount to purchase.

### Key Features
1. **Token Purchase Calculation**: Calculates the number of tokens a user would receive based on the amount entered in BNB or USDT.
2. **Progress Bar**: Displays the percentage of tokens sold in the current phase.
3. **USD Raised Display**: Shows the total USD value raised in the presale.
4. **Direct Contract Interaction**: Fetches data directly from the smart contract for accurate calculations.

### Implementation Details

#### Progress Bar Calculation
The progress bar is calculated by:
1. Getting the current phase information from the contract
2. Calculating the ratio of tokens sold to total tokens available in the phase
3. Converting this ratio to a percentage

#### Token Price Calculation
The token price is calculated by:
1. Getting the tokens per USD value from the contract
2. Converting this to USD per token for display

#### USD Raised Calculation
The USD raised is calculated by:
1. Getting the tokens sold from the contract
2. Dividing by the tokens per USD to get the USD value

#### Token Purchase Calculation
When a user enters an amount in BNB or USDT:
1. For BNB: The amount is converted to USD using the current BNB price
2. For USDT: The amount is used directly as USD
3. The USD amount is multiplied by tokens per USD to get the number of tokens

### Future Improvements
1. Add more detailed transaction history
2. Implement a countdown timer for phase end
3. Add support for additional payment methods
4. Improve error handling and user feedback
