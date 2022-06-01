import { ReplaySubject } from "rxjs";

import { ManualUserConfirmTX } from "@radixdlt/application";

import { log } from "@utils";

export * from "./account";
export * from "./token";
export * from "./tx";
export * from "./stakes";

// userConfirmation ReplaySubject
export const userConfirmation = new ReplaySubject<ManualUserConfirmTX>();
userConfirmation.subscribe((txToConfirm) => {
  log("txToConfirm");
  log(txToConfirm);
  txToConfirm.confirm();
});
