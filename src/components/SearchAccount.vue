<script lang="ts" setup>

import { ref } from 'vue';
import { useQuasar } from 'quasar';
import { useRouter } from 'vue-router';
import { useOverviewStore } from 'stores/account-overview';
import { AccountInfo, ParsedTransactionWithMeta, PublicKey } from '@solana/web3.js';
import { getAddressData, getDetailedTransactions } from 'src/helpers/transactionsFunctions';
import { useAppStore } from 'stores/app-store';

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
            transactionSignature: tx?.transaction.signatures[0].slice(0, 6) + '...',
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
      }).catch((err) => {
        console.log(err);
      });

    } catch (e) {
      $q.notify({
        message: 'Invalid address',
        color: 'negative',
        icon: 'mdi-alert-circle',
        position: 'bottom',
      });
    }
  } else {
    $q.notify({
      message: 'Invalid address',
      color: 'negative',
      icon: 'mdi-alert-circle',
      position: 'bottom',
    });
  }
}


function calculateAge(blockTime: any) {
  const blockTimeMillis = blockTime * 1000;
  const currentTimeMillis = Date.now();
  const ageMillis = currentTimeMillis - blockTimeMillis;
  const seconds = Math.floor(ageMillis / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 0) {
    return `${days} days ago`;
  } else if (hours > 0) {
    return `${hours} hours ago`;
  } else if (minutes > 0) {
    return `${minutes} minutes ago`;
  } else {
    return `${seconds} seconds ago`;
  }
}

function formatUTCDate(blockTime: any): string {
  const blockTimeMillis = blockTime * 1000;
  const date = new Date(blockTimeMillis);
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'short',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
    timeZone: 'UTC',
    timeZoneName: 'short',
  };
  const formattedDate = date.toLocaleString('en-US', options).replace(',', '');
  return formattedDate.replace(' UTC', ' UTC');
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
