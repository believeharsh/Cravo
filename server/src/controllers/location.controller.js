// import { asyncHandler } from '../services/asyncHandler.js';
// import { apiResponse } from '../services/apiResponse.js';

// // Helper function to get IP info
// async function getIPInfo(ip) {
//   const response = await fetch(`https://ipinfo.io/${ip}/json`);
//   const data = await response.json();
//   return data;
// }

// export const getUserLocation = asyncHandler(async (req, res) => {
//   let userIP =
//     req.headers['x-client-ip'] ||
//     req.headers['x-forwarded-for']?.split(',')[0] ||
//     req.headers['x-real-ip'] ||
//     req.connection?.remoteAddress ||
//     req.ip;

//   if (userIP && userIP.includes('::ffff:')) {
//     userIP = userIP.split('::ffff:')[1];
//   }

//   if (!userIP || userIP === '127.0.0.1' || userIP === '::1') {
//     console.log('Localhost detected, using automatic IP detection');
//     userIP = ''; // Let ipinfo auto-detect
//   }

//   // Get location data (empty string uses your actual public IP)
//   const details = await getIPInfo(userIP);

//   // Format the response
//   const [lat, lon] = (details.loc || '0,0').split(',').map(Number);

//   const locationData = {
//     lat,
//     lon,
//     city: details.city || 'Indore',
//     country: details.country || 'Indian',
//     countryCode: details.country || 'IN',
//     region: details.region || 'Madhya Pradesh',
//     regionName: details.region || 'MP',
//     zip: details.postal || '445779',
//   };

//   return res
//     .status(200)
//     .json(
//       new apiResponse(200, locationData, 'User location fetched successfully.')
//     );
// });

import { asyncHandler } from '../services/asyncHandler.js';
import { apiResponse } from '../services/apiResponse.js';
import City from '../models/city.model.js';
import cityAliases from '../constants/cityAliases.js';
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
