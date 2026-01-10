import cityAliases from '../constants/city-aliases.js';

const normalizeCityName = cityFromIP => {
  const lowerCity = cityFromIP?.toLowerCase().trim();
  for (const [canonical, aliases] of Object.entries(cityAliases)) {
    if (aliases.includes(lowerCity)) return canonical;
  }
  return null;
};

export { normalizeCityName };
