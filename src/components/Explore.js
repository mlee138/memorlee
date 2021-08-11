import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import Dropdown from './Dropdown.js';
import TripCard from './TripCard.js';
import queryTrips from '../helper/queryTrips.js';

const Container = styled.div`
    padding: 2em 20%;
`

function Explore({ data }){
    const {years, locations} = data;
    const [year, setYear] = useState('');
    const [location, setLocation] = useState('');
    const [trips, setTrips] = useState([]);
    
    useEffect( ()=>{
        async function getTrips(){
            const result = await queryTrips(year,location);
            console.log(result)
            setTrips(result);
        }
        getTrips();
    },[year, location]);

    return(
        <Container>
            <Dropdown name="Year" options={years} set={setYear}/>
            <Dropdown name="Location" options={locations} set={setLocation}/>
            <div id="trips">
                {   trips.length !== 0 &&
                    trips.map((trip,i) => {
                        return <TripCard key={i} location={trip.name} year={trip.year}/>
                    })
                }
            </div>
        </Container>
    );
}

export default Explore;