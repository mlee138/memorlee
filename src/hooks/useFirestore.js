import { useState, useEffect } from 'react';
import { firestore } from '../firebase/config';
import { formatTripName } from '../helper/format';

function useFirestore(year, location) {
    const [urls, setUrls] = useState([]);

    useEffect( ()=>{
        firestore.collection(formatTripName(year, location))
            .get()
            .then(snap => {
                let documents = [];
                snap.forEach(doc => {
                    documents.push(doc.data().url);
                });
                setUrls(documents)
            })
            .catch((error) => {
                console.log(`Error getting document: ${error}`);
            });
    
    }, [year, location]); 
    return [ urls ];
}

export default useFirestore;