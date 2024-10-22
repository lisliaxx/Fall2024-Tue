import { addDoc, collection, deleteDoc, doc, getDocs, updateDoc } from "firebase/firestore";
import { database } from "./firebaseSetup";

export async function writeToDB(data, collectionName) {
    try {
        getAllDocuments(`goals/${id}/users`);
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

export async function updateWarningStatus(docId, collectionName, isWarning) {
    try {
        const docRef = doc(database, collectionName, docId);
        await updateDoc(docRef, {
            warning: isWarning
        });
        console.log(`Warning status updated for document ${docId}`);
    } catch (err) {
        console.error("Error updating warning status: ", err);
        throw err;
    }
}

export async function getAllDocuments(collectionName){
    try{
    const querySnapshot = await getDocs(collection(database, collectionName));
    const data = [];
    querySnapshot.forEach((docSnap) => {
        data.pushdocSnap.data()});

    return data;
} catch (err) {
    console.error("Error getting documents: ", err);
}
}