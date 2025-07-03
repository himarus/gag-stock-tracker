import React from 'react';
import { useStockData } from './useStockData';

const StockDisplay: React.FC = () => {
  const { 
    stockData, 
    weatherData, 
    loading, 
    error, 
    lastUpdated, 
    refetch,
    categories
  } = useStockData();

  if (loading) return <div>Loading stock data...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!stockData || !weatherData) return <div>No data available</div>;

  return (
    <div className="stock-container">
      <div className="header">
        <h1>Grow a Garden Stock</h1>
        <button onClick={refetch}>Refresh</button>
        <p>Last updated: {lastUpdated?.toLocaleString()}</p>
        <p>API updated at: {stockData.updated_at}</p>
      </div>

      <div className="weather-section">
        <h2>
          {weatherData.icon} {weatherData.currentWeather}
        </h2>
        <div dangerouslySetInnerHTML={{ __html: weatherData.description }} />
        <p><strong>Visual Cue:</strong> {weatherData.visualCue}</p>
        <p><strong>Crop Bonuses:</strong> {weatherData.cropBonuses}</p>
      </div>

      <div className="stock-sections">
        {categories.map((category) => {
          const categoryData = stockData.data[category];
          if (!categoryData) return null;

          return (
            <div key={category} className="category-section">
              <h2>{category.toUpperCase()}</h2>
              
              {categoryData.status && (
                <p>Status: {categoryData.status}</p>
              )}
              
              {categoryData.countdown && (
                <p>Refreshes in: {categoryData.countdown}</p>
              )}
              
              {categoryData.appearIn && (
                <p>Appears in: {categoryData.appearIn}</p>
              )}

              <div className="items-grid">
                {categoryData.items.map((item, index) => (
                  <div key={index} className="item-card">
                    <span className="item-emoji">{item.emoji || '❓'}</span>
                    <span className="item-name">{item.name}</span>
                    <span className="item-quantity">×{item.quantity}</span>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default StockDisplay;
