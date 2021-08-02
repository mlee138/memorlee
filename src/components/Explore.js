import React, {useState, useEffect} from 'react';
import Dropdown from './Dropdown.js';

let years = [undefined, 1997, 1998, 1999, 2000]
let locations = ["", "Florida", "Mohegan Sun", "Mohonk"]

function Explore(){
    const [year, setYear] = useState();
    const [location, setLocation] = useState("");
    const [trips, setTrips] = useState([]);

    useEffect( ()=>{
        setTrips([1, 2]);
        console.log(`${year}, ${location}`);
    },[year, location]);

    return(
        <div>
            <Dropdown name="Year" options={years} set={setYear}/>
            <Dropdown name="Location" options={locations} set={setLocation}/>
            <div id="trips">

            </div>
        </div>
    );
}

export default Explore;