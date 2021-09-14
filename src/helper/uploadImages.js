import { storage, firestore, timestamp } from '../firebase/config'
import { formatTripName, toTitleCase } from './format';

const uploadImages = async(files, year, loc) => {
    const location = toTitleCase(loc);
    let tripName = formatTripName(year, location);
    
    //add the trip to the trips collection
    const tripsRef = firestore.collection('trips').doc(tripName);
    tripsRef.set({
        year: year,
        location: location
    }, { merge: true });

    //add the image links to a collection
    const collectionRef = firestore.collection(tripName);
    let p = new Promise((resolve, reject) => {
        //let successes = 0;
        for(let i=0; i<files.length; i++){
            let storageRef = storage.ref(`${tripName}/files[i].name`);
            storageRef.put(files[i]).on('state_changed', 
                (snap) => {
                    let percentage = (snap.bytesTransferred / snap.totalBytes) * 100;
                    console.log(percentage);
                }, (err) => {
                    console.log(err);
                    reject(err);
                }, async () => {
                    const url = await storageRef.getDownloadURL();
                    const createdAt = timestamp();
                    collectionRef.add({ url, createdAt });
                    console.log(`${files[i].name} successfully uploaded`);
                    //It seems that the first file will always be the last one to finish
                    //Is that a coincidence?
                    //Are there any other ways of doing it?
                    if(files[i] === files[0]){
                        resolve("all files successfully uploaded");
                    }
            })
        }
    })
    return p;
}

export default uploadImages;