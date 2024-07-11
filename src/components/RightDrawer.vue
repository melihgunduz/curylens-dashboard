<script lang="ts" setup>
import { useAppStore } from 'stores/app-store';

const appStore = useAppStore();

</script>

<template>
  <q-drawer
    v-if="$q.screen.lt.md"
    :breakpoint="400"
    :class="$q.dark.isActive ? 'bg-grey-9' : 'bg-grey-3'"
    :model-value="appStore.getRightDrawerOpen"
    :width="200"
    bordered
    show-if-above
    side="right"
  >

    <q-list>
      <q-item class="items-center" clickable>
        <q-item-section avatar class="items-center">
          <q-icon name="mdi-wallet" size="sm" />
        </q-item-section>
        <q-item-section>
          Connect wallet
        </q-item-section>
      </q-item>
    </q-list>
    <q-btn :icon="$q.dark.isActive ? 'mdi-white-balance-sunny' : 'mdi-weather-night'"
           class="absolute-bottom-right q-ma-sm"
           flat round @click="$q.dark.toggle()" />
  </q-drawer>
</template>

<style scoped>

</style>
