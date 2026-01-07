const ActionType = {
  SET_THEME: 'SET_THEME',
};

function setThemeActionCreator(theme) {
  localStorage.setItem('theme', theme);
  return {
    type: ActionType.SET_THEME,
    payload: {
      theme,
    },
  };
}

function toggleThemeActionCreator() {
  const currentTheme = localStorage.getItem('theme') || 'dark';
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  return setThemeActionCreator(newTheme);
}

export { ActionType, setThemeActionCreator, toggleThemeActionCreator };
