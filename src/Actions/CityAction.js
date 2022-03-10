import {
    API,
    CITY_FAIL,
    CITY_REQUEST,
    CITY_SUCCESS,
    FAV_CITY_FAIL,
    FAV_CITY_REQUEST,
    FAV_CITY_SUCCESS,
  } from './Constants';
  import axios from 'axios';
  
  export const CityAction = (id, keyword) => async (dispatch, getState) => {
    let base_url = 'https://dataservice.accuweather.com/currentconditions/v1/';
    try {
      dispatch({
        type: CITY_REQUEST,
      });
  
      let apikey = API;
  
      const { data } = await axios.get(`${base_url}${id}?apikey=${apikey}`);
  
      dispatch({
        type: CITY_SUCCESS,
        payload: data,
        keyword: keyword,
      });
    } catch (e) {
      dispatch({
        type: CITY_FAIL,
        payload:
          e.response && e.response.data.message
            ? e.response.data.message
            : e.message,
      });
    }
  };
  
  export const currentCity = (id, keyword) => async (dispatch, getState) => {
    try {
      dispatch({
        type: 'current_city',
        payload: id,
        keyword: keyword,
      });
    } catch (e) {
      dispatch({
        type: CITY_FAIL,
        payload:
          e.response && e.response.data.message
            ? e.response.data.message
            : e.message,
      });
    }
  };
  
  export const FavCityAction = (id, keyword) => async (dispatch, getState) => {
    let base_url = 'https://dataservice.accuweather.com/currentconditions/v1/';
    try {
      dispatch({
        type: FAV_CITY_REQUEST,
      });
  
      let apikey = API;
  
      const { data } = await axios.get(`${base_url}${id}?apikey=${apikey}`);
  
      dispatch({
        type: FAV_CITY_SUCCESS,
        payload: {
          data,
          keyword,
          id,
        },
      });
    } catch (e) {
      dispatch({
        type: FAV_CITY_FAIL,
        payload:
          e.response && e.response.data.message
            ? e.response.data.message
            : e.message,
      });
    }
  };