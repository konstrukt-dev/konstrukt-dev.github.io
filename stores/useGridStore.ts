import {defineStore} from "pinia";
import {toNumberSafe} from "~/utils/utils";
import {breakStatement} from "@babel/types";

export const useGridStore = defineStore('gridStore', () => {
  const defaultColumnNumber = 3;

  const { $ua } = useNuxtApp()
  const route = useRoute();
  const router = useRouter();
  const columns = ref(defaultColumnNumber);
  const isGridPanelVisible = ref(true);

  const getColumnCountFromQuery = toNumberSafe(route.query?.grid, 3);

  // gridStore.setGalleryColumns(toNumberSafe(route.query?.grid, 3))
  if(getColumnCountFromQuery) {
}

/*
wenn mobile dann 1

wenn query und wert zwischen 1 und 5 und tablet und




*/

  console.log('query ',toNumberSafe(route.query?.grid, 3) )

  const setRouteQuery = (cols: number) => {
    router.push({query: {...route.query, grid: cols.toString()}})
  }

  const showGridPanel = () => {
    isGridPanelVisible.value = true;
  }
  const hideGridPanel = () => {
    isGridPanelVisible.value = false;
  }

  const setGalleryColumns = (cols: number) => {
        columns.value = cols;
        setRouteQuery(cols)
  }

  const initGrid = () => {
    switch (true) {
      case $ua.isMobile:
        console.log('device mobile');
        hideGridPanel();
        columns.value = 1;
        setRouteQuery(1)

        break;
      case $ua.isTablet:
        console.log('device tablet');
        columns.value = defaultColumnNumber;
        setRouteQuery(defaultColumnNumber)

        showGridPanel();
        break;
      default:
        console.log('device desktop');
        hideGridPanel();
        columns.value = 4;
        setRouteQuery(4)

        break;
    }
  }

  return {
    initGrid,
    columns,
    isGridPanelVisible,
    showGridPanel,
    hideGridPanel,
    setGalleryColumns
  }
})
