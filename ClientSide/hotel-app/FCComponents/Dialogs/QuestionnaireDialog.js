import { Text, Modal } from 'react-native'
import React from 'react'
import { Dialog } from '@rneui/themed'

const QuestionnaireDialog = ({ modalVisible, setModalVisible }) => {
    return (
        <Dialog
            ModalComponent={Modal}
            isVisible={modalVisible}
            onBackdropPress={() => setModalVisible(!modalVisible)}
        >
            <Dialog.Title title="Questionnaire" titleStyle={{ textAlign: "center" }} />
            <Text style={{ marginTop: 20, fontSize: 18, }}>Please adjust your interest types between 0-10</Text>
            <Text style={{ marginTop: 20, fontSize: 18, }}>We will suggest you activities based on your interests</Text>
        </Dialog>
    )
}

export default QuestionnaireDialog