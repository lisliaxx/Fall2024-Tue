import { StyleSheet, Text, View, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { getAllDocuments, writeToDB } from "../Firebase/firestoreHelper";

export default function GoalUsers({ id }) {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    // fetch data
    async function fetchData() {
      try {
        const dataFromDB = await getAllDocuments(`goals/${id}/users`);
        if (dataFromDB.length) {
          console.log("reading data from DB");
          setUsers(
            dataFromDB.map((user) => {
              return user.name;
            })
          );
          return;
        }
        console.log("reading data from API");

        const response = await fetch(
          "https://jsonplaceholder.typicode.com/users/"
        );
        // promise is not getting rejected if there is an HTTP error (status code not in 200s)
        // we have to check response.ok
        if (!response.ok) {
          // what to do in case of an HTTP error e.g. 404
          // throw an error
          throw new Error(
            `An HTTP error happened with status: ${response.status}`
          );
        }
        // this code will only execute if the response.ok is true
        //extract data
        const data = await response.json();
        // set the users state variable from the data
        data.forEach((user) => writeToDB(user, `goals/${id}/users`));
        setUsers(
          data.map((user) => {
            return user.name;
          })
        );
      } catch (err) {
        console.log("fetch user data ", err);
      }
    }
    fetchData();
  }, []);
  return (
    <View>
      <FlatList
        data={users}
        renderItem={({ item }) => {
          return <Text>{item}</Text>;
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({});