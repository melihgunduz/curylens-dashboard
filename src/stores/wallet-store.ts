import { defineStore } from 'pinia';
import { computed, ref } from 'vue';

type WalletType = {
  address: string,
  isConnected: boolean,
}

export const useWalletStore = defineStore('wallet', () => {


  const wallet = ref<WalletType>({
    address: '',
    isConnected: false,
  });

  const getWallet = computed(() => wallet.value);

  function saveWallet(walletProps: WalletType) {
    wallet.value = walletProps;
  }

  return { wallet, getWallet, saveWallet };
});
