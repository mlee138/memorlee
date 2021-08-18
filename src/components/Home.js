import React from "react";
import {Link} from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import useSingleTrip from "../hooks/useSingleTrip";
//import ImgSrc from '../images/home-background.jpg';

function Home({ data }){
    const randNum = Math.floor(Math.random()*data.years.length);
    const randData = {
                        year: data.years[randNum], 
                        location: data.locations[randNum]
                     };

    const [ url ] = useSingleTrip(randData);
// {
//     url && <Image src={url} alt="random vacation"/>
// }
    return(
        <Container>
            <TextContainer>
                <Subtitle>We'll always have the</Subtitle>
                <Title>memorlee<small>s</small></Title>
                <StyledLink to="/explore">
                    Relive the Past 
                </StyledLink>
            </TextContainer>
            <Image src={url} alt="I odn't remember"/>
            
        </Container>
    )
}

const Container = styled.div`
    display: grid;
    box-sizing: border-box;
    color: var(--font-color);
    background-size: cover;
    height: 100vh;
`;

const TextContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    z-index: 2;
    width: 90%;
    height: 100%;
    padding-left: 10em;
    box-sizing: border-box;
    background-image: linear-gradient(to right, #f5ebcf, var(--bg-color), hsla(44, 21%, 63%, 0));
`;

const Subtitle = styled.h2`
    margin: 0;
    margin-bottom: 1rem;
    font-size: 2.25rem;
    font-weight: 300;
    font-style: italic;
    width: 75%;
    opacity: 0.9;
`;

const Title = styled.h1`
    font-size: 7rem;
    font-weight: bold;
    opacity: 0.9;
    margin: 0;
    margin-bottom: 2rem;
    small {
        font-size: 60%;
    }
`;

const StyledLink = styled(Link)`
    padding: 1rem 2rem;
    background-color: var(--btn-color);
    border: none;
    border-radius: 10px;
    box-shadow: var(--shadow);
    color: hsla(0, 0%, 0%, 0.9);
    text-decoration: none;
    font-size: 1rem;
    cursor: pointer;

    &:hover {
        background-color: var(--btn-hover-color);
    }

    &:active {
        background-color: var(--btn-active-color);
    }
`;
const fadeIn = keyframes`
    0% { opacity: 0; }
    100% { opacity: 1; }
`;

const Image = styled.img`
    position: absolute;
    right:0;
    top:0;
    bottom: 0;
    box-sizing: border-box;
    height: 100%;
    width: 70%;
    object-fit: cover;
    z-index: 0;
    filter: sepia(75%);

    opacity: 0;
    animation-name: ${fadeIn};
    animation-duration: 2s;
    animation-delay:1s;
    animation-fill-mode: forwards;
`;



export default Home;