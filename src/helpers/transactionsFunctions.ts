import { Connection, PublicKey } from '@solana/web3.js';

const connection = new Connection('https://api.devnet.solana.com', 'confirmed');


export async function getTransactionHistory(address: PublicKey) {
  return await connection.getSignaturesForAddress(address);
}

export async function getDetailedTransactions(address: PublicKey) {
  const transactionList = await getTransactionHistory(address);
  const signatureList = transactionList.map((transaction) => transaction.signature);
  console.log('signatureList', signatureList);
  return await connection.getParsedTransactions(signatureList);
}
