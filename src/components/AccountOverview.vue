<script lang="ts" setup>

import { onMounted, ref } from 'vue';
import { AccountInfo } from '@solana/web3.js';
import { QTableColumn } from 'quasar';
import { useOverviewStore } from 'stores/account-overview';
import { useRouter } from 'vue-router';

const overviewStore = useOverviewStore();


const accountInfo = ref<AccountInfo<Buffer> | null>(null);
const rows: any = ref([]);
const $router = useRouter();

const columns: QTableColumn[] = [
  { name: 'transactionSignature', align: 'left', label: 'Transaction Signature', field: 'transactionSignature' },
  { name: 'block', label: 'Block', field: 'block', align: 'center' },
  { name: 'age', label: 'Age', field: 'age', sortable: true, align: 'center' },
  { name: 'timestamp', label: 'Timestamp', field: 'timestamp', sortable: true, align: 'center' },
  { name: 'result', label: 'Result', field: 'result', align: 'center' },
];

$router.beforeEach((to) => {
  if (to.name === 'Account') {
    rows.value = overviewStore.getTableRows;
  }
});

onMounted(() => {
  accountInfo.value = overviewStore.getAccountInfo;
  rows.value = overviewStore.getTableRows;
});


</script>
<template>
  <q-card>
    <q-card-section>
      <div class="text-h6">Overview</div>
    </q-card-section>
    <q-list>
      <q-item>
        <q-item-section>Address</q-item-section>
        <q-item-section avatar>{{ $route.params.accountAddress }}</q-item-section>
      </q-item>
      <q-item>
        <q-item-section>Executable</q-item-section>
        <q-item-section avatar>{{ accountInfo?.executable ? 'YES' : 'NO' }}</q-item-section>
      </q-item>
      <q-item>
        <q-item-section>Balance (SOL)</q-item-section>
        <q-item-section avatar>{{ accountInfo?.lamports ? accountInfo?.lamports / 1e9 : 0 }}</q-item-section>
      </q-item>
    </q-list>
  </q-card>
  <!--  History Session-->
  <q-card class="q-mt-sm">
    <q-card-section class="justify-between items-center" horizontal>
      <q-card-section>
        <div class="text-h6">Transaction History</div>
      </q-card-section>
    </q-card-section>

    <q-table
      :columns="columns"
      :rows="rows"
      :rows-per-page-options="[5, 10, 20, 50]"
      row-key="transactionSignature"
    >
      <template v-slot:body-cell-result="props">
        <q-td :props="props">
          <q-badge color="green" label="Success" />
        </q-td>
      </template>
    </q-table>
  </q-card>
</template>

<style scoped>

</style>
