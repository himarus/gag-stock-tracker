export const formatQuantity = (quantity: number): string => {
  if (quantity >= 1000) {
    return `${(quantity / 1000).toFixed(1)}k`;
  }
  return quantity.toString();
};

export const getStockStatus = (quantity: number): 'in-stock' | 'low-stock' | 'out-of-stock' => {
  if (quantity === 0) return 'out-of-stock';
  if (quantity <= 2) return 'low-stock';
  return 'in-stock';
};

export const getCategoryDisplayName = (category: string): string => {
  const names = {
    gear: 'Gear & Tools',
    egg: 'Eggs',
    seed: 'Seeds & Plants',
    honey: 'Honey Products',
    cosmetics: 'Cosmetics'
  };
  return names[category as keyof typeof names] || category;
};

export const getCategoryIcon = (category: string): string => {
  const icons = {
    gear: '🔧',
    egg: '🥚',
    seed: '🌱',
    honey: '🍯',
    cosmetics: '✨'
  };
  return icons[category as keyof typeof icons] || '📦';
};