import { useState, useEffect } from 'react';
import { firestore } from '../firebase/config';

function useFirestore(yr, loc) {
    const [year, setYear] = useState(yr);
    const [location, setLocation] = useState(loc);
    const [docs, setDocs] = useState([]);

    function newYear(newYr) {
        if (newYr !== year){
            setYear(newYr);
        }
        
    }

    function newLocation(newLoc) {
        if (newLoc !== location){
            setLocation(newLoc);
        }        
    }

    function newTrip(newYr, newLoc) {
        if(newYr !== year || newLoc !== location){
            setYear(newYr);
            setLocation(newLoc);
        }
    }

    
    

    useEffect( ()=>{
        function singleTrip() {
            firestore.collection("trips")
            .where("year", "==", year)
            .where("name", "==", location)
            .get()
            .then(snap => {
                let documents = [];
                snap.forEach(doc => {
                    documents.push({...doc.data()});
                });
                setDocs(documents)
            })
            .catch((error) => {
                console.log(`Error getting document: ${error}`);
            });
        }
        
        function multipleTrips(category, value) {
            firestore.collection("trips")
            .where(category, "==", value)
            .get()
            .then(snap => {
                let documents = [];
                snap.forEach(doc => {
                    documents.push({...doc.data()});
                });
                setDocs(documents)
            })
            .catch((error) => {
                console.log(`Error getting document: ${error}`);
            });
        }

        if(year && location) {
            singleTrip(year, location);
        } else if (year || location) {
            if(year){   multipleTrips("year", year) }
            else{       multipleTrips("location", location); } 
        } else {
            setDocs([]);
        }
    
    }, [year, location]); 
    return [ docs, newYear, newLocation, newTrip];
}

export default useFirestore;