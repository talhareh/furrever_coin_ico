"use client";

import { useState, useEffect } from 'react';

type CountdownTime = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isComplete: boolean;
};

export default function useCountdown(targetDate: number): CountdownTime {
  const calculateTimeLeft = (): CountdownTime => {
    const difference = targetDate - Date.now();
    
    if (difference <= 0) {
      return {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
        isComplete: true,
      };
    }
    
    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
      isComplete: false,
    };
  };
  
  const [timeLeft, setTimeLeft] = useState<CountdownTime>(calculateTimeLeft());
  
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    
    return () => clearInterval(timer);
  }, [targetDate, calculateTimeLeft]);
  
  return timeLeft;
}
