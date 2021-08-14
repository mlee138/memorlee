import { storage } from '../firebase/config'
// TO BE UPDATED: only gets rand img from cruise 2002
// CURRENTLY: used to test google storage

// function retrieveUrl(image){
//     return storage.refFromURL(image).getDownloadURL();
// }

// const getDownloadUrls = async (doc) => {
//     const images = doc.images;
//     let urlList = [];
//     images.forEach(image => {
//         const url = await retrieveUrl(image);
//     })
//     console.log(urlList);
// }

const getDownloadUrls = (doc) => {
    const images = doc.images;
    let urlList = [];
    images.forEach(image => {
        storage.refFromURL(image).getDownloadURL()
            .then((url) => {
                //urlList.push(`<img src='${url}' alt='downloaded image'/>`);
                urlList.push(url);
            })
            .catch((error)=> {
                console.log(`Error retrievign url: ${error}`);
            })
    })
    return urlList;
}

export default getDownloadUrls;