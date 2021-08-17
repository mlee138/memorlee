import { useState, useEffect } from 'react';
import { firestore } from '../firebase/config';

function useSingleTrip(tripData) {
    const [trip, setTrip] = useState(tripData);
    const [url, setUrl] = useState('');

    function newTrip(newYr, newLoc) {
        if(newYr !== trip.year || newLoc !== trip.location){
            setTrip({year: newYr, location: newLoc});
        }
    }

    useEffect( ()=>{
        if(trip.year && trip.location) {
            firestore.collection("trips")
            .where("year", "==", trip.year)
            .where("name", "==", trip.location)
            .get()
            .then(snap => {
                let documents = [];
                snap.forEach(item => {
                    documents.push({...item.data()})
                })
                const randIndex = Math.floor(Math.random()*documents[0].images.length); 
                setUrl(documents[0].images[randIndex]);
            })
            .catch((error) => {
                console.log(`Error getting document: ${error}`);
            });
        } else {
            setUrl('');
        }
    }, [trip]); 
    return [ url, newTrip];
}

export default useSingleTrip;