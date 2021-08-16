import React, { useState, useEffect } from 'react';
import { firestore } from '../firebase/config';

function useSingleTrip(tripData) {
    const [trip, setTrip] = useState(tripData);
    const [urls, setUrls] = useState([]);

    function newTrip(newYr, newLoc) {
        if(newYr !== trip.year || newLoc !== trip.location){
            console.log(3);
            setTrip({year: newYr, location: newLoc});
        }
    }

    useEffect( ()=>{
        if(trip && trip.year && trip.location) {
            firestore.collection("trips")
            .where("year", "==", trip.year)
            .where("name", "==", trip.location)
            .get()
            .then(snap => {
                let documents = [];
                snap.forEach(item => {
                    documents.push({...item.data()})
                })
                setUrls(documents[0].images);
            })
            .catch((error) => {
                console.log(`Error getting document: ${error}`);
            });
        } else {
            setUrls([]);
        }
    }, [trip]); 
    return [ urls, newTrip];
}

export default useSingleTrip;