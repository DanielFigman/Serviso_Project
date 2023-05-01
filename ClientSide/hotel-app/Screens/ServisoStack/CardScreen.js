import { StyleSheet, Text, View, Image, Dimensions } from "react-native";
import React, { useContext } from "react";
import { useState } from "react";
import ScreenComponent from "../../FCComponents/ScreenComponent";
import { ScrollView } from "react-native-gesture-handler";
import Languages from "../../Json_files/Languages";
import { HotelsAppContext } from "../../Context/HotelsAppContext";
import { useRoute } from "@react-navigation/native";

const { height } = Dimensions.get('window');

const CardScreen = () => {

    const { params: {
        name,
        description,
        openingHours,
        rating,
        address,
        phone
    } } = useRoute();

    const screenContent = Languages.CardScreen;

    const { language } = useContext(HotelsAppContext)

    return (
        <ScreenComponent
            topLeftButtonStyle={{ position: "absolute", top: 50, zIndex: 1 }}
            topLeftButtonColor={"black"}
            content={
                <View>
                    <Image
                        style={{ width: "100%", height: '35%', top: -height * 0.07 }}
                        source={{
                            url: "https://igoogledisrael.com/wp-content/uploads/2016/05/timna_bs-e1523394536900.jpg",
                        }}
                    />
                    <Text style={styles.titel}>{name}</Text>
                    <ScrollView style={{ top: -height * 0.135 }}>
                        <Text style={styles.titelText1}>{screenContent.Description[language]}</Text>
                        <Text style={styles.text}>{description}</Text>
                        <View style={{ paddingBottom: 60, left: -5 }}>
                            <View style={styles.row}>
                                <Text style={styles.titelText}>{screenContent.OpeningHours[language]}</Text>
                                <Text style={styles.text2}>{openingHours}</Text>
                            </View>
                            <View style={styles.row}>
                                <Text style={styles.titelText}>{screenContent.Rating[language]}</Text>
                                <Text style={styles.text2}>{rating}</Text>
                            </View>
                            <View style={styles.row}>
                                <Text style={styles.titelText}>{screenContent.Address[language]}</Text>
                                <Text style={styles.text2}>{address}</Text>
                            </View>
                            <View style={styles.row}>
                                <Text style={styles.titelText}>{screenContent.Phone[language]}</Text>
                                <Text style={styles.text2}>{phone}</Text>
                            </View>
                        </View>
                    </ScrollView>
                </View>
            }
        />
    );
};

export default CardScreen;

const styles = StyleSheet.create({
    titel: {
        fontSize: 45,
        fontWeight: "bold",
        textAlign: "center",
        fontStyle: "italic",
        top: -height * 0.15,
        textShadowColor: "#F0E8E6",
        shadowOffset: {
            width: 2,
            height: 4,
        },
        shadowOpacity: 0.17,
        shadowRadius: 1.05,
        elevation: 7,
        textShadowRadius: 25,
    },
    text: {
        fontSize: 20,
        marginHorizontal: 10,
        padding: 5,
    },
    titelText1: {
        fontSize: 20,
        left: 15,
        fontWeight: "bold",
        marginTop: 5
    },

    titelText: {
        fontSize: 20,
        left: 15,
        fontWeight: "bold",
    },
    row: {
        flexDirection: "row",
        padding: 5,
        marginTop: 10,
    },
    text2: {
        fontSize: 20,
        left: 15,
        marginHorizontal: 10
    },
});