import React, { useEffect, useState } from "react";

import { GlobalStyle } from "./globalStyle";

import {
  useRadixApi,
  useNetwork,
  loadKeystore,
  NETWORKS_LIST,
} from "@chains/radix";
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
import { log, patchKeystore } from "@utils";

const views = {
  AddStake: () => <AddStake />,
  CreateAccount: () => <CreateAccount />,
  Dashboard: () => <Dashboard />,
  ImportWallet: () => <ImportWallet />,
  MyWallets: () => <MyWallets />,
  ReceiveCoins: () => <ReceiveCoins />,
  SecureAccount: () => <SecureAccount />,
  SendCoins: () => <SendCoins />,
  SignIn: () => <SignIn />,
  SignUp: () => <SignUp />,
  Stakes: () => <Stakes />,
  Tokens: () => <Tokens />,
};

export const App = () => {
  const [view, setView] = useState<keyof typeof views>("AddStake");
  const [network, changeNetwork] = useNetwork();
  const api = useRadixApi({
    url: NETWORKS_LIST.stokenet.url,
    password: "qwerty",
  });

  useEffect(() => {
    log(api);
  }, [api]);

  return (
    <>
      <GlobalStyle />
      {views[view]()}

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
