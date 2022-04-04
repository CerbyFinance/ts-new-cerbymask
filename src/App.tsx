import React, { useEffect } from "react";

import { GlobalStyle } from "./globalStyle";

import { useRadixApi } from "@api/radix";

export const App = () => {
  const radixApi = useRadixApi();

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
