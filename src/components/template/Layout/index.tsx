import React from "react";
import { publicRoutesNames, useRouter } from "@router";

import { LayoutProps } from "./types";

import { ICONS } from "@globalStyle";
import * as S from "./style";
import MiniWolf from "@assets/svg/wolf-mini.svg";

export const Layout = ({
  children,
  footer,
  style,
  className,
  backButton,
}: LayoutProps) => {
  const { back, current } = useRouter();
  return (
    <>
      <S.Layout className={className} style={style}>
        {backButton && (
          <S.Header>
            <div onClick={() => back()}>
              <ICONS.Back />
              Back
            </div>
            {current && publicRoutesNames.hasOwnProperty(current) ? (
              <MiniWolf />
            ) : null}
          </S.Header>
        )}
        {children}
      </S.Layout>
      {footer && <S.Footer>{footer}</S.Footer>}
    </>
  );
};
