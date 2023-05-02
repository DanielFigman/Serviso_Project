import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, Switch, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import ScreenComponent from '../../FCComponents/ScreenComponent';
import ButtonMain from '../../FCComponents/Buttons';

const RoomCleaningScreen = () => {
    const [hour, setHour] = useState(8);
    const [minute, setMinute] = useState(0);
    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);

    const handleContinue = () => {
        const selectedTime = new Date();
        selectedTime.setHours(hour + 3);
        selectedTime.setMinutes(minute);
        console.log(selectedTime);
    };

    const renderHourItem = ({ item }) => (
        <Text style={styles.carouselItem}>{`${item}:00`}</Text>
    );

    const renderMinuteItem = ({ item }) => (
        <Text style={styles.carouselItem}>{item}</Text>
    );

    return (
        <ScreenComponent
            content={
                <View style={styles.container}>
                    <Text style={{ fontWeight: 'bold', fontSize: 40, margin: 10 }}>Room cleaning schedule</Text>
                    <View style={{ backgroundColor: '#F0E8E6', padding: 10, marginTop:100}}>
                        <View style={{ flexDirection: 'row', paddingBottom: 70}}>
                            <View style={styles.pickerContainer}>
                                <Text style={styles.label}>Hour</Text>
                                <Picker
                                    style={styles.picker}
                                    selectedValue={hour}
                                    onValueChange={(value) => setHour(value)}>
                                    {Array.from({ length: 10 }, (_, i) => i + 8).map((h) => (
                                        <Picker.Item key={h} label={`${h}`} value={h} />
                                    ))}
                                </Picker>
                            </View>
                            <View style={styles.pickerContainer}>
                                <Text style={styles.label}>Minute</Text>
                                <Picker
                                    style={styles.picker}
                                    selectedValue={minute}
                                    onValueChange={(value) => setMinute(value)}>
                                    {Array.from({ length: 60 }, (_, i) => i).map((m) => (
                                        <Picker.Item key={m} label={m.toString().padStart(2, '0')} value={m} />
                                    ))}
                                </Picker>
                            </View>
                        </View>
                        <View style={{ flexDirection: 'col' }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', paddingTop: 90 }}>
                                <Text style={{ fontSize: 14 }}>I don't want a clean room </Text>
                                <Switch
                                    trackColor={{ false: '#767577', true: '#D3B9B3' }}
                                    thumbColor={isEnabled ? '#f4f3f4' : '#f4f3f4'}
                                    ios_backgroundColor="#D9D9D9"
                                    onValueChange={toggleSwitch}
                                    onChange={(value) => { console.log("I don't want a clean room") }}
                                    value={isEnabled}
                                />
                            </View>
                        </View>
                    </View>
                    <ButtonMain text={"NEXT"} onPress={handleContinue} buttonStyle={{marginTop:50}}/>
                </View>
            }
        />
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'col',
        justifyContent: 'center',
        alignItems: 'center',
        justifyContent: "space-evenly",
    },
    pickerContainer: {
        flexDirection: 'col',
        alignItems: 'top',
    },
    label: {
        fontSize: 20,
        padding: 9,
    },
    picker: {
        height: 50,
        width: 100,
    },
    carouselContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 50,
    },
    carouselItem: {
        fontSize: 30,
        textAlign: 'center',
    },
    button: {
        backgroundColor: '#926255',
        padding: 16,
        alignItems: 'center',
        borderRadius: 8,
        marginTop: 16,
    },
});

export default RoomCleaningScreen;