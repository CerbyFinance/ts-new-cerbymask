import BigNumber from "bignumber.js";
import { interval, mergeMap } from "rxjs";

import { AccountAddressT, ValidatorAddress } from "@radixdlt/account";
import { Amount, Validator } from "@radixdlt/application";

import { Stakes } from "@chains/radix/types";

import { log } from "@utils";

import { radixApi, userConfirmation } from ".";

export const fetchValidators = (): Promise<Validator[]> => {
  return new Promise((resolve, reject) => {
    radixApi.ledger
      .networkId()
      .pipe(mergeMap((network) => radixApi.ledger.validators(network)))
      .subscribe((validatorsRes: any) => {
        resolve(validatorsRes.validators);
      });
  });
};

export const fetchStakes = (payload: {
  activeAddress: AccountAddressT;
}): Promise<Stakes> => {
  const { activeAddress } = payload;
  return new Promise((resolve, reject) => {
    radixApi.ledger.stakesForAddress(activeAddress).subscribe((response) => {
      resolve(response);
    });
  });
};

export const stakeCoins = (payload: any): Promise<void> => {
  const { validator, amount, rri, onSubmit } = payload;

  return new Promise(async (resolve, reject) => {
    const validatorRes = ValidatorAddress.fromUnsafe(validator);
    if (validatorRes.isErr()) {
      return reject("Invalid validator");
    }

    const amountResult = Amount.fromUnsafe(
      new BigNumber(+amount).shiftedBy(18).toFixed()
    );
    if (amountResult.isErr()) {
      return reject("Invalid amount");
    }

    const stakeInput = {
      to_validator: validatorRes.value,
      amount: amountResult.value,
      tokenIdentifier: rri,
    };
    const { events, completion } = await radixApi.stakeTokens({
      stakeInput,
      userConfirmation,
      pollTXStatusTrigger: interval(1000),
    });
    onSubmit();
    events.subscribe((txState) => {
      log("staking txState");
      log(txState);
    });
    completion.subscribe(() => {
      log("stake completed");
      resolve();
    });
  });
};

export const unstakeCoins = (payload: any): Promise<void> => {
  const { validator, rri, onSubmit } = payload;

  return new Promise(async (resolve, reject) => {
    const validatorRes = ValidatorAddress.fromUnsafe(validator);
    if (validatorRes.isErr()) {
      return reject("Invalid validator");
    }

    const safeOneHundredPercent = Amount.fromUnsafe(
      new BigNumber(0.0000000000000001).shiftedBy(18).toFixed()
    );
    if (safeOneHundredPercent.isErr()) {
      return reject("An error occurred when converting 100% fromUnsafe");
    }

    const unstakeInput = {
      from_validator: validatorRes.value,
      unstake_percentage: safeOneHundredPercent.value,
      tokenIdentifier: rri,
    };
    const { events, completion } = await radixApi.unstakeTokens({
      unstakeInput,
      userConfirmation,
      pollTXStatusTrigger: interval(1000),
    });
    onSubmit();
    events.subscribe((txState) => {
      log("unstaking txState");
      log(txState);
    });
    completion.subscribe(() => {
      log("unstaking completed");
      resolve();
    });
  });
};
