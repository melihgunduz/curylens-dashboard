import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import { PriceServiceConnection } from '@pythnetwork/price-service-client';


export const useOracleStore = defineStore('oracleStore', () => {


  const connection = ref<PriceServiceConnection>();
  const getConnection = computed(() => connection.value ? connection.value : null);

  function setStoreConnection() {
    try {

    } catch (e) {
      
    }
    connection.value = new PriceServiceConnection('https://hermes.pyth.network');

  }


  return { getConnection, setStoreConnection };
});
