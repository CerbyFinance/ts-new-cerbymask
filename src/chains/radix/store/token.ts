import { forward } from "effector";
import { fetchXrdUsd } from "@chains/radix/api";

import { radix } from "./domain";

// Token price
export const $xrdUsd = radix.createStore<string | null>(null);

export const getXrdUsd = radix.createEvent();
export const getXrdUsdFx = radix.createEffect(async () => {
  const price = await fetchXrdUsd();
  return price;
});

$xrdUsd.on(getXrdUsdFx.doneData, (_, price) => price);

forward({
  from: getXrdUsd,
  to: getXrdUsdFx,
});
