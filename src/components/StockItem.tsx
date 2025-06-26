import React from 'react';
import { StockItem as StockItemType } from '../types';
import { getItemIcon } from '../utils/iconMapping';
import { Package, Hash } from 'lucide-react';

interface StockItemProps {
  item: StockItemType;
  className?: string;
  showQuantityBadge?: boolean;
}

export const StockItem: React.FC<StockItemProps> = ({ 
  item, 
  className = '',
  showQuantityBadge = true 
}) => {
  const ItemIcon = getItemIcon(item.name);
  
  const getQuantityColor = (quantity: number) => {
    if (quantity >= 10) return 'bg-green-500 text-white';
    if (quantity >= 5) return 'bg-yellow-500 text-white';
    if (quantity >= 1) return 'bg-orange-500 text-white';
    return 'bg-red-500 text-white';
  };

  const getQuantityText = (quantity: number) => {
    if (quantity >= 1000) return `${(quantity / 1000).toFixed(1)}k`;
    return quantity.toString();
  };

  return (
    <div className={`group relative bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 overflow-hidden ${className}`}>
      {/* Quantity Badge */}
      {showQuantityBadge && (
        <div className="absolute top-3 right-3 z-10">
          <div className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-bold shadow-lg ${getQuantityColor(item.quantity)}`}>
            <Hash className="w-3 h-3" />
            <span>{getQuantityText(item.quantity)}</span>
          </div>
        </div>
      )}

      {/* Item Content */}
      <div className="p-6">
        {/* Icon Container */}
        <div className="flex justify-center mb-4">
          <div className="relative">
            {/* Glow Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-blue-500 rounded-full opacity-20 group-hover:opacity-30 transition-opacity duration-300 blur-sm"></div>
            
            {/* Icon Background */}
            <div className="relative bg-gradient-to-br from-gray-50 to-gray-100 p-4 rounded-full border-2 border-gray-200 group-hover:border-emerald-300 transition-all duration-300">
              <ItemIcon className="w-8 h-8 text-gray-700 group-hover:text-emerald-600 transition-colors duration-300" />
            </div>
          </div>
        </div>

        {/* Item Name */}
        <div className="text-center">
          <h3 className="font-semibold text-gray-900 group-hover:text-emerald-700 transition-colors duration-300 text-sm leading-tight">
            {item.name}
          </h3>
          
          {/* Quantity Text */}
          <div className="mt-2 flex items-center justify-center space-x-1 text-xs text-gray-500">
            <Package className="w-3 h-3" />
            <span>Qty: {item.quantity}</span>
          </div>
        </div>

        {/* Hover Effect Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
      </div>

      {/* Bottom Border Animation */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-400 to-blue-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
    </div>
  );
};