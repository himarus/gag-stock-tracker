import React from 'react';
import { Clock } from 'lucide-react';
import { StockCategory, CategoryKey } from '../types';
import { getCategoryDisplayName, getCategoryIcon } from '../utils/formatUtils';
import { formatCountdown } from '../utils/timeUtils';
import { StockItem } from './StockItem';

interface StockSectionProps {
  category: CategoryKey;
  data: StockCategory;
}

export const StockSection: React.FC<StockSectionProps> = ({ category, data }) => {
  const hasItems = data.items && data.items.length > 0;
  const availableItems = hasItems ? data.items.filter(item => item.quantity > 0) : [];
  const totalItems = hasItems ? data.items.reduce((sum, item) => sum + item.quantity, 0) : 0;

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
      <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-6 py-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <span className="text-2xl">{getCategoryIcon(category)}</span>
            <div>
              <h3 className="text-lg font-bold text-gray-900">
                {getCategoryDisplayName(category)}
              </h3>
              <p className="text-sm text-gray-600">
                {availableItems.length} of {hasItems ? data.items.length : 0} items available
              </p>
            </div>
          </div>
          
          <div className="text-right">
            <div className="flex items-center space-x-2 text-gray-600">
              <Clock className="h-4 w-4" />
              <span className="text-sm font-medium">
                {formatCountdown(data.countdown)}
              </span>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Total: {totalItems} items
            </p>
          </div>
        </div>
      </div>
      
      <div className="p-6">
        {!hasItems ? (
          <div className="text-center py-8">
            <Package className="h-12 w-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500">No items available</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {data.items.map((item, index) => (
              <StockItem key={`${item.name}-${index}`} item={item} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};