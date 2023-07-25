import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import Languages from "../../Json_files/Languages";

import ScreenComponent from "../../FCComponents/ScreenComponent";
import ButtonMain from "../../FCComponents/Buttons";
import { useNavigation, useRoute } from "@react-navigation/native";
import { ScrollView } from "react-native-gesture-handler";
import { HotelsAppContext } from "../../Context/HotelsAppContext";

function SpaOrderPart2() {
  const {
    params: { freeQeues, name, basePrice, priceForAdditional15 },
  } = useRoute();

  const { language, user, order } = useContext(HotelsAppContext);
  const screenContent = Languages.SpaOrderPart2;

  const spaDate = freeQeues?.[0]?.Date || null;

  const navigation = useNavigation();

  const [selectedGender, setSelectedGender] = useState(null);
  const [selectedSecondaryGender, setSelectedSecondaryGender] = useState(null);
  const [selectedDuration, setSelectedDuration] = useState(45);
  const [doubleRoom, setDoubleRoom] = useState(false);
  const [selectedQueue, setSelectedQueue] = useState(null);

  const handleGenderSelect = (gender) => {
    setSelectedGender((prevGender) => (prevGender === gender ? null : gender));
  };

  const handleSecondaryGenderSelect = (gender) => {
    setSelectedSecondaryGender((prevGender) =>
      prevGender === gender ? null : gender
    );
  };

  const handleDoubleRoomSelect = () => {
    setDoubleRoom((prevValue) => !prevValue);
  };

  useEffect(() => {
    if (!doubleRoom) {
      setSelectedSecondaryGender(null);
    }
  }, [doubleRoom]);

  const handleNext = () => {
    console.log(selectedSecondaryGender);
    if (selectedQueue) {
      const objSpa = {
        coupleRoom: doubleRoom,
        counter: doubleRoom ? 1 : 2,
        duration: selectedDuration,
        gender: selectedGender,
        secondaryGender: selectedSecondaryGender,
        dateSpa: spaDate,
        queue: selectedQueue?.StartTime,
        name,
        basePrice,
        priceForAdditional15,
        ScheduleID: selectedQueue?.ScheduleID,
        EndTime: calculateEndTime(selectedQueue?.StartTime, selectedDuration),
      };
      navigation.navigate("HealthDeclarationScreen", {
        objSpa,
      });
    }
  };

  const filteredQeues = () => {
    if (
      !Array.isArray(freeQeues) ||
      freeQeues.length === 0 ||
      !selectedGender ||
      (doubleRoom && !selectedSecondaryGender)
    ) {
      console.log("Returning empty array 1");
      return [];
    }

    const validQeues = freeQeues?.filter(
      (obj) => obj !== null && obj !== undefined
    );
    let retVal = [];

    let sequences = [];
    for (i = 0; i < validQeues.length - 1; i++) {
      const endTime = convertTimeToMinutes(
        calculateEndTime(validQeues[i]?.StartTime, selectedDuration)
      );
      const currentSequence = [];
      currentSequence.push(validQeues[i]);

      for (j = i + 1; j < validQeues.length; j++) {
        if (convertTimeToMinutes(validQeues[j]?.StartTime) > endTime) break;
        currentSequence.push(validQeues[j]);
      }
      sequences.push(currentSequence);
    }

    let filteredSequences = [];
    let disabledValues = [];

    for (i = 0; i < sequences.length; i++) {
      if (!doubleRoom) {
        if (selectedGender === "male") {
          const isEmpty =
            sequences[i]?.filter((obj) => obj.AvailableMale == 0)?.length === 0;
          if (isEmpty) {
            filteredSequences.push(sequences[i]);
          } else {
            disabledValues.push(
              ...sequences[i]?.filter((obj) => obj.AvailableMale == 0)
            );
          }
        } else {
          const isEmpty =
            sequences[i]?.filter((obj) => obj.AvailableFemale == 0)?.length ===
            0;
          if (isEmpty) {
            filteredSequences.push(sequences[i]);
          } else {
            disabledValues.push(
              ...sequences[i]?.filter((obj) => obj.AvailableFemale == 0)
            );
          }
        }
      } else {
        if (
          selectedGender === "male" &&
          selectedSecondaryGender === selectedGender
        ) {
          const isEmpty =
            sequences[i]?.filter((obj) => obj.AvailableMale < 2)?.length === 0;
          if (isEmpty) {
            filteredSequences.push(sequences[i]);
          } else {
            disabledValues.push(
              ...sequences[i]?.filter((obj) => obj.AvailableMale < 2)
            );
          }
        } else if (
          selectedGender === "female" &&
          selectedSecondaryGender === selectedGender
        ) {
          const isEmpty =
            sequences[i]?.filter((obj) => obj.AvailableFemale < 2)?.length ===
            0;
          if (isEmpty) {
            filteredSequences.push(sequences[i]);
          } else {
            disabledValues.push(
              ...sequences[i]?.filter((obj) => obj.AvailableFemale < 2)
            );
          }
        } else {
          const isEmpty =
            sequences[i]?.filter(
              (obj) => obj.AvailableFemale < 1 && obj.AvailableMale < 1
            )?.length === 0;
          if (isEmpty) {
            filteredSequences.push(sequences[i]);
          } else {
            disabledValues.push(
              ...sequences[i]?.filter(
                (obj) => obj.AvailableFemale < 1 && obj.AvailableMale < 1
              )
            );
          }
        }
      }
    }

    for (let i = 0; i < filteredSequences.length; i++) {
      for (let j = 0; j < filteredSequences[i].length; j++) {
        const isNotExist =
          retVal?.filter(
            (obj) => obj.ScheduleID === filteredSequences[i][j].ScheduleID
          ).length === 0;
        if (isNotExist) {
          retVal.push(filteredSequences[i][j]);
        }
      }
    }

    const disabledStartTimesSet = new Set(
      disabledValues.map((obj) => obj.StartTime)
    );
    const disabledStartTimes = Array.from(disabledStartTimesSet);

    let disabledIDs = [];
    for (let i = 0; i < disabledStartTimes.length; i++) {
      const minStartTime = convertTimeToMinutes(
        calculateStartTime(disabledStartTimes[i], selectedDuration)
      );

      const disabledObjects = retVal
        ?.filter(
          (obj) =>
            convertTimeToMinutes(obj.StartTime) >= minStartTime &&
            convertTimeToMinutes(obj.StartTime) <
              convertTimeToMinutes(disabledStartTimes[i])
        )
        .map((obj) => obj.ScheduleID);
      console.log(disabledObjects);
      disabledIDs.push(...disabledObjects);
    }

    let filteredRetVal = retVal?.filter(
      (obj) => !disabledIDs.includes(obj.ScheduleID)
    );

    return filteredRetVal || [];
  };

  const convertTimeToMinutes = (timeString) => {
    const [hours, minutes] = timeString.split(":");
    return parseInt(hours) * 60 + parseInt(minutes);
  };

  const calculateEndTime = (startTime, duration) => {
    if (!startTime || typeof startTime !== "string") {
      return "";
    }

    const [hours, minutes] = startTime.split(":");
    const startMinutes = parseInt(hours) * 60 + parseInt(minutes);
    const endMinutes = startMinutes + parseInt(duration);
    const endHours = Math.floor(endMinutes / 60);
    const endMinutesRemainder = endMinutes % 60;
    const endTime = `${String(endHours).padStart(2, "0")}:${String(
      endMinutesRemainder
    ).padStart(2, "0")}`;
    return endTime + ":00";
  };

  const calculateStartTime = (startTime, duration) => {
    if (!startTime || typeof startTime !== "string") {
      return "";
    }

    const [hours, minutes] = startTime.split(":");
    const startMinutes = parseInt(hours) * 60 + parseInt(minutes);
    const endMinutes = startMinutes - parseInt(duration);
    const endHours = Math.floor(endMinutes / 60);
    const endMinutesRemainder = endMinutes % 60;
    const endTime = `${String(endHours).padStart(2, "0")}:${String(
      endMinutesRemainder
    ).padStart(2, "0")}`;
    return endTime + ":00";
  };

  useEffect(() => {
    filteredQeues();
  }, [selectedGender]);

  return (
    <ScreenComponent
      content={
        <View style={styles.container}>
          <View
            style={{
              flexDirection: "row",
              marginTop: 50,
              padding: 10,
              height: "50%",
              width: "100%",
              justifyContent: "center",
            }}
          >
            <View
              style={{
                flexDirection: "column",
              }}
            >
              <View style={styles.filtersContainer}>
                <Text style={styles.filterLabel}>
                  {doubleRoom
                    ? screenContent.Therapist1[language]
                    : screenContent.Therapist[language]}
                </Text>
                <TouchableOpacity
                  style={[
                    styles.filterButton,
                    selectedGender === "male" && styles.selectedFilterButton,
                  ]}
                  onPress={() => handleGenderSelect("male")}
                >
                  <Text style={styles.filterButtonText}>
                    {screenContent.Male[language]}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.filterButton,
                    selectedGender === "female" && styles.selectedFilterButton,
                  ]}
                  onPress={() => handleGenderSelect("female")}
                >
                  <Text style={styles.filterButtonText}>
                    {screenContent.Female[language]}
                  </Text>
                </TouchableOpacity>
                {doubleRoom ? (
                  <View style={{ marginTop: 20,  }}>
                    <Text style={styles.filterLabel}>
                      {screenContent.Therapist2[language]}
                    </Text>
                    <TouchableOpacity
                      style={[
                        styles.filterButton,
                        selectedSecondaryGender === "male" &&
                          styles.selectedFilterButton,
                      ]}
                      onPress={() => handleSecondaryGenderSelect("male")}
                    >
                      <Text style={styles.filterButtonText}>
                        {screenContent.Male[language]}
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[
                        styles.filterButton,
                        selectedSecondaryGender === "female" &&
                          styles.selectedFilterButton,
                      ]}
                      onPress={() => handleSecondaryGenderSelect("female")}
                    >
                      <Text style={styles.filterButtonText}>
                        {" "}
                        {screenContent.Female[language]}
                      </Text>
                    </TouchableOpacity>
                  </View>
                ) : (
                  <></>
                )}
              </View>
              <View style={styles.space}>
                <View style={styles.filtersContainer}>
                  <Text style={styles.filterLabel}>
                    {screenContent.CouplesMassage[language]}
                  </Text>
                  <TouchableOpacity
                    style={[
                      styles.filterButton,
                      doubleRoom === true && styles.selectedFilterButton,
                    ]}
                    onPress={handleDoubleRoomSelect}
                  >
                    <Text style={styles.filterButtonText}>
                      {screenContent.YesPlease[language]}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            <View style={styles.filtersContainer}>
              <Text style={styles.filterLabel}>
                {screenContent.SessionDuration[language]}
              </Text>
              <TouchableOpacity
                style={[
                  styles.filterButton,
                  { marginTop: 20 },
                  selectedDuration === 45 && styles.selectedFilterButton,
                ]}
                onPress={() => setSelectedDuration(45)}
              >
                <Text style={styles.filterButtonText}>
                  45 {screenContent.minutes[language]}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.filterButton,
                  selectedDuration === 60 && styles.selectedFilterButton,
                ]}
                onPress={() => setSelectedDuration(60)}
              >
                <Text style={styles.filterButtonText}>
                  60 {screenContent.minutes[language]}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.filterButton,
                  selectedDuration === 75 && styles.selectedFilterButton,
                ]}
                onPress={() => setSelectedDuration(75)}
              >
                <Text style={styles.filterButtonText}>
                  75 {screenContent.minutes[language]}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.filterButton,
                  selectedDuration === 90 && styles.selectedFilterButton,
                ]}
                onPress={() => setSelectedDuration(90)}
              >
                <Text style={styles.filterButtonText}>
                  90 {screenContent.minutes[language]}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <View
            style={{
              marginTop: 200,
              paddingHorizontal: 20,
              height: 250,
              marginBottom: 10,
            }}
          >
            <Text style={[styles.optionTitel, { marginBottom: 10 }]}>
              {screenContent.SelectOption[language]}
            </Text>

            <ScrollView showsVerticalScrollIndicator={false}>
              <View style={styles.optionContainer}>
                {filteredQeues().map((item, index) => (
                  <TouchableOpacity
                    style={[
                      styles.option,
                      item.StartTime === selectedQueue?.StartTime &&
                        styles.selectOption,
                    ]}
                    onPress={() => setSelectedQueue(item)}
                    key={index}
                  >
                    <Text style={styles.options}>
                      {item?.StartTime?.substring(0, 5)}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </ScrollView>
          </View>
          <ButtonMain
            buttonStyle={{
              top: 100,
              bottom: 10,
              height: 50,
            }}
            onPress={handleNext}
            text={screenContent.NEXT[language]}
          />
        </View>
      }
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 0.75,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    justifyContent: "space-around",
  },
  filterButton: {
    paddingVertical: 5,
    marginTop: 2,
    justifyContent:"center",
    alignSelf:"center"
  },
  horizontalScrollViewContent: {
    flexDirection: "row",
  },
  optionContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 8, // Adjust this value to control the gap between rows
  },
  space: {
    paddingTop: 8,
  },
  filtersContainer: {
    marginTop: -1,
    backgroundColor: "#D3B9B3",
    padding: 5,
    alignItems: "center",
    borderRadius: 20,
    margin: 4,
    width: 180,
    flexDirection: "column",
  },
  filterButtonText: {
    color: "#000000",
  },
  filterLabel: {
    fontSize: 20,
    fontWeight: "bold",
  },
  filterButtonText: {
    fontSize: 18,
    padding: 4,
    paddingTop: 2,
  },
  selectedFilterButton: {
    color: "#FFFFFF",
    backgroundColor: "#F0E8E6",
    borderRadius: 80,
    padding: 5,
  },
  button: {
    backgroundColor: "#926255",
    padding: 16,
    alignItems: "center",
    borderRadius: 8,
    marginTop: 16,
  },
  option: {
    backgroundColor: "#F0E8E6",
    alignItems: "center",
    borderRadius: 20,
    margin: 4,
    flexDirection: "row", // Change flexDirection to "row"
    justifyContent: "space-evenly",
    height: 80, // Set the height if needed
    width: 80, // Set the width for each item (adjust as per your requirement)
  },
  optionTitel: {
    fontSize: 25,
    fontWeight: "bold",
    textAlign: "center",
  },
  selectOption: {
    color: "#FFFFFF",
    backgroundColor: "#D3B9B3",
    borderRadius: 80,
    padding: 5,
  },
});

export default SpaOrderPart2;
