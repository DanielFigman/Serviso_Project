import { StyleSheet, Text, View, Image, Dimensions } from "react-native";
import React, { useContext, useEffect, useRef } from "react";
import { useState } from "react";
import ScreenComponent from "../../FCComponents/ScreenComponent";
import { ScrollView } from "react-native-gesture-handler";
import Languages from "../../Json_files/Languages";
import { HotelsAppContext } from "../../Context/HotelsAppContext";
import { useNavigation, useRoute } from "@react-navigation/native";
import ButtonMain from "../../FCComponents/Buttons";


const { height } = Dimensions.get('window');

const CardScreen = () => {

    const navigation = useNavigation();

    const { params: {
        name,
        description,
        openingHours,
        rating,
        address,
        phone,
        imageURL,
        price,
        basePrice,
        priceForAdditional15,
        hallNum,
        buttonType
    } } = useRoute();

    const screenContent = Languages.CardScreen;

    const { language } = useContext(HotelsAppContext)

    const newTop = () => {
        const MAX_WIDTH = Dimensions.get("window").width;
        const nameWidth = name.length * 25; // 25 is an estimated width per character
        if (nameWidth > MAX_WIDTH) {
            return { top: -110 };
        } else {
            return { top: -50 };
        }
    };


    return (
        <ScreenComponent
            topLeftButtonStyle={{ position: "absolute", zIndex: 1 }}
            topLeftButtonColor={"black"}
            content={
                <View>
                    <View style={{ width: "100%", height: 300, top: -height * 0.07 }}>
                        <Image
                            style={{ width: "100%", height: "100%" }}
                            source={{
                                url: imageURL,
                            }}
                        />
                        <Text style={[styles.titel, newTop()]}>{name}</Text>
                    </View>
                    <ScrollView style={{ top: -height * 0.07 }}>
                        {description ?
                            <>
                                <Text style={styles.titelText1}>{screenContent.Description[language]}</Text>
                                <Text style={styles.text}>{description}</Text>
                            </>
                            :
                            ""
                        }
                        <View style={{ paddingBottom: 250, left: -5 }}>
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
                            {price ?

                                <View style={styles.row}>
                                    <Text style={styles.titelText}>{screenContent.Price[language]}</Text>
                                    <Text style={styles.text}>{price}{price !== "FREE" ? "₪" : ""}</Text>
                                </View>
                                :
                                ""
                            }
                            {basePrice ?

                                <View style={styles.row}>
                                    <Text style={styles.titelText}>{screenContent.BasePrice[language]}</Text>
                                    <Text style={styles.text}>{basePrice}₪</Text>
                                </View>
                                :
                                ""
                            }
                            {priceForAdditional15 ?

                                <View style={styles.row}>
                                    <Text style={styles.titelText}>{screenContent.PriceForAdditional15Minutes[language]}</Text>
                                    <Text style={styles.text}>{priceForAdditional15}₪</Text>
                                </View>
                                :
                                ""
                            }
                            {hallNum ?

                                <View style={styles.row}>
                                    <Text style={styles.titelText}>{screenContent.HallNum[language]}</Text>
                                    <Text style={styles.text}>{hallNum}</Text>
                                </View>
                                :
                                ""
                            }
                            {
                                buttonType === "SPA" ?
                                    <ButtonMain text={"Pick this"} buttonStyle={{ marginTop: 75 }} onPress={()=> navigation.navigate("SpaOrder") } />
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