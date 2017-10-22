import detherGateway from '../../src';
import mapboxAPI from './mapbox';

const provider = 'https://kovan.infura.io/v604Wu8pXGoPC41ARh0B';
const gpscoord = {
  lng: 2.4006852,
  lat: 48.8782685,
}; // france

const getTeller = latlng =>
  new Promise(async (res, rej) => {
    try {
      console.log(mapboxAPI);
      const countrycode = await mapboxAPI.getcountrycode(latlng);
      const tellers = await detherGateway.tellers.getZone(countrycode, provider);
      res(tellers);
    } catch (e) {
      console.log('e', e);
      rej(e);
    }
  });

const getTellers = async () => {
  const tellers = await getTeller(gpscoord);
  console.log(tellers);
  return tellers;
};

getTellers();
