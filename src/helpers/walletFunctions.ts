import * as errors from '/home/melih/WebstormProjects/curylens/node_modules/@solana/wallet-adapter-base/src/errors';

export function walletAlert(errorName: string) {

  switch (errorName) {
    case errors.WalletNotReadyError.name:
      console.log('Wallet not ready');
      break;
    case errors.WalletLoadError.name:
      console.log('Wallet load error');
      break;
    case errors.WalletConfigError.name:
      console.log('Wallet config error');
      break;
    case errors.WalletConnectionError.name:
      console.log('Wallet connection error');
      break;
    case errors.WalletDisconnectedError.name:
      console.log('Wallet disconnected error');
      break;
    case errors.WalletDisconnectionError.name:
      console.log('Wallet disconnection error');
      break;
    case errors.WalletAccountError.name:
      console.log('Wallet account error');
      break;
    case errors.WalletPublicKeyError.name:
      console.log('Wallet pub key error');
      break;
    case errors.WalletKeypairError.name:
      console.log('Wallet keypair error');
      break;
    case errors.WalletNotConnectedError.name:
      console.log('Wallet not connected error');
      break;
    case errors.WalletSendTransactionError.name:
      console.log('Wallet send transaction error');
      break;
    case errors.WalletSignTransactionError.name:
      console.log('Wallet sign tx error');
      break;
    case errors.WalletSignMessageError.name:
      console.log('Wallet sign msg error');
      break;
    case errors.WalletSignInError.name:
      console.log('Wallet sign in error');
      break;
    case errors.WalletTimeoutError.name:
      console.log('Wallet timeout error');
      break;
    case errors.WalletWindowBlockedError.name:
      console.log('Wallet window bloccked error');
      break;
    case errors.WalletWindowClosedError.name:
      console.log('Wallet window closed error');
      break;
  }
}
