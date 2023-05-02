import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import CalendarPicker from 'react-native-calendar-picker';
import ScreenComponent from '../../FCComponents/ScreenComponent';
import ButtonMain from '../../FCComponents/Buttons';
import { useNavigation } from '@react-navigation/native';

const SpaOrder = () => {
    const navigation = useNavigation();

    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedGender, setSelectedGender] = useState(null);
    const [selectedDuration, setSelectedDuration] = useState(null);
    const [doubleRoom, setDoubleRoom] = useState(false);
    const [selectedQueue, setSelectedQueue] = useState(null);
    const [availableAppointments, setAvailableAppointments] = useState([
        { date: '2023-04-30', time: '10:00', gender: 'male', duration: 45, doubleRoom: false, queue: 'queue1' },
        { date: '2023-04-30', time: '11:00', gender: 'female', duration: 60, doubleRoom: true, queue: 'queue1' },
        { date: '2023-04-30', time: '12:00', gender: 'male', duration: 75, doubleRoom: false, queue: 'queue2' },
        { date: '2023-04-30', time: '13:00', gender: 'female', duration: 90, doubleRoom: true, queue: 'queue2' },
    ]);
    const [availableQueues, setAvailableQueues] = useState([]);

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

    const handleDateSelect = (date) => {
        setSelectedDate(date);
    };

    const handleGenderSelect = (gender) => {
        setSelectedGender((prevGender) => prevGender === gender ? null : gender);
    };

    const handleDurationSelect = (duration) => {
        setSelectedDuration(parseInt(duration));
    };

    const handleDoubleRoomSelect = (value) => {
        setDoubleRoom((prevValue) => !prevValue);
    };

    const handleQueueSelect = (queue) => {
        setSelectedQueue((prevQueue) => prevQueue === queue ? null : queue);
    };

    const handleAppointmentSelect = (appointment) => {
        console.log('Selected appointment:', appointment);
    };

    const filterAppointments = () => {
        let filteredAppointments = availableAppointments.filter(appointment => {
            if (selectedGender && appointment.gender !== selectedGender) {
                return false;
            }
            if (selectedDuration && appointment.duration !== selectedDuration) {
                return false;
            }
            if (doubleRoom && !appointment.doubleRoom) {
                return false;
            }
            if (selectedDate && appointment.date !== selectedDate.format('YYYY-MM-DD')) {
                return false;
            }
            if (selectedQueue && appointment.queue !== selectedQueue) {
                return false;
            }
            return true;
        });
        return filteredAppointments;
    };
    const renderAppointment = (appointment) => {
        return (
            <TouchableOpacity key={appointment.time} style={styles.appointmentItem} onPress={() => handleAppointmentSelect(appointment)}>
                <Text>{appointment.time}</Text>
            </TouchableOpacity>
        );
    };
    return (
        <ScreenComponent
            content={
                <View style={styles.container}>
                    <Text
                        style={{
                            fontWeight: 'bold',
                            fontSize: 40,
                            paddingBottom: 100,
                            paddingTop: Platform.OS === "android" ? StatusBar.TouchableHighlight : 70
                        }}>
                        MASSAGE TREATMENTS</Text>
                    <View
                        style={{
                            paddingBottom: 100,
                        }}>
                        <CalendarPicker
                            onDateChange={handleDateSelect}
                            allowRangeSelection={false}
                            minDate={new Date()}
                            selectedDayColor="#D3B9B3"
                            selectedDayTextColor="#FFFFFF"
                        />
                    </View>
                    <View
                        style={{
                            backgroundColor: '#F0E8E6',
                            flexDirection: 'row',
                            marginTop: 20,
                            padding: 10,
                            height: 148,
                            width: '100%',
                            justifyContent: 'center',
                        }}>
                        <View
                            style={{
                                flexDirection: 'col',
                            }}>
                            <View style={styles.filtersContainer}>
                                <Text style={styles.filterLabel}>Therapist Gender:</Text>
                                <TouchableOpacity style={[styles.filterButton, selectedGender === 'male' && styles.selectedFilterButton]} onPress={() => handleGenderSelect('male')}>
                                    <Text style={styles.filterButtonText}>Male</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={[styles.filterButton, selectedGender === 'female' && styles.selectedFilterButton]} onPress={() => handleGenderSelect('female')}>
                                    <Text style={styles.filterButtonText}>Female</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.filtersContainer}>
                                <Text style={styles.filterLabel}>Couples Massage:</Text>
                                <TouchableOpacity style={[styles.filterButton, doubleRoom === 'true' && styles.selectedFilterButton]} onPress={() => handleDoubleRoomSelect('true')}>
                                    <Text style={styles.filterButtonText}>Yes Please</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={styles.filtersContainer}>
                            <Text style={styles.filterLabel}>Session Duration:</Text>
                            <TouchableOpacity style={[styles.filterButton, selectedDuration === 45 && styles.selectedFilterButton]} onPress={() => handleDurationSelect('45')}>
                                <Text style={styles.filterButtonText}>45 min</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.filterButton, selectedDuration === 60 && styles.selectedFilterButton]} onPress={() => handleDurationSelect('60')}>
                                <Text style={styles.filterButtonText}>60 min</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.filterButton, selectedDuration === 75 && styles.selectedFilterButton]} onPress={() => handleDurationSelect('75')}>
                                <Text style={styles.filterButtonText}>75 min</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.filterButton, selectedDuration === 90 && styles.selectedFilterButton]} onPress={() => handleDurationSelect('90')}>
                                <Text style={styles.filterButtonText}>90 min</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <ButtonMain buttonStyle={{
                        top: 100,
                        bottom: 10,
                    }}
                        onPress={() => navigation.navigate("HealthDeclarationScreen")}
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
        flexDirection: 'col',
        justifyContent: 'center',
        alignItems: 'center',
        justifyContent: 'space-around',
    },
    pickerContainer: {
        flexDirection: 'col',
        alignItems: 'top',
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
        backgroundColor: '#F0E8E6',
        flexDirection: 'row',
        marginTop: -80,
        padding: 10,
        height: 148,
        width: '100%',
        justifyContent: 'center',
    },
    filtersContainer: {
        marginTop: -1,
        backgroundColor: '#D3B9B3',
        padding: 9,
        alignItems: 'center',
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
        backgroundColor: "#D3B9B3",
        borderRadius: 50,
    },
    button: {
        backgroundColor: '#926255',
        padding: 16,
        alignItems: 'center',
        borderRadius: 8,
        marginTop: 16,
    },
});

export default SpaOrder;