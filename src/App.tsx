import React, { useEffect } from "react";

import { GlobalStyle } from "./globalStyle";

import { useRadixApi, useNetwork } from "@chains/radix";

export const App = () => {
  const [network, changeNetwork] = useNetwork();
  const radixApi = useRadixApi(network);

  useEffect(() => {
    // test if the right network was chosen
    // should be mainnet in devtools
    chrome.runtime.sendMessage({
      title: "debug-log",
      data: radixApi.tokens.getTokensInfo(),
    });
  }, [radixApi]);
  return (
    <>
      <GlobalStyle />
      <div>test</div>
    </>
  );
};
