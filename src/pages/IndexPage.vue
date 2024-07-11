<script lang="ts" setup>

import { newsRequest } from 'src/helpers/requestFunctions';
import { useWallet, WalletMultiButton } from 'solana-wallets-vue';
import { watch } from 'vue';

const $useWallet = useWallet();

watch($useWallet.connected, () => {
  if ($useWallet.connected.value) {
    console.log($useWallet.publicKey.value?.toBase58());
  } else {
    console.log('user disconnected');
  }

});


</script>

<template>
  <q-page class="row items-center justify-evenly">

    <h1>Index Page</h1>
    <q-btn label="request" @click="newsRequest()" />
    <wallet-multi-button :dark="$q.dark.isActive" />
  </q-page>
</template>
