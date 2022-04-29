import { radix } from "./domain";

import { BalanceToken, ExchangeToken, ExchangeData } from "@chains/radix/types";

import { fetchPair, fetchPairs } from "@chains/radix/api";

// All tokens exchange data
export const $pairsData = radix.createStore<ExchangeData>({});

export const getPairsData = radix.createEvent<BalanceToken[]>();
export const getPairsDataFx = radix.createEffect(async (tickers: string[]) => {
  const pairs = await fetchPairs(tickers);
  return pairs;
});

$pairsData.on(getPairsDataFx.doneData, (_, data) => data);

// XRD exchange data
export const $xrdData = radix.createStore<ExchangeToken>({
  price: 0,
  dailyChange: 0,
});

export const getXrdData = radix.createEvent();
export const getXrdDataFx = radix.createEffect(async () => {
  const data = await fetchPair("XRD");
  return data;
});

$xrdData.on(getXrdDataFx.doneData, (_, data) => data);
