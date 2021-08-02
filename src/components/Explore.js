import React, {useState, useEffect} from 'react';
import Dropdown from './Dropdown.js';
import TripCard from './TripCard.js';

let years = [undefined, 1997, 1998, 1999, 2000]
let locations = ["", "Florida", "Mohegan Sun", "Mohonk"]

function Explore(){
    const [year, setYear] = useState();
    const [location, setLocation] = useState("");
    const [trips, setTrips] = useState([]);

    useEffect( ()=>{
        setTrips([
            {location: "Maine", year: 2010}, 
            {location: "Mohegan Sun", year: 2021}
        ]);
        console.log(`${year} ${location}`);
    },[year, location]);

    return(
        <div>
            <Dropdown name="Year" options={years} set={setYear}/>
            <Dropdown name="Location" options={locations} set={setLocation}/>
            <div id="trips">
                {
                    trips.map((trip,i) => {
                        return <TripCard key={i} location={trip.location} year={trip.year}/>
                    })
                }
            </div>
        </div>
    );
}

export default Explore;