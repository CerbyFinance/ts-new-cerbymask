import React, { useEffect } from "react";
import { useStore } from "effector-react";

import { routesNames, useRouter } from "@router";
import { RouteKey } from "@router/types";

import { Stake as StakeType } from "@types";

import { log } from "@utils";

import { $activeAddress } from "@chains/radix/store";
import { $stakes, getStakes, getValidators } from "@chains/radix/store/stakes";

import { Layout } from "@components/template";
import { Title } from "@components/atoms";

import * as S from "./style";
import PlusIcon from "@assets/svg/plus.svg";

export const Stakes = () => {
  const router = useRouter();

  const activeAddress = useStore($activeAddress);
  const stakes = useStore($stakes);

  const handleAdd = (data: StakeType) => {};
  const handleReduce = (data: StakeType) => {};

  useEffect(() => {
    if (activeAddress) {
      (async () => {
        await getValidators();
        await getStakes({ activeAddress });
      })();
    }
  }, []);
  useEffect(() => {
    log("stakes");
    log(stakes);
  }, [stakes]);

  return (
    <Layout>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Title style={{ marginBottom: ".75rem" }}>Stakes</Title>
        <PlusIcon
          style={{ cursor: "pointer" }}
          onClick={() => {
            router.push(routesNames.ADD_STAKE as RouteKey);
          }}
        />
      </div>
      <div>
        {stakes.length === 0
          ? "You have no stakes"
          : [].map((wallet: StakeType, i: number) => {
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
