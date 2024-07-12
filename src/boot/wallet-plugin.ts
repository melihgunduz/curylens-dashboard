import { boot } from 'quasar/wrappers';
import SolanaWallets from 'solana-wallets-vue';
// You can either import the default styles or create your own.
import 'solana-wallets-vue/styles.css';

import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';

import { PhantomWalletAdapter } from '@solana/wallet-adapter-phantom';
import { WalletStoreProps } from 'solana-wallets-vue/src/types/WalletStoreProps';
import { WalletError } from '@solana/wallet-adapter-base/src/errors';
import { walletAlert } from 'src/helpers/walletErrors';

// "async" is optional;
// more info on params: https://v2.quasar.dev/quasar-cli/boot-files
export default boot(async (app) => {
  const walletOptions: WalletStoreProps = {
    wallets: [
      new PhantomWalletAdapter({ network: WalletAdapterNetwork.Devnet }),
    ],
    autoConnect: false,
    cluster: 'devnet',
    onError: (e: WalletError) => walletAlert(e.name),
  };

  app.app.use(SolanaWallets, walletOptions);
});



