import React, { useEffect, useState } from "react";

import { GlobalStyle } from "./globalStyle";

import { useRadixApi, useNetwork } from "@chains/radix";
import {
  AddStake,
  CreateAccount,
  Dashboard,
  ImportWallet,
  MyWallets,
  ReceiveCoins,
  SecureAccount,
  SendCoins,
  SignIn,
  SignUp,
  Stakes,
  Tokens,
} from "@views";

const views = {
  AddStake: <AddStake />,
  CreateAccount: <CreateAccount />,
  Dashboard: <Dashboard />,
  ImportWallet: <ImportWallet />,
  MyWallets: <MyWallets />,
  ReceiveCoins: <ReceiveCoins />,
  SecureAccount: <SecureAccount />,
  SendCoins: <SendCoins />,
  SignIn: <SignIn />,
  SignUp: <SignUp />,
  Stakes: <Stakes />,
  Tokens: <Tokens />,
};

export const App = () => {
  const [view, setView] = useState<keyof typeof views>("AddStake");
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
      {views[view]}

      {/* for test purposes */}
      <select
        value={view}
        onChange={(e) => setView(e.target.value as keyof typeof views)}
        style={{ color: "black" }}
      >
        {Object.keys(views).map((view) => (
          <option key={view} value={view}>
            {view}
          </option>
        ))}
      </select>
    </>
  );
};
