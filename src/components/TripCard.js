import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import PropTypes from 'prop-types';

function TripCard({location, year, cover}){
     return (
        <StyledLink to={`/explore/${location}/${year}`}>
            <Card>
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
`;

const CardText = styled.div`
    width: 30%;
`;

const Image = styled.img`
    flex-grow: 1;
    max-width: 100%;
    max-height: 100%;
    object-fit: cover;
`;

export default TripCard;