import { AccountAddressT } from "@radixdlt/account";
import { StakePosition, Validator } from "@radixdlt/application";
import { mergeMap } from "rxjs";

import { radixApi } from ".";

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
}): Promise<StakePosition[]> => {
  const { activeAddress } = payload;
  return new Promise((resolve, reject) => {
    radixApi.ledger.stakesForAddress(activeAddress).subscribe((response) => {
      resolve(response.stakes);
    });
  });
};
