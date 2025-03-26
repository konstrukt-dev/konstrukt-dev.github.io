import {defineStore} from "pinia";
import {useGridStore} from "~/stores/useGridStore";

export const useActiveButton = defineStore("btn", () => {
    const gridStore = useGridStore();

    let activeButton = ref(gridStore.columns.toString());
    const setActiveButton = (gridNumber: string) => {
        activeButton.value = gridNumber;
    }
    return {
        activeButton,
        setActiveButton,
    }
});
