import React from "react";

import { Stake as StakeType } from "@types";

import { Layout } from "@components/template";
import { Title } from "@components/atoms";

import * as S from "./style";

import DgcCoin from "@assets/img/dgc.png";
import FloopCoin from "@assets/img/floop.png";
import VrfCoin from "@assets/img/vrf.png";

export const Stakes = () => {
  const stakes: StakeType[] = [
    {
      address: "0x2C0D2C991EC23D21d982A8F62f7AbB69ce1fa9a1",
      usdEquivalent: 2852.49,
      coinImg: DgcCoin,
      name: "Doge3",
      ticker: "DGC",
      amount: 10000,
    },
    {
      address: "0x2C0D2C991EC23D21d982A8F72f7AbB69ce1fa9b2",
      usdEquivalent: 20072.11,
      coinImg: FloopCoin,
      name: "Floop",
      ticker: "FLOOP",
      amount: 0.1,
    },
    {
      address: "0x2C0D2C991EC23D21d982A8F82f7AbB69ce1fa9c3",
      usdEquivalent: 666.99,
      coinImg: VrfCoin,
      name: "Verify",
      ticker: "VRF",
      amount: 1,
    },
  ];

  const handleAdd = (data: StakeType) => {};
  const handleReduce = (data: StakeType) => {};

  return (
    <Layout>
      <Title style={{ marginBottom: ".75rem" }}>Stakes</Title>

      <div>
        {stakes.map((wallet: StakeType, i: number) => {
          return (
            <S.Stake
              data={wallet}
              key={wallet.address}
              add={handleAdd}
              reduce={handleReduce}
            />
          );
        })}
      </div>
    </Layout>
  );
};
