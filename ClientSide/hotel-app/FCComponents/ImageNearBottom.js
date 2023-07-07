import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import LoadingImage from './LoadingImage'
import ImageNearBottomDialog from './Dialogs/ImageNearBottomDialog'

const ImageNearBottom = ({ imageUrl }) => {
    const [modalVisible, setModalVisible] = useState(false)

    return (
        <View style={styles.container}>
            <ImageNearBottomDialog imageURL={imageUrl} modalVisible={modalVisible} setModalVisible={setModalVisible} />
            <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}>
                <LoadingImage imageURL={imageUrl} style={{ height: 150, width: 150, borderRadius: 5 }} />
            </TouchableOpacity>
        </View>
    )
}

export default ImageNearBottom

const styles = StyleSheet.create({
    container: {
        marginRight: 10
    }
})