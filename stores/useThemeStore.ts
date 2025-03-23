import {defineStore} from "pinia";

export enum Theme {
  Light = 'light',
  Dark = 'dark'
}


export const useThemeStore = defineStore("theme", {
  state: () => ({
    isDarkMode: window?.matchMedia("(prefers-color-scheme: dark)").matches,
  }),
  actions: {
    initTheme() {
      this.isDarkMode ? setTheme(Theme.Dark) : setTheme(Theme.Light);
    },
    toggleTheme() {
      (this.isDarkMode = !this.isDarkMode) ? setTheme(Theme.Dark) : setTheme(Theme.Light);
    },
  }
});

const setTheme = (theme: string) => {
  document.documentElement.setAttribute('data-theme', theme);
}
