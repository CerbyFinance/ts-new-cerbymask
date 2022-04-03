import { AmountT } from "@radixdlt/application";

import BigNumber from "bignumber.js";

import { Network } from "@crypto/types";
import { NETWORKS_LIST } from "@crypto/config";

BigNumber.set({
  ROUNDING_MODE: BigNumber.ROUND_HALF_UP,
  EXPONENTIAL_AT: [-30, 30],
});

export const validateAddress = (address: string, network: Network) => {
  const name = network.name,
    mainnet = NETWORKS_LIST.mainnet.name,
    stokenet = NETWORKS_LIST.stokenet.name;
  if (
    (name === mainnet && address.startsWith("rdx")) ||
    (name === stokenet && address.startsWith("tdx"))
  ) {
    return true;
  }

  return false;
};

export const formatAddress = (address: string) => {
  return `${address.substring(0, 3)}..${address.substring(
    address.length - 20
  )}`;
};

export const formatBalance = (amount: AmountT, showFull = false) => {
  if (amount) {
    const bigNumber = new BigNumber(amount.toString());
    const shiftedAmount = bigNumber.shiftedBy(-18);
    return formatBigNumber(shiftedAmount, showFull);
  }

  return "";
};

export const numberFormatUSA = {
  prefix: "",
  decimalSeparator: ".",
  groupSeparator: ",",
  groupSize: 3,
  secondaryGroupSize: 0,
  fractionGroupSeparator: " ",
  fractionGroupSize: 0,
  suffix: "",
};

// internal format used so BigNumber can read in its own output
const internalFormat = {
  prefix: "",
  decimalSeparator: ".",
  groupSeparator: "",
  groupSize: 0,
  secondaryGroupSize: 0,
  fractionGroupSeparator: "",
  fractionGroupSize: 0,
  suffix: "",
};

export const formatBigNumber = (
  x: BigNumber,
  showFull = false,
  format: BigNumber.Format = numberFormatUSA
) => {
  const maxPlaces = 8;
  const integerPart = x.integerValue(BigNumber.ROUND_FLOOR);
  const decimalPart = x.minus(integerPart);
  const dpLength = decimalPart.toFixed().length - 2;
  const ipLength = integerPart.toFixed().length;
  const totalPlaces = dpLength + ipLength;

  let internallyFormatted = "0";
  let decimalPlaces;

  if (x.isZero()) {
    return "0";
  }

  if (integerPart.isZero() && dpLength > maxPlaces) {
    decimalPlaces = maxPlaces;
  } else if (ipLength >= maxPlaces) {
    decimalPlaces = 1;
  } else if (totalPlaces > maxPlaces) {
    decimalPlaces = maxPlaces - ipLength;
  }

  if (decimalPlaces === undefined) {
    internallyFormatted = x.toFormat(internalFormat);
  } else {
    internallyFormatted = x.toFormat(decimalPlaces, internalFormat);
  }

  const z = new BigNumber(internallyFormatted);
  return z.toFormat(format);
};

export const handleKeyDown = (
  e: any,
  amount: any,
  token: any,
  props: any,
  min = -1
) => {
  const field = e.target.name;
  const futureAmount = `${amount}${e.key}`;

  if (field === "amount") {
    try {
      const valid = validateAmount(futureAmount, token, props, () => {}, min);
      if (!valid) {
        e.preventDefault();
        return;
      }
    } catch (error) {
      e.preventDefault();
      throw new Error("error when handling key down");
    }
  }
};

const validateAmount = (
  amount: string,
  token: any,
  props: any,
  setErrors: any,
  min = -1
) => {
  const currBalance = new BigNumber(
    token == 0
      ? props.wallet.selectedAddress < props.wallet.radixBalances.length &&
        props.wallet.radixBalances[props.wallet.selectedAddress].xrd.toString()
      : props.wallet.selectedAddress < props.wallet.radixTokens.length &&
        props.wallet.radixTokens[props.wallet.selectedAddress].tokens[token - 1]
          .value
  );

  let parsedAmount = -1;
  try {
    parsedAmount = parseFloat(amount);
  } catch (e) {
    return false;
  }
  if (amount === "") {
    // VAZIO
    setErrors((errors: any) => ({
      ...errors,
      amount: "Please insert an amount.",
    }));
    return false;
  } else if (currBalance.shiftedBy(-18).isLessThan(parsedAmount)) {
    setErrors((errors: any) => ({
      ...errors,
      amount: "Amount is higher than balance.",
    }));
    return false;
  } else if (min > 0 && new BigNumber(parsedAmount).isLessThan(min)) {
    setErrors((errors: any) => ({
      ...errors,
      amount: "Amount is lower than allowed.",
    }));
    return false;
  } else if (parsedAmount <= 0) {
    setErrors((errors: any) => ({ ...errors, amount: "Amount is invalid." }));
    return false;
  }
  return true;
};
