import React, { ReactNode } from "react";

import { BadgeProps } from "./types";

import * as BADGES from "./kinds";

import { ICONS } from "@globalStyle";
import * as S from "./style";

// currently, this component is being used exclusively by Wallet
export const Badge = (props: BadgeProps) => {
  const { type } = props;

  if (type) {
    let badgeContent: ReactNode = null;
    switch (type) {
      case BADGES.BADGE_ADDRESS_COPIED:
        badgeContent = "Address copied";
        break;
      case BADGES.BADGE_WALLET_ACTIVE:
        badgeContent = (
          <>
            <span style={{ position: "relative", top: 1 }}>Active</span>
            <ICONS.Check style={{ marginLeft: ".5rem" }} />
          </>
        );
        break;
      default:
        badgeContent = "Unknown badge";
        break;
    }

    return <S.Wrapper>{badgeContent}</S.Wrapper>;
  }

  return null;
};
