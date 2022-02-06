import { useState, useEffect } from 'react';
import { firestore } from '../firebase/config';
import { formatTripName } from '../helper/format';

function useRandomImage(tripData) {
    const [trip, setTrip] = useState(tripData);
    const [fileName, setFileName] = useState('');
    const [loading, setLoading] = useState(false);

    function newTrip(newYr, newLoc) {
        if(newYr !== trip.year || newLoc !== trip.location){
            setTrip({year: newYr, location: newLoc});
        }
    }

    useEffect( ()=>{
        if(trip.year && trip.location) {
            setLoading(true);
            firestore.collection(formatTripName(trip.year, trip.location))
            .get()
            .then(snap => {
                let fileNames = [];
                snap.forEach(item => {
                    fileNames.push(item.data().file_name)
                })
                const randIndex = Math.floor(Math.random()*fileNames.length); 
                setFileName(fileNames[randIndex]);
                setLoading(false);
            })
            .catch((error) => {
                setLoading(false);
                console.log(`Error getting document: ${error}`);
            });
        } else {
            setFileName('');
        }
    }, [trip]); 
    return [fileName, loading, newTrip];
}

export default useRandomImage;