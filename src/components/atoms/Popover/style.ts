import styled, { keyframes } from "styled-components";
import { Content as ContentPrimitive } from "@radix-ui/react-popover";

import { COLORS } from "@globalStyle/colors";

const slideUpAndFade = keyframes`
    from {
        opacity: 0;
        transform: translateY(2px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
`;

export const PopoverContent = styled(ContentPrimitive)`
  border-radius: 0.5rem;
  box-shadow: 0px 4px 10px 1px rgba(0, 242, 254, 0.05);
  background: ${COLORS.darkblue};
  @media (prefers-reduced-motion: no-preference) {
    animation-duration: 400ms;
    animation-timing-function: cubic-bezier(0.16, 1, 0.3, 1);
    animation-fill-mode: forwards;
    will-change: transform, opacity;
    &[data-state="open"] {
      animation-name: ${slideUpAndFade};
    }
  }
`;
