import React, { useState } from "react";

import { InputProps } from "./types";

import { Text } from "@components/atoms/Text";

import * as S from "./style";

// Maybe I will separate Input and Textarea
export const Input = (props: InputProps) => {
  const {
    type,
    label,
    value,
    onChange,
    placeholder = "",
    disabled,
    transparent,
    style,
    className,
    useTextarea,
  } = props;
  const [focused, setFocus] = useState<boolean>(false);

  return (
    <S.Wrapper
      disabled={disabled}
      focused={focused}
      onFocus={() => setFocus(true)}
      onBlur={() => setFocus(false)}
      style={style}
      className={className}
    >
      <Text
        type={type}
        label={label}
        value={value ? value : placeholder}
        transparent={!value || transparent}
        onChange={onChange}
        useTextarea={useTextarea}
      />
    </S.Wrapper>
  );
};
