<script lang="ts" setup>

// watch($useWallet.connected, () => {
//   if ($useWallet.connected.value) {
//     console.log($useWallet.publicKey.value?.toBase58());
//   } else {
//     console.log('user disconnected');
//   }
//
// });
import TransactionLog from 'components/TransactionLog.vue';
</script>

<template>
  <q-page>
    <transaction-log />
  </q-page>
</template>
