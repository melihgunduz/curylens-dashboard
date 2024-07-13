<script lang="ts" setup>

import { onMounted, ref } from 'vue';
import { Supply } from '@solana/web3.js';
import { connection } from 'src/helpers/transactionsFunctions';

const supply = ref<Supply>();

function formatNumberWithUnits(number: number) {
  const units = ['', 'K', 'M', 'B', 'T'];
  const order = Math.floor(Math.log10(Math.abs(number)) / 3);
  const unitname = units[order];
  const num = number / Math.pow(10, order * 3);

  return num.toFixed(2) + unitname;
}

onMounted(() => {
  connection.getSupply().then((val) => {
    supply.value = val.value;
  });
});

</script>

<template>
  <div :class="[$q.screen.lt.md ? 'column q-my-md' : 'row justify-between']">
    <q-card class="shadow-0">
      <q-card-section class="text-h6">
        <div>Circulating supply (SOL)</div>
      </q-card-section>
      <q-card-section class="row">
        <div class="text-h6 text-primary">
          {{ supply ? formatNumberWithUnits(supply?.circulating / 1e9) : 0 }}
        </div>
        <div class="text-h4">
          / {{ supply ? formatNumberWithUnits(supply?.total / 1e9) : 0 }}

        </div>
      </q-card-section>
      <q-card-section class="row text-body2">
        <em class="text-positive">
          {{ supply ? ((supply.circulating / supply.total) * 100).toFixed(2) : 0 }}%
        </em>
        <div class="q-ml-xs">is circulating</div>
      </q-card-section>
    </q-card>
    <q-card :class="$q.screen.lt.md ? 'q-mt-md shadow-0' : 'q-ml-md shadow-0'">
      <q-card-section class="text-h6">
        <div>Non circulating supply</div>
      </q-card-section>
      <div class="text-body1">
        <q-card-section>
          Non circulating accounts: {{ supply?.nonCirculatingAccounts.length }}
        </q-card-section>
        <q-card-section>
          Non circulating supply (SOL): {{ supply ? formatNumberWithUnits(supply?.nonCirculating / 1e9) : 0 }}
        </q-card-section>
      </div>
    </q-card>
  </div>
</template>

