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
const {toggleTheme} = useThemeStore();
const {isDarkMode} = storeToRefs(useThemeStore());
const nuxtApp = useNuxtApp();
const {$ua} = useNuxtApp()

const route = useRoute();
let isGalleryRoute = ref(false);

nuxtApp.hooks.hook('page:finish', () => {
  isGalleryRoute.value = (route.path === '/');
})
</script>

<template>
  <div
      @mouseover="maximizeControlPanel()"
      @mouseleave="minimizeControlPanel()"
      :class="$ua.isMobile ? 'panel-mobile' : 'panel'"
  >

    <nav class="nav-bar">
      <span :class="$ua.isMobile ? 'logo' : ''">
      <NuxtLink to="/"></NuxtLink>
      </span>
      <span>
      <NuxtLink to="/info">Info</NuxtLink>
      </span>

      <span v-if="isGalleryRoute">
        <button class="btn-nav"
                :disabled="activeButton === Button.Grid1"
                @click="gridStore.setGrid(1);
              setActiveButton(Button.Grid1)">
        {{ Button.Grid1 }}
      </button>
         <button
             class="btn-nav"
             :disabled="activeButton === Button.Grid2"
             @click="gridStore.setGrid(2); setActiveButton(Button.Grid2)">2
      </button>

     <template v-if="!$ua.isMobile">
      <button
          class="btn-nav"
          :disabled="activeButton === Button.Grid3"
          @click="gridStore.setGrid(3); setActiveButton(Button.Grid3)">
        {{ Button.Grid3 }}
      </button>
        <button
            class="btn-nav"
            :disabled="activeButton === Button.Grid4"
            @click="gridStore.setGrid(4); setActiveButton(Button.Grid4)">
           {{ Button.Grid4 }}
      </button>

         <button
             class="btn-nav"
             :disabled="activeButton === Button.Grid5"
             @click="gridStore.setGrid(5);
           setActiveButton(Button.Grid5)">{{ Button.Grid5 }}
      </button>
      </template>
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

.panel-mobile {
  z-index: 100;
  width: 100%;
  bottom: 0;
  position: fixed;
  background: #333;
  padding: 10px;
  height: 40px;
}

.panel {
  z-index: 100;
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
