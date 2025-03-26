<script setup lang="ts">
import GalleryItemTile from "~/components/GalleryItemTile.vue";
import {useGridStore} from "~/stores/useGridStore";
import type {Project} from "~/types/projects";
import GalleryDetailView from "~/components/GalleryDetailView.vue";

const gridStore = useGridStore();
const {data} = useApi<Project[]>("/projects");

let activeId = ref(0);
let isModalOpen = ref(false)

const closeModal = () => {
  isModalOpen.value = false;
}

const openGalleryDetailView = (id: number) => {
  console.log('id ', id)
  activeId.value = id
  isModalOpen.value = true;
}
</script>

<template>
  <div>
    <div v-if="data?.length" class="grid-base" :class="`grid-${gridStore.columns}`">
      <div class="item" v-for="item in data" :key="item.id">
        <div :id="`item-${item.id}`">
          <gallery-item-tile
            @click="openGalleryDetailView(item.id)"
            :title="item.title"
            :description="item.description"
            :id="item.id"
          />
        </div>
        <div v-if="item.id === activeId && isModalOpen">
          <gallery-detail-view
            @someEvent="closeModal"
            :title="item.title"
            :id="item.id"
          />
        </div>

      </div>
    </div>
  </div>
</template>

<style scoped>

.item {
  cursor: pointer;
}

.grid-base {
  display: grid;
  grid-auto-rows: 1fr;
  margin: 1px 0 0 1px;

}

.grid-1 {
  grid-template-columns: repeat(1, 1fr);
}

.grid-2 {
  grid-template-columns: repeat(2, 1fr);
}

.grid-3 {
  grid-template-columns: repeat(3, 1fr);
}

.grid-4 {
  grid-template-columns: repeat(4, 1fr);
}

.grid-5 {
  grid-template-columns: repeat(5, 1fr);
}

.btn {
  background: #333333;
  color: #fff;
  border: none;
  margin: 10px;
  padding: 10px;
  cursor: pointer;
}

</style>
