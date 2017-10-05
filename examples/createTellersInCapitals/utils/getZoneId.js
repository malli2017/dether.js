import { getCountryId } from './mapBoxAPI';

export const getZoneFromLatLng = latLng => getCountryId(latLng);
