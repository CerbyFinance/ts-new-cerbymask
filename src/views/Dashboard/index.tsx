import React, { useEffect, useState } from "react";
import { useStore, useStoreMap } from "effector-react";
import { interval } from "rxjs";

import { ConfigNetwork, TokenWithIcon } from "@chains/radix/types";

import { log } from "@utils";

import { routesNames, useRouter } from "@router";
import { RouteKey } from "@router/types";

import { authenticate, toggleMenu } from "@store";
import {
  $activeAddress,
  $selectedNetwork,
  $txHistory,
  $userTokens,
  setUserTokens,
} from "@chains/radix/store";

import { saveNodeUrl, selectNode, setStorage } from "@chains/radix/utils";
import { NETWORKS_LIST, retrieveWallet } from "@chains/radix/crypto";

import { WalletButton } from "@components/molecules/types";

import { Layout } from "@components/template";
import { Checkbox, Loader, Popup, Tabs } from "@components/atoms";
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
  const [isLoading, setLoading] = useState<boolean>(false);
  const [usdBalance, setUsdBalance] = useState<number>(0);

  const handleChangeNetwork = async (data: ConfigNetwork) => {
    setLoading(true);
    try {
      const signingKeychain = await retrieveWallet();
      const node = await saveNodeUrl(data.url, signingKeychain._unsafeUnwrap());
      await selectNode(node);
      await setStorage({ selectedAddress: "" });
      authenticate(false);
      router.redirect(routesNames.SIGN_IN as RouteKey);
    } finally {
      setLoading(false);
    }
  };

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
    // Fetching user balances every 10 seconds
    const userTokensSub = interval(10000).subscribe(() => {
      setUserTokens();
    });

    return () => {
      userTokensSub.unsubscribe();
    };
  }, []);
  useEffect(() => {
    if (userTokens) {
      log(`Address - ${activeAddress}`);

      const xrdToken = userTokens.find(
        (token) => token.rri === NETWORKS_LIST.stokenet.xrd_rri
      );
      if (xrdToken) {
        setUsdBalance(xrdToken.usdBalance);
      }
    }
  }, [userTokens]);

  const networks = Object.entries(NETWORKS_LIST);

  const tabs = [
    {
      label: "My tokens",
      content:
        userTokens.length > 0 ? (
          <S.ItemsDivider>
            {userTokens.map((token) => (
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
        title={isLoading ? "" : "Choose network"}
        visible={isPopupVisible}
        close={() => setPopupVisible(false)}
      >
        {isLoading ? (
          <Loader />
        ) : (
          networks.map((network) => {
            const [name, data] = network;
            return (
              <S.OptionNetwork key={name}>
                <Checkbox
                  id={`${name}-network`}
                  onChange={() => {
                    handleChangeNetwork(data);
                  }}
                  checked={selectedNetwork === name}
                  style={{ marginRight: ".75rem" }}
                />
                Radix DLT{" "}
                {`${name[0].toUpperCase()}${name.slice(1, name.length)}`}
              </S.OptionNetwork>
            );
          })
        )}
      </Popup>
    </Layout>
  );
};
