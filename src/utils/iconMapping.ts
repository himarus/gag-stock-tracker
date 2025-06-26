import { Wrench, Egg, Sprout, Flower2, Palette, Hammer, Droplets, Scissors, Shovel, Apple, Cherry, Grape, Carrot, Wheat, TreePine, Home, Armchair, Lamp, Package, Gift, Star, Heart, Sparkles, Crown, Diamond, Gem, Shield, Zap, Flame, Snowflake, Sun, Moon, Cloud, Umbrella, Leaf, Flower, Bug, Fish, Bird, Orbit as Rabbit, Cat, Dog, DivideIcon as LucideIcon } from 'lucide-react';

// Icon mapping for different item types
export const getItemIcon = (itemName: string): LucideIcon => {
  const name = itemName.toLowerCase();
  
  // Gear/Tools
  if (name.includes('trowel') || name.includes('shovel')) return Shovel;
  if (name.includes('tool') || name.includes('wrench')) return Wrench;
  if (name.includes('hammer')) return Hammer;
  if (name.includes('watering') || name.includes('can')) return Droplets;
  if (name.includes('harvest') || name.includes('scissors')) return Scissors;
  
  // Seeds/Plants
  if (name.includes('carrot')) return Carrot;
  if (name.includes('blueberry') || name.includes('berry')) return Grape;
  if (name.includes('tomato')) return Apple;
  if (name.includes('strawberry')) return Cherry;
  if (name.includes('lavender') || name.includes('flower')) return Flower;
  if (name.includes('seed') || name.includes('plant')) return Sprout;
  if (name.includes('wheat') || name.includes('grain')) return Wheat;
  if (name.includes('tree')) return TreePine;
  
  // Honey/Bee items
  if (name.includes('honey') || name.includes('bee') || name.includes('hive')) return Flower2;
  if (name.includes('sprinkler')) return Droplets;
  if (name.includes('comb')) return Sparkles;
  
  // Cosmetics/Decorations
  if (name.includes('tractor') || name.includes('vehicle')) return Package;
  if (name.includes('pottery') || name.includes('pot')) return Home;
  if (name.includes('bench') || name.includes('chair')) return Armchair;
  if (name.includes('torch') || name.includes('lamp')) return Lamp;
  if (name.includes('tile') || name.includes('path')) return Shield;
  if (name.includes('crate') || name.includes('box')) return Package;
  if (name.includes('sign')) return Star;
  
  // Eggs
  if (name.includes('egg')) return Egg;
  
  // Default icons based on category hints
  if (name.includes('rare') || name.includes('special')) return Diamond;
  if (name.includes('premium') || name.includes('gold')) return Crown;
  if (name.includes('magic') || name.includes('enchanted')) return Sparkles;
  
  // Fallback icons
  return Gift;
};

export const getCategoryIcon = (category: string): LucideIcon => {
  switch (category.toLowerCase()) {
    case 'gear': return Wrench;
    case 'egg': return Egg;
    case 'seed': return Sprout;
    case 'honey': return Flower2;
    case 'cosmetics': return Palette;
    default: return Package;
  }
};

// Weather icons
export const getWeatherIcon = (weatherType: string): LucideIcon => {
  const type = weatherType.toLowerCase();
  
  if (type.includes('rain')) return Cloud;
  if (type.includes('sun')) return Sun;
  if (type.includes('snow')) return Snowflake;
  if (type.includes('storm')) return Zap;
  if (type.includes('wind')) return Leaf;
  if (type.includes('fog')) return Cloud;
  if (type.includes('clear')) return Sun;
  if (type.includes('cloudy')) return Cloud;
  
  return Sun; // Default
};