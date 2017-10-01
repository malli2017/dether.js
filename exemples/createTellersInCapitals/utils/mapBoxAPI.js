import GeocodingAPI from 'mapbox/lib/services/geocoding';

const token = process.env.DETHER_APP_MAPBOX_TOKEN;
const client = new GeocodingAPI(token);

/**
 * @param  {object} latlng
 * @return {string}
 */
export const getCountryId = latlng =>
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
          res(results[0].id);
        } else {
          rej(new Error('no results'));
        }
      }
    });
  });
