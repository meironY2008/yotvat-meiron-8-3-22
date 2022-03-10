import { GEO_FAIL, GEO_REQUEST, GEO_SUCCESS, API } from './Constants';
import axios from 'axios';

export const GeoAction = (lat, long) => async (dispatch, getState) => {
  let base_url =
    'https://dataservice.accuweather.com/locations/v1/cities/geoposition/search';

  try {
    dispatch({
      type: GEO_REQUEST,
    });

    let apikey = API;

    const { data } = await axios.get(
      `${base_url}?apikey=${apikey}&q=${lat},${long}`
    );
    dispatch({
      type: GEO_SUCCESS,
      payload: data,
    });
  } catch (e) {
    dispatch({
      type: GEO_FAIL,
      payload:
        e.response && e.response.data.message
          ? e.response.data.message
          : e.message,
    });
  }
};