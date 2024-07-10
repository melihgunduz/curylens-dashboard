<script lang="ts" setup>

import { useAppStore } from 'stores/app-store';

const appStore = useAppStore();

</script>

<template>
  <q-page class="row items-center justify-evenly">
    <h1>Index Page</h1>
    <h2>{{ appStore.getTheme }}</h2>
  </q-page>
</template>
