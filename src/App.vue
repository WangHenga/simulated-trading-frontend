<template>
  <template v-if="route.path.startsWith('/user')">
    <UserLayout />
  </template>
  <template v-else>
    <BasicLayout />
  </template>
</template>

<style></style>
<script setup lang="ts">
import BasicLayout from "@/layouts/BasicLayout.vue";
import { useRoute } from "vue-router";
import UserLayout from "@/layouts/UserLayout.vue";

const route = useRoute();
</script>
