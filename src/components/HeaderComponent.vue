<script lang="ts" setup>

import { useAppStore } from 'stores/app-store';

const appStore = useAppStore();


</script>

<template>
  <q-header reveal>
    <q-toolbar class="justify-between">
      <q-toolbar-title class="text-h4">
        Curylens
      </q-toolbar-title>
      <q-btn-group v-if="$q.screen.gt.sm" flat>
        <q-btn :icon="$q.dark.isActive ? 'mdi-white-balance-sunny' : 'mdi-weather-night'"
               flat round @click="$q.dark.toggle()" />
      </q-btn-group>
      <q-btn v-if="$q.screen.lt.md" dense flat icon="mdi-menu" round @click="appStore.changeRightDrawerOpen()" />
    </q-toolbar>

  </q-header>

</template>

<style scoped>

</style>
