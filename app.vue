<script setup lang="ts">
import {useControlPanelStore} from "~/stores/useControlPanelStore.ts";
import {storeToRefs} from "pinia";
import {useThemeStore} from "~/stores/useThemeStore.js";


const nuxtApp = useNuxtApp()
const route = useRoute()
const {initTheme} = useThemeStore();
const {isControlPanelMinimized} = storeToRefs(useControlPanelStore());
const {minimizeControlPanel, maximizeControlPanel} = useControlPanelStore();

import {useHead} from '#imports'

useHead({
  script: [
    {
      src: 'https://kit.fontawesome.com/16f6774484.js',
      async: true,
      crossorigin: 'anonymous'
    }
  ]
})


onMounted(() => {
  initTheme();
  
  window.addEventListener('scroll', (e) => {
    if (!isControlPanelMinimized.value && window.scrollY > 100) {
      minimizeControlPanel();
      e.preventDefault()
    }
    if (isControlPanelMinimized.value && window.scrollY < 100) {
      maximizeControlPanel();
      e.preventDefault()
    }
  })
})

onUnmounted(() => {
  window.removeEventListener('scroll', () => {
  });
})
</script>

<template>
  <ControlPanel/>

  <div>
    <main>
      <NuxtPage/>
    </main>
    <Footer/>
  </div>
</template>
