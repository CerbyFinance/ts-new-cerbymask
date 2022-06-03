import React from "react";
import { useList, useStore } from "effector-react";

import { MyStakeProps, MyStakesProps } from "./types";

import { convertToMainUnit, sliceAddress } from "@chains/radix/utils";

import { $pendingStakes, $stakes, $validators } from "@chains/radix/store";

import { Popover } from "@components/atoms";

import { ICONS } from "@globalStyle";
import * as S from "./style";

const MyStake = (props: MyStakeProps) => {
  const {
    isPending,
    stake,
    options: { addStake, reduceStake },
  } = props;

  const validators = useStore($validators);
  const validator = validators.find((validator) =>
    validator.address.equals(stake.validator)
  );

  if (!validator) {
    return <S.MyStake>Validator not found for this stake</S.MyStake>;
  }

  const { amount } = stake;
  const { name, address, validatorFee, uptimePercentage } = validator;
  return (
    <S.MyStake>
      <header>
        <S.ValidatorInfo>
          <span>{name}</span>
          <div />
          {sliceAddress(address.toString())}
          <ICONS.Copy />
        </S.ValidatorInfo>
        <Popover
          icon={<ICONS.OptionsVertical style={{ cursor: "pointer" }} />}
          contentProps={{ align: "end" }}
          contentStyle={{
            minWidth: "9rem",
          }}
        >
          <S.PopoverOption
            onClick={() => {
              addStake();
            }}
          >
            Add
          </S.PopoverOption>
          <S.PopoverOption
            onClick={() => {
              reduceStake();
            }}
          >
            Reduce
          </S.PopoverOption>
        </Popover>
      </header>
      <main>
        <div>
          <div>Validator fee: {validatorFee}%</div>
          <div>Uptime: {uptimePercentage}%</div>
        </div>
        <div>
          <div>{isPending ? "Pending" : "Staked"}</div>
          <div>{convertToMainUnit(amount)} XRD</div>
        </div>
      </main>
    </S.MyStake>
  );
};

export const MyStakes = (props: MyStakesProps) => {
  const { options } = props;

  const pendingStakes = useList($pendingStakes, (stake) => (
    <MyStake isPending stake={stake} options={options} />
  ));
  const stakes = useList($stakes, (stake) => (
    <MyStake stake={stake} options={options} />
  ));

  return (
    <div style={{ overflow: "scroll-y" }}>
      {pendingStakes}
      {stakes}
    </div>
  );
};
