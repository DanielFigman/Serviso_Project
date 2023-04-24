import { View, Text, StyleSheet, TextInput } from "react-native";
import "react-native-vector-icons/FontAwesome";
import ScreenComponent from "../../FCComponents/ScreenComponent";
import { AirbnbRating } from "@rneui/themed";
import React, { useState } from "react";
// import StarRating from "react-native-star-rating";
// import Icon from "react-native-vector-icons/FontAwesome";

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
          <Text style={styles.text}>
            {/* <StarRating
              disabled={false}
              maxStars={5}
              rating={rating}
              selectedStar={(rating) => onStarRatingPress(rating)}
              fullStar={<Icon name={"star"} size={25} color={"#F5B000"} />}
              emptyStar={<Icon name={"star-o"} size={25} color={"#F5B000"} />}
            /> */}
            Was the activity a good fit for your personaliti?
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
