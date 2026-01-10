import { asyncHandler } from '../services/asyncHandler.js';
import { apiResponse } from '../services/apiResponse.js';
import City from '../models/city.model.js';
import cityAliases from '../constants/city-aliases.js';
import { normalizeCityName } from '../services/normalizeCityNameFunc.js';

// --- Free IP Info Fetcher with fallback ---
async function getIPInfo(ip) {
  try {
    const res = await fetch(`https://ipinfo.io/${ip}/json`);
    const data = await res.json();
    if (data?.city) return data;
  } catch (e) {
    console.log('ipinfo failed, trying ip-api');
  }

  // fallback
  const res2 = await fetch(`http://ip-api.com/json/${ip}`);
  const data2 = await res2.json();
  return data2;
}

export const getUserLocation = asyncHandler(async (req, res) => {
  // Get real IP
  let userIP =
    req.headers['x-client-ip'] ||
    req.headers['x-forwarded-for']?.split(',')[0] ||
    req.headers['x-real-ip'] ||
    req.connection?.remoteAddress ||
    req.ip;

  if (userIP && userIP.includes('::ffff:')) {
    userIP = userIP.split('::ffff:')[1];
  }

  if (!userIP || userIP === '127.0.0.1' || userIP === '::1') {
    console.log('Localhost detected, using automatic IP detection');
    userIP = ''; // empty triggers auto-detect
  }

  // --- Fetch IP-based location ---
  const details = await getIPInfo(userIP);
  const [lat, lon] = (details.loc || `${details.lat},${details.lon}` || '0,0')
    .split(',')
    .map(Number);

  // --- Normalize city ---
  let normalizedCity = normalizeCityName(details.city);
  let resolvedCity = normalizedCity;

  // --- Fallback: if city not supported, find nearest supported city ---
  if (!normalizedCity) {
    const nearestCity = await City.aggregate([
      {
        $geoNear: {
          near: { type: 'Point', coordinates: [lon, lat] },
          distanceField: 'distance',
          spherical: true,
          key: 'location',
          query: { is_serviceable: true },
        },
      },
      { $limit: 1 },
      { $project: { name: 1 } },
    ]);

    if (nearestCity.length > 0) {
      resolvedCity = nearestCity[0].name;
    } else {
      resolvedCity = 'Indore'; // final safe fallback
    }
  }

  // --- Final formatted response ---
  const locationData = {
    lat,
    lon,
    city: resolvedCity,
    region: details.region || '',
    country: details.country || 'India',
    zip: details.postal || '',
  };

  return res
    .status(200)
    .json(
      new apiResponse(
        200,
        locationData,
        `User location resolved: ${resolvedCity}`
      )
    );
});
