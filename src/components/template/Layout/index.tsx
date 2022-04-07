import React, { ReactNode } from "react";

import * as S from "./style";

interface LayoutProps {
  children: ReactNode;
  footer?: ReactNode;
}

export const Layout = ({ children, footer }: LayoutProps) => {
  return (
    <>
      <S.Layout>{children}</S.Layout>
      {footer && <S.Footer>{footer}</S.Footer>}
    </>
  );
};
