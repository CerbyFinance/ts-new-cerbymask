import React, { useEffect, useState } from "react";
import { useStore, useStoreMap } from "effector-react";

import { log } from "@utils";

import { $currentCurrency, $usdTo } from "@store";
import { $accounts } from "@chains/radix/store";

import { sliceAddress } from "@chains/radix/utils";

import { WalletAction, WalletButton, WalletProps } from "./types";

import { Loader } from "@components/atoms";
import * as BADGES from "@components/atoms/Badge/kinds";

import { ICONS } from "@globalStyle";
import * as S from "./style";

const BADGE_COPY_TIMEOUT_DURATION = 2500;

export const Wallet = (props: WalletProps) => {
  const { style, className, data, actions, buttons } = props;
  const { address, usdBalance, isActive } = data;

  const accounts = useStoreMap($accounts, (accounts) =>
    accounts ? accounts.all : []
  );
  const currentCurrency = useStore($currentCurrency);
  const usdTo = useStore($usdTo);

  const [badgeTimeout, setBadgeTimeout] = useState<NodeJS.Timeout>();
  const [badgeState, setBadgeState] = useState<string>("");

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(address);

    const oldBadgeState = badgeState;
    setBadgeState(BADGES.BADGE_ADDRESS_COPIED);

    if (badgeTimeout) {
      clearTimeout(badgeTimeout);
    }
    setBadgeTimeout(
      setTimeout(() => {
        setBadgeState(oldBadgeState);
      }, BADGE_COPY_TIMEOUT_DURATION)
    );
  };

  useEffect(() => {
    if (isActive) {
      setBadgeState(BADGES.BADGE_WALLET_ACTIVE);
    }
  }, [isActive]);

  const accountIndex = accounts.findIndex(
    (account) => account.address.toString() === address
  );
  return (
    <S.Wrapper className={className} style={style}>
      {/*<Badge type={badgeState} />*/}
      {accountIndex === -1 ? (
        <Loader />
      ) : (
        <>
          <S.Header>
            <S.HeaderAccount>
              Account #{accountIndex + 1}
              <div />
              <span>{sliceAddress(address)}</span>
              <ICONS.Copy onClick={() => handleCopyAddress()} />
            </S.HeaderAccount>

            {actions && actions.length > 0 && !badgeState && (
              <S.HeaderActions>
                {actions.map((action: WalletAction) => {
                  const { icon, onClick } = action;
                  return <div onClick={() => onClick(data)}>{icon}</div>;
                })}
              </S.HeaderActions>
            )}
          </S.Header>
          <S.Balance>
            {(usdBalance * usdTo[currentCurrency]).toLocaleString()}{" "}
            {currentCurrency.toUpperCase()}
          </S.Balance>
          {buttons && buttons.length > 0 && (
            <S.Footer>
              {buttons.map(({ name, icon, onClick }: WalletButton) => (
                <S.FooterAction key={name} onClick={() => onClick(data)}>
                  {icon}
                  {name}
                </S.FooterAction>
              ))}
            </S.Footer>
          )}
        </>
      )}
    </S.Wrapper>
  );
};
