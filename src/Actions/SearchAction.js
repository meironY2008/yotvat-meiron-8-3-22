import { API, SEARCH_FAIL, SEARCH_REQUEST, SEARCH_SUCCESS } from './Constants';
import axios from 'axios';

export const SearchAction = (q) => async (dispatch, getState) => {
  let base_url =
    'https://dataservice.accuweather.com/locations/v1/cities/autocomplete';
  try {
    dispatch({
      type: SEARCH_REQUEST,
    });

    let apikey = API;
    const { data } = await axios.get(`${base_url}?apikey=${apikey}&q=${q}`);
    // const data = dummyinfo;
    dispatch({
      type: SEARCH_SUCCESS,
      payload: data,
    });
  } catch (e) {
    dispatch({
      type: SEARCH_FAIL,
      payload:
        e.response && e.response.data.message
          ? e.response.data.message
          : e.message,
    });
  }
};