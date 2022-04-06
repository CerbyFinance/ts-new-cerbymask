import axios from "axios";

import { NetworkApi } from "@types/radix";

export const getXrdUsd = async () => {
  try {
    const response = await axios.get(
      "https://api.bitfinex.com/v1/pubticker/xrdusd"
    );
    chrome.runtime.sendMessage({
      title: "debug-log",
      data: ["getXrdUsd", response],
    });
  } catch (e) {
    throw new Error("getXrdUsd failed");
  }
};

export const getTokensInfo = (network: NetworkApi) => {
  return network.name;
  /*
  const { api } = network;
  try {
    const response = await api.post("tokens.get_info", {
      body: options,
    });
    chrome.runtime.sendMessage({
      title: "debug-log",
      data: ["getTokensInfo", response],
    });
  } catch (e) {
    throw new Error("getTokensInfo failed");
  }
  */
};
