<script lang="ts" setup>

import { coinListRequest } from 'src/helpers/coinStatsFunctions';
import { onMounted, ref } from 'vue';
import { TopCoinsType } from 'src/helpers/topCoinsType';
import { useQuasar } from 'quasar';

const coins = ref<TopCoinsType[]>([]);

const $q = useQuasar();

function getTopCoins() {
  coinListRequest().then(function(response) {
    coins.value = response.data.result;
  })
    .catch(function(error) {
      $q.notify({
        message: 'An error occurred when trying to fetch top coins',
        color: 'negative',
        icon: 'mdi-alert-circle',
        position: 'bottom',

      });
      console.log('top coins component error message: ', error.message, 'error name: ', error.name);
    });
}

function formatPrice(price: number) {
  let formattedPrice;
  if (price >= 1) {
    formattedPrice = price.toFixed(2);
    formattedPrice = formattedPrice.replace('.', ',');
    formattedPrice = formattedPrice.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  } else {
    formattedPrice = price.toPrecision(4).replace('.', ',').replace(/e(-?\d+)/, 'e$1');
  }
  return formattedPrice;
}

onMounted(() => {
  getTopCoins();
});

</script>

<template>
  <q-card class="q-px-sm" style="width: 300px; height: fit-content">
    <q-item v-for="(coin,key) in coins" :key="key" class="q-pa-xs">
      <q-item-section class="text-bold text-body1 flex inline-block content-center">
        <q-icon size="sm">
          <q-img :src="coin.icon" />
        </q-icon>
        {{ coin.symbol }}
      </q-item-section>
      <q-item-section>
        ${{ formatPrice(coin.price) }}
      </q-item-section>
      <q-item-section side>
        #{{ coin.rank }}
      </q-item-section>
    </q-item>
  </q-card>
</template>

<style scoped>

</style>
