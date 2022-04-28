import { interval, ReplaySubject } from "rxjs";
import { AccountAddress } from "@radixdlt/account";
import { Amount, ManualUserConfirmTX } from "@radixdlt/application";
import BigNumber from "bignumber.js";

import { log } from "@utils";

import { radixApi } from ".";

const userConfirmation = new ReplaySubject<ManualUserConfirmTX>();
userConfirmation.subscribe((txToConfirm) => {
  log("txToConfirm");
  log(txToConfirm);
  txToConfirm.confirm();
});

// onSubmit callback to redirect user on Dashboard when send operation was handled
export const sendCoins = (payload: any): Promise<void> => {
  const { to, amount, rri, onSubmit } = payload;

  return new Promise((resolve, reject) => {
    const recipientResult = AccountAddress.fromUnsafe(to);
    if (recipientResult.isErr()) {
      return reject("Invalid address");
    }

    const amountResult = Amount.fromUnsafe(
      new BigNumber(+amount).shiftedBy(18).toFixed()
    );
    if (amountResult.isErr()) {
      return reject("Amount is wrong");
    }

    const transferInput = {
      to_account: recipientResult.value,
      amount: amountResult.value,
      tokenIdentifier: rri,
    };
    log("transferInput");
    log(transferInput);
    const { events, completion } = radixApi.transferTokens({
      transferInput,
      userConfirmation,
      pollTXStatusTrigger: interval(1000),
    });
    onSubmit();
    events.subscribe((txState) => {
      log("txState");
      log(txState);
    });
    completion.subscribe(() => {
      log("tx completed");
      resolve();
    });
  });
};
