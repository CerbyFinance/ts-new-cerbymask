import React, { useEffect, useState } from "react";
import { useStore } from "effector-react";

import { TokenWithIcon } from "@chains/radix/types";

import { log } from "@utils";

import { routesNames, useRouter } from "@router";
import { RouteKey } from "@router/types";

import { setAccounts, toggleMenu } from "@store";
import { $activeAddress, $txHistory, $userTokens } from "@chains/radix/store";

import { NETWORKS_LIST } from "@chains/radix/crypto";

import { WalletButton } from "@components/molecules/types";

import { Layout } from "@components/template";
import { Checkbox, Popup, Tabs } from "@components/atoms";
import { Token, Transaction, Wallet } from "@components/molecules";

import * as S from "./style";
import { ICONS } from "@globalStyle";

export const Dashboard = () => {
  const router = useRouter();

  const activeAddress = useStore($activeAddress);
  const userTokens = useStore($userTokens);
  const txHistory = useStore($txHistory);

  const [currentTab, setCurrentTab] = useState<number>(0);
  const [isPopupVisible, setPopupVisible] = useState<boolean>(false);
  const [selectedNetwork, setSelectedNetwork] =
    useState<string>("radix-stokenet");
  const [usdBalance, setUsdBalance] = useState<number>(0);
  const [tokensList, setTokensList] = useState<TokenWithIcon[]>([]);

  const walletData = {
    address: activeAddress.toString(),
    usdBalance,
  };
  const walletButtons: WalletButton[] = [
    {
      name: "Send",
      onClick: () => {
        router.push(routesNames.SEND_COINS as RouteKey);
      },
      icon: <ICONS.ArrowRightUp />,
    },
    {
      name: "Stake",
      onClick: () => {
        router.push(routesNames.STAKES as RouteKey);
      },
      icon: <ICONS.Stake />,
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

      setTokensList(userTokens);
    }
  }, [userTokens]);

  const networksMock = [
    {
      key: "radix-mainnet",
      name: "Radix DLT",
      subnet: "Mainnet",
    },
    {
      key: "radix-stokenet",
      name: "Radix DLT",
      subnet: "Stokenet",
    },
  ];

  const tabs = [
    {
      label: "My tokens",
      content:
        tokensList.length > 0 ? (
          <S.ItemsDivider>
            {tokensList.map((token) => (
              <Token key={token.rri} data={token} />
            ))}
          </S.ItemsDivider>
        ) : (
          <div style={{ textAlign: "center", fontSize: ".825rem" }}>
            You have no tokens
          </div>
        ),
    },
    {
      label: "History",
      content:
        txHistory.length > 0 ? (
          <S.ItemsDivider>
            {txHistory.map((tx) => (
              <Transaction key={tx.txID.toString()} data={tx} />
            ))}
          </S.ItemsDivider>
        ) : (
          <div style={{ textAlign: "center", fontSize: ".825rem" }}>
            No data
          </div>
        ),
    },
  ];

  const currentNetwork = networksMock.find(
    (network) => network.key === selectedNetwork
  );
  return (
    <Layout style={{ padding: 0 }}>
      <div style={{ padding: "1.5rem 1.5rem 0 1.5rem" }}>
        <S.Header>
          {currentNetwork && (
            <S.NetworkSelect
              onClick={() => {
                setPopupVisible(true);
              }}
            >
              <div />
              {currentNetwork.name}
              <div />
              {currentNetwork.subnet}
              <ICONS.ChevronDown style={{ marginLeft: ".5rem" }} />
            </S.NetworkSelect>
          )}
          <ICONS.Menu
            onClick={() => {
              toggleMenu(true);
            }}
          />
        </S.Header>
        <Wallet data={walletData} buttons={walletButtons} />
      </div>
      <S.Footer>
        <Tabs
          tabs={tabs}
          currentTab={currentTab}
          setCurrentTab={setCurrentTab}
        />
      </S.Footer>
      <Popup
        title="Choose network"
        visible={isPopupVisible}
        close={() => setPopupVisible(false)}
      >
        {networksMock.map((network) => {
          const { key, name, subnet } = network;
          return (
            <S.OptionNetwork key={key}>
              <Checkbox
                id={`${key}-network`}
                onChange={() => setSelectedNetwork(key)}
                checked={selectedNetwork === key}
                style={{ marginRight: ".75rem" }}
              />
              {name} {subnet}
            </S.OptionNetwork>
          );
        })}
      </Popup>
    </Layout>
  );
};
