import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import ScreenComponent from '../../FCComponents/ScreenComponent'

const ChatScreen = () => {
    return (
        <ScreenComponent bottomMenu={true} topLeftButton={"none"}
            content={
                <View style={styles.container}>
                    <View style={styles.header}>
                        <Text style={styles.headerText}>Reception</Text>
                    </View>
                </View>
            }
        />
    )
}

export default ChatScreen

const styles = StyleSheet.create({
    container: {
        top: -30,
        backgroundColor:"white"
    },
    header:{
    },
    headerText:{
        alignSelf:"center",
        fontSize:40
    }
})