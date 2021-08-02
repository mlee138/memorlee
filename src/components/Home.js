import React from "react";
import styled from 'styled-components';
import {Image, Transformation} from 'cloudinary-react'
import "./Home.css";

const Container = styled.div`
    box-sizing: border-box;
    padding: 8rem;
    color: white;
    display: flex;
`;

const Title = styled.h1`
    font-size: 6rem;
    text-shadow: 5px 5px 5px hsl(0, 0%, 10%);
    margin-bottom: 20px;
    small {
        font-size: 60%;
    }
`

const Subtitle = styled.h2`
    font-size: 2.25rem;
    margin: 0;
    width: 75%;
    text-shadow: 5px 5px 5px hsl(0, 0%, 10%);
`

const Button = styled.button`
    padding: 1rem 2rem;
    background-color: hsla(141, 65%, 46%, 1);
    border: none;
    border-radius: 10px;
    box-shadow: 5px 5px 5px hsl(0, 0%, 10%);
    color: white;
    font-size: 1rem;
    cursor: pointer;

    &:hover {
        background-color: hsla(141, 85%, 46%, 1);
    }

    &:active {
        background-color: hsla(141, 35%, 46%, 1);
    }
`
/*
const Image = styled.img`
    border: 30px solid white;
    box-shadow: 7px 7px 7px hsl(0, 0%, 15%);
`
*/
function Home(){
    return(
        <div id="Home">
            <Container>
                <div>
                    <Subtitle>We'll always have the</Subtitle>
                    <Title>memorlee<small>s</small></Title>
                    <Button>Explore the Past</Button>
                </div>
                <div>
                    <Image publicId="sample" />
                </div>
                
            </Container>
        </div>
    )
}

export default Home;