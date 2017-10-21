import GeocodingAPI from 'mapbox/lib/services/geocoding';
// import mapboxgl from 'mapbox-gl/dist/mapbox-gl';

const token = 'pk.eyJ1IjoibWVoZGlkdHIiLCJhIjoiY2o4ZW9zdWxpMHI4azJxbnZvcW0xNGtieSJ9.c-SJnFhWfYMEx4K4BB951A';
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
