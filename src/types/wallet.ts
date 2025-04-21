// Wallet-related types

export interface WalletState {
  address: string | null;
  isConnected: boolean;
  isConnecting: boolean;
  chainId: number | null;
  isCorrectNetwork: boolean;
  isOwner: boolean;
  error: string | null;
}

export type PaymentMethod = 'BNB' | 'USDT';

export interface PurchaseFormData {
  amount: string;
  paymentMethod: PaymentMethod;
}
