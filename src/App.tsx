import React, { useState, useMemo } from 'react';
import { useStockData } from './hooks/useStockData';
import { Header } from './components/Header';
import { WeatherCard } from './components/WeatherCard';
import { CategoryCard } from './components/CategoryCard';
import { StockSummary } from './components/StockSummary';
import { SearchBar } from './components/SearchBar';
import { LoadingSpinner } from './components/LoadingSpinner';
import { ErrorMessage } from './components/ErrorMessage';
import { CategoryType } from './types';

function App() {
  const { stockData, weatherData, loading, error, lastUpdated, refetch } = useStockData();
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null);

  const filteredStockData = useMemo(() => {
    if (!stockData?.data) return null;

    const filtered = { ...stockData.data };

    if (categoryFilter) {
      Object.keys(filtered).forEach(key => {
        if (key !== 'updated_at' && key !== categoryFilter) {
          delete (filtered as any)[key];
        }
      });
    }

    if (searchQuery) {
      Object.keys(filtered).forEach(key => {
        if (key !== 'updated_at') {
          const categoryData = (filtered as any)[key];
          if (categoryData?.items) {
            categoryData.items = categoryData.items.filter((item: any) =>
              item.name.toLowerCase().includes(searchQuery.toLowerCase())
            );
          }
        }
      });
    }

    return { ...stockData, data: filtered };
  }, [stockData, searchQuery, categoryFilter]);

  if (loading && !stockData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <LoadingSpinner size="lg" text="Loading garden data..." />
          <p className="mt-4 text-gray-600 max-w-md">
            Fetching the latest stock information and weather updates for your garden...
          </p>
        </div>
      </div>
    );
  }

  if (error && !stockData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full">
          <ErrorMessage message={error} onRetry={refetch} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-blue-50 to-indigo-100">
      <Header
        lastUpdated={lastUpdated}
        onRefresh={refetch}
        isLoading={loading}
        isOnline={navigator.onLine}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          <SearchBar
            onSearch={setSearchQuery}
            onCategoryFilter={setCategoryFilter}
          />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {weatherData && (
              <WeatherCard weather={weatherData} />
            )}

            {filteredStockData?.data && (
              <StockSummary stockData={filteredStockData.data} />
            )}
          </div>

          {filteredStockData?.data && (
            <div className="space-y-8">
              {Object.entries(filteredStockData.data).map(([category, data]) => {
                if (category === 'updated_at') return null;
                
                return (
                  <CategoryCard
                    key={category}
                    title={category.charAt(0).toUpperCase() + category.slice(1)}
                    category={category as CategoryType}
                    data={data}
                  />
                );
              })}
            </div>
          )}

          {filteredStockData?.data && 
           Object.keys(filteredStockData.data).filter(key => key !== 'updated_at').length === 0 && (
            <div className="text-center py-16">
              <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
                <SearchBar className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No items found</h3>
              <p className="text-gray-600 max-w-md mx-auto">
                Try adjusting your search terms or filters to find what you're looking for.
              </p>
            </div>
          )}
        </div>
      </main>

      <footer className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-700 rounded-xl p-6 shadow-lg inline-block">
              <div className="flex items-center justify-center space-x-4">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                  <span className="text-2xl">👨‍💻</span>
                </div>
                <div className="text-center">
                  <h4 className="text-lg font-semibold text-white">Crafted by Churchill</h4>
                </div>
                <a 
                  href="https://www.facebook.com/Churchill.Dev4100" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-white/20 hover:bg-white/30 text-white p-3 rounded-lg transition-all duration-300 hover:scale-105 backdrop-blur-sm group"
                >
                  <svg className="w-5 h-5 text-blue-300 group-hover:text-blue-200 transition-colors" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-700 mt-6 pt-6 text-center">
            <div className="text-gray-400 text-sm">
              © 2025 chillimansi.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
