import { View, Modal, Image, StyleSheet } from 'react-native'
import React from 'react'

const Loading = () => {
    return (
        <View style={styles.container}>
            <Modal
                animationType="slide"
                visible={true}
                transparent={true}


            >
                <Image style={styles.gif} source={require('../assets/loading.gif')} />
            </Modal>
        </View>
    )
}

export default Loading

const styles = StyleSheet.create({
    container: {
        height: "100%",
        backgroundColor: "hsla(0, 0%, 0%, 0)",


    },
    gif: {
        width: "100%",
        height: 200,
        marginTop:"60%"
    },
})