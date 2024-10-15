import { addDoc, collection } from "firebase/firestore";
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