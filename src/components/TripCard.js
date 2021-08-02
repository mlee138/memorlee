import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Card = styled.div`
    border: 1px solid black;
    border-radius: 5px;
    box-sizing: border-box;
    box-shadow: 5px 5px 5px hsl(0, 0%, 43%);
    margin: 2em 0em;
    padding: 0.5em 1em;
`;

function TripCard({location, year}){
     return (
        <Link to={`/explore/${location}/${year}`}>
            <Card>
                <p>{location}</p>
                <p>{year}</p>
            </Card>
        </Link>
     )
}

TripCard.propTypes = {
    location: PropTypes.string,
    year: PropTypes.number,
};

export default TripCard;