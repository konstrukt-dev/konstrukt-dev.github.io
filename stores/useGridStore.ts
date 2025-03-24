import {defineStore} from "pinia";

export const useGridStore = defineStore('gridStore', () => {
  const route = useRoute();
  const router = useRouter();
  const columns = ref(3);
  const isGridView = ref(true);
  const isGalleryViewGrid = ref(true);
  const isGridPanelVisible = ref(true);

  const setGalleryColumns = (cols: number) => {
    const defaultCols = 3;

    switch (true) {
      case (cols === 0):
       // isGalleryViewGrid.value = false;
      //  setRouteQuery(0)
        break;
      case (cols > 0 && cols <= 5):
        isGalleryViewGrid.value = true;
        columns.value = cols;
        setRouteQuery(cols)
        break;
      default:
        isGalleryViewGrid.value = true;
        columns.value = defaultCols;
        setRouteQuery(defaultCols)
    }
  }
  const setRouteQuery = (cols: number) => {
    router.push({query: {...route.query, grid: cols.toString()}})

  }

  const showGridPanel = () => {
    isGridPanelVisible.value = true;
  }
  const hideGridPanel = () => {
    isGridPanelVisible.value = false;
  }

  // const double = computed(() => counter.value * 2)

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
