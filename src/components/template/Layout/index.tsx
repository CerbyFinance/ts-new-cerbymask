import React, { ReactNode } from "react";
import { publicRoutesNames, useRouter } from "@router";

import * as S from "./style";
import BackIcon from "@assets/svg/back.svg";
import MiniWolf from "@assets/svg/wolf-mini.svg";

interface LayoutProps {
  children: ReactNode;
  footer?: ReactNode;
  style?: React.CSSProperties;
  className?: string;
  backButton?: boolean;
}

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
              <BackIcon />
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
