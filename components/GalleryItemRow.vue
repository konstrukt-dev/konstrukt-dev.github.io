<script setup>
defineProps({
  title: String,
  description: String,
  id: Number
})
</script>

<template>
  <div class="row">
    <strong>{{ title }}</strong>: {{ description }}
    <NuxtLink :to="`/gallery/${id}`">project {{ id }}</NuxtLink>
  </div>
</template>

<style>
.row {
  padding: 10px;
  margin: 10px;
  background: var(--bg-tile);
}

[data-theme="dark"] {
  .row {
    background: var(--bg-tile-dark);
  }
}
</style>
