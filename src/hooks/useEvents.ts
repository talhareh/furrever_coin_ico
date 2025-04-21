"use client";

import { useEffect } from 'react';
import { usePublicClient } from 'wagmi';
import { CONTRACT_ADDRESSES, PRESALE_ABI } from '@/config/contract';
import usePresaleStore from '@/store/presaleStore';
import { StageUpdatedEvent, TokenPurchasedEvent } from '@/types/contract';

const useEvents = () => {
  const publicClient = usePublicClient();
  const { addEvent } = usePresaleStore();

  useEffect(() => {
    if (!publicClient) return;

    // Create an unwatch function for each event
    const unwatchTokenPurchased = publicClient.watchContractEvent({
      address: CONTRACT_ADDRESSES.PRESALE,
      abi: PRESALE_ABI,
      eventName: 'TokenPurchased',
      onLogs: (logs) => {
        logs.forEach((log) => {
          const event = log.args as unknown as TokenPurchasedEvent;
          if (event.buyer && event.amount) {
            addEvent({
              type: 'purchase',
              buyer: event.buyer.toString(),
              amount: event.amount.toString(),
              timestamp: Date.now(),
            });
          }
        });
      },
    });

    const unwatchStageUpdated = publicClient.watchContractEvent({
      address: CONTRACT_ADDRESSES.PRESALE,
      abi: PRESALE_ABI,
      eventName: 'StageUpdated',
      onLogs: (logs) => {
        logs.forEach((log) => {
          const event = log.args as unknown as StageUpdatedEvent;
          if (event.stageId !== undefined) {
            addEvent({
              type: 'stage',
              stageId: Number(event.stageId),
              timestamp: Date.now(),
            });
          }
        });
      },
    });

    // Cleanup function
    return () => {
      unwatchTokenPurchased();
      unwatchStageUpdated();
    };
  }, [publicClient, addEvent]);
};

export default useEvents;
