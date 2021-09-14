import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Dropdown from './Dropdown.js';
import TripCard from './TripCard.js';

const Container = styled.div`
    padding: 5em 20%;
    min-height: 100%;

    @media screen and (max-width: 500px){
        padding: 4rem 1rem;
    }
`;

const Grid = styled.div`
    margin-top: 1rem;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    grid-template-rows: repeat(auto-fill, minmax(150px, 1fr));
    grid-gap: 2rem;
`;

function Explore({ data }){
    const {years, locations} = data;
    const [year, setYear] = useState('');
    const [location, setLocation] = useState('');
    const [trips, setTrips] = useState([]);

   

    useEffect(()=>{
        const filterTrips =()=> {
            let newTrips = [];
            for(let i=0; i<years.length; i++){
                if( 
                    (years[i] === year || year === '') && 
                    (locations[i] === location || location === '') 
                ){
                    newTrips.push({ location:locations[i], year:years[i] });
                }
                
            }
            setTrips(newTrips);
        }

        filterTrips();
    }, [year, location, years, locations]);

    return(
        <Container>
            <Dropdown name="Year" options={years} set={setYear}/>
            <Dropdown name="Location" options={locations} set={setLocation}/>
            <Grid>
                {   trips.length !== 0 ? 
                        trips.map((trip,i) => {
                            return <TripCard key={i} location={trip.location} year={trip.year}/>
                        })
                        :
                        <h2>No trips were found</h2>
                }
            </Grid>
        </Container>
    );
}

export default Explore;