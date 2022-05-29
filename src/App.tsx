import React, { useEffect } from "react";
import { useStore } from "effector-react";
import { Toaster } from "react-hot-toast";

import * as api from "@chains/radix/api";

import { $authenticated, fetchUsdTo } from "@store";
import {
  $activeAddress,
  setTxHistory,
  setUserTokens,
} from "@chains/radix/store";

import { Router, RouterView } from "@router";

import { Menu } from "@components/organisms";

import { GlobalStyle } from "./globalStyle";

export const App = () => {
  const activeAddress = useStore($activeAddress);
  const authenticated = useStore($authenticated);

  useEffect(() => {
    fetchUsdTo();
  }, []);
  useEffect(() => {
    if (authenticated && activeAddress) {
      setUserTokens({ address: activeAddress });
      setTxHistory({ address: activeAddress, size: 30 });
    }
  }, [authenticated, activeAddress]);

  return (
    <>
      <Toaster />
      <GlobalStyle />
      <Router>
        <RouterView authenticated={authenticated} />
        <Menu />
      </Router>
    </>
  );
};
