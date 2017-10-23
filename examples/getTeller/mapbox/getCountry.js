import GeocodingAPI from 'mapbox/lib/services/geocoding';
// you need to add a mapbox token in .env to use geocoding API
require('dotenv').config({ path: '.env' });

const token = process.env.TEST_MAPBOX_TOKEN;
const client = new GeocodingAPI(token);

const getCountryId = latlng =>
  new Promise((res, rej) => {
    const location = {
      latitude: latlng.lat,
      longitude: latlng.lng,
    };
    const options = {
      limit: 1,
      types: 'country',
    };

    client.geocodeReverse(location, options, (err, data) => {
      if (err) {
        rej(err);
      } else {
        const results = data.features;
        if (results && results.length > 0) {
          res((results[0].id).replace(/\D/g, ''));
        } else {
          rej(new Error('no results'));
        }
      }
    });
  });

export default getCountryId;
