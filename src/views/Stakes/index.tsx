import React, { useEffect } from "react";
import { useStore } from "effector-react";
import toast from "react-hot-toast";

import { AccountAddressT } from "@radixdlt/account";

import { routesNames, useRouter } from "@router";
import { RouteKey } from "@router/types";

import { Stake as StakeType } from "@types";

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
import { Tabs } from "@components/atoms";

import { StakeForm, MyStakes, Validators } from "./tabs";

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

  const xrdToken = userTokens?.find((token) => token.ticker === "XRD");
  const userStakes = formatXrdStakes(
    stakes.concat(
      pendingStakes.map((stake) => ({ ...stake, isPending: true }))
    ),
    activeAddress.toString(),
    xrdToken?.price || 0,
    network
  );

  const tabs = [
    {
      label: "Stake",
      content: <StakeForm />,
    },
    {
      label: "Unstake",
      content: <StakeForm isUnstaking />,
    },
    {
      label: "My stakes",
      content: <MyStakes userStakes={[]} />,
    },
    {
      label: "Validators",
      content: <Validators validators={[]} />,
    },
  ];
  return (
    <Layout backButton>
      <Tabs tabs={tabs} />
    </Layout>
  );
};
