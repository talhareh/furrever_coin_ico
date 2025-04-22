import {cookieStorage, createStorage} from 'wagmi';
import { WagmiAdapter } from '@reown/appkit-adapter-wagmi';
import { mainnet, opBNBTestnet } from '@reown/appkit/networks';
import { bnbTestnet } from "../testnet/bnbTestnet";
export const projectId = process.env.NEXT_PUBLIC_PROJECT_ID


if (!projectId) {
    throw new Error('Project Id is not defined')
}

export const networks = [mainnet, opBNBTestnet, bnbTestnet]
export const wagmiAdapter = new WagmiAdapter({
    storage: createStorage({
        storage: cookieStorage
    }),
    ssr: true,
    networks,
    projectId
})

export const config = wagmiAdapter.wagmiConfig