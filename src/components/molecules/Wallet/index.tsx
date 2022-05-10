import React, { useEffect, useState } from "react";

import { sliceAddress } from "@chains/radix/utils";

import { WalletAction, WalletButton, WalletProps } from "./types";

import { Badge, Text } from "@components/atoms";
import * as BADGES from "@components/atoms/Badge/kinds";

import * as S from "./style";
import CopyIcon from "@assets/svg/copy.svg";

const BADGE_COPY_TIMEOUT_DURATION = 2500;

export const Wallet = (props: WalletProps) => {
  const { style, className, data, actions, buttons } = props;
  const { address, usdBalance, isActive } = data;

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

  return (
    <S.Wrapper className={className} style={style}>
      {/*<Badge type={badgeState} />*/}
      <S.Header>
        <S.HeaderAccount>
          Account #1
          <div />
          <span>{sliceAddress(address)}</span>
          <CopyIcon onClick={() => handleCopyAddress()} />
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
      <S.Balance>{usdBalance.toLocaleString()} USD</S.Balance>
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
    </S.Wrapper>
  );
};
