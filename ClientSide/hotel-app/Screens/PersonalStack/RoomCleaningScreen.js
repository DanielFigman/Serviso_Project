import React, { useContext, useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, Switch, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import ScreenComponent from '../../FCComponents/ScreenComponent';
import ButtonMain from '../../FCComponents/Buttons';
import { HotelsAppContext } from '../../Context/HotelsAppContext';
import { Image } from 'react-native';

const RoomCleaningScreen = () => {
    const [hour, setHour] = useState(8);
    const [minute, setMinute] = useState(0);
    const [isEnabled, setIsEnabled] = useState(false);

    const { order, checkIfAlreadyScheduledAcleaning, scheduledOrder } = useContext(HotelsAppContext)
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);

    const handleContinue = async () => {
        const postObject = GetRequestObject();
        try {
            const response = await fetch('http://proj.ruppin.ac.il/cgroup97/test2/api/newRequest', {
                method: 'POST',
                body: JSON.stringify(postObject),
                headers: new Headers({
                    'Content-type': 'application/json; charset=UTF-8',
                })
            });

            if (response.ok) {
                checkIfAlreadyScheduledAcleaning();
            } else {
                const message = await response.text();
                const object = JSON.parse(message);
                console.log(object)
            }
        } catch (error) {
            console.log(error)
        }
    };


    const GetRequestObject = () => {
        //creating the parent
        let retVal = {};
        const date = new Date();
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const formattedDate = `${year}/${month}/${day}`;
        const requestDate = formattedDate
        const requestHour = GetTimeNow();
        const status = "open";

        retVal["requestDate"] = requestDate;
        retVal["requestHour"] = requestHour;
        retVal["status"] = status;

        //craeting the children
        const houseHold_Request = {};

        const requestInOrder = [];


        const requestedDate = GetRequestedDate();
        const requestedHour = !isEnabled ? hour + ":" + minute + ":" + "00" : null;
        requestInOrder[0] = { orderID: order.orderID, requestedDate, requestedHour };

        //creating the grand children
        const houseHold_Cleaning_Request = {};

        houseHold_Cleaning_Request["toClear"] = !isEnabled;

        // setting the grand child to his parent
        houseHold_Request["HouseHold_Cleaning_Request"] = houseHold_Cleaning_Request;

        //setting the childredn to the parent
        retVal["HouseHold_Request"] = houseHold_Request;
        retVal["Request_In_Order"] = requestInOrder;


        return retVal;
    }

    const GetTimeNow = () => {
        const now = new Date();
        const hours = now.getHours().toString().padStart(2, '0');
        const minutes = now.getMinutes().toString().padStart(2, '0');
        const seconds = now.getSeconds().toString().padStart(2, '0');
        const timeNow = `${hours}:${minutes}:${seconds}`;

        return timeNow;
    }

    const GetRequestedDate = () => {
        const date = new Date();
        date.setDate(date.getDate() + 1);

        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const formattedDate = `${year}/${month}/${day}`;

        return formattedDate;
    };

    const getFormattedDate = () => {
        const date = new Date(scheduledOrder.requestedDate);
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        const formattedDate = date.toLocaleDateString('en-GB', options);
        return formattedDate;
    }

    const getFormattedHour = () => {
        const hour = scheduledOrder.requestedHour
        return hour.substring(0, 5);
    }

    return (
        <ScreenComponent
            title={
                <Text style={{ fontWeight: 'bold', fontSize: 30, marginHorizontal: 30 }}>Cleaning schedule</Text>

            }
            content={
                scheduledOrder ?
                    <View>
                        <View>
                            <Text style={{ fontWeight: "bold", fontSize: 16, textAlign: "center", marginTop: 20, textDecorationLine: "underline" }}>Requested Cleaning Schedule</Text>
                            <View style={{ flexDirection: "row", marginTop: 50, display: "flex", alignItems: "center", marginLeft: 10 }}>
                                <Text style={{ fontSize: 22 }}>Date:</Text>
                                <Text style={{ fontWeight: "bold", fontSize: 18, top: 2 }}> {getFormattedDate()}</Text>
                            </View>
                            {
                                scheduledOrder.requestedHour ?
                                    <View style={{ flexDirection: "row", marginTop: 20, display: "flex", alignItems: "center", marginLeft: 10 }}>
                                        <Text style={{ fontSize: 22 }}>Hour:</Text>
                                        <Text style={{ fontWeight: "bold", fontSize: 18, top: 2 }}> {getFormattedHour()}</Text>
                                    </View>
                                    :
                                    <></>
                            }
                            {
                                !scheduledOrder.toClear ?
                                    <View style={{ flexDirection: "row", marginTop: 30, display: "flex", alignItems: "center", marginLeft: 10, justifyContent: "center" }}>
                                        <Text style={{ fontSize: 18, fontWeight: "bold" }}>We will not clean you room as requested</Text>
                                    </View>
                                    :
                                    <></>
                            }

                            <Image style={{width:600, height:600, marginTop:50, alignSelf:"center"}} source={require('../../assets/check-done.png')} />

                        </View>
                    </View>
                    :
                    <View style={styles.container}>
                        <View style={{}}>
                            <Text className="font-bold">
                                Cleaning schedule for tommorow
                            </Text>
                        </View>
                        <View style={{ backgroundColor: '#F0E8E6', padding: 10, marginTop: 100 }}>
                            <View style={[{ flexDirection: 'row', paddingBottom: 70, zIndex: 1 }, isEnabled && { opacity: 0.2, pointerEvents: "none" }]}>
                                <View style={styles.pickerContainer}>
                                    <Text style={[styles.label, { left: 40 }]}>Hour</Text>
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
                                    <Text style={[styles.label, { left: 40 }]}>Minute</Text>
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
                            <View style={{ flexDirection: 'col', alignItems: "center" }}>
                                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 50 }}>
                                    <Text style={{ fontSize: 14 }}>Do not clean my room</Text>
                                    <Switch
                                        trackColor={{ false: '#767577', true: '#D3B9B3' }}
                                        thumbColor={isEnabled ? '#f4f3f4' : '#f4f3f4'}
                                        ios_backgroundColor="#D9D9D9"
                                        onValueChange={toggleSwitch}
                                        style={{ marginLeft: 20 }}
                                        onChange={(value) => { console.log("I don't want a clean room") }}
                                        value={isEnabled}
                                    />
                                </View>
                            </View>
                        </View>
                        <ButtonMain text={"Continue"} onPress={handleContinue} buttonStyle={{ marginTop: 50 }} />
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
        height: 100,
        width: 150,
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