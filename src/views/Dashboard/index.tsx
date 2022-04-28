import React, { useEffect, useState } from "react";
import { useStore } from "effector-react";

import { log } from "@utils";

import { routesNames, useRouter } from "@router";
import { RouteKey } from "@router/types";

import { TokenWithIcon } from "@chains/radix/types";

import { $activeAddress, $userTokens } from "@chains/radix/store";

import { NETWORKS_LIST, TOKEN_ICONS } from "@chains/radix/crypto";

import { WalletButton } from "@components/molecules/types";

import { Layout } from "@components/template";
import { Title } from "@components/atoms";
import { Wallet } from "@components/molecules";
import { TokensList } from "@components/organisms";

import { ICONS } from "@globalStyle/icons";
import WalletIcon from "@assets/svg/wallet.svg";

export const Dashboard = () => {
  const router = useRouter();

  const activeAddress = useStore($activeAddress);
  const userTokens = useStore($userTokens);

  const [usdBalance, setUsdBalance] = useState<number>(0);
  const [tokensList, setTokensList] = useState<TokenWithIcon[]>([]);

  const walletMock = {
    address: activeAddress.toString(),
    usdBalance,
  };
  const walletButtons: WalletButton[] = [
    {
      name: "Stake",
      onClick: () => {
        router.push(routesNames.STAKES as RouteKey);
      },
      icon: <ICONS.Stake />,
    },
    {
      name: "Receive",
      onClick: () => {
        router.push(routesNames.RECEIVE_COINS as RouteKey);
      },
      icon: <ICONS.ArrowDown />,
    },
    {
      name: "Send",
      onClick: () => {
        router.push(routesNames.SEND_COINS as RouteKey);
      },
      icon: <ICONS.ArrowUp />,
    },
  ];

  useEffect(() => {
    if (userTokens) {
      log(`Address - ${activeAddress.toString()}`);

      const xrdToken = userTokens.find(
        (token) => token.rri === NETWORKS_LIST.stokenet.xrd_rri
      );
      if (xrdToken) {
        setUsdBalance(xrdToken.usdBalance);
      }

      setTokensList(
        userTokens.map((token) => {
          const { rri } = token;

          const icon = TOKEN_ICONS[rri];
          return {
            ...token,
            icon,
          };
        })
      );
    }
  }, [userTokens]);

  return (
    <Layout>
      <WalletIcon />
      <Title style={{ margin: "1rem 0 .75rem 0" }}>Dashboard</Title>
      <Wallet data={walletMock} buttons={walletButtons} />
      <TokensList
        header="My tokens"
        tokens={tokensList}
        style={{ marginTop: "1rem" }}
      />
    </Layout>
  );
};
