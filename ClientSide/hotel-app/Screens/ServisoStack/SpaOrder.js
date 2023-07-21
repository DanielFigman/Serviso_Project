import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import CalendarPicker from "react-native-calendar-picker";
import ScreenComponent from "../../FCComponents/ScreenComponent";
import ButtonMain from "../../FCComponents/Buttons";
import { useNavigation } from "@react-navigation/native";

const SpaOrder = () => {
  const navigation = useNavigation();

  const [selectedDate, setSelectedDate] = useState(null);

  const handleDateSelect = (date) => {
    setSelectedDate(date);
  };

  const handlaNext = () => {
    if (selectedDate)
      navigation.navigate("SpaOrderPart2", { date: selectedDate })
  }

  return (
    <ScreenComponent
      content={
        <View style={styles.container}>
          <Text
            style={{
              fontWeight: "bold",
              fontSize: 40,
              paddingBottom: 100,
              paddingTop:
                Platform.OS === "android" ? StatusBar.TouchableHighlight : 80,
            }}
          >
            MASSAGE TREATMENTS
          </Text>
          <View
            style={{
              paddingBottom: 30,
              paddingTop: 40,
            }}
          >
            <CalendarPicker
              onDateChange={handleDateSelect}
              allowRangeSelection={false}
              minDate={new Date()}
              selectedDayColor="#D3B9B3"
              selectedDayTextColor="#FFFFFF"
            />
          </View>
          <ButtonMain
            buttonStyle={{
              top: 100,
              bottom: 10,
            }}
            onPress={handlaNext}
            text={"NEXT"}
          />
        </View>
      }
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 0.75,
    flexDirection: "col",
    justifyContent: "center",
    alignItems: "center",
    justifyContent: "space-around",
  },
  pickerContainer: {
    flexDirection: "col",
    alignItems: "top",
  },
  label: {
    fontSize: 20,
    padding: 9,
    marginRight: 10,
  },
  picker: {
    width: 100,
  },
  appointmentItem: {
    backgroundColor: "#F0E8E6",
    flexDirection: "row",
    marginTop: -80,
    padding: 10,
    height: 148,
    width: "100%",
    justifyContent: "center",
  },
  filtersContainer: {
    marginTop: -1,
    backgroundColor: "#D3B9B3",
    padding: 9,
    alignItems: "center",
    borderRadius: 20,
    margin: 4,
    width: 140,
    flexDirection: "col",
    justifyContent: "space-evenly",
    selectedColor: "#D3B9B3",
    selectedTextColor: "#FFFFFF",
  },
  filterButtonText: {
    color: "#000000",
  },
  selectedFilterButton: {
    color: "#FFFFFF",
    backgroundColor: "#C8C3BE",
    borderRadius: 50,
  },
  button: {
    backgroundColor: "#926255",
    padding: 16,
    alignItems: "center",
    borderRadius: 8,
    marginTop: 16,
  },
});

export default SpaOrder;