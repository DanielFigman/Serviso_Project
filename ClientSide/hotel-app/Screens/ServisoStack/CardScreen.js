import { StyleSheet, Text, View, Image, Dimensions } from "react-native";
import React, { useContext, useEffect, useRef } from "react";
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
        phone,
        imageURL
    } } = useRoute();

    const screenContent = Languages.CardScreen;

    const { language } = useContext(HotelsAppContext)

    const newTop = () => {
        const MAX_WIDTH = Dimensions.get("window").width - 20;
        const nameWidth = name.length * 25; // 25 is an estimated width per character
        if (nameWidth > MAX_WIDTH) {
          return { top: -110 };
        } else {
          return { top: -50 };
        }
      };
      

    return (
        <ScreenComponent
            topLeftButtonStyle={{ position: "absolute", top: 50, zIndex: 1 }}
            topLeftButtonColor={"black"}
            content={
                <View>
                    <View style={{ width: "100%", height: 300, top: -height * 0.07 }}>
                        <Image
                            style={{width:"100%", height:"100%"}}
                            source={{
                                url: imageURL,
                            }}
                        />
                        <Text style={[styles.titel, newTop()]}>{name}</Text>
                    </View>
                    <ScrollView style={{ top: -height * 0.07 }}>
                        <Text style={styles.titelText1}>{screenContent.Description[language]}</Text>
                        <Text style={styles.text}>{description}</Text>
                        <View style={{ paddingBottom: 60, left: -5 }}>
                            {openingHours ?

                                <View style={styles.row}>
                                    <Text style={styles.titelText}>{screenContent.OpeningHours[language]}</Text>
                                    <Text style={styles.text}>{openingHours}</Text>
                                </View>
                                :
                                ""
                            }
                            {rating ?
                                <View style={styles.row}>
                                    <Text style={styles.titelText}>{screenContent.Rating[language]}</Text>
                                    <Text style={styles.text}>{rating}</Text>
                                </View>
                                :
                                ""
                            }
                            {address ?
                                <View style={styles.row}>
                                    <Text style={styles.titelText}>{screenContent.Address[language]}</Text>
                                    <Text style={styles.text}>{address}</Text>
                                </View>
                                :
                                ""
                            }
                            {phone ?
                                <View style={styles.row}>
                                    <Text style={styles.titelText}>{screenContent.Phone[language]}</Text>
                                    <Text style={styles.text}>{phone}</Text>
                                </View>
                                :
                                ""
                            }
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
        padding: 5,
        marginTop: 10,
    },
    text2: {
        fontSize: 20,
        left: 15,
        marginHorizontal: 10
    },
});