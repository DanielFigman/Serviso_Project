import { Modal, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import LoadingImage from '../LoadingImage'
import { Dialog } from '@rneui/base'

const ImageNearBottomDialog = ({ imageURL, modalVisible, setModalVisible}) => {
    return (

        <Dialog
            ModalComponent={Modal}
            isVisible={modalVisible}
            onBackdropPress={() => setModalVisible(!modalVisible)}
            overlayStyle={{ maxHeight:400, minWidth:400, backgroundColor:"grey"}}
        >
            <LoadingImage imageURL={imageURL} style={{height:"100%", width:"100%"}}/>
        </Dialog>

    )
}

export default ImageNearBottomDialog

const styles = StyleSheet.create({})