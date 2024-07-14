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
import NodeData from 'components/NodeData.vue';


// TODO: inner loading could be add in to cards

</script>
<template>
  <q-page padding>
    <div
      :class="[$q.screen.gt.sm ? 'row justify-around' : 'column items-center justify-around']"
      :style="[$q.screen.gt.sm ? 'height: 480px' : '']"
    >
      <top-coins />
      <div class="column justify-between">
        <supply-stats />
        <div :class="[$q.screen.lt.md ? 'column items-center' : 'row justify-between']">
          <node-data />
          <market-stats :class="$q.screen.lt.md ? 'q-mt-md' :''" />
        </div>
      </div>
    </div>
    <news-component />
  </q-page>
</template>
