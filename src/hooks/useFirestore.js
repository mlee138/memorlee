import React, { useState, useEffect } from 'react';
import { firestore } from '../firebase/config'

// README: change useFirestore to take in 3 parameters for query 
const useFirestore = () => {
    const [docs, setDocs] = useState('');

    useEffect(() => {
        firestore.collection("trips")
            .get()
            .then(snap => {
                let documents = [];
                snap.forEach(doc => {
                    documents.push({...doc.data(), id: doc.id});
                });
                setDocs(documents);
            })
            .catch((error) => {
                console.log(`Error getting document: ${error}`);
            });
    }, []);

    return { docs };
}

export default useFirestore;