// Функция для генерации SVG изображений на лету
export const generateProductImage = (productId: number | string, title: string, category: string): string => {
  const colors = {
    "men's clothing": ['#3B82F6', '#1D4ED8', '#2563EB'],
    "women's clothing": ['#EC4899', '#DB2777', '#BE185D'],
    "jewelery": ['#F59E0B', '#D97706', '#B45309'],
    "electronics": ['#10B981', '#059669', '#047857']
  };
  
  const categoryColors = colors[category as keyof typeof colors] || ['#6B7280', '#4B5563', '#374151'];
  const baseColor = categoryColors[Number(productId) % categoryColors.length];
  
  const svg = `
    <svg width="300" height="300" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="grad${productId}" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:${baseColor};stop-opacity:1" />
          <stop offset="100%" style="stop-color:${categoryColors[(Number(productId) + 1) % categoryColors.length]};stop-opacity:1" />
        </linearGradient>
      </defs>
      <rect width="300" height="300" fill="url(#grad${productId})" />
      <text x="150" y="120" text-anchor="middle" font-family="Arial, sans-serif" font-size="14" fill="white" font-weight="bold">
        ${category.toUpperCase()}
      </text>
      <text x="150" y="150" text-anchor="middle" font-family="Arial, sans-serif" font-size="16" fill="white" font-weight="bold">
        ${title.split(' ').slice(0, 3).join(' ')}
      </text>
      <text x="150" y="180" text-anchor="middle" font-family="Arial, sans-serif" font-size="12" fill="white">
        Product #${productId}
      </text>
      <circle cx="150" cy="220" r="20" fill="white" opacity="0.2" />
    </svg>
  `;
  
  return `data:image/svg+xml;base64,${btoa(svg)}`;
};