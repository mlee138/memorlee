import { firestore } from '../firebase/config'

// README: change useFirestore to take in 3 parameters for query 
async function queryTrips(year='', location='') {
    if(year && location) {
        return await singleTrip(year, location);
    } else if (year || location) {
        if(year){   return await multipleTrips("year", year) }
        else{       return await multipleTrips("location", location); } 
    } else {
        return [];
    }
}

function singleTrip(year='', location='') {
    return new Promise((resolve, reject) => {
        firestore.collection("trips")
        .where("year", "==", year)
        .where("name", "==", location)
        .get()
        .then(snap => {
            let documents = [];
            snap.forEach(doc => {
                documents.push({...doc.data()});
            });
            resolve(documents)
        })
        .catch((error) => {
            reject(`Error getting document: ${error}`);
        });
    })
}

function multipleTrips(category, value) {
    return new Promise((resolve, reject) => {
        firestore.collection("trips")
        .where(category, "==", value)
        .get()
        .then(snap => {
            let documents = [];
            snap.forEach(doc => {
                documents.push({...doc.data()});
            });
            resolve(documents)
        })
        .catch((error) => {
            reject(`Error getting document: ${error}`);
        });
    })
}

export default queryTrips;