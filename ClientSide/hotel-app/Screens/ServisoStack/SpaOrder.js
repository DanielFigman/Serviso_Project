import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Alert,
} from "react-native";
import CalendarPicker from "react-native-calendar-picker";
import ScreenComponent from "../../FCComponents/ScreenComponent";
import ButtonMain from "../../FCComponents/Buttons";
import { useNavigation, useRoute } from "@react-navigation/native";
import { HotelsAppContext } from "../../Context/HotelsAppContext";

const SpaOrder = () => {
  const navigation = useNavigation();

  const { params: {  name, basePrice, priceForAdditional15 } } = useRoute();

 

  const { user, order } = useContext(HotelsAppContext)

  const [selectedDate, setSelectedDate] = useState(null);
  const [minDate, setMinDate] = useState(null);
  const [maxDate, setMaxDate] = useState(null);
  const [disabledDates, setDisabledDates] = useState([]);

  const [appointmentObjects, setAppointmentObjects] = useState(null);

  const handleDateSelect = (date) => {
    const selectedDateObject = new Date(date);
    setSelectedDate(selectedDateObject.toISOString().split("T")[0])
  };

  const handlaNext = () => {
    if (!appointmentObjects || appointmentObjects.length === 0) {
      Alert.alert(
        "There are no available treatments left",
        "There are no available treatments left"
        [{ text: 'OK' }],
      );
    }

    if (selectedDate) {
      const selectedDateOnly = new Date(selectedDate).toISOString().slice(0, 10);
      const freeQeues = appointmentObjects.filter(obj => obj.Date.startsWith(selectedDateOnly));
      navigation.navigate("SpaOrderPart2", { freeQeues, name, basePrice, priceForAdditional15 });
    }
  }

  useEffect(() => {
    getAvailalbeAppointments();
  }, [])

  useEffect(() => {
    if (appointmentObjects) {
      const uniqueDates = getUniqueDatesFromList(appointmentObjects);
      const sortedDates = uniqueDates.sort((a, b) => a - b);
      setMinDate(sortedDates[0]);
      setMaxDate(sortedDates[sortedDates.length - 1]);
      setDisabledDates(getDisabledDates(sortedDates));
    }
  }, [appointmentObjects]);

  const getUniqueDatesFromList = (list) => {
    const uniqueDates = list.map((item) => new Date(item.Date).getTime());
    return Array.from(new Set(uniqueDates));
  };

  const getDisabledDates = (sortedDates) => {
    const disabledDates = [];
    const min = sortedDates[0];
    const max = sortedDates[sortedDates.length - 1];
    for (let i = min; i < max; i += 86400000) { // 86400000 ms = 1 day
      if (!sortedDates.includes(i)) {
        disabledDates.push(i);
      }
    }
    return disabledDates;
  };

  const getAvailalbeAppointments = async () => {
    try {
      const response = await fetch(`http://proj.ruppin.ac.il/cgroup97/test2/api/GetSpaAvailable?hotelID=${order.hotelID}&email=${user.email}`, {
        method: 'GET',
        headers: new Headers({
          'Content-type': 'application/json; charset=UTF-8',
        })
      });

      if (response.ok) {
        const message = await response.text();
        const object = JSON.parse(message);
        setAppointmentObjects(object);
      } else {
        const message = await response.text();
        const object = JSON.parse(message);
        console.log(object)
      }
    } catch (error) {
      console.log(error)
    }
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
              enableDateChange={!disabledDates || disabledDates.length === 0}
              onDateChange={handleDateSelect}
              allowRangeSelection={false}
              minDate={minDate ? new Date(minDate) : null}
              maxDate={maxDate ? new Date(maxDate) : null}
              selectedDayColor="#D3B9B3"
              selectedDayTextColor="#FFFFFF"
              disabledDates={disabledDates}
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
