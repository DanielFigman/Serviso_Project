import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import LoadingImage from './LoadingImage'
import ImageNearBottomDialog from './Dialogs/ImageNearBottomDialog'

const ImageNearBottom = ({ imageUrl, modalNear, setModalNearVisible }) => {
    const [modalVisible, setModalVisible] = useState(false)

    const handlePress = () => {
        if (modalNear !== undefined && setModalNearVisible !== undefined) {
            setModalNearVisible(true);
        } else {
            setModalVisible(true)
        }
    }

    return (
        <View style={styles.container}>
            <ImageNearBottomDialog imageURL={imageUrl} modalVisible={modalNear !== undefined ? modalNear : modalVisible} setModalVisible={setModalNearVisible !== undefined ? setModalNearVisible : setModalVisible} />
            <TouchableOpacity onPress={handlePress}>
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