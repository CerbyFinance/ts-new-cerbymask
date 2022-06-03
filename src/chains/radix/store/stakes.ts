import { forward } from "effector";

import { StakePositions, Validator } from "@radixdlt/application";
import { AccountAddressT } from "@radixdlt/account";

import { Stakes } from "@chains/radix/types";
import {
  fetchValidators,
  fetchStakes,
  fetchActiveAddress,
} from "@chains/radix/api";

import { radix } from "./domain";

// Validators
export const $validators = radix.createStore<Validator[]>([]);

export const getValidators = radix.createEvent();
export const getValidatorsFx = radix.createEffect(async () => {
  const validators = (await fetchValidators()).filter(
    (validator: Validator) => validator.isExternalStakeAccepted
  );
  return validators as Validator[];
});

forward({
  from: getValidators,
  to: getValidatorsFx,
});

$validators.on(getValidatorsFx.doneData, (_, validators) => validators);

// Stakes
export const $pendingStakes = radix.createStore<StakePositions>([]);
export const $stakes = radix.createStore<StakePositions>([]);

export const getStakes = radix.createEvent();
export const getStakesFx = radix.createEffect(async () => {
  const address = await fetchActiveAddress();
  const stakes = await fetchStakes({ address });
  return stakes;
});

forward({
  from: getStakes,
  to: getStakesFx,
});

$stakes.on(getStakesFx.doneData, (_, { stakes }) => stakes);
$pendingStakes.on(
  getStakesFx.doneData,
  (_, { pendingStakes }) => pendingStakes
);
