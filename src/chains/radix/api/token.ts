import axios from "axios";

import { ExchangeToken, ExchangeData } from "@chains/radix/types";

/*
// on trading pairs (ex. tXRDUSD)
[
  BID, 
  BID_SIZE, 
  ASK, 
  ASK_SIZE, 
  DAILY_CHANGE, 
  DAILY_CHANGE_RELATIVE, 
  LAST_PRICE, 
  VOLUME, 
  HIGH, 
  LOW
]
*/
export const fetchPair = async (ticker: string): Promise<ExchangeToken> => {
  try {
    const { data } = await axios.get(
      `https://api-pub.bitfinex.com/v2/ticker/t${ticker.toUpperCase()}USD`
    );
    return {
      price: data[6],
      dailyChange: data[4],
    };
  } catch (e) {
    throw new Error(`fetchPair ${ticker} failed`);
  }
};
// TypeScript TODO - no-any
export const fetchPairs = async (tickers: string[]): Promise<ExchangeData> => {
  const query = tickers
    .map((ticker) => `t${ticker.toUpperCase()}USD`)
    .join(",");
  try {
    const { data: coins } = await axios.get(
      `https://api-pub.bitfinex.com/v2/tickers?symbols=${query}`
    );
    return Object.fromEntries(
      coins.map((coin: any) => [
        // remove 't' prefix and 'usd' ticker
        coin[0].slice(1, -3),
        {
          price: coin[7],
          dailyChange: coin[5],
        },
      ])
    );
  } catch (e) {
    throw new Error(`fetchPairs failed`);
  }
};
