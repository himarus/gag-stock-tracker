import React from 'react';
import { WeatherData } from '../types';
import { getWeatherIcon } from '../utils/iconMapping';
import { Cloud, Droplets, Wind, Thermometer, Eye, Zap } from 'lucide-react';

interface WeatherCardProps {
  weather: WeatherData;
  className?: string;
}

export const WeatherCard: React.FC<WeatherCardProps> = ({ weather, className = '' }) => {
  const WeatherIcon = getWeatherIcon(weather.weatherType);
  
  const getRarityColor = (rarity: string) => {
    const rarityLower = rarity.toLowerCase();
    if (rarityLower.includes('common')) return 'text-gray-600 bg-gray-100';
    if (rarityLower.includes('uncommon')) return 'text-green-600 bg-green-100';
    if (rarityLower.includes('rare')) return 'text-blue-600 bg-blue-100';
    if (rarityLower.includes('epic')) return 'text-purple-600 bg-purple-100';
    if (rarityLower.includes('legendary')) return 'text-yellow-600 bg-yellow-100';
    return 'text-gray-600 bg-gray-100';
  };

  const getWeatherGradient = (weatherType: string) => {
    const type = weatherType.toLowerCase();
    if (type.includes('rain')) return 'from-blue-500 to-indigo-600';
    if (type.includes('sun')) return 'from-yellow-400 to-orange-500';
    if (type.includes('snow')) return 'from-blue-200 to-blue-400';
    if (type.includes('storm')) return 'from-gray-700 to-gray-900';
    if (type.includes('wind')) return 'from-teal-400 to-cyan-500';
    return 'from-sky-400 to-blue-500';
  };

  return (
    <div className={`bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 ${className}`}>
      {/* Header with Weather Icon */}
      <div className={`bg-gradient-to-r ${getWeatherGradient(weather.weatherType)} p-6 text-white relative overflow-hidden`}>
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative z-10 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <div className="absolute inset-0 bg-white/20 rounded-full animate-pulse"></div>
              <WeatherIcon className="w-12 h-12 relative z-10 drop-shadow-lg" />
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-1">Current Weather</h3>
              <p className="text-white/90 font-medium">{weather.currentWeather}</p>
            </div>
          </div>
          <div className="text-4xl opacity-80">
            {weather.icon}
          </div>
        </div>
        
        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -translate-y-10 translate-x-10"></div>
        <div className="absolute bottom-0 left-0 w-16 h-16 bg-white/10 rounded-full translate-y-8 -translate-x-8"></div>
      </div>

      {/* Weather Details */}
      <div className="p-6 space-y-6">
        {/* Description */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-100">
          <div className="flex items-start space-x-3">
            <Eye className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Weather Description</h4>
              <p className="text-gray-700 leading-relaxed">{weather.description}</p>
            </div>
          </div>
        </div>

        {/* Visual Cue */}
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-4 border border-green-100">
          <div className="flex items-start space-x-3">
            <Wind className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Visual Effects</h4>
              <p className="text-gray-700 leading-relaxed">{weather.visualCue}</p>
            </div>
          </div>
        </div>

        {/* Crop Bonuses */}
        <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl p-4 border border-yellow-100">
          <div className="flex items-start space-x-3">
            <Thermometer className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Crop Effects</h4>
              <p className="text-gray-700 leading-relaxed">{weather.cropBonuses}</p>
            </div>
          </div>
        </div>

        {/* Mutations */}
        {weather.mutations && weather.mutations.length > 0 && (
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-4 border border-purple-100">
            <div className="flex items-start space-x-3">
              <Zap className="w-5 h-5 text-purple-600 mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Active Mutations</h4>
                <div className="space-y-1">
                  {weather.mutations.map((mutation, index) => (
                    <span
                      key={index}
                      className="inline-block bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium mr-2 mb-1"
                    >
                      {mutation}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Rarity */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div className="flex items-center space-x-2">
            <Droplets className="w-4 h-4 text-gray-500" />
            <span className="text-sm font-medium text-gray-600">Rarity</span>
          </div>
          <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getRarityColor(weather.rarity)}`}>
            {weather.rarity}
          </span>
        </div>
      </div>
    </div>
  );
};