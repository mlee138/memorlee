import { useState, useEffect } from 'react';
import { firestore } from '../firebase/config';

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