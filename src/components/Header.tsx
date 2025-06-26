import React from 'react';
import { RefreshCw, Leaf, Activity } from 'lucide-react';
import { formatTimeAgo } from '../utils/timeUtils';

interface HeaderProps {
  lastUpdated: Date | null;
  onRefresh: () => void;
  loading: boolean;
}

export const Header: React.FC<HeaderProps> = ({ lastUpdated, onRefresh, loading }) => {
  return (
    <header className="bg-gradient-to-r from-green-500 via-green-600 to-emerald-600 shadow-lg">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          <div className="flex items-center space-x-2 sm:space-x-4">
            <div className="bg-white/20 p-2 sm:p-3 rounded-xl backdrop-blur-sm">
              <Leaf className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
            </div>
            <div>
              <h1 className="text-lg sm:text-2xl font-bold text-white tracking-tight">Grow A Garden</h1>
              <div className="flex items-center space-x-2">
                <p className="text-green-100 text-xs sm:text-sm font-medium">Stock Tracker</p>
                <div className="flex items-center space-x-1 bg-green-400/30 px-2 py-1 rounded-full">
                  <Activity className="h-2 w-2 sm:h-3 sm:w-3 text-green-200" />
                  <span className="text-xs text-green-200 font-medium">LIVE</span>
                </div>
              </div>
            </div>
          </div>
          
        
          <div className="flex items-center space-x-2 sm:space-x-6">
            <div className="text-right text-green-100 hidden sm:block">
              <div className="text-sm font-medium">
                Created by Churchill
              </div>
              <div className="text-xs text-green-200">
                {lastUpdated ? `Updated ${formatTimeAgo(lastUpdated)}` : 'Loading...'}
              </div>
            </div>
            
            <button
              onClick={onRefresh}
              disabled={loading}
              className="flex items-center space-x-2 sm:space-x-3 bg-white/20 hover:bg-white/30 px-3 sm:px-6 py-2 sm:py-3 rounded-xl transition-all duration-300 backdrop-blur-sm disabled:opacity-50 group shadow-lg hover:shadow-xl hover:scale-105"
            >
              <RefreshCw className={`h-4 w-4 sm:h-5 sm:w-5 transition-transform duration-500 ${loading ? 'animate-spin' : 'group-hover:rotate-180'}`} />
              <span className="text-xs sm:text-sm font-semibold hidden sm:inline">
                {loading ? 'Refreshing...' : 'Refresh'}
              </span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
