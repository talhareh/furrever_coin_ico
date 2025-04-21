"use client";

import { cn } from '@/lib/utils';

interface ProgressBarProps {
  value: number;
  max: number;
  className?: string;
  showPercentage?: boolean;
}

export default function ProgressBar({
  value,
  max,
  className,
  showPercentage = true,
}: ProgressBarProps) {
  // Calculate percentage
  const percentage = max > 0 ? Math.min(Math.round((value / max) * 100), 100) : 0;
  
  return (
    <div className={cn('w-full', className)}>
      <div className="flex justify-between mb-1">
        {showPercentage && (
          <span className="text-sm font-medium text-gray-700">{percentage}% Complete</span>
        )}
      </div>
      <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
        <div
          className="bg-[#FFD966] h-full rounded-full transition-all duration-500 ease-in-out"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
