import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { ChatBubbleOvalLeftIcon, HomeIcon, MagnifyingGlassIcon, UserIcon } from 'react-native-heroicons/outline'
import { Image } from 'react-native'
import { useNavigation, useRoute } from '@react-navigation/native'

const BottomMenu = () => {

    const navigation = useNavigation();
    const route = useRoute();

    const SCREENS = ['ServisoScreen', 'SearchScreen', 'ChatScreen', 'PersonalPageScreen'];

    const activeScreenIndex = SCREENS.indexOf(route.name);

    return (
        <View>
            <View
                style={{
                    borderBottomColor: '#ECECEC',
                    borderBottomWidth: 3,
                }}
            />
            <View style={styles.container}>
                <TouchableOpacity onPress={() => navigation.navigate("ServisoScreen")}>
                    <HomeIcon
                        style={[styles.icon, activeScreenIndex === 0 && styles.activeIcon]}
                        size={styles.icon.fontSize}
                        fill={activeScreenIndex === 0 ? styles.fill.color : "transparent"}
                    />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate("SearchScreen")} >
                    <MagnifyingGlassIcon
                        style={[styles.icon, activeScreenIndex === 1 && styles.activeIcon]}
                        size={styles.icon.fontSize}
                        fill={activeScreenIndex === 1 ? styles.fill.color : "transparent"}

                    />
                </TouchableOpacity>
                <View style={styles.servisoFlowerContainer}>
                    <Image style={styles.servisoFlower} source={require('../assets/ServisoFlower.png')} />
                </View>
                <TouchableOpacity onPress={() => navigation.navigate("ChatScreen")} >
                    <ChatBubbleOvalLeftIcon
                        style={[styles.icon, activeScreenIndex === 2 && styles.activeIcon]}
                        size={styles.icon.fontSize}
                        fill={activeScreenIndex === 2 ? styles.fill.color : "transparent"}
                    />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate("PersonalPageScreen")}>
                    <UserIcon
                        style={[styles.icon, activeScreenIndex === 3 && styles.activeIcon]}
                        size={styles.icon.fontSize}
                        fill={activeScreenIndex === 3 ? styles.fill.color : "transparent"}
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
    fill:{
        color:"white"
    }
})
