import { View, Text, StyleSheet, TextInput, ScrollView } from "react-native";
import "react-native-vector-icons/FontAwesome";
import { AirbnbRating } from "@rneui/themed";
import React, { useState } from "react";
import ScreenComponent from "../../FCComponents/ScreenComponent";

const FeedbackScreen = () => {
  const [text, setText] = useState("Tell us everything");

  const [rating, setRating] = useState(0);

  const onStarRatingPress = (rating) => {
    setRating(rating);
  };

  return (
    <ScreenComponent 
      content={
        <View style={styles.row}>
          <Text style={styles.title}>Feedback</Text>
          <Text style={styles.text}>Did you enjoy from the activity?</Text>
          <Text>
            <AirbnbRating selectedColor="#D3B9B3" reviewColor="#D3B9B3" />
          </Text>
          <Text style={styles.text}>
            Was the activity a good fit for your personaliti?
          </Text>
          <Text>
            <AirbnbRating selectedColor="#D3B9B3" reviewColor="#D3B9B3" />
          </Text>
          <Text style={styles.text2}>Anything else?</Text>
          <View style={styles.tell}>
            <TextInput
              style={{ height: 100 }}
              multiline
              numberOfLines={4}
              value={text}
              onChangeText={setText}
            />
          </View>
        </View>
      }
    />
  );
};
export default FeedbackScreen;

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
    marginTop: 10,
  },
  text2: {
    fontSize: 20,
    marginTop: 20,
    fontWeight: "bold",
  },
  title: {
    fontSize: 35,
    color: "#000000",
    marginTop: 20,
  },
  row: {
    left: 5,
    padding: 10,
    margin: 8,
  },
  tell: {
    marginTop: 15,
    borderColor: "#926255",
    borderWidth: 1,
    borderRadius: 2,
  },
});