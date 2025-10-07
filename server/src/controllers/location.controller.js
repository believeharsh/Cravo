import { asyncHandler } from '../services/asyncHandler.js';
import { apiResponse } from '../services/apiResponse.js';

// Helper function to get IP info
async function getIPInfo(ip) {
  const response = await fetch(`https://ipinfo.io/${ip}/json`);
  const data = await response.json();
  return data;
}

export const getUserLocation = asyncHandler(async (req, res) => {
  let userIP = req.headers['x-forwarded-for'] || req.ip;

  // Clean up IPv6 localhost prefix
  if (userIP && userIP.includes('::ffff:')) {
    userIP = userIP.split('::ffff:')[1];
  }

  // For local development, use a test IP or let ipinfo.io detect automatically
  if (!userIP || userIP === '127.0.0.1' || userIP === '::1') {
    console.log('Localhost detected, using automatic IP detection');
    userIP = ''; // Empty string tells ipinfo to use your actual public IP
  }

  // Get location data (empty string uses your actual public IP)
  const details = await getIPInfo(userIP);

  // Format the response
  const [lat, lon] = (details.loc || '0,0').split(',').map(Number);

  const locationData = {
    lat,
    lon,
    city: details.city || 'Unknown',
    country: details.country || 'Unknown',
    countryCode: details.country || 'Unknown',
    region: details.region || 'Unknown',
    regionName: details.region || 'Unknown',
    zip: details.postal || 'Unknown',
  };

  return res
    .status(200)
    .json(
      new apiResponse(200, locationData, 'User location fetched successfully.')
    );
});
