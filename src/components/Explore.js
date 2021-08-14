import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import Dropdown from './Dropdown.js';
import TripCard from './TripCard.js';
import queryTrips from '../helper/queryTrips.js';
import useFirestore from '../hooks/useFirestore.js';
import useSingleTrip from '../hooks/useSingleTrip.js';

const Container = styled.div`
    padding: 2em 20%;
`

function Explore({ data }){
    const {years, locations} = data;
    const [ docs, newYear, newLocation ] = useFirestore();
    
    
    useEffect( ()=>{

    },[]);

    return(
        <Container>
            <Dropdown name="Year" options={years} set={newYear}/>
            <Dropdown name="Location" options={locations} set={newLocation}/>
            <div id="trips">
                {   docs.length !== 0 &&
                    docs.map((trip,i) => {
                        return <TripCard key={i} location={trip.name} year={trip.year}/>
                    })
                }
            </div>
        </Container>
    );
}

export default Explore;