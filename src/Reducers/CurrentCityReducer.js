export const CurrentCityReducer = (
  state = { loading: true, id: "", keyword: "" },
  action
) => {
  switch (action.type) {
    case "current_city":
      return {
        loadingCity: false,
        id: action.payload,
        city: action.keyword,
      };

    default:
      return state;
  }
};
