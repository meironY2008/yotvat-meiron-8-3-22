export const ThemeReducer = (state = { theme: "primary" }, action) => {
  switch (action.type) {
    case "THEME":
      return {
        themeState: action.payload,
      };

    default:
      return state;
  }
};
