import { useState, useEffect } from 'react';
import { ApiResponse, WeatherData } from './types';

const proxy = 'https://corsproxy.io/?';
const STOCK_API_URL = proxy + 'https://gagstock.gleeze.com/grow-a-garden';
const WEATHER_API_URL = proxy + 'https://growagardenstock.com/api/stock/weather';

export const useStockData = () => {
  const [stockData, setStockData] = useState<ApiResponse | null>(null);
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const processWeatherDescription = (desc: string): string => {
    // Convert Discord timestamp format to readable time
    return desc.replace(/<t:(\d+):R>/g, (match, timestamp) => {
      const date = new Date(parseInt(timestamp) * 1000);
      return date.toLocaleTimeString();
    });
  };

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);

      const [stockResponse, weatherResponse] = await Promise.all([
        fetch(STOCK_API_URL),
        fetch(WEATHER_API_URL)
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
        description: processWeatherDescription(weatherResult.description),
        effectDescription: processWeatherDescription(weatherResult.effectDescription)
      };

      // Process stock data to ensure consistent structure
      const processedStock: ApiResponse = {
        ...stockResult,
        data: {
          ...stockResult.data,
          // Ensure all categories have items array
          gear: stockResult.data.gear || { items: [] },
          egg: stockResult.data.egg || { items: [] },
          seed: stockResult.data.seed || { items: [] },
          honey: stockResult.data.honey || { items: [] },
          cosmetics: stockResult.data.cosmetics || { items: [] },
          travelingmerchant: stockResult.data.travelingmerchant || { items: [], status: 'leaved' }
        }
      };

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
    refetch: fetchData,
    categories: [
      'gear', 
      'egg', 
      'seed', 
      'honey', 
      'cosmetics', 
      'travelingmerchant'
    ] as const
  };
};
