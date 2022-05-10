import React, { useState } from "react";

import { TabsProps } from "./types";

import * as S from "./style";

export const Tabs = (props: TabsProps) => {
  const { tabs, style } = props;

  const [currentTab, setCurrentTab] = useState<number>(0);
  return tabs && tabs.length > 0 ? (
    <S.Wrapper style={style}>
      <S.Header>
        {tabs.map((tab, i) => {
          const { label } = tab;
          return (
            <S.Tab
              isActive={i === currentTab}
              key={label}
              onClick={() => setCurrentTab(i)}
            >
              {label}
            </S.Tab>
          );
        })}
      </S.Header>
      <S.Content>{tabs[currentTab].content}</S.Content>
    </S.Wrapper>
  ) : null;
};
