<script lang="ts" setup>
import NewsComponent from 'components/NewsComponent.vue';

// watch($useWallet.connected, () => {
//   if ($useWallet.connected.value) {
//     console.log($useWallet.publicKey.value?.toBase58());
//   } else {
//     console.log('user disconnected');
//   }
//
// });

</script>

<template>
  <q-page>
    <news-component />
  </q-page>
</template>
