import React from 'react';
import styled from 'styled-components';
import Dropdown from './Dropdown.js';
import TripCard from './TripCard.js';
import useFirestore from '../hooks/useFirestore.js';

const Container = styled.div`
    padding: 5em 20%;
    min-height: 100%;

    @media screen and (max-width: 500px){
        padding: 4em 0;
    }
`

function Explore({ data }){
    const {years, locations} = data;
    const [ docs, newYear, newLocation ] = useFirestore();

    return(
        <Container>
            <Dropdown name="Year" options={years} set={newYear}/>
            <Dropdown name="Location" options={locations} set={newLocation}/>
            <div id="trips">
                {   docs.length !== 0 &&
                    docs.map((trip,i) => {
                        return <TripCard key={i} location={trip.name} year={trip.year} cover={trip.cover}/>
                    })
                }
            </div>
        </Container>
    );
}

export default Explore;