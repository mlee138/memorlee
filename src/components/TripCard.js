import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { fadeIn } from '../animations/fade';

function TripCard({location, year, cover}){
     return (
        <StyledLink to={`/explore/${location}/${year}`}>
            <Card className="trip-card">
                <CardText>
                    <h1>{location}</h1>
                    <h2>{year}</h2>
                </CardText>
                <Image src={cover} alt="random vacation"/>
            </Card>
        </StyledLink>
     )
}

TripCard.propTypes = {
    location: PropTypes.string,
    year: PropTypes.string,
};


const StyledLink = styled(Link)`
    color: var(--font-color);
    text-decoration: none;
`;

const Card = styled.div`
    display: flex;
    height: 150px;
    border-radius: 5px;
    box-sizing: border-box;
    box-shadow: var(--shadow);
    margin: 2em 0em;
    padding-left: 1em;
    background-color: #b7bb8f; 

    opacity: 0;
    animation-name: ${fadeIn};
    animation-duration: 1s;
    animation-fill-mode: forwards;

    @media screen and (max-width: 500px){
        justify-content: space-between;
        margin: 1em;
    }
`;

const CardText = styled.div`
    width: 30%;
    & h1 { font-size: 1.5rem; }
    & h2 { font-size: 1rem; }

    @media screen and (max-width: 500px){
        display: flex;
        flex-direction: column;
        justify-content: center;
        width: auto;
    }
`;

const Image = styled.img`
    flex-grow: 1;
    max-width: 100%;
    max-height: 100%;
    object-fit: cover;

    @media screen and (max-width: 500px){
        flex-grow: 0;
    }
`;

export default TripCard;