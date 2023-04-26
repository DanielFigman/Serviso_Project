import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { ChatBubbleOvalLeftIcon, HomeIcon, MagnifyingGlassIcon, UserIcon } from 'react-native-heroicons/outline'
import { Image } from 'react-native'
import { useNavigation, useRoute } from '@react-navigation/native'

const BottomMenu = () => {

    const navigation = useNavigation();
    const route = useRoute();
    const [selectedButton, setSelectedButton] = useState("HOME")

    const handlePress = (screen) => {
        switch (screen) {
            case "HOME":
                navigation.navigate("ServisoScreenStack");
                setSelectedButton("HOME");
                break;
            case "SEARCH":
                navigation.navigate("SearchStackPage");
                setSelectedButton("SEARCH");
                break;
            case "CHAT":
                navigation.navigate("ChatScreen");
                setSelectedButton("CHAT");
                break;
            case "PERSONAL":
                navigation.navigate("PersonalPageStack");
                setSelectedButton("PERSONAL");
                break;
        }
    }

    const handleLonPress = (screen) => {
        switch (screen) {
            case "HOME":
                navigation.navigate("HomeScreen");
                setSelectedButton("HOME");
                break;
            case "SEARCH":
                navigation.navigate("SearchScreen");
                setSelectedButton("SEARCH");
                break;
            case "CHAT":
                navigation.navigate("ChatScreen");
                setSelectedButton("CHAT");
                break;
            case "PERSONAL":
                navigation.navigate("PersonalPageScreen");
                setSelectedButton("PERSONAL");
                break;
        }
    }

    return (
        <View>
            <View
                style={{
                    borderBottomColor: '#ECECEC',
                    borderBottomWidth: 3,
                }}
            />
            <View style={styles.container}>
                <TouchableOpacity onPress={() => handlePress("HOME")} onLongPress={() => handleLonPress("HOME")}>
                    <HomeIcon
                        style={[styles.icon, selectedButton === "HOME" && styles.activeIcon]}
                        size={styles.icon.fontSize}
                        fill={selectedButton === "HOME" ? styles.fill.color : "transparent"}
                    />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handlePress("SEARCH")} onLongPress={() => handleLonPress("SEARCH")}>
                    <MagnifyingGlassIcon
                        style={[styles.icon, selectedButton === "SEARCH" && styles.activeIcon]}
                        size={styles.icon.fontSize}
                        fill={selectedButton === "SEARCH" ? styles.fill.color : "transparent"}

                    />
                </TouchableOpacity>
                <View style={styles.servisoFlowerContainer}>
                    <Image style={styles.servisoFlower} source={require('../assets/ServisoFlower.png')} />
                </View>
                <TouchableOpacity onPress={() => handlePress("CHAT")} onLongPress={() => handleLonPress("CHAT")}>
                    <ChatBubbleOvalLeftIcon
                        style={[styles.icon, selectedButton === "CHAT" && styles.activeIcon]}
                        size={styles.icon.fontSize}
                        fill={selectedButton === "CHAT" ? styles.fill.color : "transparent"}
                    />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handlePress("PERSONAL")} onLongPress={() => handleLonPress("PERSONAL")}>
                    <UserIcon
                        style={[styles.icon, selectedButton === "PERSONAL" && styles.activeIcon]}
                        size={styles.icon.fontSize}
                        fill={selectedButton === "PERSONAL" ? styles.fill.color : "transparent"}
                    />
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default BottomMenu

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        height: 60,
        width: '100%',
        backgroundColor: "#F0F0F0"
    },
    icon: {
        color: "#6B6B6B",
        fontSize: 30,
    },
    servisoFlowerContainer: {
        position: 'relative',
        width: 134,
        height: 68,
        bottom: 15
    },
    servisoFlower: {
        position: 'absolute',
        width: '100%',
        height: '100%'
    },
    activeIcon: {
        color: "black"
    },
    fill: {
        color: "white"
    }
})
