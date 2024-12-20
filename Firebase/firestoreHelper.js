import {addDoc, collection, deleteDoc, doc, getDoc, setDoc, getDocs} from "firebase/firestore";
import { database } from "./firebaseSetup";
  
  export async function writeToDB(data, collectionName) {
    try {
      const docRef = await addDoc(collection(database, collectionName), data);
      console.log(docRef);
    } catch (err) {
      console.log("write to db ", err);
    }
  }
  
  export async function deleteFromDB(deletedId, collectionName) {
    try {
      await deleteDoc(doc(database, collectionName, deletedId));
      // also delete the users subcollections if exists
      deleteAllFromDB(`goals/${deletedId},users`);
    } catch (err) {
      console.log("delete from DB ", err);
    }
  }
  
  export async function updateDB(id, data, collectionName) {
    try {
      await setDoc(doc(database, collectionName, id), data, { merge: true });
    } catch (err) {
      console.log("update DB ", err);
    }
  }
  
  export async function deleteAllFromDB(collectionName) {
    try {
      //get all the documents in the collection
      const querySnapshot = await getDocs(collection(database, collectionName));
      querySnapshot.forEach((docSnapshot) => {
        deleteDoc(doc(database, collectionName, docSnapshot.id));
      });
    } catch (err) {
      console.log("delete all ", err);
    }
  }
  
  export async function getAllDocuments(collectionName) {
    try {
      const querySnapshot = await getDocs(collection(database, collectionName));
      const data = [];
      if (!querySnapshot.empty) {
        querySnapshot.forEach((docSnap) => {
          data.push(docSnap.data());
        });
      }
      return data;
    } catch (err) {
      console.log("get all docs ", err);
    }
  }
  
  export async function saveUserLocation(userId, locationData) {
    try {
      await setDoc(
        doc(database, "users", userId),
        { location: locationData },
        { merge: true }
      );
      console.log("Location saved successfully");
      return true;
    } catch (err) {
      console.error("Error saving location:", err);
      return false;
    }
  }

  export async function getUserLocation(userId) {
    try {
      const docRef = await getDoc(doc(database, "users", userId));
      const userData = docRef.data();
      if (userData && userData.location) {
        return userData.location;
      }
      return null;
    } catch (err) {
      console.error("Error getting user location:", err);
      return null;
    }
  }