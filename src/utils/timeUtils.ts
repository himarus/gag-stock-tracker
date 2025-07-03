export const formatTimeAgo = (date: Date): string => {
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  
  if (diffInSeconds < 60) {
    return 'Just now';
  }
  
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) {
    return `${diffInMinutes}m ago`;
  }
  
  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) {
    return `${diffInHours}h ago`;
  }
  
  const diffInDays = Math.floor(diffInHours / 24);
  return `${diffInDays}d ago`;
};

export const parseCountdown = (countdown: string | null | undefined): { 
  hours: number; 
  minutes: number; 
  seconds: number 
} => {
  if (!countdown) return { hours: 0, minutes: 0, seconds: 0 };
  
  const match = countdown.match(/(\d+)h\s*(\d+)m\s*(\d+)s/);
  if (match) {
    return {
      hours: parseInt(match[1], 10),
      minutes: parseInt(match[2], 10),
      seconds: parseInt(match[3], 10)
    };
  }
  return { hours: 0, minutes: 0, seconds: 0 };
};

export const formatCountdown = (countdown: string | null | undefined): string => {
  if (!countdown) return 'Not available';
  
  const { hours, minutes, seconds } = parseCountdown(countdown);
  
  if (hours > 0) {
    return `${hours}h ${minutes}m`;
  }
  if (minutes > 0) {
    return `${minutes}m ${seconds}s`;
  }
  return `${seconds}s`;
};

// Format Discord timestamps to readable format
export const formatDiscordTimestamp = (text: string): string => {
  return text.replace(/<t:(\d+):R>/g, (match, timestamp) => {
    const date = new Date(parseInt(timestamp) * 1000);
    return date.toLocaleTimeString();
  });
};
