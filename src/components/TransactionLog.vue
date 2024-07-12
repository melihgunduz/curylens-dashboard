<script lang="ts" setup>

import { WalletMultiButton } from 'solana-wallets-vue';
import { onMounted } from 'vue';
import { getDetailedTransactions } from 'src/helpers/transactionsFunctions';
import { PublicKey } from '@solana/web3.js';
import { phantom } from '../secrets/secrets.json';


const address = new PublicKey(phantom);
// async function getTransactions(address: PublicKey, numTx: number) {
//   const pubKey = new PublicKey(address);
//   //Find recent transactions
//   let transactionList = await connection.getSignaturesForAddress(pubKey, { limit: numTx });
//   //Parse transactions to get signature for recent transactions
//   let signatureList = transactionList.map(transaction => transaction.signature);
//   //Get parsed details of each transaction and
//   //Update State
//   transactionHistory.value = await connection.getParsedTransactions(signatureList, { maxSupportedTransactionVersion: 0 });
// }

onMounted(() => {
  getDetailedTransactions(address).then((res) => {
    console.log(res);
  });
});

</script>

<template>
  <q-page>
    <wallet-multi-button />
  </q-page>
</template>

<style scoped>

</style>
