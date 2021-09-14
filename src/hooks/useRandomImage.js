import { useState, useEffect } from 'react';
import { firestore } from '../firebase/config';
import { formatTripName } from '../helper/format';

function useRandomImage(tripData) {
    const [trip, setTrip] = useState(tripData);
    const [url, setUrl] = useState('');
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
                let urls = [];
                snap.forEach(item => {
                    urls.push(item.data().url)
                })
                const randIndex = Math.floor(Math.random()*urls.length); 
                setUrl(urls[randIndex]);
                setLoading(false);
            })
            .catch((error) => {
                setLoading(false);
                console.log(`Error getting document: ${error}`);
            });
        } else {
            setUrl('');
        }
    }, [trip]); 
    return [url, loading, newTrip];
}

export default useRandomImage;