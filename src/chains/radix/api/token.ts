import axios from "axios";

import { log } from "@utils";

export const fetchXrdUsd = async (): Promise<string> => {
  try {
    const {
      data: { last_price },
    } = await axios.get("https://api.bitfinex.com/v1/pubticker/xrdusd");
    log("Get XRDUSD ticker");
    return last_price;
  } catch (e) {
    throw new Error("getXrdUsd failed");
  }
};
