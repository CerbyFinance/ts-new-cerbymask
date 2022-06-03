import axios from "axios";
import { createDomain } from "effector";

import { Currencies } from "@types";

const currencies = createDomain();

export const $usdTo = currencies.createStore<Currencies>({
  usd: 1,
  eur: 0,
  cnh: 0,
});
export const fetchUsdTo = currencies.createEffect(async () => {
  const { data: eurData } = await axios.get(
    "https://api-pub.bitfinex.com/v2/ticker/tUSDEUR"
  );
  const { data: cnhData } = await axios.get(
    "https://api-pub.bitfinex.com/v2/ticker/tUSDCNH"
  );

  return {
    usd: 1,
    eur: eurData[0],
    cnh: cnhData[0],
  };
});
$usdTo.on(fetchUsdTo.doneData, (_, currencies) => currencies);
