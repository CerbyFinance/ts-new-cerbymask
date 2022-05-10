import { createGlobalStyle } from "styled-components";

export const Reset = createGlobalStyle`
* {
    box-sizing: border-box;
    letter-spacing: .02rem;
    font-family: Jost, sans-serif;
}

html, body {
    margin: 0;
    padding: 0;
}

html, body, input, a {
    color: white;
}

h1, h2, h3, h4, h5, h6 {
    font-family: Mulish;
    font-weight: 800;
}
h1, h2, h3, h4, h5, h6, p {
    margin: 0;
}

a {
    text-decoration: none;
}

input, textarea {
    font-size: 1rem;
    border: none;
    outline: none;
    background: none;
    padding: 0;
    margin: 0;
}

textarea {
    resize: none;
}

input, textarea, label {
    cursor: inherit;
}
`;
