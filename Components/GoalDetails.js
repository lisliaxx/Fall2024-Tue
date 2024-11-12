import { Button, StyleSheet, Text, View, Image } from "react-native";
import React, { useEffect, useState } from "react";
import PressableButton from "./PressableButton";
import AntDesign from "@expo/vector-icons/AntDesign";
import { updateDB } from "../Firebase/firestoreHelper";
import GoalUsers from "./GoalUsers";
import { storage } from "../Firebase/firebaseSetup";
import { ref, getDownloadURL } from "firebase/storage";

export default function GoalDetails({ navigation, route }) {
  const { goalItem } = route.params || {};
  const [warning, setWarning] = useState(goalItem?.warning || false);
  const [imageUrl, setImageUrl] = useState(null);

  useEffect(() => {
    async function loadImage() {
      if (goalItem?.imageUri) {
        try {
          const reference = ref(storage, goalItem.imageUri);
          const url = await getDownloadURL(reference);
          setImageUrl(url);
        } catch (error) {
          console.error("Error loading image:", error);
        }
      }
    }
    loadImage();
  }, [goalItem]);

  function warningHandler() {
    setWarning(true);
    navigation.setOptions({ title: "Warning!" });
    if (goalItem?.id) {
      updateDB(goalItem.id, { warning: true }, "goals");
    }
  }

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <PressableButton
          pressedHandler={warningHandler}
          componentStyle={{ backgroundColor: "purple" }}
          pressedStyle={{ opacity: 0.5, backgroundColor: "purple" }}
        >
          <AntDesign 
            name="warning" 
            size={24} 
            color={warning ? "red" : "white"} 
          />
        </PressableButton>
      ),
    });
  }, [warning]);

  function moreDetailsHandler() {
    navigation.push("GoalDetails", {
      goalItem: { ...goalItem, text: "More details" },
      isMoreDetails: true
    });
  }

  return (
    <View style={styles.container}>
      {goalItem ? (
        <View>
          <Text style={[styles.text, warning && styles.warningStyle]}>
            This is details of a goal with text {goalItem.text} and id {goalItem.id}
          </Text>
          {imageUrl && (
            <Image
              source={{ uri: imageUrl }}
              style={styles.image}
              resizeMode="cover"
            />
          )}
          <Button 
            title="More Details" 
            onPress={moreDetailsHandler} 
          />
          {goalItem.id && <GoalUsers id={goalItem.id} />}
        </View>
      ) : (
        <Text style={[styles.text, warning && styles.warningStyle]}>
          No goal details available
        </Text>
      )}
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 16,
    marginBottom: 20,
  },
  warningStyle: {
    color: "red",
  },
  image: {
    width: 80,
    height: 80,
    marginBottom: 20,
    borderRadius: 8,
  },
});