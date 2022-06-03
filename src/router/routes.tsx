import React from "react";
import {
  CreateAccount,
  Dashboard,
  ImportWallet,
  MyWallets,
  SecureAccount,
  SendCoins,
  SignIn,
  SignUp,
  Stakes,
  CheckRecoveryPhrase,
} from "@views";

import { protectedRoutesNames, publicRoutesNames } from "./routesNames";

export const routes = {
  protected: {
    [protectedRoutesNames.DASHBOARD]: () => <Dashboard />,
    [protectedRoutesNames.MY_WALLETS]: () => <MyWallets />,
    [protectedRoutesNames.SEND_COINS]: () => <SendCoins />,
    [protectedRoutesNames.STAKES]: () => <Stakes />,
  },
  public: {
    [publicRoutesNames.SIGN_IN]: () => <SignIn />,
    [publicRoutesNames.SIGN_UP]: () => <SignUp />,
    [publicRoutesNames.CREATE_ACCOUNT]: () => <CreateAccount />,
    [publicRoutesNames.SECURE_ACCOUNT]: () => <SecureAccount />,
    [publicRoutesNames.IMPORT_WALLET]: () => <ImportWallet />,
    [publicRoutesNames.CHECK_RECOVERY_PHRASE]: () => <CheckRecoveryPhrase />,
  },
};
