import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import { AccountInfo, ParsedTransactionWithMeta } from '@solana/web3.js';

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

  const transactionInfo = ref<ParsedTransactionWithMeta | null>();
  const getTransactionInfo = computed(() => transactionInfo.value ? transactionInfo.value : null);

  function setTransactionInfo(info: ParsedTransactionWithMeta | null) {
    transactionInfo.value = info;
  }


  return {
    tableRows,
    getTableRows,
    getAccountInfo,
    getTransactionInfo,
    setTableRows,
    setAccountInfo,
    setTransactionInfo,
  };
});
