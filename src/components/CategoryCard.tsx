import React, { useState } from 'react';
import { CategoryData, CategoryType } from '../types';
import { getCategoryIcon } from '../utils/iconMapping';
import { StockItem } from './StockItem';
import { LiveCountdown } from './LiveCountdown';
import { ChevronDown, ChevronUp, Package, Clock, TrendingUp } from 'lucide-react';

interface CategoryCardProps {
  title: string;
  category: CategoryType;
  data: CategoryData;
  className?: string;
}

export const CategoryCard: React.FC<CategoryCardProps> = ({ 
  title, 
  category, 
  data, 
  className = '' 
}) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const CategoryIcon = getCategoryIcon(category);
  
  const totalItems = data.items.reduce((sum, item) => sum + item.quantity, 0);
  const uniqueItems = data.items.length;

  const getCategoryGradient = (category: CategoryType) => {
    switch (category) {
      case 'gear': return 'from-blue-500 to-indigo-600';
      case 'egg': return 'from-yellow-400 to-orange-500';
      case 'seed': return 'from-green-500 to-emerald-600';
      case 'honey': return 'from-amber-400 to-yellow-500';
      case 'cosmetics': return 'from-purple-500 to-pink-600';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  const getCategoryAccent = (category: CategoryType) => {
    switch (category) {
      case 'gear': return 'border-blue-200 bg-blue-50';
      case 'egg': return 'border-yellow-200 bg-yellow-50';
      case 'seed': return 'border-green-200 bg-green-50';
      case 'honey': return 'border-amber-200 bg-amber-50';
      case 'cosmetics': return 'border-purple-200 bg-purple-50';
      default: return 'border-gray-200 bg-gray-50';
    }
  };

  return (
    <div className={`bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden ${className}`}>
      {/* Header */}
      <div className={`bg-gradient-to-r ${getCategoryGradient(category)} text-white relative overflow-hidden`}>
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative z-10 p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <div className="absolute inset-0 bg-white/20 rounded-full animate-pulse"></div>
                <CategoryIcon className="w-8 h-8 relative z-10 drop-shadow-lg" />
              </div>
              <div>
                <h2 className="text-2xl font-bold mb-1">{title}</h2>
                <div className="flex items-center space-x-4 text-white/90 text-sm">
                  <div className="flex items-center space-x-1">
                    <Package className="w-4 h-4" />
                    <span>{uniqueItems} types</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <TrendingUp className="w-4 h-4" />
                    <span>{totalItems} total</span>
                  </div>
                </div>
              </div>
            </div>
            
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition-all duration-200 transform hover:scale-110"
            >
              {isExpanded ? (
                <ChevronUp className="w-5 h-5" />
              ) : (
                <ChevronDown className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
        
        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full -translate-y-12 translate-x-12"></div>
        <div className="absolute bottom-0 left-0 w-16 h-16 bg-white/10 rounded-full translate-y-8 -translate-x-8"></div>
      </div>

      {/* Countdown */}
      <div className={`px-6 py-4 ${getCategoryAccent(category)} border-b border-gray-100`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Clock className="w-4 h-4 text-gray-600" />
            <span className="text-sm font-medium text-gray-700">Next Restock</span>
          </div>
          <LiveCountdown countdown={data.countdown} />
        </div>
      </div>

      {/* Items Grid */}
      <div className={`transition-all duration-300 overflow-hidden ${
        isExpanded ? 'max-h-none opacity-100' : 'max-h-0 opacity-0'
      }`}>
        <div className="p-6">
          {data.items.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
              {data.items.map((item, index) => (
                <StockItem
                  key={`${item.name}-${index}`}
                  item={item}
                  className="transform transition-all duration-300 hover:scale-105"
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                <Package className="w-8 h-8 text-gray-400" />
              </div>
              <p className="text-gray-500 font-medium">No items available</p>
              <p className="text-gray-400 text-sm mt-1">Check back after the next restock</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};