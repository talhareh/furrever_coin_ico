"use client";

import useCountdown from '@/hooks/useCountdown';

interface CountdownTimerProps {
  targetTimestamp: number | bigint;
  onExpire?: () => void;
}

export default function CountdownTimer({ targetTimestamp, onExpire }: CountdownTimerProps) {
  // Convert bigint to number if needed
  const timestamp = typeof targetTimestamp === 'bigint' 
    ? Number(targetTimestamp) * 1000 // Convert from seconds to milliseconds
    : targetTimestamp;
    
  const { days, hours, minutes, seconds, isComplete } = useCountdown(timestamp);
  
  // Call onExpire when timer expires
  if (isComplete && onExpire) {
    onExpire();
  }
  
  // Format time units to always have two digits
  const formatTimeUnit = (value: number): string => {
    return value.toString().padStart(2, '0');
  };
  
  const units = [
    { value: days, label: 'Days' },
    { value: hours, label: 'Hours' },
    { value: minutes, label: 'Minutes' },
    { value: seconds, label: 'Seconds' }
  ];
  
  return (
    <div className="flex flex-col items-center">
      <div className="flex font-digital text-black">
        {units.map((unit, index) => (
          <div key={unit.label} className="flex flex-col items-center">
            <div className="inline-flex items-center px-2 space-x-3">
              <span className="text-3xl font-bold">{formatTimeUnit(unit.value)}</span>
              {index < units.length - 1 && (
                <span className="text-3xl font-bold">:</span>
              )}
            </div>
            <span className="text-xs mt-1 text-gray-600 capitalize">{unit.label.toLowerCase()}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
