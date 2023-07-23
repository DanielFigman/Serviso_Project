import { Text, Modal } from "react-native";
import React from "react";
import { Dialog } from "@rneui/themed";
import { HotelsAppContext } from "../Context/HotelsAppContext";
import Languages from "../../Json_files/Languages";

const QuestionnaireDialog = ({ modalVisible, setModalVisible }) => {
  const { language } = useContext(HotelsAppContext);
  const screenContent = Languages.QuestionnaireDialog;
  return (
    <Dialog
      ModalComponent={Modal}
      isVisible={modalVisible}
      onBackdropPress={() => setModalVisible(!modalVisible)}
    >
      <Dialog.Title
        title="Questionnaire"
        titleStyle={{ textAlign: "center" }}
      />
      <Text style={{ marginTop: 20, fontSize: 18 }}>
        {screenContent.PleaseAdjustYourInterestTypesBetween[language]}
      </Text>
      <Text style={{ marginTop: 20, fontSize: 18 }}>
        {screenContent.WeWillSuggestYouActivitiesBasedOnYourInterests[language]}
      </Text>
    </Dialog>
  );
};

export default QuestionnaireDialog;
