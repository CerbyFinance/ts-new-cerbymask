export const ADD_STAKE = "ADD_STAKE";
export const CREATE_ACCOUNT = "CREATE_ACCOUNT";
export const DASHBOARD = "DASHBOARD";
export const IMPORT_WALLET = "IMPORT_WALLET";
export const MY_WALLETS = "MY_WALLETS";
export const RECEIVE_COINS = "RECEIVE_COINS";
export const SECURE_ACCOUNT = "SECURE_ACCOUNT";
export const SEND_COINS = "SEND_COINS";
export const STAKES = "STAKES";
export const TOKENS = "TOKENS";
export const CHECK_RECOVERY_PHRASE = "CHECK_RECOVERY_PHRASE";

export const SIGN_IN = "SIGN_IN";
export const SIGN_UP = "SIGN_UP";

export const protectedRoutesNames = {
  ADD_STAKE,
  DASHBOARD,
  MY_WALLETS,
  RECEIVE_COINS,
  SEND_COINS,
  STAKES,
  TOKENS,
};
export const publicRoutesNames = {
  SIGN_IN,
  SIGN_UP,
  CREATE_ACCOUNT,
  SECURE_ACCOUNT,
  IMPORT_WALLET,
  CHECK_RECOVERY_PHRASE,
};
export const routesNames = {
  ...protectedRoutesNames,
  ...publicRoutesNames,
};
