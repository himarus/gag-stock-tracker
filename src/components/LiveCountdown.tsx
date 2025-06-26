import React, { useState, useEffect } from 'react';
import { Timer, AlertCircle } from 'lucide-react';

interface LiveCountdownProps {
  countdown: string;
  className?: string;
}

export const LiveCountdown: React.FC<LiveCountdownProps> = ({ countdown, className = '' }) => {
  const [timeLeft, setTimeLeft] = useState(countdown);
  const [isUrgent, setIsUrgent] = useState(false);

  useEffect(() => {
    const parseCountdown = (countdownStr: string) => {
      const match = countdownStr.match(/(\d+)h\s*(\d+)m\s*(\d+)s/);
      if (!match) return 0;
      
      const hours = parseInt(match[1]);
      const minutes = parseInt(match[2]);
      const seconds = parseInt(match[3]);
      
      return hours * 3600 + minutes * 60 + seconds;
    };

    const formatTime = (totalSeconds: number) => {
      if (totalSeconds <= 0) return '00h 00m 00s';
      
      const hours = Math.floor(totalSeconds / 3600);
      const minutes = Math.floor((totalSeconds % 3600) / 60);
      const seconds = totalSeconds % 60;
      
      return `${hours.toString().padStart(2, '0')}h ${minutes.toString().padStart(2, '0')}m ${seconds.toString().padStart(2, '0')}s`;
    };

    let totalSeconds = parseCountdown(countdown);
    
    const interval = setInterval(() => {
      if (totalSeconds > 0) {
        totalSeconds--;
        setTimeLeft(formatTime(totalSeconds));
        setIsUrgent(totalSeconds <= 300); // Last 5 minutes
      } else {
        setTimeLeft('00h 00m 00s');
        setIsUrgent(false);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [countdown]);

  const getTimeColor = () => {
    if (timeLeft === '00h 00m 00s') return 'text-red-600 bg-red-100';
    if (isUrgent) return 'text-orange-600 bg-orange-100';
    return 'text-emerald-600 bg-emerald-100';
  };

  const getIconColor = () => {
    if (timeLeft === '00h 00m 00s') return 'text-red-500';
    if (isUrgent) return 'text-orange-500';
    return 'text-emerald-500';
  };

  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      <div className={`p-1 rounded-full ${isUrgent ? 'animate-pulse' : ''}`}>
        {timeLeft === '00h 00m 00s' ? (
          <AlertCircle className={`w-4 h-4 ${getIconColor()}`} />
        ) : (
          <Timer className={`w-4 h-4 ${getIconColor()}`} />
        )}
      </div>
      <span className={`px-3 py-1 rounded-full text-sm font-mono font-semibold ${getTimeColor()} ${isUrgent ? 'animate-pulse' : ''}`}>
        {timeLeft}
      </span>
    </div>
  );
};