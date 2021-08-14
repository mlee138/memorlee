import React, { useState, useEffect } from 'react';
import { firestore } from '../firebase/config';

function useSingleTrip(tripData) {
    const [trip, setTrip] = useState(tripData);
    const [doc, setDoc] = useState({});

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
                setDoc(documents[0]);
            })
            .catch((error) => {
                console.log(`Error getting document: ${error}`);
            });
        } else {
            setDoc({});
        }
    }, [trip]); 
    return [ doc, newTrip];
}

export default useSingleTrip;