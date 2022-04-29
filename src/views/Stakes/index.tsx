import React, { useEffect } from "react";
import { useStore } from "effector-react";
import toast from "react-hot-toast";

import { AccountAddressT, ValidatorAddress } from "@radixdlt/account";

import { routesNames, useRouter } from "@router";
import { RouteKey } from "@router/types";

import { Stake as StakeType } from "@types";

import { log } from "@utils";

import { formatXrdStakes } from "@chains/radix/utils";
import { unstakeCoins } from "@chains/radix/api";
import {
  $activeAddress,
  $network,
  $stakes,
  $userTokens,
  getStakes,
  getValidators,
  setUserTokens,
} from "@chains/radix/store";

import { Layout } from "@components/template";
import { Title } from "@components/atoms";

import * as S from "./style";
import PlusIcon from "@assets/svg/plus.svg";
import { Amount } from "@radixdlt/application";
import BigNumber from "bignumber.js";

export const Stakes = () => {
  const router = useRouter();

  const network = useStore($network);
  const userTokens = useStore($userTokens);
  const activeAddress = useStore($activeAddress);
  const { stakes, pendingStakes } = useStore($stakes);

  const handleUnstake = async (data: StakeType) => {
    const { validator, rri } = data;

    await toast.promise(
      unstakeCoins({
        validator,
        rri,
        onSubmit: () => router.redirect(routesNames.DASHBOARD as RouteKey),
      }),
      {
        loading: "Transaction is in progress...",
        success: "Transaction was submitted!",
        error: "Transaction error!",
      }
    );

    getStakes({ activeAddress: activeAddress as AccountAddressT });
    setUserTokens({ activeAddress: activeAddress as AccountAddressT });
  };

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

  const xrdToken = userTokens?.find((token) => token.ticker === "XRD");
  const userStakes = formatXrdStakes(
    stakes.concat(pendingStakes),
    activeAddress.toString(),
    xrdToken?.price || 0,
    network
  );
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
        {userStakes.length === 0
          ? "You have no stakes"
          : userStakes.map((stake: StakeType, i: number) => {
              return <S.Stake data={stake} key={i} onUnstake={handleUnstake} />;
            })}
      </div>
    </Layout>
  );
};
