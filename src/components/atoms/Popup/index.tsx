import React, { useRef } from "react";
import { createPortal } from "react-dom";
import { useClickAway } from "react-use";

import { PopupProps } from "./types";

import { ICONS } from "@globalStyle";
import * as S from "./style";

export const Popup = (props: PopupProps) => {
  const { title, visible, close, back, children } = props;

  const ref = useRef(null);
  useClickAway(ref, close);

  return visible
    ? createPortal(
        <div>
          <S.Blur visible={visible} />
          <S.Content ref={ref} visible={visible}>
            {title && (
              <S.Title
                onClick={() => {
                  if (back) {
                    back();
                  }
                }}
              >
                {back && <ICONS.Back style={{ marginRight: ".5rem" }} />}
                {title}
              </S.Title>
            )}
            {children}
          </S.Content>
        </div>,
        document.getElementById("popups") as HTMLElement
      )
    : null;
};
