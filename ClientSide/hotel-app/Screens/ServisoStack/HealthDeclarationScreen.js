import { View, Text, StyleSheet, ScrollView } from "react-native";
import { Input } from "@rneui/themed";
import ScreenComponent from "../../FCComponents/ScreenComponent";
import HealthDeclarationCard from "../../FCComponents/Cards/HealthDeclarationCard";
import { useContext } from "react";
import { HotelsAppContext } from "../../Context/HotelsAppContext";
import Languages from "../../Json_files/Languages";

const HealthDetails = [
  {
    id: "1",
    name: "Allergies",
  },
  { id: "2", name: "Back problems" },
  { id: "3", name: "Diabetes" },
  { id: "4", name: "High/low blood pressure" },
  { id: "5", name: "Pregnancy" },
  { id: "6", name: "Pain in any area" },
  { id: "7", name: "Under any medication" },
  { id: "8", name: "Asthma" },
  { id: "9", name: "Nerve damage" },
  { id: "10", name: "Cancer" },
  { id: "11", name: "Epilepsy" },
  { id: "12", name: "Breast feeding" },
  { id: "13", name: "Headaches/Migraines" },
  { id: "14", name: "Other" },
];
const HealthDeclarationScreen = () => {

  const {language} = useContext(HotelsAppContext);
  const screenContent = Languages.HealthDeclarationScreen;


  return (
    <ScreenComponent
      content={
        <ScrollView>
          <Text style={styles.mainTitel}>{screenContent.HealthDeclarationForm[language]}</Text>
          <View style={{ top: 25 }}>
            <Input placeholder={screenContent.FullName[language]} />
          </View>
          <View style={styles.row}>
            <View style={{ flex: 1 }}>
              <Text style={styles.text}>
              {screenContent.DoYouHaveAnyOfTheFollowingConditions[language]}
              </Text>
            </View>
          </View>
          {HealthDetails.map((item) => (
            <HealthDeclarationCard key={item.id} item={item} />
          ))}
        </ScrollView>
      }
    />
  );
};

export default HealthDeclarationScreen;
const styles = StyleSheet.create({
  text: {
    fontSize: 18,
  },
  row: {
    left: 5,
    padding: 10,
    margin: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  mainTitel: {
    fontSize: 30,
    top: 12,
    textAlign: "center",
    // color: "#D3B9B3",
    fontWeight: "bold",
    fontStyle: "italic",
    textShadowColor: "#F0E8E6",
    shadowOffset: {
      width: 2,
      height: 4,
    },
    shadowOpacity: 0.17,
    shadowRadius: 1.05,
    elevation: 7,
    textShadowRadius: 25,
  },
});