import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { ChatBubbleOvalLeftIcon, HomeIcon, MagnifyingGlassIcon, UserIcon } from 'react-native-heroicons/outline'
import { Image } from 'react-native'
import { useNavigation } from '@react-navigation/core'

const BottomMenu = () => {

    const navigation = useNavigation();

    return (
        <View>
            <View
                style={{
                    borderBottomColor: '#ECECEC',
                    borderBottomWidth: 3,
                }}
            />
            <View style={styles.container}>

                <TouchableOpacity>
                    <HomeIcon style={styles.homeIcon} color={styles.homeIcon.color} size={styles.homeIcon.fontSize} onPress={()=> navigation.navigate("ServisoScreen")}/>
                </TouchableOpacity>
                <TouchableOpacity>
                    <MagnifyingGlassIcon style={styles.MagnifyingGlass} color={styles.MagnifyingGlass.color} size={styles.MagnifyingGlass.fontSize} />
                </TouchableOpacity>
                <View>
                    <Image style={styles.servisoFlower} source={require('../assets/ServisoFlower.png')} />
                </View>
                <TouchableOpacity>
                    <ChatBubbleOvalLeftIcon style={styles.chatIcon} color={styles.chatIcon.color} size={styles.chatIcon.fontSize}
                        onPress={()=> navigation.navigate("ChatScreen")}
                    />
                </TouchableOpacity>
                <TouchableOpacity>
                    <UserIcon style={styles.user} color={styles.user.color} size={styles.user.fontSize} />
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
        width: '100%', // Add this line to set the container width to 100%
        backgroundColor: "#F0F0F0"
    },
    homeIcon: {
        color: "#6B6B6B",
        fontSize: 30
    },
    MagnifyingGlass: {
        color: "#6B6B6B",
        fontSize: 30,
    },
    chatIcon: {
        color: "#6B6B6B",
        fontSize: 30,
    },
    user: {
        color: "#6B6B6B",
        fontSize: 30,
    },
    servisoFlower: {
        width: 134,
        height: 68,
        bottom: 15
    },
})