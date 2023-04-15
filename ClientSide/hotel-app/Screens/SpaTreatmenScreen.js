import { View, Text, StyleSheet, ScrollView } from "react-native";
import ScreenComponent from "../FCComponents/ScreenComponent";
import { ButtonArrow } from "../FCComponents/Buttons";
import { HotelsAppContext } from "../Context/HotelsAppContext";
import React, { useContext } from "react";
import { SearchBar } from "@rneui/themed";
import Languages from "../Json_files/Languages";

// const { language } = useContext(HotelsAppContext);

// const screenContent = Languages.SpaTreatmenScreen;

const SpaTreatmenScreen = () => {
  return (
    <ScreenComponent
      content={
        <ScrollView>
          <Text style={styles.mainTitel}>
            MASSAGE TREATMENTS
            {/* {screenContent.MassageTreatments[language]} */}
          </Text>
          <View style={styles.viwSearch}>
            <SearchBar
              placeholder="Type here..."
              containerStyle={{
                backgroundColor: "white",
                borderWidth: 1,
                borderRadius: 20,
              }}
              inputContainerStyle={{ backgroundColor: "white" }}
              placeholderTextColor={"#g5g5g5"}
            />
          </View>
          <Text style={styles.title}>Swedish Massage</Text>
          <View style={styles.row}>
            <View style={{ flex: 1 }}>
              <Text style={styles.text}>
                Oil Massage designed to release muscle tension, assist blood
                circulation while focusing on relaxing tense areas. Recommended
                for general relaxation.
              </Text>
            </View>
            <ButtonArrow navigate={""} />
          </View>
          <Text style={styles.title}>Hot Stone Massage</Text>
          <View style={styles.row}>
            <View style={{ flex: 1 }}>
              <Text style={styles.text}>
                Treatment from ancient Indian tradition which combines a massage
                with the therapist's hands and heated basalt stones
              </Text>
            </View>
            <ButtonArrow navigate={""} />
          </View>
          <Text style={styles.title}>Combined Massage</Text>
          <View style={styles.row}>
            <View style={{ flex: 1 }}>
              <Text style={styles.text}>
                The integrated massage combines different techniques. There is
                an emphasis on strenuous muscle work together with the
                integration of the senses to create a peaceful and unique
                atmosphere.
              </Text>
            </View>
            <ButtonArrow navigate={""} />
          </View>
          <Text style={styles.title}>Deep Tissu Massage</Text>
          <View style={styles.row}>
            <View style={{ flex: 1 }}>
              <Text style={styles.text}>
                A deep technique massage designed to focus on muscle tension and
                stressed areas in different areas of the body
              </Text>
            </View>
            <ButtonArrow navigate={""} />
          </View>
          <Text style={styles.title}>Prenatal Massage</Text>
          <View style={styles.row}>
            <View style={{ flex: 1 }}>
              <Text style={styles.text}>
                For weeks 14-32, a gentle massage to relief pregnancy tension
                and to help release general pain.
              </Text>
            </View>
            <ButtonArrow navigate={""} />
          </View>
        </ScrollView>
      }
    />
  );
};

export default SpaTreatmenScreen;
const styles = StyleSheet.create({
  text: {
    fontSize: 18,
  },
  row: {
    left: 5,
    padding: 12,
    margin: 10,
    top: 25,
    flexDirection: "row",
    alignItems: "center",
  },
  title: {
    fontSize: 25,
    left: 15,
    top: 35,
    textShadowColor: "#F0E8E6",
    shadowOffset: {
      width: 1,
      height: 2,
    },
    shadowOpacity: 0.17,
    shadowRadius: 1.05,
    elevation: 4,
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
  viwSearch: {
    margin: 10,
    top: 20,
    width: "50%",
  },
});
