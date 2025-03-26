import {defineStore} from "pinia";
import {getParsedQueryGridNum} from "~/utils/utils";

export const useGridStore = defineStore('gridStore', () => {
    const {$ua} = useNuxtApp()
    const route = useRoute();
    const router = useRouter();
    const columns = ref(1);
    const isGridPanelVisible = ref(true);

    setGridFromQuery();

    function setGrid(cols: number) {
        columns.value = cols;
        router.push({query: {...route.query, grid: cols.toString()}})
    }

    const showGridPanel = () => {
        isGridPanelVisible.value = true;
    }
    const hideGridPanel = () => {
        isGridPanelVisible.value = false;
    }

    function setGridFromQuery() {
        const c: number = getParsedQueryGridNum(route.query?.grid, 1);
        const cMaxMobile = 2;
        const cMaxTablet = 3;
        const cMaxDesktop = 5;

        switch (true) {
            case ($ua.isMobile && c <= cMaxMobile):
                setGrid(c)
                break;
            case $ua.isMobile:
                setGrid(1)
                break;
            case $ua.isTablet && c <= cMaxTablet:
                setGrid(c)
                break;
            case $ua.isTablet:
                setGrid(3)
                break;
            case c <= cMaxDesktop:
                setGrid(c)
                break;
            default:
                setGrid(4)
                break;
        }
    }

    return {
        setGrid,
        columns,
        isGridPanelVisible,
        showGridPanel,
        hideGridPanel
    }
})
