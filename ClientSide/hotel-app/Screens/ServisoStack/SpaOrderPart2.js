import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    SafeAreaView,
} from "react-native";
import ScreenComponent from "../../FCComponents/ScreenComponent";
import ButtonMain from "../../FCComponents/Buttons";
import { useNavigation, useRoute } from "@react-navigation/native";

function SpaOrderPart2() {

    const { params: {
        date
    } } = useRoute();

    const spaDate = date;

    const navigation = useNavigation();
    const [selectedGender, setSelectedGender] = useState(null);
    const [selectedDuration, setSelectedDuration] = useState(null);
    const [doubleRoom, setDoubleRoom] = useState(false);
    const [selectedQueue, setSelectedQueue] = useState(null);

    const handleGenderSelect = (gender) => {
        setSelectedGender((prevGender) => (prevGender === gender ? null : gender));
    };

    const handleDurationSelect = (duration) => {
        const durationint = parseInt(duration);

        setSelectedDuration((prevduration) =>
            prevduration === durationint ? null : durationint
        );
    };
    const handleDoubleRoomSelect = (value) => {
        setDoubleRoom((prevValue) => !prevValue);
    };

    useEffect(() => {
        const arrayappont = filterAppointments();
        setAvailableAppointments(arrayappont);
    }, [selectedGender, selectedDuration, doubleRoom]);

    let availableappoint = [
        {
            date: "2023-07-30",
            time: "10:00",
            gender: "male",
            duration: 45,
            doubleRoom: false,
            queue: "queue1",
        },
        {
            date: "2023-07-31",
            time: "11:00",
            gender: "female",
            duration: 60,
            doubleRoom: true,
            queue: "queue1",
        },
        {
            date: "2023-07-30",
            time: "12:00",
            gender: "male",
            duration: 75,
            doubleRoom: false,
            queue: "queue2",
        },
        {
            date: "2023-07-30",
            time: "13:00",
            gender: "female",
            duration: 90,
            doubleRoom: true,
            queue: "queue2",
        },
    ];
    const [availableAppointments, setAvailableAppointments] =
        useState(availableappoint);

    const [availableQueues, setAvailableQueues] = useState([]);

    useEffect(() => {
        const filteredarray = filterAppointments();
        setAvailableAppointments(filteredarray);
    }, [spaDate]);

    useEffect(() => {
        getAvailableQueues();
    }, [availableAppointments]);

    const getAvailableQueues = () => {
        let queues = availableAppointments.reduce((accumulator, appointment) => {
            if (!accumulator.includes(appointment.queue)) {
                accumulator.push(appointment.queue);
            }
            return accumulator;
        }, []);
        setAvailableQueues(queues);
    };

    const handleNext = () => {
        if (selectedQueue) {
            const objSpa = {
                coupleRoom: doubleRoom,
                counter: doubleRoom ? 1 : 2,
                duration: selectedDuration,
                gender: selectedGender,
                dateSpa: spaDate,
                queue: selectedQueue,
            };
            navigation.navigate("HealthDeclarationScreen", {
                objSpa,
            });
        }

    }

    const filterAppointments = () => {
        let filteredAppointments = availableappoint.filter((appointment) => {
            if (selectedGender != null && selectedGender !== appointment.gender) {
                return false;
            }
            if (
                selectedDuration != null &&
                selectedDuration &&
                appointment.duration !== selectedDuration
            ) {
                return false;
            }
            if (doubleRoom != null && doubleRoom && !appointment.doubleRoom) {
                return false;
            }
            if (spaDate && appointment.date !== spaDate.format("YYYY-MM-DD")) {
                return false;
            }
            return true;
        });
        return filteredAppointments;
    };
    return (
        <ScreenComponent
            content={
                <View style={styles.container}>
                    <View
                        style={{
                            flexDirection: "row",
                            marginTop: 20,
                            padding: 10,
                            height: "50%",
                            width: "100%",
                            justifyContent: "center",
                        }}
                    >
                        <View
                            style={{
                                flexDirection: "col",
                            }}
                        >
                            <View style={styles.filtersContainer}>
                                <Text style={styles.filterLabel}>Therapist Gender:</Text>
                                <TouchableOpacity
                                    style={[
                                        styles.filterButton,
                                        selectedGender === "male" && styles.selectedFilterButton,
                                    ]}
                                    onPress={() => handleGenderSelect("male")}
                                >
                                    <Text style={styles.filterButtonText}>Male</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={[
                                        styles.filterButton,
                                        selectedGender === "female" && styles.selectedFilterButton,
                                    ]}
                                    onPress={() => handleGenderSelect("female")}
                                >
                                    <Text style={styles.filterButtonText}>Female</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.space}>
                                <View style={styles.filtersContainer}>
                                    <Text style={styles.filterLabel}>Couples Massage:</Text>
                                    <TouchableOpacity
                                        style={[
                                            styles.filterButton,
                                            doubleRoom === true && styles.selectedFilterButton,
                                        ]}
                                        onPress={() => handleDoubleRoomSelect(true)}
                                    >
                                        <Text style={styles.filterButtonText}>Yes Please</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                        <View style={styles.filtersContainer}>
                            <Text style={styles.filterLabel}>Session Duration:</Text>
                            <TouchableOpacity
                                style={[
                                    styles.filterButton,
                                    selectedDuration === 45 && styles.selectedFilterButton,
                                ]}
                                onPress={() => handleDurationSelect("45")}
                            >
                                <Text style={styles.filterButtonText}>45 min</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[
                                    styles.filterButton,
                                    selectedDuration === 60 && styles.selectedFilterButton,
                                ]}
                                onPress={() => handleDurationSelect("60")}
                            >
                                <Text style={styles.filterButtonText}>60 min</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[
                                    styles.filterButton,
                                    selectedDuration === 75 && styles.selectedFilterButton,
                                ]}
                                onPress={() => handleDurationSelect("75")}
                            >
                                <Text style={styles.filterButtonText}>75 min</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[
                                    styles.filterButton,
                                    selectedDuration === 90 && styles.selectedFilterButton,
                                ]}
                                onPress={() => handleDurationSelect("90")}
                            >
                                <Text style={styles.filterButtonText}>90 min</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.option}>
                        <Text style={styles.optionTitel}>select option:</Text>
                        {availableAppointments.map((each, index) => {
                            return (
                                <View key={index}>
                                    <TouchableOpacity
                                        style={
                                            each.time == selectedQueue ? styles.selectOption : null
                                        }
                                        onPress={() => {
                                            setSelectedQueue(each.time);
                                        }}
                                    >
                                        <Text style={styles.options}>{each.time}</Text>
                                    </TouchableOpacity>
                                </View>
                            );
                        })}
                    </View>
                    <ButtonMain
                        buttonStyle={{
                            top: 100,
                            bottom: 10,
                        }}
                        onPress={handleNext}
                        text={"NEXT"}
                    />
                </View>
            }
        />
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 0.75,
        flexDirection: "col",
        justifyContent: "center",
        alignItems: "center",
        justifyContent: "space-around",
    },
    space: {
        paddingTop: 8,
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
        padding: 9,
        alignItems: "center",
        borderRadius: 20,
        margin: 4,
        width: "50%",
        flexDirection: "col",
        justifyContent: "space-evenly",
        selectedColor: "#D3B9B3",
        selectedTextColor: "#FFFFFF",
    },
    optionTitel: {
        fontSize: 25,
        fontWeight: "bold",
    },
    options: {
        fontSize: 20,
    },
    selectOption: {
        color: "#FFFFFF",
        backgroundColor: "#D3B9B3",
        borderRadius: 80,
        padding: 5,
    },
});
export default SpaOrderPart2;