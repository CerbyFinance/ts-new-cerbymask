import React from "react";
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

import { protectedRoutesNames, publicRoutesNames } from "./routesNames";

export const routes = {
  protected: {
    [protectedRoutesNames.ADD_STAKE]: () => <AddStake />,
    [protectedRoutesNames.DASHBOARD]: () => <Dashboard />,
    [protectedRoutesNames.IMPORT_WALLET]: () => <ImportWallet />,
    [protectedRoutesNames.MY_WALLETS]: () => <MyWallets />,
    [protectedRoutesNames.RECEIVE_COINS]: () => <ReceiveCoins />,
    [protectedRoutesNames.SEND_COINS]: () => <SendCoins />,
    [protectedRoutesNames.STAKES]: () => <Stakes />,
    [protectedRoutesNames.TOKENS]: () => <Tokens />,
  },
  public: {
    [publicRoutesNames.SIGN_IN]: () => <SignIn />,
    [publicRoutesNames.SIGN_UP]: () => <SignUp />,
    [publicRoutesNames.CREATE_ACCOUNT]: () => <CreateAccount />,
    [publicRoutesNames.SECURE_ACCOUNT]: () => <SecureAccount />,
  },
};
