import React, { useEffect, useState } from "react";
import { useStore } from "effector-react";

import { log } from "@utils";

import {
  $activeAddress,
  $balances,
  $xrdUsd,
  getXrdUsd,
} from "@chains/radix/store";

import { Token, WalletButton } from "@components/molecules/types";

import { Layout } from "@components/template";
import { Title } from "@components/atoms";
import { Wallet } from "@components/molecules";
import { TokensList } from "@components/organisms";

import { ICONS } from "@globalStyle/icons";
import WalletIcon from "@assets/svg/wallet.svg";
import { NETWORKS_LIST } from "@chains/radix/crypto";
import BigNumber from "bignumber.js";

export const Dashboard = () => {
  const activeAddress = useStore($activeAddress);
  const balances = useStore($balances);
  const xrdUsd = useStore($xrdUsd);

  const [usdBalance, setUsdBalance] = useState<number>(0);

  const tokensMock: Token[] = [
    {
      key: "bitcoin",
      balance: "50 BTC",
      priceChange: 69,
      currentPrice: 46394,
    },
    {
      key: "ethereum",
      balance: "156 ETH",
      priceChange: 42,
      currentPrice: 3850,
    },
  ];

  const walletMock = {
    address: activeAddress?.toString() || "",
    usdBalance,
  };
  const walletButtons: WalletButton[] = [
    {
      name: "Stake",
      onClick: () => {},
      icon: <ICONS.Stake />,
    },
    {
      name: "Receive",
      onClick: () => {},
      icon: <ICONS.ArrowDown />,
    },
    {
      name: "Send",
      onClick: () => {},
      icon: <ICONS.ArrowUp />,
    },
  ];

  useEffect(() => {
    getXrdUsd();
  }, []);
  useEffect(() => {
    log(`XRDUSD = ${xrdUsd}`);
  }, [xrdUsd]);
  useEffect(() => {
    if (balances) {
      log(activeAddress?.toString());

      const xrdBalance = balances.account_balances.liquid_balances.find(
        (balance) =>
          balance.token_identifier.rri.toString() ===
          NETWORKS_LIST.stokenet.xrd_rri
      );
      if (xrdBalance) {
        const bnValue = new BigNumber(xrdBalance.value.toString()).dividedBy(
          10 ** 18
        );
        setUsdBalance(bnValue.toNumber() * parseFloat(xrdUsd ?? "0"));
      }
    }
  }, [balances]);

  return (
    <Layout>
      <WalletIcon />
      <Title style={{ margin: "1rem 0 .75rem 0" }}>Dashboard</Title>
      <Wallet data={walletMock} buttons={walletButtons} />
      <TokensList
        header="My tokens"
        tokens={tokensMock}
        style={{ marginTop: "1rem" }}
      />
    </Layout>
  );
};
