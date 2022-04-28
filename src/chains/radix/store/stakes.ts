import { StakePosition, Validator } from "@radixdlt/application";
import { AccountAddressT } from "@radixdlt/account";

import { fetchValidators, fetchStakes } from "@chains/radix/api";

import { radix } from "./domain";
import { forward } from "effector";
import { log } from "@utils";

// Validators
export const $validators = radix.createStore<Validator[]>([]);

export const getValidators = radix.createEvent();
const getValidatorsFx = radix.createEffect(async () => {
  const validators = await fetchValidators();
  return validators as Validator[];
});

forward({
  from: getValidators,
  to: getValidatorsFx,
});

$validators.on(getValidatorsFx.doneData, (_, validators) => validators);

// Stakes
export const $stakes = radix.createStore<StakePosition[]>([]);

export const getStakes = radix.createEvent<{
  activeAddress: AccountAddressT;
}>();
const getStakesFx = radix.createEffect(
  async (payload: { activeAddress: AccountAddressT }) => {
    const stakes = await fetchStakes(payload);
    return stakes;
  }
);

forward({
  from: getStakes,
  to: getStakesFx,
});

$stakes.on(getStakesFx.doneData, (_, stakes) => stakes);
