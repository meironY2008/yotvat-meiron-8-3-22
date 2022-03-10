import { CITY_FAIL, CITY_REQUEST, CITY_SUCCESS } from "../Actions/Constants";

export const GetCityReducer = (
  state = { loading: true, data: {}, keyword: "Tel Aviv" },
  action
) => {
  switch (action.type) {
    case CITY_REQUEST:
      return {
        ...state,
        loadingCity: true,
      };
    case CITY_SUCCESS:
      return {
        loadingCity: false,
        data: action.payload,
        keyword: action.keyword,
      };
    case CITY_FAIL:
      return {
        loadingCity: false,
        getCityError: action.payload,
      };

    default:
      return state;
  }
};
