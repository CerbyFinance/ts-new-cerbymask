import React, { useState } from "react";

import { SelectProps } from "./types";

import { Popup } from "@components/atoms";

import * as S from "./style";
import { COLORS, ICONS } from "@globalStyle";

export const Select = (props: SelectProps) => {
  const {
    label,
    selected,
    options,
    renderOption,
    renderSelected,
    onSelect,
    placeholder,
    popupTitle,
    style,
  } = props;

  const [isPopupVisible, setPopupVisible] = useState<boolean>(false);

  const handleSelect = (key: string) => {
    setPopupVisible(false);
    onSelect(key);
  };

  const currentOptionIndex = options.findIndex(
    (option) => option.key === selected
  );
  const currentOption = options[currentOptionIndex];

  return (
    <>
      <S.Wrapper style={style}>
        {label && <S.Label>{label}</S.Label>}
        <S.Container
          onClick={() => {
            setPopupVisible(true);
          }}
        >
          {currentOption
            ? renderSelected(currentOption.value, currentOptionIndex)
            : <span style={{ color: COLORS.extralight }}>{placeholder}</span> ||
              ""}
          <ICONS.ChevronDown
            style={{ transform: `rotate(${isPopupVisible ? 180 : 0}deg)` }}
          />
        </S.Container>
      </S.Wrapper>
      <Popup
        title={popupTitle}
        visible={isPopupVisible}
        close={() => setPopupVisible(false)}
      >
        <S.Options>
          {options.map((option, index) => {
            const { key, value } = option;

            const isSelected = key === selected;
            return (
              <div key={key}>
                {renderOption(
                  {
                    selected: isSelected,
                    select: handleSelect,
                    key,
                    data: value,
                  },
                  index
                )}
              </div>
            );
          })}
        </S.Options>
      </Popup>
    </>
  );
};
