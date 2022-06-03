import React, { useEffect, useState } from "react";
import { useStore, useStoreMap } from "effector-react";
import BigNumber from "bignumber.js";

import { Validator } from "@radixdlt/application";

import { StakeProps } from "./types";

import { sliceAddress } from "@chains/radix/utils";

import { $activeAddress, $validators } from "@chains/radix/store";

import { Button, Input } from "@components/atoms";
import { SelectItem, Select } from "@components/molecules";

import { COLORS } from "@globalStyle";
import * as S from "./style";

export const StakeForm = (props: StakeProps) => {
  const { isUnstaking } = props;

  const validators = useStoreMap($validators, (validators) =>
    validators.map((validator) => {
      const addressString = validator.address.toString();
      return {
        key: addressString,
        value: validator,
      };
    })
  );

  const activeAddress = useStoreMap($activeAddress, (addr) => addr.toString());

  const [formData, setFormData] = useState({
    from: activeAddress,
    validator: "",
    amount: "0",
  });

  const handleFieldChange = (key: string, value: unknown) => {
    setFormData((formData) => ({
      ...formData,
      [key]: value,
    }));
  };

  const accounts = [
    {
      key: activeAddress,
      value: {
        address: activeAddress,
      },
    },
  ];

  useEffect(() => {
    setFormData({
      from: activeAddress,
      validator: "",
      amount: "0",
    });
  }, [isUnstaking]);

  return (
    <div>
      <Select
        label="Staking account"
        popupTitle="Staking account"
        selected={formData.from}
        onSelect={(value) => handleFieldChange("from", value)}
        options={accounts}
        renderSelected={(option: any, index: number) => {
          const { address } = option;
          return (
            <div>
              Account #{index}{" "}
              <span style={{ color: COLORS.extralight }}>
                ({sliceAddress(address)})
              </span>
            </div>
          );
        }}
        renderOption={(option, i) => {
          const { key, selected, select } = option;
          return (
            <SelectItem
              key={key}
              checkboxId={`${isUnstaking ? "unstake" : "stake"}-account-${i}`}
              label={`Account #${i}`}
              value={key}
              onSelect={(address) => (selected ? select("") : select(address))}
              selected={selected}
            />
          );
        }}
      />
      <Select
        label="Validator"
        popupTitle="Validator"
        placeholder="Select validator..."
        selected={formData.validator}
        onSelect={(value) => handleFieldChange("validator", value)}
        options={validators}
        renderSelected={(option: any) => {
          const { address, name } = option as any;
          return (
            <div>
              <span
                style={{
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {name}
              </span>{" "}
              <span style={{ color: COLORS.extralight }}>
                ({sliceAddress(address.toString())})
              </span>
            </div>
          );
        }}
        renderOption={(option, i) => {
          const { key, select, data } = option;
          const {
            name,
            totalDelegatedStake,
            ownerDelegation,
            validatorFee,
            uptimePercentage,
          } = data as Validator;

          return (
            <S.OptionValidator onClick={() => select(key)}>
              <header>
                <span>{name}</span>
                <div />
                {sliceAddress(key)}
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
            </S.OptionValidator>
          );
        }}
        style={{ margin: "1rem 0" }}
      />
      <Input
        value={formData.amount}
        label="Amount"
        onChange={(v) => {
          handleFieldChange("amount", v);
        }}
      />

      <S.Footer>
        <Button onClick={() => {}}>{isUnstaking ? "Unstake" : "Stake"}</Button>
      </S.Footer>
    </div>
  );
};
