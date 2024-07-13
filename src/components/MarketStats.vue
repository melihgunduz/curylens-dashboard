<script lang="ts" setup>

import { onMounted, ref } from 'vue';
import { marketValuesRequest } from 'src/helpers/coinStatsFunctions';
import { MarketDataType } from 'src/helpers/marketDataType';

const marketData = ref<MarketDataType>({
  btcDominance: 0,
  btcDominanceChange: 0,
  marketCap: 0,
  marketCapChange: 0,
  volume: 0,
  volumeChange: 0,
});

function makeMarketRequest() {
  marketValuesRequest().then(function(response) {
    marketData.value = response.data;
  })
    .catch(function(error) {
      console.error(error);
    });
}

function formatNumberWithUnits(number: number) {
  const units = ['', 'K', 'M', 'B', 'T'];
  const order = Math.floor(Math.log10(Math.abs(number)) / 3);
  const unitname = units[order];
  const num = number / Math.pow(10, order * 3);
  return num.toFixed(1) + unitname;
}

onMounted(() => {
  makeMarketRequest();
});

</script>

<template>
  <q-card class="marketDataCard shadow-0" style="height: fit-content">
    <q-card-section>
      <div>Bitcoin dominance: {{ marketData.btcDominance !== 0 ? marketData.btcDominance : 'Loading data...' }}%</div>
    </q-card-section>
    <q-card-section>
      <div>Market cap:
        {{ marketData.marketCap !== 0 ? formatNumberWithUnits(marketData.marketCap) : 'Loading data...' }}
      </div>
    </q-card-section>
    <q-card-section>
      <div>Volume: {{ marketData.volume !== 0 ? formatNumberWithUnits(marketData.volume) : 'Loading data...' }}</div>
    </q-card-section>
    <q-card-section>
      <div>24h volume change: {{ marketData.volumeChange }}</div>
    </q-card-section>
  </q-card>
</template>

<style lang="sass" scoped>
.marketDataCard
  max-width: 250px
</style>
