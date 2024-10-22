import { View, Text } from 'react-native'
import React, { useEffect } from 'react'

export default function GoalUsers() {
    const [users, setUsers] = useState([]);
    useEffect(() => {
        async function fetchData() {
            try {
        const response = await fetch("https://jsonplaceholder.typicode.com/users/"
            );
            if (!response.ok) {
                throw new Error(
                    `An HTTP error happend with status ${response.status}`
                );
            }
            const data = await response.json();
            consle.log(data);
        } catch (error) {
            console.log("fetch user data ", error);
            }
        }
        fetchData();
    },[]);

  return (
    <View>
      <Text>
      
</Text>
    </View>
  )
}

const styles = StyleSheet.create({})