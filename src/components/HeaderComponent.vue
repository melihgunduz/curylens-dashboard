<script lang="ts" setup>

import { useAppStore } from 'stores/app-store';

const appStore = useAppStore();


</script>

<template>
  <q-header reveal>

    <q-toolbar>
      <q-space />
      <q-toolbar-title class="text-h4 text-center">
        Curylens
      </q-toolbar-title>
      <q-space v-if="$q.screen.gt.sm" />
      <q-btn-group v-if="$q.screen.gt.sm" flat>
        <q-btn label="Connect Wallet" />
        <q-btn :icon="$q.dark.isActive ? 'mdi-white-balance-sunny' : 'mdi-weather-night'"
               flat round @click="$q.dark.toggle()" />
      </q-btn-group>
      <q-space />
      <q-btn v-if="$q.screen.lt.md" dense flat icon="mdi-menu" round @click="appStore.changeRightDrawerOpen()" />
    </q-toolbar>

  </q-header>

</template>

<style scoped>

</style>
