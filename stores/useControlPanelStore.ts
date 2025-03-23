import {defineStore} from "pinia";

export const useControlPanelStore = defineStore("controlPanel", {
  state: () => ({
    isControlPanelMinimized: false,
  }),
  actions: {
    minimizeControlPanel() {
      this.isControlPanelMinimized = true;
    },
    maximizeControlPanel() {
      this.isControlPanelMinimized = false;
    }
  }
});
