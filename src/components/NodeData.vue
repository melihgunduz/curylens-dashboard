<script lang="ts" setup>


import { Connection, EpochInfo } from '@solana/web3.js';
import { ref } from 'vue';
import { formatUTCDate } from 'src/helpers/appFunctions';

const ws = new Connection('https://devnet.helius-rpc.com/?api-key=ff4f4598-d6a2-44a1-b611-4d8bed205ed5', {
  wsEndpoint: 'wss://devnet.helius-rpc.com/?api-key=ff4f4598-d6a2-44a1-b611-4d8bed205ed5',
  commitment: 'confirmed',
});

type NodeData = {
  blockHeight: number,
  slot: number,
  epochInfo: EpochInfo,
  utcTime: string
}


const nodeData = ref<NodeData>(
  {
    blockHeight: 0,
    slot: 0,
    epochInfo: {
      epoch: 0,
      slotIndex: 0,
      slotsInEpoch: 0,
      absoluteSlot: 0,
      blockHeight: 0,
      transactionCount: 0,
    },
    utcTime: '',
  },
);


ws.onSlotChange((val) => {
  nodeData.value.slot = val.slot;
  ws.getBlockHeight().then((res) => {
    nodeData.value.blockHeight = res;
  });
  ws.getEpochInfo().then((val) => {
    nodeData.value.epochInfo = val;
  });
  ws.getBlockTime(val.slot).then((blockTime) => {
    nodeData.value.utcTime = formatUTCDate(blockTime);
  });
});


function formatNumberWithUnderscores(num: number): string {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '_');
}


</script>

<template>
  <q-card style="width: 324px">
    <q-card-section class="justify-between" horizontal>
      <q-card-section>
        Block height
      </q-card-section>
      <q-card-section>
        {{ formatNumberWithUnderscores(nodeData.blockHeight) }}
      </q-card-section>
    </q-card-section>
    <q-card-section class="justify-between" horizontal>
      <q-card-section>
        Slot
      </q-card-section>
      <q-card-section>
        {{ formatNumberWithUnderscores(nodeData.slot) }}
      </q-card-section>
    </q-card-section>
    <q-card-section class="justify-between" horizontal>
      <q-card-section>
        Epoch
      </q-card-section>
      <q-card-section>
        {{ nodeData.epochInfo.epoch }}
      </q-card-section>
    </q-card-section>
    <q-card-section class="justify-between" horizontal>
      <q-card-section>
        Block time
      </q-card-section>
      <q-card-section>
        {{ nodeData.utcTime }}
      </q-card-section>
    </q-card-section>
    <q-inner-loading :showing="nodeData.blockHeight === 0">
      <q-spinner-gears color="primary" size="50px" />
    </q-inner-loading>
  </q-card>
</template>

<style scoped>

</style>
