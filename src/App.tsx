import React from "react";
import { useStore } from "effector-react";
import { Toaster } from "react-hot-toast";

import { $authenticated } from "@store";

import { Router, RouterView } from "@router";

import { Menu } from "@components/organisms";

import { GlobalStyle } from "./globalStyle";

export const App = () => {
  const authenticated = useStore($authenticated);

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
