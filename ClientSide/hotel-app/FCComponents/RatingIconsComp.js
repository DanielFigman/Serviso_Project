import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useContext, useEffect, useRef, useState } from "react";
import {
  faFaceGrinHearts,
  faFaceAngry,
  faFaceFrown,
  faFaceSmile,
  faFaceMeh,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { HotelsAppContext } from "../Context/HotelsAppContext";
import Languages from "../Json_files/Languages";

const RatingIconsComp = ({ item }) => {
  const { language } = useContext(HotelsAppContext);
  const screenContent = Languages.RatingIconsComp;

  const [currRated, setCurrRated] = useState(undefined);

  const { setUpdatedActivities, updatedActivities } =
    useContext(HotelsAppContext);

  const getRatingFromIcon = (value) => {
    switch (value) {
      case "faFaceGrinHearts":
        return 5;
      case "faFaceSmile":
        return 4;
      case "faFaceMeh":
        return 3;
      case "faFaceFrown":
        return 2;
      case "faFaceAngry":
        return 1;
      default:
        return null;
    }
  };

  const getIconFromRating = (value) => {
    switch (value) {
      case 5:
        return "faFaceGrinHearts";
      case 4:
        return "faFaceSmile";
      case 3:
        return "faFaceMeh";
      case 2:
        return "faFaceFrown";
      case 1:
        return "faFaceAngry";
      default:
        return null;
    }
  };

  const handleSelection = (value) => {
    if (value && value !== currRated) {
      setCurrRated(value);
    } else {
      setCurrRated(null);
    }
  };

  useEffect(() => {
    const filteredActivities = updatedActivities.filter(
      (obj) => obj.placeID === item.placeID
    );
    const rating =
      filteredActivities.length > 0 ? filteredActivities[0].rating : null;

    if (rating === undefined || rating === null) {
      setCurrRated(null);
    } else {
      setCurrRated(getIconFromRating(rating));
    }
  }, [updatedActivities]);

  useEffect(() => {
    if (currRated !== undefined) {
      if (
        updatedActivities.filter((obj) => obj.placeID === item.placeID).length >
        0
      ) {
        const activities = updatedActivities.map((obj) => {
          if (obj.placeID === item.placeID) {
            obj.rating = getRatingFromIcon(currRated);
          }
          return obj;
        });
        setUpdatedActivities(activities);
      } else {
        let newActivityUpdate = {
          placeID: item.placeID,
          rating: getRatingFromIcon(currRated),
        };
        setUpdatedActivities([...updatedActivities, newActivityUpdate]);
      }
    }
  }, [currRated]);

  return (
    <>
      <View style={{ display: "flex", flexDirection: "column", flex: 1 }}>
        <Text style={{ marginBottom: 20, fontSize: 15, fontWeight: "bold" }}>
          {screenContent.WhatAreYourThoughtsAboutThePlace[language]}
        </Text>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            marginHorizontal: 10,
            justifyContent: "space-between",
            flex: 1,
          }}
        >
          <TouchableOpacity onPress={() => handleSelection("faFaceGrinHearts")}>
            <View
              style={
                currRated === "faFaceGrinHearts"
                  ? styles.selected
                  : styles.notSelected
              }
            >
              <FontAwesomeIcon
                icon={faFaceGrinHearts}
                style={styles.icon}
                size={50}
                color="#d8b0b0"
              />
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => handleSelection("faFaceSmile")}>
            <View
              style={
                currRated === "faFaceSmile"
                  ? styles.selected
                  : styles.notSelected
              }
            >
              <FontAwesomeIcon
                icon={faFaceSmile}
                style={styles.icon}
                size={50}
                color="#d8b0b0"
              />
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => handleSelection("faFaceMeh")}>
            <View
              style={
                currRated === "faFaceMeh" ? styles.selected : styles.notSelected
              }
            >
              <FontAwesomeIcon
                icon={faFaceMeh}
                style={styles.icon}
                size={50}
                color="#d8b0b0"
              />
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => handleSelection("faFaceFrown")}>
            <View
              style={
                currRated === "faFaceFrown"
                  ? styles.selected
                  : styles.notSelected
              }
            >
              <FontAwesomeIcon
                icon={faFaceFrown}
                style={styles.icon}
                size={50}
                color="#d8b0b0"
              />
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => handleSelection("faFaceAngry")}>
            <View
              style={
                currRated === "faFaceAngry"
                  ? styles.selected
                  : styles.notSelected
              }
            >
              <FontAwesomeIcon
                icon={faFaceAngry}
                style={styles.icon}
                size={50}
                color="#d8b0b0"
              />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

export default RatingIconsComp;

const styles = StyleSheet.create({
  selected: {
    borderRadius: "50%",
    borderColor: "black",
    borderWidth: 2,
    padding: 3,
  },
  notSelected: {
    borderRadius: "50%",
    borderColor: "transparent",
    borderWidth: 2,
    padding: 3,
  },
});
