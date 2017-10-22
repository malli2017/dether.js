import GeocodingAPI from 'mapbox/lib/services/geocoding';
// you need to add a mapbox token in .env to use geocoding API
require('dotenv').config({ path: '.env' });

const token = process.env.TEST_MAPBOX_TOKEN;
const client = new GeocodingAPI(token);


const geoDistance = (latitudeFrom, longitudeFrom, latitudeTo, longitudeTo) => {
  // convert from degrees to radians
  const earthRadius = 6371000;
  const latFrom = latitudeFrom * (Math.PI / 180);
  const lonFrom = longitudeFrom * (Math.PI / 180);
  const latTo = latitudeTo * (Math.PI / 180);
  const lonTo = longitudeTo * (Math.PI / 180);
  const latDelta = latTo - latFrom;
  const lonDelta = lonTo - lonFrom;

  const angle = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(latDelta / 2), 2) + Math.cos(latFrom) * Math.cos(latTo) * Math.pow(Math.sin(lonDelta / 2), 2)));
  return angle * earthRadius;
};

const sortCoord = (poi, gpsTab) =>
  new Promise((res, rej) => {
    console.log('poi', poi);
    gpsTab.sort(function(a, b) {
      const distA = geoDistance(poi.lat, poi.lng, a.lat, a.lng);
      const distB = geoDistance(poi.lat, poi.lng, b.lat, b.lng);
      return distA - distB;
    });
    res(gpsTab);
  });

export default sortCoord;
