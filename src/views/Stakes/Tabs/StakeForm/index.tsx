import React, { useState } from "react";
import { useStoreMap } from "effector-react";

import { StakeProps } from "./types";

import { sliceAddress } from "@chains/radix/utils";

import { $activeAddress } from "@chains/radix/store";

import { Button, Checkbox, Input } from "@components/atoms";
import { Select } from "@components/molecules";

import { COLORS } from "@globalStyle/colors";
import * as S from "./style";

export const StakeForm = (props: StakeProps) => {
  const { isUnstaking } = props;

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
  const validators = [
    {
      key: "rv1q232900gerioeojbkfjkb40f037gm",
      value: {
        name: "Jazzer",
        address: "rv1q232900gerioeojbkfjkb40f037gm",
        amount: 87588142,
        amountPercentage: 2.94,
        ownerAmount: 511242,
        feePercentage: 1,
        uptimePercentage: 100,
      },
    },
  ];

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
            <S.OptionAccount>
              <div style={{ display: "flex", alignItems: "center" }}>
                <Checkbox
                  id={`${isUnstaking ? "unstake" : "stake"}-account-${i}`}
                  onChange={() => (selected ? select("") : select(key))}
                  checked={selected}
                  style={{ marginRight: ".75rem" }}
                />
                Account #{i}
              </div>
              <div style={{ color: COLORS.extralight }}>
                {sliceAddress(key)}
              </div>
            </S.OptionAccount>
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
              {name}{" "}
              <span style={{ color: COLORS.extralight }}>
                ({sliceAddress(address)})
              </span>
            </div>
          );
        }}
        renderOption={(option, i) => {
          const { key, select, data } = option;
          const {
            name,
            amount,
            amountPercentage,
            ownerAmount,
            feePercentage,
            uptimePercentage,
          } = data as any;

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
                    Stake: {amount.toLocaleString()} ({amountPercentage}%)
                  </div>
                  <div>Owner stake: {ownerAmount.toLocaleString()}</div>
                </div>
                <div>
                  <div>Fee: {feePercentage}%</div>
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
