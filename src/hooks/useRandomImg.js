import { doc } from "prettier";
import { useState, useEffect } from "react";
import { firestore } from '../firebase/config';

const useRandomImg = ({ years, locations }) => {
    const [doc, setDoc] = useState();

    useEffect(() => {
        const yearsArr = [...years];
        const locationsArr = [...locations];
        const randYear = yearsArr[Math.floor(Math.random()*yearsArr.length)];
        const randLocation = locationsArr[Math.floor(Math.random()*locationsArr.length)];
        firestore.collection('trips')
            .where("year", "==", randYear)
            .where("name", "==", randLocation)
            .get()
            .then((snap) => {
                console.log(snap);
                
            })
            .catch(error => {
                console.log(`Error getting documents: ${error}`);
            }) 
    }, []);

    return { doc };
}