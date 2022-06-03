import { createGlobalStyle } from "styled-components";

import MulishExtraBold from "@assets/fonts/Mulish/Mulish-ExtraBold.ttf";
import JostRegular from "@assets/fonts/Jost/Jost-Regular.ttf";
import JostSemiBold from "@assets/fonts/Jost/Jost-SemiBold.ttf";

export const Fonts = createGlobalStyle`
    @font-face {
        font-family: Jost;
        src: url(${JostRegular});
        font-weight: 400;
        font-style: normal;
    }
    @font-face {
        font-family: Jost;
        src: url(${JostSemiBold});
        font-weight: 600;
        font-style: normal;
    }

    @font-face {
        font-family: Mulish;
        src: url(${MulishExtraBold});
        font-weight: 800;
        font-style: normal;
    }
`;
