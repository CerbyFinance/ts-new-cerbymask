import { createGlobalStyle } from "styled-components";

export const Reset = createGlobalStyle`
* {
    box-sizing: border-box;
    letter-spacing: .02rem;
}

html, body {
    margin: 0;
    padding: 0;
}

h1, h2, h3, h4, h5, h6, p {
    margin: 0;
}

a {
    text-decoration: none;
    color: black;
}

input {
    font-size: 1rem;
    border: none;
    outline: none;
    background: none;
}
`;