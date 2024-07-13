import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import { AccountInfo } from '@solana/web3.js';

type TableRows = {
  transactionSignature: string,
  block: string,
  age: string,
  timestamp: string,
  result: boolean,
}

export const useOverviewStore = defineStore('overviewStore', () => {


  const tableRows = ref<TableRows | []>();
  const getTableRows = computed(() => tableRows.value ? tableRows.value : null);

  function setTableRows(rows: TableRows | []) {
    tableRows.value = rows;
  }

  const accountInfo = ref<AccountInfo<Buffer> | null>(null);
  const getAccountInfo = computed(() => accountInfo.value ? accountInfo.value : null);

  function setAccountInfo(account: AccountInfo<Buffer> | null) {
    accountInfo.value = account;
  }


  return { tableRows, getTableRows, getAccountInfo, setTableRows, setAccountInfo };
});
