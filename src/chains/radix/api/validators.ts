import axios from "axios";

import { NetworkApi } from "@chains/radix";

export const getValidators = async (network: NetworkApi) => {
  const { api, name } = network;

  try {
    const response = await api.get("validators", {
      params: {
        network_identifier: {
          network: name,
        },
      },
    });
    chrome.runtime.sendMessage({
      title: "debug-log",
      data: ["getValidators", response],
    });
  } catch (e) {
    throw new Error("getValidators failed");
  }
};

export const getPromotedValidators = async () => {
  try {
    const response = await axios.get(
      "https://api.npoint.io/e362e89867d427eba6cf"
    );
    chrome.runtime.sendMessage({
      title: "debug-log",
      data: ["getPromotedValidators", response],
    });
  } catch (e) {
    throw new Error("getPromotedValidators failed");
  }
};
