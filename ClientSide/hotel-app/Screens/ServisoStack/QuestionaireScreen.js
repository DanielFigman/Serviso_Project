import React, { useContext, useState } from 'react';
import { View, TouchableOpacity, ScrollView } from 'react-native';
import { HotelsAppContext } from '../../Context/HotelsAppContext';
import QuestionaireSlider from '../../FCComponents/QuestionaireSlider';
import ScreenComponent from '../../FCComponents/ScreenComponent';
import { QuestionMarkCircleIcon } from 'react-native-heroicons/outline';
import { useNavigation } from '@react-navigation/core';
import ButtonMain from '../../FCComponents/Buttons';
import QuestionnaireDialog from '../../FCComponents/Dialogs/QuestionnaireDialog';



const QuestionaireScreen = () => {
    const navigation = useNavigation();
    const { questionaire, setQuestionaire } = useContext(HotelsAppContext);

    const [tempQuestionnaire, setTempQuestionnaire] = useState(questionaire);

    const [modalVisible, setModalVisible] = useState(false);

    const handleSubmit = () => {
        setQuestionaire(tempQuestionnaire);
        navigation.navigate("ConciergeMainScreen");
    };

    const infoButton = <>
        <TouchableOpacity onPress={() => setModalVisible(true)}>
            <QuestionMarkCircleIcon size={30} color={"white"} fill={"black"} style={{ top: 5, right: 10 }} />
        </TouchableOpacity>
    </>

    return (
        <ScreenComponent additionalTopButton={infoButton} topLeftButtonStyle={{ flex: 1 }}
            content={
                <ScrollView style={{ flex: 1, paddingHorizontal: 20, marginTop: 10 }}>
                    {
                        modalVisible ?
                            <QuestionnaireDialog setModalVisible={setModalVisible} modalVisible={modalVisible} />
                            :
                            <></>
                    }
                    {Object.keys(tempQuestionnaire).map((key, index) => (
                        <View key={index} style={{ marginVertical: 16 }}>
                            <QuestionaireSlider
                                item={{ key: key, value: tempQuestionnaire[key] }}
                                setQuestionaire={setTempQuestionnaire}
                            />
                        </View>
                    ))}

                    <View style={{ paddingBottom: 20, marginTop: 10 }}>
                        <ButtonMain text={"Submit"} onPress={handleSubmit} />
                    </View>
                </ScrollView>
            }
        />
    );

};

export default QuestionaireScreen;