import styled, { keyframes } from "styled-components";

import { CheckboxSC } from "./types";

const wave = keyframes`
  50% {
    transform: scale(.9)
  }
`;

export const Label = styled.label<CheckboxSC>`
  margin: auto;
  -webkit-user-select: none;
  user-select: none;
  cursor: pointer;
  display: flex;
  align-items: center;

  span {
    display: inline-block;
    vertical-align: middle;
    transform: translate3d(0, 0, 0);
    &:first-child {
      position: relative;
      min-width: 18px;
      min-height: 18px;
      border-radius: 3px;
      transform: scale(1);
      vertical-align: middle;
      border: 1px solid ${({ theme: { borderColor } }) => borderColor};
      transition: all 0.2s ease;
      svg {
        position: absolute;
        top: 3px;
        left: 2px;
        fill: none;
        stroke: ${({ theme: { markColor } }) => markColor};
        stroke-width: 2;
        stroke-linecap: round;
        stroke-linejoin: round;
        stroke-dasharray: 16px;
        stroke-dashoffset: 16px;
        transition: all 0.3s ease;
        transition-delay: 0.1s;
        transform: translate3d(0, 0, 0);
      }
      &:before {
        content: "";
        width: 100%;
        height: 100%;
        background: ${({ theme: { checkboxColor } }) => checkboxColor};
        display: block;
        transform: scale(0);
        opacity: 1;
        border-radius: 50%;
      }
    }
    &:last-child {
      color: ${({ theme: { labelColor } }) => labelColor};
      font-size: 0.825rem;
    }
  }
  &:hover span:first-child {
    border-color: ${({ theme: { checkboxColor } }) => checkboxColor};
  }
`;
export const Checkbox = styled.input<CheckboxSC>`
  display: none;
  &:checked + ${Label} {
    span {
      &:first-child {
        background: ${({ theme: { checkboxColor } }) => checkboxColor};
        border-color: ${({ theme: { checkedBorderColor } }) =>
          checkedBorderColor};
        animation: ${wave} 0.4s ease;
        svg {
          stroke-dashoffset: 0;
        }
        &:before {
          transform: scale(3.5);
          opacity: 0;
          transition: all 0.6s ease;
        }
      }
    }
  }
`;
