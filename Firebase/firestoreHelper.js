import { addDoc, collection, deleteDoc, doc, getDocs } from "firebase/firestore";
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

export async function deleteAll(collectionName){
    try{
    const querySnapshot = await getDocs(collection(database,collectionName));
        querySnapshot.forEach((docSnapshot) => {
            deleteDoc(doc(database, collectionName, docSnapshot.id));
        });
    } catch (err) {
        console.error("Error deleting document: ", err);
    }
}