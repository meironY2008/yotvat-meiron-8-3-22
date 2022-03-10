import {
  ADD_FAV_FAIL,
  ADD_FAV_SUCCESS,
  REMOVE_FAV_SUCCESS,
  FAV_CITY_REQUEST,
  FAV_CITY_SUCCESS,
  FAV_CITY_FAIL,
  REMOVE_FAV_CITY,
} from "../Actions/Constants";

export const FavoriteReducer = (state = { favorites: [] }, action) => {
  switch (action.type) {
    case ADD_FAV_SUCCESS:
      const item = action.payload;
      const existItem = state.favorites.find((x) => x.id === item.id);

      if (existItem) {
        return {
          ...state,
          favorites: state.favorites.map((x) =>
            x.id === existItem.id ? item.id : x
          ),
        };
      } else {
        return {
          ...state,
          favorites: [...state.favorites, item],
        };
      }

    case REMOVE_FAV_SUCCESS:
      return {
        ...state,
        favorites: state.favorites.filter(
          (item) => item.id != action.payload
        ),
      };

    case ADD_FAV_FAIL:
      return {
        AddFavError: action.payload,
      };
    default:
      return state;
  }
};

export const GetFavCityReducer = (state = { FavData: [] }, action) => {
  switch (action.type) {
    case FAV_CITY_REQUEST:
      return {
        ...state,
        LoadingFavCity: true,
      };
    case FAV_CITY_SUCCESS:
      const existItem = state.FavData.find(
        (x) => x.keyword === action.payload.keyword
      );
      if (existItem) {
        return {
          ...state,
          FavData: state.FavData.map((x) =>
            x.keyword === existItem.keyword ? action.payload : x
          ),
        };
      } else {
        return {
          LoadingFavCity: false,
          ...state,
          FavData: [...state.FavData, action.payload],
        };
      }
    case FAV_CITY_FAIL:
      return {
        LoadingFavCity: false,
        FavCityError: action.payload,
        ...state,
        favData: [],
      };

    case REMOVE_FAV_CITY:
      return {
        LoadingFavCity: false,
        ...state,
        FavData: state.FavData.filter((item) => item.id != action.payload),
      };
    default:
      return state;
  }
};
