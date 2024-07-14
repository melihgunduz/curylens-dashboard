<script lang="ts" setup>

import { ref } from 'vue';
import { useQuasar } from 'quasar';
import { useRouter } from 'vue-router';
import { useOverviewStore } from 'stores/account-overview';
import { AccountInfo, ParsedTransactionWithMeta, PublicKey } from '@solana/web3.js';
import { getAddressData, getDetailedTransactions } from 'src/helpers/transactionsFunctions';
import { useAppStore } from 'stores/app-store';
import { calculateAge, formatUTCDate } from 'src/helpers/appFunctions';

const address = ref('');

const $q = useQuasar();
const $router = useRouter();
const overviewStore = useOverviewStore();
const appStore = useAppStore();

const transactionHistoryParsed = ref<(ParsedTransactionWithMeta | null)[]>([]);
const rows: any = ref([]);

const accountInfo = ref<AccountInfo<Buffer> | null>(null);

function searchAddress() {
  transactionHistoryParsed.value = [];
  rows.value = [];
  overviewStore.setTableRows([]);
  if (address.value !== null && address.value !== '') {
    try {
      appStore.setDataLoading(true);
      PublicKey.isOnCurve(address.value.toString());

      getAddressData(new PublicKey(address.value)).then((val) => {
        accountInfo.value = val;
      });

      getDetailedTransactions(new PublicKey(address.value)).then((res) => {
        transactionHistoryParsed.value = res;
        transactionHistoryParsed.value.forEach((tx) => {
          rows.value.push({
            transactionSignature: tx?.transaction.signatures[0],
            block: tx?.slot,
            age: calculateAge(tx?.blockTime),
            timestamp: formatUTCDate(tx?.blockTime),
            result: tx?.meta?.err !== null,
          });
        });
        overviewStore.setTableRows(rows.value);
        overviewStore.setAccountInfo(accountInfo.value);
        appStore.setDataLoading(false);
        $router.push({ name: 'Account', params: { accountAddress: address.value } });
      }).catch(() => {
        appStore.setDataLoading(false);
        $q.notify({
          message: 'An error occurred when trying to fetch detailed transactions',
          color: 'negative',
          icon: 'mdi-alert-circle',
          position: 'bottom',
        });
      });

    } catch (e) {
      appStore.setDataLoading(false);
      $q.notify({
        message: 'Invalid address',
        color: 'negative',
        icon: 'mdi-alert-circle',
        position: 'bottom',
      });
    }
  } else {
    appStore.setDataLoading(false);
    $q.notify({
      message: 'Invalid address',
      color: 'negative',
      icon: 'mdi-alert-circle',
      position: 'bottom',
    });
  }
}


$router.beforeEach(() => {
  address.value = '';
});

</script>

<template>
  <q-card class="q-ma-xl" flat>
    <q-input
      v-model="address"
      :loading="appStore.getDataLoading" :on-clear="() => address = ''" bottom-slots clear-icon="mdi-close" clearable
      hide-bottom-space
      hide-hint
      label="Search for accounts"
      outlined
      @keyup.enter="searchAddress()"
    >
      <template v-slot:append>
        <q-btn dense flat icon="mdi-magnify" @click="searchAddress()" />
      </template>
    </q-input>
  </q-card>
</template>

<style scoped>

</style>
