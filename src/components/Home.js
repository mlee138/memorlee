import React from "react";
import {Link} from 'react-router-dom';
import styled from 'styled-components';
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
    color: white;
    background-size: cover;
    height: 100vh;
`;

const TextContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    z-index: 2;
    width: 100%;
    height: 100%;
    padding-left: 10em;
    box-sizing: border-box;
    background-image: linear-gradient(to right, hsla(227, 11%, 15%, 1), hsla(227, 11%, 15%, 1), hsla(227, 11%, 15%, 0));
`;

const Title = styled.h1`
    font-size: 6rem;
    text-shadow: 5px 5px 5px hsl(0, 0%, 10%);
    margin-bottom: 20px;
    small {
        font-size: 60%;
    }
`;

const Subtitle = styled.h2`
    font-size: 2.25rem;
    margin: 0;
    width: 75%;
    text-shadow: 5px 5px 5px hsl(0, 0%, 10%);
`;

const StyledLink = styled(Link)`
    padding: 1rem 2rem;
    background-color: hsla(141, 65%, 46%, 1);
    border: none;
    border-radius: 10px;
    box-shadow: 5px 5px 5px hsl(0, 0%, 10%);
    color: white;
    text-decoration: none;
    font-size: 1rem;
    cursor: pointer;

    &:hover {
        background-color: hsla(141, 85%, 46%, 1);
    }

    &:active {
        background-color: hsla(141, 35%, 46%, 1);
    }
`;

const Image = styled.img`
    position: absolute;
    right:0;
    top:0;
    bottom: 0;
    box-sizing: border-box;
    box-shadow: 7px 7px 7px hsl(0, 0%, 15%);
    height: 100%;
    width: 70%;
    object-fit: cover;
    z-index: 0;
    filter: sepia(80%);
`;


export default Home;