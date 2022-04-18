import React, { useEffect, useState } from "react";

import { Token, WalletButton } from "@components/molecules/types";

import { Layout } from "@components/template";
import { Title } from "@components/atoms";
import { Wallet } from "@components/molecules";
import { TokensList } from "@components/organisms";

import { ICONS } from "@globalStyle/icons";
import WalletIcon from "@assets/svg/wallet.svg";
import { log } from "@utils";

export const Dashboard = () => {
  const [tempBalance, setTempBalance] = useState<number | null>(null);

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
    usdBalance: tempBalance || 0,
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
    (async () => {
      const xrdUsd = (await chrome.storage.local.get("xrdUsd")).xrdUsd;
      const {
        account_balances: { liquid_balances },
      } = JSON.parse((await chrome.storage.local.get("balances")).balances);
      log("\nDashboard");
      setTempBalance((liquid_balances[0].value / 10 ** 18) * xrdUsd);
    })();
  });

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
