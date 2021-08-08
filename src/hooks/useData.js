import { useState, useEffect } from 'react';
import { firestore } from '../firebase/config';

const useData = () => {
    const [years, setYears] = useState([]);
    const [locations, setLocations] = useState([]);

    useEffect(() => {
        firestore.collection("trips")
            .get()
            .then(snap => {
                let tempYears = new Set();
                let tempLocations = new Set();
                snap.forEach(doc => {
                    tempYears.add(doc.data().year);
                    tempLocations.add(doc.data().name);
                });
                setYears(tempYears);
                setLocations(tempLocations);
            })
            .catch((error) => {
                console.log(`Error getting document: ${error}`);
            });
    }, []);

    return { years, locations };
}

export default useData;