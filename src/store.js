import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { SearchReducer } from "./Reducers/SearchReducer";
import { GetCityReducer } from "./Reducers/GetCityReducer";
import { CurrentCityReducer } from "./Reducers/CurrentCityReducer";
import { ForeCastReducer } from "./Reducers/ForeCastReducer";
import { GeoReducer } from "./Reducers/GeoReducer";
import { ThemeReducer } from "./Reducers/ThemeReducer";
import {
  FavoriteReducer,
  GetFavCityReducer,
} from "./Reducers/FavoriteReducer";

export const reducer = combineReducers({
  SearchReducer,
  GetCityReducer,
  CurrentCityReducer,
  ForeCastReducer,
  FavoriteReducer,
  GetFavCityReducer,
  GeoReducer,
  ThemeReducer,
});

const FavoritesFromStorage = localStorage.getItem("favourites")
  ? JSON.parse(localStorage.getItem("favourites"))
  : [];

const initialState = {
  SearchReducer: { data: null },
  GetCityReducer: { data: "" },
  CurrentCityReducer: { id: 215854, city: "Tel Aviv" },
  FavoriteReducer: { favorites: FavoritesFromStorage },
  GetFavCityReducer: { FavData: [] },
  ThemeReducer: { themeState: "primary" },
};

const middleware = [thunk];
const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
