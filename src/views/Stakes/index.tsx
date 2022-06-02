import React, { useState } from "react";
import toast from "react-hot-toast";

import { routesNames, useRouter } from "@router";
import { RouteKey } from "@router/types";

import { unstakeCoins } from "@chains/radix/api";
import { getStakes, setUserTokens } from "@chains/radix/store";

import { Layout } from "@components/template";
import { Tabs } from "@components/atoms";

import { StakeForm, MyStakes, Validators } from "./tabs";

export const Stakes = () => {
  const router = useRouter();

  const [currentTab, setCurrentTab] = useState<number>(0);

  const handleUnstake = async (data: any) => {
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

    getStakes();
    setUserTokens();
  };

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
      content: (
        <MyStakes
          options={{
            addStake: () => {
              setCurrentTab(1);
            },
            reduceStake: () => {
              setCurrentTab(2);
            },
          }}
        />
      ),
    },
    {
      label: "Validators",
      content: <Validators />,
    },
  ];

  return (
    <Layout backButton>
      <Tabs currentTab={currentTab} setCurrentTab={setCurrentTab} tabs={tabs} />
    </Layout>
  );
};
