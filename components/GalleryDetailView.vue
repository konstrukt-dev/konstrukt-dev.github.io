<script setup lang="ts">
import {onMounted, reactive} from "vue";

let position = reactive<{ position: string }>({})
const isZoomActive = ref(false)

const props = defineProps<{
  title: String,
  id?: Number,
}>()

const emit = defineEmits<{
  (e: 'someEvent'): void
}>()

const onKeydown = (event: KeyboardEvent) => {
  if (event.key === 'Escape') {
    emit('someEvent')
  }
}

onMounted(() => {
  const elem = document.getElementById(`item-${props.id}`)
  if (elem) {
    const c = elem.getBoundingClientRect()
    position.left = c.left + 'px';
    position.top = c.top + 'px';
    position.right = window.innerWidth - c.right + 'px';
    position.bottom = window.innerHeight - c.bottom + 'px';
  }
  setTimeout(() => {
    isZoomActive.value = true
  }, 50)
  window.addEventListener('keydown', onKeydown)
})

onUnmounted(() => {
  window.removeEventListener('keydown', onKeydown)
})

</script>

<template>
  <div class="bg-wrapper">
    <br>
    <div :class="{ 'zoom' : isZoomActive }" class="content-wrapper" :style="position">
      <button @click="emit('someEvent')">close</button>
      {{ title }}

    </div>
  </div>
</template>

<style scoped>
.zoom {
  top: 0px !important;
  left: 0px !important;
  right: 0px !important;
  bottom: 0px !important;
  transition: all ease 1s;
}

.bg-wrapper {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
}

.content-wrapper {
  position: absolute;
  z-index: 100;
  overflow-y: auto;
  background: var(--bg-tile);
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;

}
</style>
