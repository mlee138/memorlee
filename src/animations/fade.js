import { keyframes } from "styled-components";

const fadeIn = keyframes`
    0% { opacity: 0; }
    100% { opacity: 1; }
`;

const fadeHalf = keyframes`
    0% { opacity: 0; }
    100% { opacity: 0.5; }
`;

export { fadeIn, fadeHalf};