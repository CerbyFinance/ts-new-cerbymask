import React, { useEffect, useState } from "react";
import { useStore, useStoreMap } from "effector-react";
import { Network } from "@radixdlt/application";

import { TokenWithIcon } from "@chains/radix/types";

import { log } from "@utils";

import { routesNames, useRouter } from "@router";
import { RouteKey } from "@router/types";

import { authenticate, toggleMenu } from "@store";
import {
  $activeAddress,
  $selectedNetwork,
  $txHistory,
  $userTokens,
  setNetwork,
} from "@chains/radix/store";

import { NETWORKS_LIST } from "@chains/radix/crypto";

import { WalletButton } from "@components/molecules/types";

import { Layout } from "@components/template";
import { Checkbox, Popup, Tabs } from "@components/atoms";
import { Token, Transaction, Wallet } from "@components/molecules";

import * as S from "./style";
import { ICONS } from "@globalStyle";

export const Dashboard = () => {
  const router = useRouter();

  const activeAddress = useStoreMap($activeAddress, (addr) => addr.toString());
  const userTokens = useStore($userTokens);
  const txHistory = useStore($txHistory);
  const selectedNetwork = useStore($selectedNetwork);

  const [currentTab, setCurrentTab] = useState<number>(0);
  const [isPopupVisible, setPopupVisible] = useState<boolean>(false);
  const [usdBalance, setUsdBalance] = useState<number>(0);
  const [tokensList, setTokensList] = useState<TokenWithIcon[]>([]);

  const walletData = {
    address: activeAddress,
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
      log(`Address - ${activeAddress}`);

      const xrdToken = userTokens.find(
        (token) => token.rri === NETWORKS_LIST.stokenet.xrd_rri
      );
      if (xrdToken) {
        setUsdBalance(xrdToken.usdBalance);
      }

      setTokensList(userTokens);
    }
  }, [userTokens]);

  const networks = Object.entries(NETWORKS_LIST);

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

  return (
    <Layout style={{ padding: 0 }}>
      <div style={{ padding: "1.5rem 1.5rem 0 1.5rem" }}>
        <S.Header>
          {selectedNetwork && (
            <S.NetworkSelect
              onClick={() => {
                setPopupVisible(true);
              }}
            >
              <div />
              Radix DLT
              <div />
              {`${selectedNetwork[0].toUpperCase()}${selectedNetwork.slice(
                1,
                selectedNetwork.length
              )}`}
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
        {networks.map((network) => {
          const [name, data] = network;
          return (
            <S.OptionNetwork key={name}>
              <Checkbox
                id={`${name}-network`}
                onChange={() => {
                  setNetwork(name as Network);
                  authenticate(false);
                  router.redirect(routesNames.SIGN_IN as RouteKey);
                }}
                checked={selectedNetwork === name}
                style={{ marginRight: ".75rem" }}
              />
              Radix DLT{" "}
              {`${name[0].toUpperCase()}${name.slice(1, name.length)}`}
            </S.OptionNetwork>
          );
        })}
      </Popup>
    </Layout>
  );
};
