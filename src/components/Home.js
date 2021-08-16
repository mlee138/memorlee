import React, { useState, useEffect } from "react";
import {Link} from 'react-router-dom';
import styled from 'styled-components';
import ImgSrc from '../images/home-background.jpg';
import useStorage from "../hooks/useStorage";
import useFirestore from "../hooks/useFirestore";
import useSingleTrip from "../hooks/useSingleTrip";
import getDownloadUrls from "../helper/getDownloadUrls";
/*{
                    url && <img src={url} alt="uploaded pic"/>
                } */

function Home({ data }){
    const randNum = Math.floor(Math.random()*data.years.length);
    const randData = {
                        year: data.years[randNum], 
                        location: data.locations[randNum]
                     };

    const [ urls ] = useSingleTrip(randData);
    const [ randUrl, setRandUrl] = useState('');
    //const [ docs ] = useFirestore("2002", "cruise");

    useEffect(()=> {
        if (urls) {
            const randNum = Math.floor(Math.random()* urls.length);
            setRandUrl(urls[randNum]);
        }
    }, [urls])

    return(
        <Container>
            <div>
                <Subtitle>Never forget the</Subtitle>
                <Title>memorlee<small>s</small></Title>
                <StyledLink to="/explore">
                    Explore the Past 
                </StyledLink>
            </div>
            <div>
                { 
                    randUrl && <img src={randUrl} alt='downloaded image'/> 
                }
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
    border: 30px solid white;
    box-sizing: border-box;
    box-shadow: 7px 7px 7px hsl(0, 0%, 15%);
    height: 75%;
    width: 100%;
    object-fit: cover;
`;


export default Home;