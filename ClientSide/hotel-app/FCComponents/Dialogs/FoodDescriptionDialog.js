import { Modal, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useContext } from 'react'
import { Dialog } from '@rneui/base'
import { ExclamationTriangleIcon } from 'react-native-heroicons/outline'
import Languages from '../../Json_files/Languages'
import { HotelsAppContext } from '../../Context/HotelsAppContext'

const FoodDescriptionDialog = ({ modalVisible, setModalVisible, item }) => {
    const { language } = useContext(HotelsAppContext)
    const screenContent = Languages.FoodDescriptionDialog;

    return (
        <Dialog
            ModalComponent={Modal}
            isVisible={modalVisible}
            onBackdropPress={() => setModalVisible(!modalVisible)}
            overlayStyle={{ maxHeight: "80%", backgroundColor: 'rgba(255, 255, 255, 1)', borderWidth: 2 }}

        >
            <ScrollView>
                <Dialog.Title title={screenContent.Description[language]} titleStyle={{ textAlign: "center" }} />
                <Text style={{ marginTop: 0, fontSize: 18, }}>{item.description}</Text>

                {item.allergies ?
                    <View style={{ borderWidth: 1, marginTop: 30, padding: 5 }}>
                        <View style={{ flexDirection: "row", justifyContent: 'center', alignItems: "center", }}>
                            <Dialog.Title title={screenContent.Allergies[language]} titleStyle={{ textAlign: "center", flex: 1 }} />
                            <ExclamationTriangleIcon size={20} color={"black"} style={{ bottom: 4 }} />
                        </View>
                        <Text style={{ marginTop: 0, fontSize: 18, }}>{item.allergies}</Text>
                    </View>
                    :
                    <></>
                }

                {item.possibleChanges ?
                    <>
                        <Dialog.Title title={screenContent.PossibleChanges[language]} titleStyle={{ textAlign: "center", marginTop: 30 }} />
                        <Text style={{ marginTop: 0, fontSize: 18, }}>{item.possibleChanges}</Text>
                    </>
                    :
                    <></>
                }
            </ScrollView>
        </Dialog>
    )
}

export default FoodDescriptionDialog

const styles = StyleSheet.create({})