import { Modal, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Dialog } from '@rneui/base'
import { ScrollView } from 'react-native-gesture-handler'
import LoadingImage from '../LoadingImage'

const FoodCartDialog = ({ modalVisible, setModalVisible, cart }) => {
    return (
        <Dialog
            ModalComponent={Modal}
            isVisible={modalVisible}
            onBackdropPress={() => setModalVisible(!modalVisible)}
            overlayStyle={{ maxHeight: "80%", backgroundColor: "rgba(128, 128, 128, 0.5)" }}
        >
            {/* <ScrollView>
                <View style={{display:"flex", justifyContent:"center"}}>
                    <Text>Your shopping Cart</Text>
                </View>
                <LoadingImage imageURL={imageURL} style={{ maxHeight: "80%" }} />
            </ScrollView> */}
        </Dialog>
    )
}

export default FoodCartDialog

const styles = StyleSheet.create({})