import { setTheme as setThemeToLocalStorage } from "../../utils";

const ActionType = {
  SET_THEME: "SET_THEME",
  TOGGLE_THEME: "TOGGLE_THEME",
};

function setThemeActionCreator(theme) {
  return {
    type: ActionType.SET_THEME,
    payload: {
      theme,
    },
  };
}

function toggleThemeActionCreator() {
  return {
    type: ActionType.TOGGLE_THEME,
  };
}

function asyncSetTheme(theme) {
  return (dispatch) => {
    setThemeToLocalStorage(theme);
    dispatch(setThemeActionCreator(theme));
  };
}

function asyncToggleTheme() {
  return (dispatch, getState) => {
    const { theme } = getState();
    const newTheme = theme === "dark" ? "light" : "dark";
    setThemeToLocalStorage(newTheme);
    dispatch(toggleThemeActionCreator());
  };
}

export {
  ActionType,
  setThemeActionCreator,
  toggleThemeActionCreator,
  asyncSetTheme,
  asyncToggleTheme,
};
