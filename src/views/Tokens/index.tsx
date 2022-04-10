import React from "react";

import { Token } from "@components/molecules/types";

import { Layout } from "@components/template";
import { Title } from "@components/atoms";
import { TokensList } from "@components/organisms";

export const Tokens = () => {
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
      <Title>Tokens</Title>
      <TokensList
        header="Owned"
        tokens={tokensMock}
        style={{ margin: ".625rem 0 1rem" }}
      />
      <TokensList
        header="Available"
        tokens={tokensMock}
        style={{ margin: ".625rem 0 1rem" }}
      />
    </Layout>
  );
};
