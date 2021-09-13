import { useState, useEffect } from "react";
import { storage, firestore, timestamp } from '../firebase/config'
// TO BE UPDATED: only gets rand img from cruise 2002
// CURRENTLY: used to test google storage
const useStorage = (files, year, location) => {
    const [progress, setProgress] = useState(0);
    const [error, setError] = useState(null);
    const [url, setUrl] = useState(null);

    useEffect(()=>{
        const storageRef = storage.ref(files[0].name);
        const collectionRef = firestore.collection('images');

        storageRef.put(files[0]).on('state_changed', (snap) => {
            let percentage = (snap.bytesTransferred / snap.totalBytes) * 100;
            setProgress(percentage);
        }, (err) => {
            setError(err);
        }, async () => {
            const url = await storageRef.getDownloadURL();
            const createdAt = timestamp();
            collectionRef.add({ url, createdAt });
            setUrl(url);
        })
    }, [files]);

    return { progress, url, error}
}

export default useStorage;