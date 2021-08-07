import React, { useContext } from "react";
import {Link} from 'react-router-dom';
import styled from 'styled-components';
import {Image, Transformation} from 'cloudinary-react';
import useFirestore from '../hooks/useFirestore';
import ImgSrc from '../images/home-background.jpg';


function Home(){
    const { docs } = useFirestore();
    console.log(docs);
    return(
        <Container>
            <div>
                <Subtitle>We'll always have the</Subtitle>
                <Title>memorlee<small>s</small></Title>
                <StyledLink to="/explore">
                    Explore the Past 
                </StyledLink>
                <p></p>
            </div>
            <div>
                <Img publicId="sample" />
            </div>
            
        </Container>
    )
}

//background-image: url(${ImgSrc});
const Container = styled.div`
    box-sizing: border-box;
    padding: 8rem;
    color: white;
    display: flex;
    
    background-size: cover;
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
`

const Img = styled(Image)`
    border: 30px solid white;
    box-sizing: border-box;
    box-shadow: 7px 7px 7px hsl(0, 0%, 15%);
    height: 75%;
    width: 100%;
    object-fit: cover;
`


export default Home;