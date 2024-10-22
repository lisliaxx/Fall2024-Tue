import { View, Text, StyleSheet, FlatList } from 'react-native'
import React, { useEffect } from 'react'
import { writeDataToDB } from '../Firebase/firestoreHelper';

export default function GoalUsers(id) {
    const [users, setUsers] = useState([]);
    useEffect(() => {
        async function fetchData() {
            try {
                 const dataFromDB = await getAllDocuments(`goals/${id}/users`);
                 if(dataFromDB.length){
                    setUsers(
                        dataFromDB.map((user) => {
                        return user.name;
                    }));
                    return;
                 }
                 console.log("fetching data from API");
        const response = await fetch(
            "https://jsonplaceholder.typicode.com/users/"
            );
            if (!response.ok) {
                throw new Error(
                    `An HTTP error happend with status ${response.status}`
                );
            }
            const data = await response.json();
            data.forEach((user) => {
                writeDataToDB(user, `goals/${id}/users`);
            });
            setUsers(
                data.map((user) => {
                    return user.name;
                }
            ));
            consle.log(data);
        } catch (error) {
            console.log("fetch user data ", error);
            }
        }
        fetchData();
    },[]);

  return (
    <View>
        <FlatList 
            data={users} 
            renderItem={({item}) => <Text>{item}</Text>} />
    </View>
  )
}

const styles = StyleSheet.create({})