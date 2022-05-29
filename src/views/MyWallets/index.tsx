import React from "react";

import { Wallet as WalletType } from "@types";

import { Layout } from "@components/template";
import { Title } from "@components/atoms";

import { PALETTES } from "@globalStyle";
import * as S from "./style";

export const MyWallets = () => {
  const wallets: WalletType[] = [
    {
      address: "0x2C0D2C991EC23D21d982A8F62f7AbB69ce1fa9a1",
      usdBalance: 2852.49,
    },
    {
      address: "0x2C0D2C991EC23D21d982A8F72f7AbB69ce1fa9b2",
      usdBalance: 20072.11,
    },
    {
      address: "0x2C0D2C991EC23D21d982A8F82f7AbB69ce1fa9c3",
      usdBalance: 666.99,
      isActive: true,
    },
  ];
  return (
    <Layout>
      <Title style={{ marginBottom: ".75rem" }}>My wallets</Title>

      <div>
        {wallets.map((wallet: WalletType, i: number) => {
          return (
            <S.Wallet
              data={wallet}
              key={wallet.address}
              style={{
                backgroundColor: PALETTES.wallets[i % PALETTES.wallets.length],
              }}
            />
          );
        })}
      </div>
    </Layout>
  );
};
