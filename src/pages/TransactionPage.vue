<script lang="ts" setup>

import { useRouter } from 'vue-router';
import { onMounted, ref } from 'vue';
import { useOverviewStore } from 'stores/account-overview';
import { ParsedTransactionWithMeta } from '@solana/web3.js';
import { QTableColumn, useQuasar } from 'quasar';
import { formatUTCDate } from '../helpers/appFunctions';


const $q = useQuasar();
const $router = useRouter();


const ready = ref(false);
const overviewStore = useOverviewStore();
const txInfo = ref<ParsedTransactionWithMeta | null>();
const rows: any = ref([]);


const columns: QTableColumn[] = [
  { name: 'address', required: true, label: 'Address', align: 'left', field: 'address' },
  { name: 'change', label: 'Change (SOL)', align: 'left', field: 'change' },
  { name: 'postBalance', label: 'Post Balance (SOL)', align: 'left', field: 'postBalance' },
  { name: 'details', label: 'Details', align: 'left', field: 'details' },
];

onMounted(() => {
  txInfo.value = overviewStore.getTransactionInfo;
  if (txInfo.value !== null) {
    ready.value = true;
    txInfo.value.transaction.message.accountKeys.forEach((key, index) => {
      rows.value.push({
        address: key.pubkey.toBase58(),
        details: [{ value: key.signer, label: 'signer' }, { value: key.writable, label: 'writable' }],
        postBalance: txInfo.value?.meta ? (txInfo.value.meta?.postBalances[index] / 1e9) : [],
      });
    });

  } else {
    $q.notify({
      message: 'An error occurred when transaction detail loading. Redirecting to home.',
      color: 'negative',
      icon: 'mdi-alert-circle',
      position: 'bottom',
    });
    $router.push({ name: 'Home' });
  }
});
</script>

<template>
  <q-page v-if="!ready" class="items-center justify-center">
    <q-spinner-clock />
    <div class="text-h4">Data loading...</div>
  </q-page>
  <q-page v-else padding>
    <q-card class="q-mb-md transparent shadow-0 text-white" flat>
      <q-card-section>
        <div class="text-h5">Transaction</div>

      </q-card-section>
      <q-separator />
    </q-card>
    <q-card class="q-pa-md">
      <q-card-section>
        <div class="text-h6">Overview</div>
      </q-card-section>

      <q-separator />

      <q-card-section>
        <q-list>
          <q-item>
            <q-item-section>Signature</q-item-section>
            <q-item-section class="text-subtitle2 text-accent" side>
              {{ txInfo?.transaction.signatures[0] }}
            </q-item-section>
          </q-item>

          <q-item>
            <q-item-section>Result</q-item-section>
            <q-item-section v-if="txInfo?.meta"
                            :class="[txInfo.meta.err=== null ? 'text-positive' : 'text-negative' + 'text-subtitle2']"
                            side>
              {{ txInfo?.meta.err === null ? 'Success' : 'Failed' }}
            </q-item-section>
          </q-item>

          <q-item>
            <q-item-section>Timestamp</q-item-section>
            <q-item-section class="text-subtitle2" side>
              {{ formatUTCDate(txInfo?.blockTime) }}
            </q-item-section>
          </q-item>

          <q-item>
            <q-item-section>Confirmation Status</q-item-section>
            <q-item-section class="text-subtitle2" side>
              FINALIZED
            </q-item-section>
          </q-item>

          <q-item>
            <q-item-section>Slot</q-item-section>
            <q-item-section class="text-subtitle2" side>
              {{ txInfo?.slot }}
            </q-item-section>
          </q-item>

          <q-item>
            <q-item-section>Recent Blockhash</q-item-section>
            <q-item-section class="text-subtitle2" side>
              {{ txInfo?.transaction.message.recentBlockhash }}
            </q-item-section>
          </q-item>

          <q-item>
            <q-item-section>Fee (SOL)</q-item-section>
            <q-item-section v-if="txInfo?.meta" class="text-subtitle2" side>
              {{ txInfo?.meta.fee / 1e9 }}
            </q-item-section>
          </q-item>

          <q-item>
            <q-item-section>Compute units consumed</q-item-section>
            <q-item-section class="text-subtitle2" side>
              {{ txInfo?.meta?.computeUnitsConsumed }}
            </q-item-section>
          </q-item>
        </q-list>
      </q-card-section>
    </q-card>
    <q-card class="q-pa-md q-mt-md">

      <q-card-section>
        <div class="text-h6">Account Input(s)</div>
      </q-card-section>

      <q-separator />

      <q-card-section>
        <q-table
          :columns="columns"
          :rows="rows"
          flat
          row-key="id"
        >
          <template v-slot:body-cell-address="props">
            <q-td :props="props">
              <q-icon class="q-mr-sm" name="content_copy" />
              {{ props.row.address }}
            </q-td>
          </template>
          <template v-slot:body-cell-change="props">
            <q-td :props="props">
              <q-chip
                :color="props.row.change > 0 ? 'positive' : 'negative'"
                outline
              >
                {{ props.row.change > 0 ? '+' : '' }}{{ props.row.change }}
              </q-chip>
            </q-td>
          </template>
          <template v-slot:body-cell-postBalance="props">
            <q-td :props="props">
              <q-icon class="q-mr-sm" name="attach_money" />
              {{ props.row.postBalance }}
            </q-td>
          </template>
          <template v-slot:body-cell-details="props">
            <q-td :props="props">
              <q-chip
                v-for="detail in props.row.details"
                :key="detail"
                :label="detail.value ? detail.label : ''"
                class="q-mr-sm"
                color="primary text-white"
              />
            </q-td>
          </template>
        </q-table>
      </q-card-section>
    </q-card>
  </q-page>
</template>
