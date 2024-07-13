<script lang="ts" setup>

import AccountOverview from 'components/AccountOverview.vue';

import { useRouter } from 'vue-router';
import { onBeforeMount, ref } from 'vue';
import { useOverviewStore } from 'stores/account-overview';

const overviewStore = useOverviewStore();
const $router = useRouter();
const ready = ref(false);

onBeforeMount(() => {
  if (overviewStore.getAccountInfo === null) {
    $router.push({ name: 'Home' });
  } else {
    ready.value = true;
  }
});

</script>

<template>
  <q-page>
    <account-overview v-if="ready" />
  </q-page>
</template>
