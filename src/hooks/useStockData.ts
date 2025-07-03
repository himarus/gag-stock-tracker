import { useState, useEffect } from 'react';
import { ApiResponse, WeatherData } from '../types';
import { formatDiscordTimestamp } from '../utils/timeUtils';

const proxy = 'https://corsproxy.io/?';
const STOCK_API_URL = proxy + 'https://gagstock.gleeze.com/grow-a-garden';
const WEATHER_API_URL = proxy + 'https://growagardenstock.com/api/stock/weather';

export const useStockData = () => {
  const [stockData, setStockData] = useState<ApiResponse | null>(null);
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);

      const [stockResponse, weatherResponse] = await Promise.all([
        fetch(STOCK_API_URL, { cache: 'no-store' }),
        fetch(WEATHER_API_URL, { cache: 'no-store' })
      ]);

      if (!stockResponse.ok) {
        throw new Error(`Stock API error: ${stockResponse.status}`);
      }

      if (!weatherResponse.ok) {
        throw new Error(`Weather API error: ${weatherResponse.status}`);
      }

      const stockResult: ApiResponse = await stockResponse.json();
      const weatherResult: WeatherData = await weatherResponse.json();

      // Process weather data
      const processedWeather: WeatherData = {
        ...weatherResult,
        description: formatDiscordTimestamp(weatherResult.description),
        effectDescription: formatDiscordTimestamp(weatherResult.effectDescription)
      };

      // Ensure all categories have at least an empty items array
      const categories: (keyof StockData)[] = [
        'gear', 'egg', 'seed', 'honey', 'cosmetics', 'travelingmerchant'
      ];
      
      const processedStock: ApiResponse = {
        ...stockResult,
        data: {
          ...stockResult.data,
          updated_at: stockResult.data.updated_at || new Date().toISOString()
        }
      };

      // Ensure each category has items array
      categories.forEach(category => {
        if (!processedStock.data[category]) {
          processedStock.data[category] = { items: [] };
        } else if (!processedStock.data[category].items) {
          processedStock.data[category].items = [];
        }
      });

      setStockData(processedStock);
      setWeatherData(processedWeather);
      setLastUpdated(new Date());
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch data');
      console.error('API Error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    
    const interval = setInterval(fetchData, 5 * 60 * 1000); // 5 minutes
    
    return () => clearInterval(interval);
  }, []);

  return {
    stockData,
    weatherData,
    loading,
    error,
    lastUpdated,
    refetch: fetchData
  };
};
