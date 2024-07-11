import { useOracleStore } from 'stores/oracle-store';


const oracleStore = useOracleStore();

const priceIds = [
  '0xe62df6c8b4a85fe1a67db44dc12de5db330f7ac66b72dc658afedf0f4a415b43', // BTC/USD price id
  '0xff61491a931112ddf1bd8147cd1b641375f79f5825126d665480874634fd0ace', // ETH/USD price id
];

export async function getPriceFeeds() {
  try {
    if (oracleStore.getConnection !== null) {
      await oracleStore.getConnection.subscribePriceFeedUpdates(priceIds, (priceFeed) => {
        // priceFeed here is the same as returned by getLatestPriceFeeds above.
        console.log(
          priceFeed,
        );
      });
    }
  } catch (e) {
    console.log(e);
  }
}

export async function stopGetPriceFeeds() {
  try {
    if (oracleStore.getConnection !== null) {
      await oracleStore.getConnection.unsubscribePriceFeedUpdates(priceIds);
    }
  } catch (e) {
    console.log(e);
  }

}
