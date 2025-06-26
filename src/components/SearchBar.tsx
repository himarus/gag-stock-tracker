import React, { useState } from 'react';
import { Search, X, Filter } from 'lucide-react';

interface SearchBarProps {
  onSearch: (query: string) => void;
  onCategoryFilter: (category: string | null) => void;
  className?: string;
}

export const SearchBar: React.FC<SearchBarProps> = ({ 
  onSearch, 
  onCategoryFilter, 
  className = '' 
}) => {
  const [query, setQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const categories = ['gear', 'egg', 'seed', 'honey', 'cosmetics'];

  const handleSearch = (value: string) => {
    setQuery(value);
    onSearch(value);
  };

  const handleCategorySelect = (category: string | null) => {
    setSelectedCategory(category);
    onCategoryFilter(category);
    setIsFilterOpen(false);
  };

  const clearSearch = () => {
    setQuery('');
    onSearch('');
  };

  return (
    <div className={`bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden ${className}`}>
      <div className="p-6">
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Search Input */}
          <div className="flex-1 relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="w-5 h-5 text-gray-400" />
            </div>
            <input
              type="text"
              value={query}
              onChange={(e) => handleSearch(e.target.value)}
              placeholder="Search items by name..."
              className="w-full pl-12 pr-12 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200 text-gray-900 placeholder-gray-500"
            />
            {query && (
              <button
                onClick={clearSearch}
                className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 transition-colors duration-200"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>

          {/* Filter Button */}
          <div className="relative">
            <button
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className={`flex items-center space-x-2 px-4 py-3 rounded-xl border transition-all duration-200 ${
                selectedCategory
                  ? 'bg-emerald-500 text-white border-emerald-500'
                  : 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100'
              }`}
            >
              <Filter className="w-5 h-5" />
              <span className="font-medium">
                {selectedCategory ? selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1) : 'Filter'}
              </span>
            </button>

            {/* Filter Dropdown */}
            {isFilterOpen && (
              <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-gray-100 z-10 overflow-hidden">
                <div className="py-2">
                  <button
                    onClick={() => handleCategorySelect(null)}
                    className={`w-full text-left px-4 py-2 text-sm transition-colors duration-200 ${
                      !selectedCategory
                        ? 'bg-emerald-50 text-emerald-700 font-medium'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    All Categories
                  </button>
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => handleCategorySelect(category)}
                      className={`w-full text-left px-4 py-2 text-sm transition-colors duration-200 capitalize ${
                        selectedCategory === category
                          ? 'bg-emerald-50 text-emerald-700 font-medium'
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Active Filters */}
        {(query || selectedCategory) && (
          <div className="mt-4 flex flex-wrap gap-2">
            {query && (
              <div className="flex items-center space-x-2 bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                <span>Search: "{query}"</span>
                <button
                  onClick={clearSearch}
                  className="text-blue-600 hover:text-blue-800 transition-colors duration-200"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            )}
            {selectedCategory && (
              <div className="flex items-center space-x-2 bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full text-sm">
                <span>Category: {selectedCategory}</span>
                <button
                  onClick={() => handleCategorySelect(null)}
                  className="text-emerald-600 hover:text-emerald-800 transition-colors duration-200"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};