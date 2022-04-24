import { ReplaySubject } from "rxjs";
import { Action } from "@chains/radix/types";
import BigNumber from "bignumber.js";
import { log } from "@utils";
import { AccountAddress, ResourceIdentifier } from "@radixdlt/account";

export const sendCoins = (action: Action): Promise<void> => {
  const { api, payload } = action;

  const { to, amount, rri } = payload;

  return new Promise((resolve, reject) => {
    const event = api.transferTokens({
      transferInput: {
        to_account: AccountAddress.fromUnsafe(to).unwrapOr(to),
        amount: new BigNumber(amount).multipliedBy(10 ** 18).toString(),
        tokenIdentifier: ResourceIdentifier.fromUnsafe(rri).unwrapOr(rri),
      },
      userConfirmation: "skip",
    });
    event.completion.subscribe((v) => {
      log("completion");
      log(v);
    });
    event.events.subscribe({
      error: (e) => {
        log("error");
        log(e);
      },
      next: (e) => {
        log("next");
        log(e);
      },
      complete: () => {
        log("complete");
      },
    });
    resolve();
  });
};
