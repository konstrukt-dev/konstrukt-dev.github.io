<script setup>
defineProps({
  title: String,
  description: String,
  id: Number
})
</script>

<template>
  <div class="tile">
    <strong>{{ title }}</strong>: {{ description }}
    <NuxtLink :to="`/gallery/${id}`">project {{ id }}</NuxtLink>
  </div>
</template>

<style>
.tile {
  background: var(--tile);
  padding: 10px;
  margin: 0 1px 1px 0;
  background: var(--bg-tile);
  border-radius: 5px;
  aspect-ratio: 1 / 1;
}

[data-theme="dark"] {
  .tile {
    background: var(--bg-tile-dark);
  }
}
</style>
