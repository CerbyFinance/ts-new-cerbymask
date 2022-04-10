import { createGlobalStyle } from "styled-components";

export const Reset = createGlobalStyle`
* {
    box-sizing: border-box;
    letter-spacing: .02rem;
    font-family: "Product Sans", sans-serif;
    color: white;
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
