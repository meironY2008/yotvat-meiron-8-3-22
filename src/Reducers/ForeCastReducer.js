import {
  FORECAST_FAIL,
  FORECAST_REQUEST,
  FORECAST_SUCCESS,
} from "../Actions/Constants";

export const ForeCastReducer = (
  state = { loading: true, data: {} },
  action
) => {
  switch (action.type) {
    case FORECAST_REQUEST:
      return {
        ...state,
        loadingforeCast: true,
      };
    case FORECAST_SUCCESS:
      return {
        loadingforeCast: false,
        foreData: action.payload,
        keyword: action.keyword,
      };
    case FORECAST_FAIL:
      return {
        loadingCity: false,
        ForecastError: action.payload,
      };

    default:
      return state;
  }
};
