import React from 'react';
import { StockData } from '../types';
import { Package, TrendingUp, Layers, BarChart3 } from 'lucide-react';

interface StockSummaryProps {
  stockData: StockData;
  className?: string;
}

export const StockSummary: React.FC<StockSummaryProps> = ({ stockData, className = '' }) => {
  const calculateTotals = () => {
    let totalItems = 0;
    let totalTypes = 0;
    const categoryStats: Record<string, { items: number; types: number }> = {};

    Object.entries(stockData).forEach(([category, data]) => {
      if (category === 'updated_at') return;
      
      const categoryItems = data.items.reduce((sum, item) => sum + item.quantity, 0);
      const categoryTypes = data.items.length;
      
      totalItems += categoryItems;
      totalTypes += categoryTypes;
      
      categoryStats[category] = {
        items: categoryItems,
        types: categoryTypes
      };
    });

    return { totalItems, totalTypes, categoryStats };
  };

  const { totalItems, totalTypes, categoryStats } = calculateTotals();

  const getMostStockedCategory = () => {
    let maxItems = 0;
    let maxCategory = '';
    
    Object.entries(categoryStats).forEach(([category, stats]) => {
      if (stats.items > maxItems) {
        maxItems = stats.items;
        maxCategory = category;
      }
    });
    
    return { category: maxCategory, items: maxItems };
  };

  const mostStocked = getMostStockedCategory();

  const formatNumber = (num: number) => {
    if (num >= 1000) return `${(num / 1000).toFixed(1)}k`;
    return num.toString();
  };

  return (
    <div className={`bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl shadow-xl border border-indigo-100 overflow-hidden ${className}`}>
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative z-10 flex items-center space-x-4">
          <div className="relative">
            <div className="absolute inset-0 bg-white/20 rounded-full animate-pulse"></div>
            <BarChart3 className="w-8 h-8 relative z-10 drop-shadow-lg" />
          </div>
          <div>
            <h2 className="text-2xl font-bold mb-1">Stock Summary</h2>
            <p className="text-indigo-100">Overview of all available items</p>
          </div>
        </div>
        
        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -translate-y-10 translate-x-10"></div>
        <div className="absolute bottom-0 left-0 w-16 h-16 bg-white/10 rounded-full translate-y-8 -translate-x-8"></div>
      </div>

      {/* Summary Stats */}
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          {/* Total Items */}
          <div className="bg-white rounded-xl p-4 shadow-lg border border-gray-100">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-emerald-100 rounded-lg">
                <Package className="w-6 h-6 text-emerald-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Total Items</p>
                <p className="text-2xl font-bold text-gray-900">{formatNumber(totalItems)}</p>
              </div>
            </div>
          </div>

          {/* Unique Types */}
          <div className="bg-white rounded-xl p-4 shadow-lg border border-gray-100">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Layers className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Unique Types</p>
                <p className="text-2xl font-bold text-gray-900">{totalTypes}</p>
              </div>
            </div>
          </div>

          {/* Top Category */}
          <div className="bg-white rounded-xl p-4 shadow-lg border border-gray-100">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <TrendingUp className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Top Category</p>
                <p className="text-lg font-bold text-gray-900 capitalize">{mostStocked.category}</p>
                <p className="text-sm text-gray-500">{formatNumber(mostStocked.items)} items</p>
              </div>
            </div>
          </div>
        </div>

        {/* Category Breakdown */}
        <div className="bg-white rounded-xl p-4 shadow-lg border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Category Breakdown</h3>
          <div className="space-y-3">
            {Object.entries(categoryStats).map(([category, stats]) => {
              const percentage = totalItems > 0 ? (stats.items / totalItems) * 100 : 0;
              
              return (
                <div key={category} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3 flex-1">
                    <span className="text-sm font-medium text-gray-700 capitalize w-20">
                      {category}
                    </span>
                    <div className="flex-1 bg-gray-200 rounded-full h-2 overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-500"
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                  </div>
                  <div className="text-right ml-4">
                    <p className="text-sm font-semibold text-gray-900">
                      {formatNumber(stats.items)}
                    </p>
                    <p className="text-xs text-gray-500">
                      {stats.types} types
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};