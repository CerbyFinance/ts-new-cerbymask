import React from "react";
import { useStore } from "effector-react";

import { Currency } from "@types";

import { $currentCurrency, setCurrentCurrency } from "@store";

import { Popup } from "@components/atoms";
import { SelectItem } from "@components/molecules";

export const ChangeCurrencyPopup = ({
  close,
  visible,
}: {
  close: () => void;
  visible: boolean;
}) => {
  const currentCurrency = useStore($currentCurrency);
  const currencies: Currency[] = ["usd", "eur", "cnh"];

  return (
    <Popup visible={visible} title="Change currency" close={close}>
      {currencies.map((currency, i) => {
        return (
          <SelectItem
            key={currency}
            checkboxId={`change-currency-${currency}`}
            label={currency.toUpperCase()}
            value={currency}
            onSelect={(currency: Currency) => {
              setCurrentCurrency(currency);
            }}
            selected={currentCurrency === currency}
          />
        );
      })}
    </Popup>
  );
};
