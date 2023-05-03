import React, { useState } from 'react';
import { Dimensions, View, Text, Button, Platform, StyleSheet, Switch, TouchableOpacity, ScrollView, SafeAreaView, Pressable } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import CustomRequestCarusel from '../../FCComponents/CustomRequestCarusel';
import ScreenComponent from '../../FCComponents/ScreenComponent';

const CustomRequestScreen = () => {
    const [hour, setHour] = useState(8);
    const [minute, setMinute] = useState(0);
    const [isEnabled, setIsEnabled] = useState(false);

    const toggleSwitch = () => setIsEnabled(previousState => !previousState);

    const handleContinue = () => {
        let selectedTime;

        if (isEnabled) {
            selectedTime = new Date();
        } else {
            selectedTime = new Date();
            selectedTime.setHours(hour);
            selectedTime.setMinutes(minute);
        }
        console.log(`at selected time: ${selectedTime}`);
    };

    const handleChangeMinute = (value) => {
        if (!isEnabled) {
            setMinute(value)
        }
    }

    const handleChangeHour = (value) => {
        if (!isEnabled) {
            setHour(value)
        }
    }

    const renderHourItem = ({ item }) => (
        <Text style={styles.carouselItem}>{`${item}:00`}</Text>
    );

    const renderMinuteItem = ({ item }) => (
        <Text style={styles.carouselItem}>{item}</Text>
    );

    return (
        <ScreenComponent
            title={
                <Text
                    style={{
                        fontWeight: 'bold',
                        fontSize: 30,
                        marginHorizontal: 80
                    }}>
                    New request
                </Text>}
            content={
                <>
                    <View style={styles.container}>

                        <View style={{ marginTop: 80, height: "100%" }}>
                            <CustomRequestCarusel />
                        </View>
                        <View style={{ height: 50, width: 120, marginTop: 50, right: '18%', top: -290, marginBottom: 10 }}>
                            <Text style={{ fontSize: 24, marginBottom: 10, }}>When?</Text>

                            <View style={{ flexDirection: 'row', alignSelf: 'flex-start', justifyContent: 'center' }}>
                                <Text style={{ fontSize: 14 }}>now </Text>
                                <Switch
                                    trackColor={{ false: '#767577', true: '#D3B9B3' }}
                                    thumbColor={isEnabled ? '#f4f3f4' : '#f4f3f4'}
                                    ios_backgroundColor="#D9D9D9"
                                    onValueChange={toggleSwitch}
                                    value={isEnabled}
                                />
                            </View>
                            <Text style={{ fontSize: 14 }}>at:  </Text>
                        </View>
                        <View style={{ backgroundColor: '#F0E8E6', top: -80, padding: 20, marginTop: -50, borderRadius: 40, opacity: isEnabled ? 0.5 : 1 }}>

                            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'flex-start' }}>
                                <View style={[styles.pickerContainer, { opacity: isEnabled ? 0.5 : 1 }]}>
                                    <Text style={styles.label}>Hour</Text>
                                    <Picker
                                        style={[styles.picker, isEnabled && { opacity: 0.5, pointerEvents: "none" }]}
                                        selectedValue={hour}
                                        onValueChange={(value) => handleChangeHour(value)}
                                    >
                                        {Array.from({ length: 24 }, (_, i) => i).map((h) => (
                                            <Picker.Item key={h} label={h.toString().padStart(2, '0')} value={h} />
                                        ))}
                                    </Picker>
                                </View>
                                <View style={[styles.pickerContainer, { opacity: isEnabled ? 0.5 : 1}]}>
                                    <Text style={styles.label}>Minute</Text>
                                    <Picker
                                        style={[styles.picker, isEnabled && { opacity: 0.5, pointerEvents: "none"  }]}
                                        selectedValue={minute}
                                        onValueChange={(value) => handleChangeMinute(value)}
                                    >
                                        {Array.from({ length: 12 }, (_, i) => i).map((m) => (
                                            <Picker.Item key={m} label={m.toString().padStart(2, '0')} value={m} />
                                        ))}
                                    </Picker>
                                </View>
                            </View>
                        </View>

                        <TouchableOpacity
                            style={{
                                marginTop: 30,
                                backgroundColor: '#000000',
                                padding: 20,
                                alignItems: 'center',
                                borderRadius: 40,
                                marginTop: 16,
                            }}
                            onPress={handleContinue}
                        >
                            <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 18 }}>NEXT</Text>
                        </TouchableOpacity>
                        <Text style={{ top: 130, fontSize: 11 }}>
                            We undertake to arrive within two hours of the requested time
                        </Text>
                    </View>
                </>
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

export default CustomRequestScreen;