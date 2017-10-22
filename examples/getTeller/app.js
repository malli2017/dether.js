import detherGateway from '../../src';
import mapboxAPI from './mapbox';

const provider = 'https://kovan.infura.io/v604Wu8pXGoPC41ARh0B';
const gpscoord = {
  lng: 2.35237,
  lat: 48.88361,
}; // france

const getTeller = latlng =>
  new Promise(async (res, rej) => {
    try {
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
  const sortTeller = await mapboxAPI.sortGpsCoord(gpscoord, tellers);
  console.log('sort tellers', sortTeller);
  return sortTeller;
};

getTellers();
