import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const StyledLink = styled(Link)`
    color: var(--font-color);
    text-decoration: none;
`;

const Card = styled.div`
    display: flex;

    border: 1px solid black;
    border-radius: 5px;
    box-sizing: border-box;
    box-shadow: 5px 5px 5px hsl(0, 0%, 10%);
    margin: 2em 0em;
    padding: 0.5em 1em;
    background-color: #404856; 
`;

const CardText = styled.div`
    width: 30%;
`;

const Placeholder = styled.div`
    background-color: hsl(201, 59%, 55%);
    flex-grow: 1;
`;

function TripCard({location, year}){
     return (
        <StyledLink to={`/explore/${location}/${year}`}>
            <Card>
                <CardText>
                    <h1>{location}</h1>
                    <h2>{year}</h2>
                </CardText>
                <Placeholder></Placeholder>
            </Card>
        </StyledLink>
     )
}

TripCard.propTypes = {
    location: PropTypes.string,
    year: PropTypes.string,
};

export default TripCard;