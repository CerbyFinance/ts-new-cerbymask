import React from "react";

import { ValidatorsProps } from "./types";

import { sliceAddress } from "@chains/radix/utils";

import * as S from "./style";
import PlusIcon from "@assets/svg/plus.svg";
import CopyIcon from "@assets/svg/copy.svg";

export const Validators = (props: ValidatorsProps) => {
  const { validators } = props;

  const validatorsMock = [
    {
      name: "Jazzer",
      address: "rv1q232900gerioeojbkfjkb40f037gm",
      amount: 87588142,
      amountPercentage: 2.94,
      ownerAmount: 511242,
      feePercentage: 1,
      uptimePercentage: 100,
    },
    {
      name: "RadixOz",
      address: "rv1q232900gerioeojbkfjkb40f037gm",
      feePercentage: 3,
      uptimePercentage: 100,
      amount: 87588142,
      amountPercentage: 2.94,
      ownerAmount: 511242,
    },
  ];
  return (
    <div style={{ overflow: "scroll-y" }}>
      {validatorsMock.map((validator, i) => {
        const {
          name,
          address,
          amount,
          amountPercentage,
          ownerAmount,
          feePercentage,
          uptimePercentage,
        } = validator;

        return (
          <S.Validator key={i}>
            <header>
              <S.ValidatorInfo>
                <span>{name}</span>
                <div />
                {sliceAddress(address, 4)}
                <CopyIcon />
              </S.ValidatorInfo>
              <div style={{ cursor: "pointer", color: "white" }}>
                <PlusIcon style={{ marginRight: ".25rem" }} />
                Add stake
              </div>
            </header>
            <main>
              <div>
                <div>
                  Stake: {amount} ({amountPercentage}%)
                </div>
                <div>Owner stake: {ownerAmount}</div>
              </div>
              <div>
                <div>Fee: {feePercentage}%</div>
                <div>Uptime: {uptimePercentage}%</div>
              </div>
            </main>
          </S.Validator>
        );
      })}
    </div>
  );
};
