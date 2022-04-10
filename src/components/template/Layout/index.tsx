import React, { ReactNode } from "react";

import * as S from "./style";

interface LayoutProps {
  children: ReactNode;
  footer?: ReactNode;
  footerBackground?: boolean;
  style?: React.CSSProperties;
  className?: string;
}

export const Layout = ({
  children,
  footer,
  footerBackground = true,
  style,
  className,
}: LayoutProps) => {
  return (
    <>
      <S.Layout className={className} style={style}>
        {children}
      </S.Layout>
      {footer && (
        <S.Footer footerBackground={footerBackground}>{footer}</S.Footer>
      )}
    </>
  );
};
