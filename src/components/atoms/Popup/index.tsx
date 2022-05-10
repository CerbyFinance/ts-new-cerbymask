import React, { useRef } from "react";
import { createPortal } from "react-dom";
import { useClickAway } from "react-use";

import { log } from "@utils";

import { PopupProps } from "./types";

import * as S from "./style";

export const Popup = (props: PopupProps) => {
  const { title, visible, close, children } = props;

  const ref = useRef(null);
  useClickAway(ref, close);

  return createPortal(
    <div>
      <S.Blur visible={visible} />
      <S.Wrapper ref={ref} visible={visible}>
        {title && <S.Title>{title}</S.Title>}
        {children}
      </S.Wrapper>
    </div>,
    document.body
  );
};
