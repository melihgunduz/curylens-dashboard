<script lang="ts" setup>

// watch($useWallet.connected, () => {
//   if ($useWallet.connected.value) {
//     console.log($useWallet.publicKey.value?.toBase58());
//   } else {
//     console.log('user disconnected');
//   }
//
// });
import MarketStats from 'components/MarketStats.vue';
import NewsComponent from 'components/NewsComponent.vue';
import TopCoins from 'components/TopCoins.vue';
import SupplyStats from 'components/SupplyStats.vue';
</script>

<template>
  <q-page padding>
    <div
      :class="[$q.screen.gt.sm ? 'row justify-evenly' : 'column items-center justify-around']">
      <top-coins />
      <supply-stats />
      <div class="column justify-between">
        <market-stats class="vertical-top" />
        <market-stats class="relative-position vertical-bottom" />
      </div>
    </div>
    <news-component />
  </q-page>
</template>
