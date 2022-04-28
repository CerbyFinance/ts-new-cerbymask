import React, { useEffect } from "react";
import { useStore } from "effector-react";
import { Toaster } from "react-hot-toast";

import {
  $activeAddress,
  $authenticated,
  setUserTokens,
} from "@chains/radix/store";

import { Router, RouterView } from "@router";

import { GlobalStyle } from "./globalStyle";

export const App = () => {
  const activeAddress = useStore($activeAddress);
  const authenticated = useStore($authenticated);

  useEffect(() => {
    if (authenticated && activeAddress) {
      setUserTokens({ activeAddress });
    }
  }, [authenticated, activeAddress]);

  return (
    <>
      <Toaster />
      <GlobalStyle />
      <Router>
        <RouterView authenticated={authenticated} />
      </Router>
    </>
  );
};
