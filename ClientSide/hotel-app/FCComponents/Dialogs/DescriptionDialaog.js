import { Text, Modal } from 'react-native'
import React from 'react'
import { Dialog } from '@rneui/themed'
import { ScrollView } from 'react-native-gesture-handler'

const DescriptionDialaog = ({ modalVisible, setModalVisible, description, name }) => {
    return (
        <Dialog
            ModalComponent={Modal}
            isVisible={modalVisible}
            onBackdropPress={() => setModalVisible(!modalVisible)}
            overlayStyle={{maxHeight:"80%"}}
        >
            <ScrollView>
                <Dialog.Title title={name} titleStyle={{ textAlign: "center" }} />
                <Text style={{ marginTop: 20, fontSize: 18, }}>{description}</Text>
            </ScrollView>
        </Dialog>
    )
}

export default DescriptionDialaog