import React, { useEffect } from "react";
import { useStore } from "effector-react";
import { Toaster } from "react-hot-toast";
import { interval } from "rxjs";

import { log } from "@utils";
import { getStorage } from "@chains/radix/utils";

import { $authenticated } from "@store";

import { Router, RouterView } from "@router";

import { Menu } from "@components/organisms";

import { GlobalStyle } from "./globalStyle";

export const App = () => {
  const authenticated = useStore($authenticated);

  useEffect(() => {
    const sub = interval(10000).subscribe(async () => {
      log("current storage");
      log(await getStorage());
    });

    return () => {
      sub.unsubscribe();
    };
  }, []);

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
