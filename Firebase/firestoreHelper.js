import { addDoc, collection, deleteDoc, doc } from "firebase/firestore";
import { database } from "./firebaseSetup";

export async function writeToDB(data, collectionName) {
    try {
        const docRef = await addDoc(collection(database, collectionName),data);
        console.log("Document written with ID: ", docRef.id);
    }
    catch (err) {
        console.error("Error adding document: ", err);
    }
}

export async function deleteDocFromDB(docId, collectionName) {
    try {
        await deleteDoc(doc(database, collectionName, docId));
    }
    catch (err) {
        console.error("Error deleting document: ", err);
    }
}
