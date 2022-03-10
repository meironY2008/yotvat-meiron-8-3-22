import {
  API,
  FORECAST_FAIL,
  FORECAST_REQUEST,
  FORECAST_SUCCESS,
} from "./Constants";
import axios from "axios";

export const ForeCastAction =
  (id, city, metric) => async (dispatch, getState) => {
    let base_url =
      "https://dataservice.accuweather.com/forecasts/v1/daily/5day/";
    try {
      dispatch({
        type: FORECAST_REQUEST,
      });
      let apikey = API;
      if (metric === true) {
        var { data } = await axios.get(
          `${base_url}${id}?apikey=${apikey}&metric=true&details=true`
        );
      } else if (metric === false) {
        var { data } = await axios.get(
          `${base_url}${id}?apikey=${apikey}&details=true`
        );
      }

      dispatch({
        type: FORECAST_SUCCESS,
        payload: data,
      });
    } catch (e) {
      dispatch({
        type: FORECAST_FAIL,
        payload:
          e.response && e.response.data.message
            ? e.response.data.message
            : e.message,
      });
    }
  };
