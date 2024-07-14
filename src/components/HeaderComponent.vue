<script lang="ts" setup>

import { useAppStore } from 'stores/app-store';
import { onMounted, ref } from 'vue';
import { getRpcVersion } from 'src/helpers/transactionsFunctions';
import { Version } from '@solana/web3.js';


const appStore = useAppStore();
const rpcVersion = ref<Version>();

onMounted(async () => {
  rpcVersion.value = await getRpcVersion();
});

</script>

<template>
  <q-header reveal>
    <q-toolbar class="justify-between">
      <q-toolbar-title class="flex text-h4 items-baseline">
        Curylens
        <div class="text-caption q-ml-sm">RPC v{{ rpcVersion?.['solana-core'] }}</div>
      </q-toolbar-title>
      <q-btn-group v-if="$q.screen.gt.sm" flat>
        <q-btn dense flat icon="mdi-home" no-caps @click="$router.push({name:'Home'})" />

        <q-btn :icon="$q.dark.isActive ? 'mdi-white-balance-sunny' : 'mdi-weather-night'"
               flat round @click="$q.dark.toggle()" />
      </q-btn-group>
      <q-btn v-if="$q.screen.lt.md" dense flat icon="mdi-menu" round @click="appStore.changeRightDrawerOpen()" />
    </q-toolbar>

  </q-header>

</template>

<style scoped>

</style>
