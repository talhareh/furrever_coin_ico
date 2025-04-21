import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

// Utility for combining Tailwind CSS classes
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Format a number to a currency string
export function formatCurrency(value: number | string, currency = 'USD', decimals = 2): string {
  const numValue = typeof value === 'string' ? parseFloat(value) : value;
  
  if (isNaN(numValue)) return '0.00';
  
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(numValue);
}

// Format a number with commas
export function formatNumber(value: number | string, decimals = 2): string {
  const numValue = typeof value === 'string' ? parseFloat(value) : value;
  
  if (isNaN(numValue)) return '0';
  
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 0,
    maximumFractionDigits: decimals,
  }).format(numValue);
}

// Format a bigint to a readable string with specified decimals
export function formatBigInt(value: bigint, decimals = 18): string {
  if (!value) return '0';
  
  const divisor = BigInt(10) ** BigInt(decimals);
  const integerPart = value / divisor;
  const fractionalPart = value % divisor;
  
  // Convert to string and pad with leading zeros
  let fractionalStr = fractionalPart.toString();
  fractionalStr = fractionalStr.padStart(decimals, '0');
  
  // Trim trailing zeros
  fractionalStr = fractionalStr.replace(/0+$/, '');
  
  if (fractionalStr === '') {
    return integerPart.toString();
  }
  
  return `${integerPart}.${fractionalStr}`;
}

// Calculate time remaining from a timestamp
export function getTimeRemaining(targetTimestamp: number): {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  total: number;
} {
  const total = targetTimestamp - Date.now();
  
  if (total <= 0) {
    return {
      total: 0,
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    };
  }
  
  const seconds = Math.floor((total / 1000) % 60);
  const minutes = Math.floor((total / 1000 / 60) % 60);
  const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
  const days = Math.floor(total / (1000 * 60 * 60 * 24));
  
  return {
    total,
    days,
    hours,
    minutes,
    seconds,
  };
}
