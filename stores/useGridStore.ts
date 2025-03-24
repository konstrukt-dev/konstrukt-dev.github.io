import {defineStore} from "pinia";

export const useGridStore = defineStore('gridStore', () => {
  const { $ua } = useNuxtApp()
  const route = useRoute();
  const router = useRouter();
  const columns = ref(3);
  const isGridView = ref(true);
  const isGalleryViewGrid = ref(true);
  const isGridPanelVisible = ref(true);

  const defaultColumnNumber = 3;

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
    switch (true) {
      case (cols > 0 && cols <= 5):
        columns.value = cols;
        setRouteQuery(cols)
        break;
      default:
        columns.value = defaultColumnNumber;
        setRouteQuery(defaultColumnNumber)
    }
  }

  const initGrid = () => {
    switch (true) {
      case $ua.isMobile:
        console.log('device mobile');
        hideGridPanel();
        setGalleryColumns(1);
        break;
      case $ua.isTablet:
        console.log('device tablet');
        setGalleryColumns(defaultColumnNumber);
        showGridPanel();
        break;
      default:
        console.log('device desktop');
        hideGridPanel();
        setGalleryColumns(4);
        break;
    }
  }

  initGrid()





  return {
    columns,
    isGridView,
    isGalleryViewGrid,
    isGridPanelVisible,
    showGridPanel,
    hideGridPanel,
    setGalleryColumns
  }
})
