import React, { useState } from "react";

import { MyStakesProps } from "./types";

import { sliceAddress } from "@chains/radix/utils";

import { Popover } from "@components/atoms";

import * as S from "./style";
import OptionsVerticalIcon from "@assets/svg/options-vertical.svg";
import CopyIcon from "@assets/svg/copy.svg";

export const MyStakes = (props: MyStakesProps) => {
  const { userStakes } = props;

  const myStakesMock = [
    {
      validator: {
        name: "RadixOz",
        address: "rv1q232900gerioeojbkfjkb40f037gm",
        feePercentage: 3,
        uptimePercentage: 100,
      },
      amount: 15000,
      ticker: "XRD",
      status: "Staked",
    },
    {
      validator: {
        name: "RadixOz",
        address: "rv1q232900gerioeojbkfjkb40f037gm",
        feePercentage: 3,
        uptimePercentage: 100,
      },
      amount: 15000,
      ticker: "XRD",
      status: "Staked",
    },
  ];
  return (
    <div style={{ overflow: "scroll-y" }}>
      {myStakesMock.map((myStake, i) => {
        const { validator, amount, ticker, status } = myStake;
        return (
          <S.MyStake key={i}>
            <header>
              <S.ValidatorInfo>
                <span>{validator.name}</span>
                <div />
                {sliceAddress(validator.address)}
                <CopyIcon />
              </S.ValidatorInfo>
              <Popover
                icon={<OptionsVerticalIcon style={{ cursor: "pointer" }} />}
                contentProps={{ align: "end" }}
                contentStyle={{
                  minWidth: "9rem",
                }}
              >
                <S.PopoverOption>Add</S.PopoverOption>
                <S.PopoverOption>Reduce</S.PopoverOption>
              </Popover>
            </header>
            <main>
              <div>
                <div>Validator fee: {validator.feePercentage}%</div>
                <div>Uptime: {validator.uptimePercentage}%</div>
              </div>
              <div>
                <div>{status}</div>
                <div>
                  {amount} {ticker}
                </div>
              </div>
            </main>
          </S.MyStake>
        );
      })}
    </div>
  );
};
