import React from "react";

import { Token, WalletButton } from "@components/molecules/types";

import { Layout } from "@components/template";
import { Title } from "@components/atoms";
import { Wallet } from "@components/molecules";
import { TokensList } from "@components/organisms";

import { ICONS } from "@globalStyle/icons";
import WalletIcon from "@assets/svg/wallet.svg";

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

  const walletMock = {
    address: "0x2C0D2C991EC23D21d982A8F62f7AbB69ce1fa9a1",
    usdBalance: 2852.49,
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
