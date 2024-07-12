<script lang="ts" setup>

// watch($useWallet.connected, () => {
//   if ($useWallet.connected.value) {
//     console.log($useWallet.publicKey.value?.toBase58());
//   } else {
//     console.log('user disconnected');
//   }
//
// });

import TopCoins from 'components/TopCoins.vue';
</script>

<template>
  <q-page>
    <top-coins />
  </q-page>
</template>
