import { getCountryId } from './mapboxAPI';

export const getZoneFromLatLng = latLng => getCountryId(latLng);
