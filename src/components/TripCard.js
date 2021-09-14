import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { fadeIn } from '../animations/fade';

function TripCard({location, year}){
     return (
        <StyledLink to={`/explore/${location}/${year}`}>
            <Card>
                <Location>{location}</Location>
                <Year>{year}</Year>
            </Card>
        </StyledLink>
     )
}

TripCard.propTypes = {
    location: PropTypes.string,
    year: PropTypes.string,
};

const newShadow =(numSteps, color)=>{
    const spread = 1;
    let gradient = `1px 1px ${spread}px ${color}`;

    for(let i=2; i<numSteps; i++) {
        gradient = `${gradient}, ${i}px ${i}px ${spread}px ${color}`;
    }
    return gradient;
}
const bg_light = 55;
const shadow_light = 45;
const diff = 5;
const max_delay = 0.75;

const StyledLink = styled(Link)`
    color: var(--font-color);
    text-decoration: none;

    opacity: 0;
    animation-name: ${fadeIn};
    animation-duration: 1.75s;
    animation-fill-mode: forwards;

    &:nth-child(5n+1){
        background-image: linear-gradient(to bottom right, hsla(335, 55%, ${bg_light+diff}%, 1), hsla(335, 55%, ${bg_light-diff}%, 1));
        animation-delay: ${Math.random()*max_delay}s;
        & h1{   
            text-shadow: ${newShadow(170, `hsla(335, 55%, ${shadow_light}%, 1)`)};
        }
    }

    &:nth-child(5n+2){
        background-image: linear-gradient(to bottom right, hsla(95, 55%, ${bg_light+diff}%, 1), hsla(95, 55%, ${bg_light-diff}%, 1));
        animation-delay: ${Math.random()*max_delay}s;
        & h1{   
            text-shadow: ${newShadow(170, `hsla(95, 55%, ${shadow_light}%, 1)`)};
        }
    }

    &:nth-child(5n+3){
        background-image: linear-gradient(to bottom right, hsla(35, 60%, ${bg_light}%, 1), hsla(35, 60%, ${bg_light-10}%, 1)); 
        animation-delay: ${Math.random()*max_delay}s;
        & h1{   
            text-shadow: ${newShadow(170, `hsla(35, 60%, ${shadow_light}%, 1)`)};
        }
        
    }

    &:nth-child(5n+4){
        background-image: linear-gradient(to bottom right, hsla(155, 55%, ${bg_light+diff}%, 1), hsla(155, 55%, ${bg_light-diff}%, 1));
        animation-delay: ${Math.random()*max_delay}s;
        & h1{   
            text-shadow: ${newShadow(170, `hsla(155, 55%, ${shadow_light}%, 1)`)};
        }
    }

    &:nth-child(5n+5){
        background-image: linear-gradient(to bottom right, hsla(245, 55%, ${bg_light+diff}%, 1), hsla(245, 55%, ${bg_light-diff}%, 1));
        animation-delay: ${Math.random()*max_delay}s;
        & h1{   
            text-shadow: ${newShadow(170, `hsla(245, 55%, ${shadow_light}%, 1)`)};
        }
    }
`;

const Card = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 200px;
    padding: 1rem;
    border-radius: 5px;
    box-sizing: border-box;
    box-shadow: var(--shadow);
    position: relative;
    overflow: hidden;
    

    @media screen and (max-width: 500px){
        height: 150px;
    }
`;

const Location = styled.h1`
    margin: 0;
    width: 100%;
    font-size: 2.25rem;
    font-weight: 900;
    color: hsla(0,0%,100%, 1);
`;

const Year = styled.h2`
    position: absolute;
    bottom: 0;
    right: 0;
    margin: 0;
    font-size: 3rem;   
    color: hsla(0,0%, 100%, 0.6);
`;

/*
const Image = styled.img`
    flex-grow: 1;
    max-width: 100%;
    max-height: 100%;
    object-fit: cover;

    @media screen and (max-width: 500px){
        flex-grow: 0;
    }
`;
*/

export default TripCard;