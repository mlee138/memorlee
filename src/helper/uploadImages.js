import { storage, firestore, timestamp } from '../firebase/config'
import camelize from './camelize';

const uploadImages = async(files, year, location) => {
    let tripName = `${year}_${camelize(location)}`;
    
    //add the trip to the trip collection
    const tripsRef = firestore.collection('trips').doc(tripName);
    const res = tripsRef.set({
        year: year,
        location: location
    }, { merge: true });
    console.log(await res);

    const collectionRef = firestore.collection(tripName);
    let p = new Promise((resolve, reject) => {
        let successes = 0;
        for(let i=0; i<files.length; i++){
            let storageRef = storage.ref(files[i].name);
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
                    successes++;
                    if(successes === files.length){
                        resolve("all files successfully uploaded");
                    }
            })
        }
    })
    return p;
}

export default uploadImages;