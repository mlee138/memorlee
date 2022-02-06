import { firestore } from '../firebase/config';
import { formatTripName } from '../helper/format';

async function backfillFileNames(year, location) {
  const tripName = formatTripName(year, location);

  const data = await firestore
    .collection(tripName)
    .get()
    .then(snap => {
        const documents = snap.docs.map(doc => {
          const url = doc.data().url
          const start = url.indexOf("%2F") + 3
          const end = url.indexOf("?")

          return {
            ...doc.data(),
            file_name: url.slice(start, end),
            id: doc.id,
          }
        })
        return documents;
    })
    .catch((error) => {
        console.log(`Error getting document: ${error}`);
    });
  console.log("TEST", data);
  try{
    data.map((doc) => {
      return firestore.collection(tripName).doc(doc.id).set({
        createdAt: doc.createdAt,
        url: doc.url,
        file_name: doc.file_name
      })
    })
    console.log('finished ', tripName);
  } catch (err) {
    console.error(err);
  }
}

export default backfillFileNames;