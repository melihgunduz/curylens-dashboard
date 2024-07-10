import { useWalletStore } from 'stores/wallet-store';

const walletStore = useWalletStore();

export function connectWallet() {
  return walletStore.getWallet;
}
