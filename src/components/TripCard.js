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


const StyledLink = styled(Link)`
    color: var(--font-color);
    text-decoration: none;
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
    background-color: #b7bb8f; 

    opacity: 0;
    animation-name: ${fadeIn};
    animation-duration: 1s;
    animation-fill-mode: forwards;

    @media screen and (max-width: 500px){
        height: 150px;
    }
`;

const Location = styled.h1`
    font-size: 1.5rem;

`;

const Year = styled.h2`
    font-size: 1rem;
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