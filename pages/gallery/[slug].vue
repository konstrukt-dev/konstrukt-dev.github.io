<script setup lang="ts">
import { useRoute } from "vue-router";
import type {Project} from "~/types/projects.js";

const { data } = useApi<Project[]>("/projects");
const route = useRoute();
let currentProject = ref(null);

watchEffect(() => {
  if (data.value) {
   currentProject.value = data.value.find(project => Number(project.id) === Number(route.params.slug)) ?? null;
  }
});
</script>

<template>
  <div v-if="currentProject">
      {{ currentProject.title }} - {{ currentProject.id }}
  </div>
</template>

