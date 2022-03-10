import { GEO_FAIL, GEO_REQUEST, GEO_SUCCESS } from '../Actions/Constants';

export const GeoReducer = (state = { loading: true, data: {} }, action) => {
  switch (action.type) {
    case GEO_REQUEST:
      return {
        ...state,
        loadingGeo: true,
      };
    case GEO_SUCCESS:
      return {
        loadingGeo: false,
        geoData: action.payload,
      };
    case GEO_FAIL:
      return {
        loadingGeo: false,
        getGeoError: action.payload,
      };

    default:
      return state;
  }
};