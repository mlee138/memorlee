import { useState, useEffect } from 'react';
import { firestore } from '../firebase/config';

const useData = () => {
    const [ready, setReady] = useState(false);
    const [years, setYears] = useState([]);
    const [locations, setLocations] = useState([]);

    useEffect(() => {
        if(ready){
            firestore.collection("trips")
                .get()
                .then(snap => {
                    let tempYears = [];
                    let tempLocations = [];
                    snap.forEach(doc => {
                        tempYears.push(doc.data().year);
                        tempLocations.push(doc.data().location);
                    });
                    setYears(tempYears);
                    setLocations(tempLocations);
                })
                .catch((error) => {
                    console.log(`Error getting document: ${error}`);
                });
            }
    }, [ready]);

    return [{ years, locations }, setReady];
}

export default useData;