import React from "react";

import { Layout } from "@components/template";
import { Title } from "@components/atoms";
import { Wallet } from "@components/molecules";
import { TokensList } from "@components/organisms";

import WalletIcon from "@assets/svg/wallet.svg";
import { Token } from "@components/molecules/types";

export const Dashboard = () => {
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

  return (
    <Layout>
      <WalletIcon />
      <Title style={{ margin: "1rem 0 .75rem 0" }}>Dashboard</Title>
      <Wallet />
      <TokensList
        header="My tokens"
        tokens={tokensMock}
        style={{ marginTop: "1rem" }}
      />
    </Layout>
  );
};
