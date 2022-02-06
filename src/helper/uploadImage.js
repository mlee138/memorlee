import { storage, firestore, timestamp } from '../firebase/config'
import { formatTripName, toTitleCase } from './format';

const uploadImage = async(file, year, loc) => {
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
        let storageRef = storage.ref(`${tripName}/${file.name}`);
        storageRef.put(file).on('state_changed', 
            (snap) => {
                let percentage = (snap.bytesTransferred / snap.totalBytes) * 100;
                console.log(percentage);
            }, (err) => {
                console.log(err);
                reject(err);
            }, async () => {
                const url = await storageRef.getDownloadURL();
                const createdAt = timestamp();
                collectionRef.doc(file.name).set({ url, createdAt, file_name: file.name });
                resolve(`${file.name} successfully uploaded`);
            })
    });
    return p;
}

export default uploadImage;