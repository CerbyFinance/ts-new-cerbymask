import React from "react";
import { useStore } from "effector-react";
import BigNumber from "bignumber.js";

import { ValidatorsProps } from "./types";

import { sliceAddress } from "@chains/radix/utils";

import { $validators } from "@chains/radix/store";

import { ICONS } from "@globalStyle";
import * as S from "./style";

export const Validators = (props: ValidatorsProps) => {
  const {
    options: { addStake },
  } = props;
  const validators = useStore($validators);

  return (
    <div style={{ overflow: "scroll-y" }}>
      {validators.map((validator) => {
        const {
          name,
          address,
          totalDelegatedStake,
          ownerDelegation,
          uptimePercentage,
          validatorFee,
        } = validator;

        const addressString = address.toString();
        return (
          <S.Validator key={addressString}>
            <header>
              <S.ValidatorInfo>
                <span>{name}</span>
                <div />
                {sliceAddress(addressString, 4)}
                <ICONS.Copy />
              </S.ValidatorInfo>
              <div
                style={{ cursor: "pointer", color: "white" }}
                onClick={addStake}
              >
                <ICONS.Plus style={{ marginRight: ".25rem" }} />
                Add stake
              </div>
            </header>
            <main>
              <div>
                <div>
                  Stake: {totalDelegatedStake.valueOf().toLocaleString()} (
                  {new BigNumber(ownerDelegation.toString())
                    .dividedBy(totalDelegatedStake.toString())
                    .multipliedBy(100)
                    .toFixed(2)}
                  %)
                </div>
                <div>
                  Owner stake: {ownerDelegation.valueOf().toLocaleString()}
                </div>
              </div>
              <div>
                <div>Fee: {validatorFee}%</div>
                <div>Uptime: {uptimePercentage}%</div>
              </div>
            </main>
          </S.Validator>
        );
      })}
    </div>
  );
};
