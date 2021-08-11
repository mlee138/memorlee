import { firestore } from '../firebase/config'

// README: change useFirestore to take in 3 parameters for query 
function queryTrips(year='', location='') {
    /*if(year || location) {
        return Promise((resolve, reject) => {
            let query;
            if(year && location) {
                console.log(1);
                query = firestore.collection("trips")
                        // .where('year', '==', year)
                        // .where('name', '==', location);
            } else if (year){
                console.log(2);
                query = firestore.collection('trips')
                        // .where('year', '==', year);
            } else {
                console.log(3);
                query = firestore.collection('trips')
                        .where('name', '==', location);
            }

            query.get()
            .then(snap => {
                let documents = [];
                snap.forEach(doc => {
                    documents.push({year: doc.data().year, location: doc.data().name});
                });
                console.log(documents);
                resolve(documents)
            })
            .catch((error) => {
                reject(`Error getting document: ${error}`);
            });
        })
    }*/
    if(year && location){
        return new Promise((resolve, reject) => {
            firestore.collection("trips")
            .where("year", "==", year)
            .where("name", "==", location)
            .get()
            .then(snap => {
                let documents = [];
                snap.forEach(doc => {
                    const { year, name, cover } = doc.data();
                    documents.push({year: year, location: name, cover: cover});
                });
                console.log(documents);
                resolve(documents)
            })
            .catch((error) => {
                reject(`Error getting document: ${error}`);
            });
        })
    } else if(year || location) {
        return new Promise((resolve, reject) => {
            let category = '';
            let value = '';
            year ? category = 'year' : category = 'name';
            value = year || location;
            firestore.collection("trips")
            .where(category, "==", value)
            .get()
            .then(snap => {
                let documents = [];
                snap.forEach(doc => {
                    const { year, name, cover } = doc.data()
                    documents.push({year: year, location: name, cover: cover});
                });
                resolve(documents)
            })
            .catch((error) => {
                reject(`Error getting document: ${error}`);
            });
        })
    }
}

export default queryTrips;