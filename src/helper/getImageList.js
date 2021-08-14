import { storage } from '../firebase/config'
import queryTrips from "./queryTrips";

async function getList() {
    const storageRef = storage.ref();
    let listRef = storageRef.child('files/uid');
    return new Promise((resolve, reject) => {
        let refs = [];
        storage.ref().child('files/uid').listAll()
            .then((res) => {
                res.items.forEach((itemRef) => {
                    refs.push(itemRef);
            
                })
                console.log(refs);
                resolve(refs);
            })
            .catch((error) => {
                reject(error);
            })
        
    })
    

}

const getImageList = async () => {
    console.log(await getList());
}

export default getImageList;