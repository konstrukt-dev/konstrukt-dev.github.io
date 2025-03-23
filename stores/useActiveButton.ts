import {defineStore} from "pinia";
import {Button} from "~/enums.ts";

export const useActiveButton = defineStore("btn", {
  state: (): { activeButton: string } => ({
    activeButton: Button.Grid3, // default Button
  }),
  actions: {
    setActiveButton(name: string) {
      this.activeButton = name
    }
  }
});
