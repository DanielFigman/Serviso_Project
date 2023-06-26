import { Linking, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { DevicePhoneMobileIcon } from 'react-native-heroicons/mini'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faWaze, faFacebookF, faInstagram } from '@fortawesome/free-brands-svg-icons'
import { faHouse } from '@fortawesome/free-solid-svg-icons'




const NearByBottomBar = ({ item }) => {

    const handleStartNavigation = () => {
        Linking.openURL(`https://www.waze.com/ul?ll=${item.latitude},${item.longitude}&navigate=yes`);
    };

    const handleCallPress = () => {
        const phoneUrl = `tel:${item.phone}`;
        Linking.openURL(phoneUrl);
    };

    const handleOpenFacebook = () => {
        Linking.openURL(`fb://profile/${item.fbid}`);
    };

    const handleOpenInstagram = () => {
        Linking.openURL(`instagram://user?username=${item.instaUsername}`);
    };

    const handleOpenWebsite = () => {
        const url = item.webAddress; // Replace with the desired URL
        Linking.openURL(url);
      };

    return (
        <View style={styles.container} horizontal={true} >
            {
                item.phone ?
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity onPress={handleCallPress} >
                            <View style={styles.circle}>
                                <DevicePhoneMobileIcon size={styles.icon.size} style={styles.icon} />
                            </View>
                        </TouchableOpacity>
                    </View>
                    :
                    <></>
            }
            {
                item.longitude && item.latitude ?

                    <View style={styles.buttonContainer}>
                        <TouchableOpacity onPress={handleStartNavigation} >
                            <View style={styles.circle}>
                                <FontAwesomeIcon size={styles.icon.size} icon={faWaze} />
                            </View>
                        </TouchableOpacity>
                    </View>
                    :
                    <></>
            }
            {
                item.fbid ?
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity onPress={handleOpenFacebook}>
                            <View style={styles.circle}>
                                <FontAwesomeIcon size={styles.icon.size} icon={faFacebookF} />
                            </View>
                        </TouchableOpacity>
                    </View>
                    :
                    <></>
            }
            {
                item.instaUsername ?
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity onPress={handleOpenInstagram}>
                            <View style={styles.circle}>
                                <FontAwesomeIcon size={styles.icon.size} icon={faInstagram} />
                            </View>
                        </TouchableOpacity>
                    </View>
                    :
                    <></>
            }
            {
                item.webAddress ? 
                <View style={styles.buttonContainer}>
                    <TouchableOpacity onPress={handleOpenWebsite}>
                        <View style={styles.circle}>
                            <FontAwesomeIcon size={styles.icon.size} icon={faHouse} />
                        </View>
                    </TouchableOpacity>
                </View>
                :
                <></>
            }
        </View >
    )
}

export default NearByBottomBar

const styles = StyleSheet.create({
    container: {
        zIndex: 99999,
        top: -25,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-evenly",
        paddingHorizontal: 20,
        right: 30
    },
    buttonContainer: {
        flexDirection: "column",
        paddingHorizontal:30
    },
    circle: {
        width: 60,
        height: 60,
        borderRadius: "50%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#F0E8E6",
        position: "absolute",
    },
    icon: {
        size: 30,
        color: "black"
    },
    phoneNumber: {
        top: 50,
        textAlign: "center"
    }
})