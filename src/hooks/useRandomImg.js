import { useState, useEffect } from "react";
import { storage } from '../firebase/config'
import queryTrips from "../helper/queryTrips";
// TO BE UPDATED: only gets rand img from cruise 2002
// CURRENTLY: used to test google storage
const useRandomImg = ({ years, locations }) => {
    const [url, setUrl] = useState();

    useEffect(() => {
        let randNum = Math.floor(Math.random()*years.length);
        const randYear = years[randNum];
        const randLocation = locations[randNum];
        async function getRandTrip() {
            //const res = await queryTrips(randYear, randLocation);
            const res = await queryTrips("2002", "Cruise");
            const { images } = await res[0];
            //console.log(images);
            //const trip = await queryTrips(randYear, randLocation);

            const randImg = await images[Math.floor(Math.random()*images.length)]; 
            console.log(randImg);
            let url = await storage.refFromURL(randImg).getDownloadURL();
            setUrl(url);
        }
        getRandTrip();
    }, [years, locations]);

    return [ url ];
}

export default useRandomImg;