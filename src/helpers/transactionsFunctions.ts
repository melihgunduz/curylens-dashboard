import { Connection, PublicKey } from '@solana/web3.js';

export type SlotType = {
  parent: number,
  root: number,
  slot: number
}

export const connection = new Connection('https://devnet.helius-rpc.com/?api-key=ff4f4598-d6a2-44a1-b611-4d8bed205ed5', 'confirmed');


export async function getTransactionHistory(address: PublicKey) {
  return await connection.getSignaturesForAddress(address);
}

export async function getAddressData(address: PublicKey) {
  return await connection.getAccountInfo(address);
}

export async function getDetailedTransactions(address: PublicKey) {
  const transactionList = await getTransactionHistory(address);
  const signatureList = transactionList.map((transaction) => transaction.signature);
  return await connection.getParsedTransactions(signatureList, { maxSupportedTransactionVersion: 0 });
}

