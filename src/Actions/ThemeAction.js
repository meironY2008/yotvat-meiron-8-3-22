export const ThemeAction = (theme) => async (dispatch, getState) => {
    try {
      dispatch({
        type: 'THEME',
        payload: theme,
      });
    } catch (e) {
      dispatch({
        type: 'THEME_FAIL',
        payload:
          e.response && e.response.data.message
            ? e.response.data.message
            : e.message,
      });
    }
  };