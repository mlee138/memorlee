import { useState, useEffect } from "react";
import { storage } from '../firebase/config'
import queryTrips from "../helper/queryTrips";
// TO BE UPDATED: only gets rand img from cruise 2002
// CURRENTLY: used to test google storage
const useStorage = (doc, random=0) => {
    const [urls, setUrls] = useState();
    const [data, setData] = useState(doc);

    // function newTrip(newTrip){
    //     setTrip(newTrip);
    // }

    useEffect(() => {
        /*async function getRandTrip() {
            const { images } = doc[0];
            //ADD CODE FOR RANDOM
            const imageUrls = images.map(image => {
                return storage.refFromURL(image).getDownloadURL();
            })
            console.log(imageUrls);
            //setUrl(url);
        }*/

        if(data){
            console.log(data);
            //getRandTrip()
            const { images } = data;
            //ADD CODE FOR RANDOM
            const imageUrls = images.map(image => {
                const downloadURL = storage.refFromURL(image).getDownloadURL();
                return downloadURL;
            })
            console.log(imageUrls);
            setUrls(imageUrls);
        } else {
            console.log("no trips here!");
        }
        
    }, [data]);

    return [ urls, setData ];
}

export default useStorage;