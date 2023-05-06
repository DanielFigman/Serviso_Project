import React, { useContext, useEffect, useState } from 'react';
import { Dimensions, View, Text, Button, Platform, StyleSheet, Switch, TouchableOpacity, ScrollView, SafeAreaView, Pressable, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import CustomRequestCarusel from '../../FCComponents/CustomRequestCarusel';
import ScreenComponent from '../../FCComponents/ScreenComponent';
import { HotelsAppContext } from '../../Context/HotelsAppContext';
import { useNavigation } from '@react-navigation/native';
import ButtonMain from '../../FCComponents/Buttons';

const CustomRequestScreen = () => {

    const navigation = useNavigation();
    const { order } = useContext(HotelsAppContext)

    const [hour, setHour] = useState(15);
    const [minute, setMinute] = useState(1);
    const [isEnabled, setIsEnabled] = useState(false);
    const [customRequests, setCustomRequests] = useState([]);
    const [selectedTime, setSelectedTime] = useState(false);

    const toggleSwitch = () => setIsEnabled(previousState => !previousState);

    useEffect(() => {
        // set the current time after the initial render
        const minuteTemp = parseInt(GetMinute());
        const hourTemp = parseInt(GetHour());

        setHour(hourTemp);
        setMinute(minuteTemp);

    }, [])

    useEffect(() => {
        if (isEnabled) {
            setSelectedTime(false);
        } else {
            setSelectedTime(true);
        }

    }, [isEnabled])


    const handleContinue = async () => {
        if (Object.keys(customRequests).length !== 0) {
            const postObject = GetRequestObject();
            try {
                const response = await fetch('http://proj.ruppin.ac.il/cgroup97/test2/api/houseHoldCustomRequest', {
                    method: 'POST',
                    body: JSON.stringify(postObject),
                    headers: new Headers({
                        'Content-type': 'application/json; charset=UTF-8',
                    })
                });

                if (response.ok) {
                    navigation.navigate("CustomOrderConfirmation", {
                        selectedTime,
                        date: postObject.Request_In_Order[0].requestedDate,
                        hour,
                        minute
                    })


                } else {
                    showAlert();
                }

            } catch (error) {
                showAlert();
            }
        }
    };

    const showAlert = () => {
        Alert.alert(
            "Request submitting failed",
            "Something went wrong, please try again",
            [{ text: 'OK' }],
        );
    }

    const GetRequestObject = () => {
        //creating the parent
        let retVal = {};
        const requestID = parseInt(Date.now().toString() + Math.floor(Math.random() * 1000));
        const date = new Date();
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const formattedDate = `${year}/${month}/${day}`;
        const requestDate = formattedDate
        const requestHour = GetTimeNow();
        const status = "open";

        retVal["requestID"] = requestID;
        retVal["requestDate"] = requestDate;
        retVal["requestHour"] = requestHour;
        retVal["status"] = status;

        //craeting the children
        const houseHold_Request = {};
        houseHold_Request["requestID"] = requestID;

        const requestInOrder = [];

        if (selectedTime) {
            const requestedDate = GetRequestedDate();
            const requestedHour = hour + ":" + minute + ":" + "00";

            requestInOrder[0] = { requestID, orderID: order.orderID, requestedDate, requestedHour };
        } else {
            requestInOrder[0] = { requestID, orderID: order.orderID }
        }

        //creating the grand children
        const addedCustomRequests = customRequests.map(obj => ({ ...obj, requestID }));
        const houseHold_Custom_Request = addedCustomRequests;

        // setting the grand child to his parent
        houseHold_Request["HouseHold_Custom_Request"] = houseHold_Custom_Request;

        //setting the childredn to the parent
        retVal["HouseHold_Request"] = houseHold_Request;
        retVal["Request_In_Order"] = requestInOrder;


        return retVal;
    }

    function generateUniqueInt() {
        const timestamp = Date.now();
        const randomInt = Math.floor(Math.random() * 1000000); // Change the range as per your need
        return parseInt(timestamp.toString() + randomInt.toString());
    }

    const GetTimeNow = () => {
        const now = new Date();
        const hours = now.getHours().toString().padStart(2, '0');
        const minutes = now.getMinutes().toString().padStart(2, '0');
        const seconds = now.getSeconds().toString().padStart(2, '0');
        const timeNow = `${hours}:${minutes}:${seconds}`;

        return timeNow;
    }

    const GetHour = () => {

        const date = new Date();
        const hour = date.getHours().toString().padStart(2, '0');

        return hour;
    }

    const GetMinute = () => {
        const date = new Date();
        const minute = date.getMinutes().toString().padStart(2, '0');

        return minute;
    }

    const GetRequestedDate = () => {
        const now = new Date();
        let retVal = null;

        if (now.getHours() < hour) {
            retVal = now;
        } else if (now.getHours() === hour) {
            if (now.getMinutes() <= minute) {
                retVal = now;
            } else {
                retVal = new Date(now.getTime() + 24 * 60 * 60 * 1000);
            }
        } else {
            retVal = new Date(now.getTime() + 24 * 60 * 60 * 1000);
        }

        const year = retVal.getFullYear();
        const month = String(retVal.getMonth() + 1).padStart(2, '0');
        const day = String(retVal.getDate()).padStart(2, '0');
        const formattedDate = `${year}/${month}/${day}`;

        return formattedDate;
    }


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

                        <View style={{ marginTop: 130, height: "100%" }}>
                            <CustomRequestCarusel setCustomRequests={setCustomRequests} customRequests={customRequests} />
                        </View>
                        <View style={{ height: 50, width: 120, marginTop: 150, right: '18%', top: -290, marginBottom: 10 }}>
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
                        <View style={{ backgroundColor: '#F0E8E6', top: 0, padding: 20, marginTop: -50, borderRadius: 40, opacity: isEnabled ? 0.5 : 1 }}>

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
                                <View style={[styles.pickerContainer, { opacity: isEnabled ? 0.5 : 1 }]}>
                                    <Text style={styles.label}>Minute</Text>
                                    <Picker
                                        style={[styles.picker, isEnabled && { opacity: 0.5, pointerEvents: "none" }]}
                                        selectedValue={minute}
                                        onValueChange={(value) => handleChangeMinute(value)}
                                    >
                                        {Array.from({ length: 60 }, (_, i) => i).map((m) => (
                                            <Picker.Item key={m} label={m.toString().padStart(2, '0')} value={m} />
                                        ))}
                                    </Picker>
                                </View>
                            </View>
                        </View>
                        <ButtonMain onPress={handleContinue} text={"NEXT"} textStyle={{fontSize: 18, fontWeight: 'bold'}} buttonStyle={{marginTop:180}}/>
                      
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