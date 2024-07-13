<script lang="ts" setup>

import { onMounted } from 'vue';
import { useOracleStore } from 'stores/oracle-store';

defineOptions({
  name: 'App',
});

const oracleStore = useOracleStore();

onMounted(() => {
  oracleStore.setStoreConnection();
});

</script>

<template>
  <router-view />
</template>



