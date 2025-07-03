export interface StockItem {
  name: string;
  quantity: number;
  emoji: string;
  image?: string;
}

export interface CategoryData {
  items: StockItem[];
  countdown?: string | null;
  status?: string;
  appearIn?: string | null;
}

export interface StockData {
  gear: CategoryData;
  egg: CategoryData;
  seed: CategoryData;
  honey: CategoryData;
  cosmetics: CategoryData;
  travelingmerchant: CategoryData;
  updated_at: string;
}

export interface WeatherData {
  icon: string;
  description: string;
  visualCue: string;
  cropBonuses: string;
  mutations: any[];
  rarity: string;
  updatedAt: number;
  currentWeather: string;
  weatherType: string;
  effectDescription: string;
}

export interface ApiResponse {
  status: string;
  updated_at: string;
  data: StockData;
}

export type CategoryType = 
  | 'gear' 
  | 'egg' 
  | 'seed' 
  | 'honey' 
  | 'cosmetics'
  | 'travelingmerchant';
