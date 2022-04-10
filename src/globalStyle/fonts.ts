import { createGlobalStyle } from "styled-components";

import ProductSansRegular from "@assets/fonts/productSans/ProductSansRegular.ttf";
import ProductSansBold from "@assets/fonts/productSans/ProductSansBold.ttf";

import DevilBreezeMedium from "@assets/fonts/devilBreeze/DevilBreezeMedium.ttf";

export const Fonts = createGlobalStyle`
    @font-face {
        font-family: "Product Sans";
        src: url(${ProductSansRegular});
        font-weight: 400;
        font-style: normal;
    }

    @font-face {
        font-family: "Product Sans";
        src: url(${ProductSansBold});
        font-weight: 700;
        font-style: normal;
    }

    @font-face {
        font-family: "Devil Breeze";
        src: url(${DevilBreezeMedium});
        font-weight: 500;
        font-style: normal;
    }
`;
