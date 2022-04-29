import { useRouter } from "@router";
import React, { ReactNode } from "react";

import * as S from "./style";
import BackIcon from "@assets/svg/back.svg";

interface LayoutProps {
  children: ReactNode;
  footer?: ReactNode;
  footerBackground?: boolean;
  style?: React.CSSProperties;
  className?: string;
  backButton?: boolean;
}

export const Layout = ({
  children,
  footer,
  footerBackground = true,
  style,
  className,
  backButton,
}: LayoutProps) => {
  const { back } = useRouter();
  return (
    <>
      <S.Layout className={className} style={style}>
        {backButton && (
          <S.Header>
            <BackIcon onClick={() => back()} />
          </S.Header>
        )}
        {children}
      </S.Layout>
      {footer && (
        <S.Footer footerBackground={footerBackground}>{footer}</S.Footer>
      )}
    </>
  );
};
