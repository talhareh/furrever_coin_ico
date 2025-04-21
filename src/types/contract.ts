// Contract-related types

export interface StageInfo {
  price: bigint;
  startTime: bigint;
  endTime: bigint;
  totalTokens: bigint;
  soldTokens: bigint;
}

export interface PresaleStats {
  currentStage: number;
  stageInfo: StageInfo;
  totalSold: bigint;
  isWhitelisted: boolean;
}

export interface TokenPurchasedEvent {
  buyer: string;
  amount: bigint;
  tokens: bigint;
  timestamp: number;
  transactionHash: string;
}

export interface StageUpdatedEvent {
  stage: number;
  price: bigint;
  startTime: bigint;
  endTime: bigint;
  timestamp: number;
  transactionHash: string;
}

export type PresaleEvent = TokenPurchasedEvent | StageUpdatedEvent;
