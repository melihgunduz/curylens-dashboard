<script lang="ts" setup>
import { getPriceFeeds, stopGetPriceFeeds } from 'src/helpers/pythOracleFunctions';

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
  <q-page class="row items-center justify-evenly">

    <!--    <h1>Index Page</h1>-->
    <!--    <q-btn label="request" @click="newsRequest()" />-->
    <!--    <wallet-multi-button :dark="$q.dark.isActive" />-->
    <q-btn label="get price feeds" @click="getPriceFeeds()" />
    <q-btn label="stop get price feeds" @click="stopGetPriceFeeds()" />
  </q-page>
</template>
