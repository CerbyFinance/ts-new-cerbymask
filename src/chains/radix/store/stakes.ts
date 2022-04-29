import { forward } from "effector";

import { Validator } from "@radixdlt/application";
import { AccountAddressT } from "@radixdlt/account";

import { Stakes } from "@chains/radix/types";
import { fetchValidators, fetchStakes } from "@chains/radix/api";

import { radix } from "./domain";

// Validators
export const $validators = radix.createStore<Validator[]>([]);

export const getValidators = radix.createEvent();
const getValidatorsFx = radix.createEffect(async () => {
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
export const $stakes = radix.createStore<Stakes>({
  pendingStakes: [],
  stakes: [],
});

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
