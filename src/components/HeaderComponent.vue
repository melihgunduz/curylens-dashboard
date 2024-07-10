<script lang="ts" setup>

import { useAppStore } from 'stores/app-store';

const appStore = useAppStore();


</script>

<template>
  <q-header>
    <q-toolbar>
      <q-space />
      <q-toolbar-title class="text-h4 text-center">
        Curylens
      </q-toolbar-title>
      <q-space v-if="$q.screen.gt.sm" />
      <q-btn-group v-if="$q.screen.gt.sm" flat>
        <q-btn label="Connect Wallet" />
        <q-btn :icon="appStore.getTheme === 'light' ? 'mdi-white-balance-sunny' : 'mdi-weather-night'"
               flat round @click="appStore.changeTheme()" />
      </q-btn-group>
      <q-space />
    </q-toolbar>
  </q-header>
</template>

<style scoped>

</style>
