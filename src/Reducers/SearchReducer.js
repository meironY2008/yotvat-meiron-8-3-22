import {
  SEARCH_FAIL,
  SEARCH_REQUEST,
  SEARCH_SUCCESS,
} from "../Actions/Constants";

export const SearchReducer = (state = { loading: true, data: {} }, action) => {
  switch (action.type) {
    case SEARCH_REQUEST:
      return {
        ...state,
        loadingInfo: true,
      };
    case SEARCH_SUCCESS:
      return {
        loadingInfo: false,
        data: action.payload,
      };
    case SEARCH_FAIL:
      return {
        loadingInfo: false,
        SearchError: action.payload,
      };

    default:
      return state;
  }
};
