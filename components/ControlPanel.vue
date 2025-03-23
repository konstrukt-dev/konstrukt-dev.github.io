<script setup lang="ts">
import {Button} from "~/enums";
import {useGridStore} from "~/stores/useGridStore";
import {useControlPanelStore} from "~/stores/useControlPanelStore";
import {useThemeStore} from "~/stores/useThemeStore";
import {useActiveButton} from "~/stores/useActiveButton";

const gridStore = useGridStore();
const {setActiveButton} = useActiveButton();
const {activeButton} = storeToRefs(useActiveButton());
const {minimizeControlPanel, maximizeControlPanel} = useControlPanelStore();
const {isControlPanelMinimized} = storeToRefs(useControlPanelStore());
const {toggleTheme} = useThemeStore();
const {isDarkMode} = storeToRefs(useThemeStore());
const nuxtApp = useNuxtApp();
const route = useRoute();
let isGalleryRoute = ref(false);

nuxtApp.hooks.hook('page:finish', () => {
  isGalleryRoute.value = (route.path === '/');
})

onMounted(() => {
  window.addEventListener("resize", updateWidth);
});

onUnmounted(() => {
  window.removeEventListener("resize", updateWidth);
})

let isGridSelectVisible = true;
updateWidth()

function updateWidth() {
  const breakpoint = 768;

  if (window.innerWidth < breakpoint && isGridSelectVisible) {
    isGridSelectVisible = false;
    gridStore.hideGridPanel();
    gridStore.setGalleryColumns(1);
  } else if (window.innerWidth > breakpoint && !isGridSelectVisible) {
    gridStore.setGalleryColumns(3);
    isGridSelectVisible = true;
    gridStore.showGridPanel();
  }
}
</script>

<template>
  <div
    @mouseover="maximizeControlPanel()"
    @mouseleave="minimizeControlPanel()"
    class="panel"
    :style="{ width: isControlPanelMinimized ? '40px' : '40vw' }"
  >

    <nav class="nav-bar">
      <span class="logo">
      <NuxtLink to="/"></NuxtLink>
      </span>
      <span>
      <NuxtLink to="/info">Info</NuxtLink>
      </span>

      <span v-if="isGalleryRoute">
      <button
        class="btn-nav"
        :disabled="activeButton === Button.Grid3"
        @click="gridStore.setGalleryColumns(3); setActiveButton(Button.Grid3)">3
      </button>

         <button
           class="btn-nav"
           :disabled="activeButton === Button.Grid4"
           @click="gridStore.setGalleryColumns(4); setActiveButton(Button.Grid4)">
           {{ Button.Grid4 }}
      </button>

         <button
           class="btn-nav"
           :disabled="activeButton === Button.Grid5"
           @click="gridStore.setGalleryColumns(5);
           setActiveButton(Button.Grid5)">{{ Button.Grid5 }}
      </button>


      <button class="btn-nav"
              :disabled="activeButton === Button.List"
              @click="gridStore.setGalleryColumns(0);
              setActiveButton(Button.List)">
        {{ Button.List }}
      </button>
      </span>

      <button class="btn-nav"
              @click="toggleTheme()">
        <i v-if="isDarkMode" class="fa-solid fa-moon"></i>
        <i v-else class="fa-solid fa-sun"></i>
      </button>
    </nav>
  </div>
</template>

<style scoped>
.logo {
  background: #2c3e50;
  width: 40px;
  height: 40px;
  border-radius: 40px;
}

.panel {
  z-index: 10000;
  /* width: 40vw;*/
  background: white;
  position: fixed;
  top: 50px;
  left: 50%;
  heigth: 50px;
  transform: translateX(-50%);
  padding: 8px;
  border-radius: 60px;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  overflow: hidden;
  transition: width 1s;
}

.minimize {
  /*width: 40px !important;*/
  transition: width 1s;
}

.btn-nav {
  padding: 10px;
  margin: 2px;
}

.nav-bar {
  display: flex;
  color: #2c3e50;
  justify-content: space-between;
  align-items: center;
  width: 38vw;
  white-space: nowrap;
}
</style>
