import { View, Text, StyleSheet, ScrollView } from "react-native";
import { ButtonArrow } from "../../FCComponents/Buttons";
import { Input, Switch } from "@rneui/themed";
import React, { useState } from "react";
import ScreenComponent from "../../FCComponents/ScreenComponent";

const HealthDeclarationScreen = () => {
  const [isEnabled1, setIsEnabled1] = useState(false);
  const [isEnabled2, setIsEnabled2] = useState(false);
  const [isEnabled3, setIsEnabled3] = useState(false);
  const [isEnabled4, setIsEnabled4] = useState(false);
  const [isEnabled5, setIsEnabled5] = useState(false);
  const [isEnabled6, setIsEnabled6] = useState(false);
  const [isEnabled7, setIsEnabled7] = useState(false);
  const [isEnabled8, setIsEnabled8] = useState(false);
  const [isEnabled9, setIsEnabled9] = useState(false);
  const [isEnabled10, setIsEnabled10] = useState(false);
  const [isEnabled11, setIsEnabled11] = useState(false);
  const [isEnabled12, setIsEnabled12] = useState(false);
  const [isEnabled13, setIsEnabled13] = useState(false);
  const [isEnabled14, setIsEnabled14] = useState(false);

  const toggleSwitch1 = () => {
    setIsEnabled1((previousState) => !previousState);
  };
  const toggleSwitch2 = () => {
    setIsEnabled2((previousState) => !previousState);
  };
  const toggleSwitch3 = () => {
    setIsEnabled3((previousState) => !previousState);
  };
  const toggleSwitch4 = () => {
    setIsEnabled4((previousState) => !previousState);
  };
  const toggleSwitch5 = () => {
    setIsEnabled5((previousState) => !previousState);
  };
  const toggleSwitch6 = () => {
    setIsEnabled6((previousState) => !previousState);
  };
  const toggleSwitch7 = () => {
    setIsEnabled7((previousState) => !previousState);
  };
  const toggleSwitch8 = () => {
    setIsEnabled8((previousState) => !previousState);
  };
  const toggleSwitch9 = () => {
    setIsEnabled9((previousState) => !previousState);
  };
  const toggleSwitch10 = () => {
    setIsEnabled10((previousState) => !previousState);
  };
  const toggleSwitch11 = () => {
    setIsEnabled11((previousState) => !previousState);
  };
  const toggleSwitch12 = () => {
    setIsEnabled12((previousState) => !previousState);
  };
  const toggleSwitch13 = () => {
    setIsEnabled13((previousState) => !previousState);
  };
  const toggleSwitch14 = () => {
    setIsEnabled14((previousState) => !previousState);
  };

  return (
    <ScreenComponent
      content={
        <ScrollView>
          <Text style={styles.mainTitel}>Health declaration form</Text>
          <View style={{ top: 25 }}>
            <Input placeholder="Full name" />
          </View>
          <View style={styles.row}>
            <View style={{ flex: 1 }}>
              <Text style={styles.text}>
                Do you have any of the following conditions?
              </Text>
            </View>
          </View>
          <View style={styles.row}>
            <View style={{ flex: 1 }}>
              <Text style={styles.text}>Allergies</Text>
            </View>
            <Switch
              trackColor={{ false: "#767577", true: "#D3B9B3" }}
              thumbColor={isEnabled1 ? "#F0E8E6" : "#f4f3f4"}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleSwitch1}
              value={isEnabled1}
            />
          </View>
          <View
            style={{
              borderBottomColor: "black",
              borderBottomWidth: StyleSheet.hairlineWidth,
            }}
          />
          <View style={styles.row}>
            <View style={{ flex: 1 }}>
              <Text style={styles.text}>Back problems</Text>
            </View>
            <Switch
              trackColor={{ false: "#767577", true: "#D3B9B3" }}
              thumbColor={isEnabled2 ? "#F0E8E6" : "#f4f3f4"}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleSwitch2}
              value={isEnabled2}
            />
          </View>
          <View
            style={{
              borderBottomColor: "black",
              borderBottomWidth: StyleSheet.hairlineWidth,
            }}
          />
          <View style={styles.row}>
            <View style={{ flex: 1 }}>
              <Text style={styles.text}>Diabetes</Text>
            </View>
            <Switch
              trackColor={{ false: "#767577", true: "#D3B9B3" }}
              thumbColor={isEnabled3 ? "#F0E8E6" : "#f4f3f4"}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleSwitch3}
              value={isEnabled3}
            />
          </View>
          <View
            style={{
              borderBottomColor: "black",
              borderBottomWidth: StyleSheet.hairlineWidth,
            }}
          />
          <View style={styles.row}>
            <View style={{ flex: 1 }}>
              <Text style={styles.text}>High/low blood pressure</Text>
            </View>
            <Switch
              trackColor={{ false: "#767577", true: "#D3B9B3" }}
              thumbColor={isEnabled4 ? "#F0E8E6" : "#f4f3f4"}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleSwitch4}
              value={isEnabled4}
            />
          </View>
          <View
            style={{
              borderBottomColor: "black",
              borderBottomWidth: StyleSheet.hairlineWidth,
            }}
          />
          <View style={styles.row}>
            <View style={{ flex: 1 }}>
              <Text style={styles.text}>Pregnancy</Text>
            </View>
            <Switch
              trackColor={{ false: "#767577", true: "#D3B9B3" }}
              thumbColor={isEnabled5 ? "#F0E8E6" : "#f4f3f4"}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleSwitch5}
              value={isEnabled5}
            />
          </View>
          <View
            style={{
              borderBottomColor: "black",
              borderBottomWidth: StyleSheet.hairlineWidth,
            }}
          />
          <View style={styles.row}>
            <View style={{ flex: 1 }}>
              <Text style={styles.text}>Pain in any area</Text>
            </View>
            <Switch
              trackColor={{ false: "#767577", true: "#D3B9B3" }}
              thumbColor={isEnabled6 ? "#F0E8E6" : "#f4f3f4"}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleSwitch6}
              value={isEnabled6}
            />
          </View>
          <View
            style={{
              borderBottomColor: "black",
              borderBottomWidth: StyleSheet.hairlineWidth,
            }}
          />
          <View style={styles.row}>
            <View style={{ flex: 1 }}>
              <Text style={styles.text}>Are you under any medication?</Text>
            </View>
            <Switch
              trackColor={{ false: "#767577", true: "#D3B9B3" }}
              thumbColor={isEnabled7 ? "#F0E8E6" : "#f4f3f4"}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleSwitch7}
              value={isEnabled7}
            />
          </View>
          <View
            style={{
              borderBottomColor: "black",
              borderBottomWidth: StyleSheet.hairlineWidth,
            }}
          />
          <View style={styles.row}>
            <View style={{ flex: 1 }}>
              <Text style={styles.text}>Asthma</Text>
            </View>
            <Switch
              trackColor={{ false: "#767577", true: "#D3B9B3" }}
              thumbColor={isEnabled8 ? "#F0E8E6" : "#f4f3f4"}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleSwitch8}
              value={isEnabled8}
            />
          </View>
          <View
            style={{
              borderBottomColor: "black",
              borderBottomWidth: StyleSheet.hairlineWidth,
            }}
          />
          <View style={styles.row}>
            <View style={{ flex: 1 }}>
              <Text style={styles.text}>Nerve damage</Text>
            </View>
            <Switch
              trackColor={{ false: "#767577", true: "#D3B9B3" }}
              thumbColor={isEnabled9 ? "#F0E8E6" : "#f4f3f4"}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleSwitch9}
              value={isEnabled9}
            />
          </View>
          <View
            style={{
              borderBottomColor: "black",
              borderBottomWidth: StyleSheet.hairlineWidth,
            }}
          />
          <View style={styles.row}>
            <View style={{ flex: 1 }}>
              <Text style={styles.text}>Cancer</Text>
            </View>
            <Switch
              trackColor={{ false: "#767577", true: "#D3B9B3" }}
              thumbColor={isEnabled10 ? "#F0E8E6" : "#f4f3f4"}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleSwitch10}
              value={isEnabled10}
            />
          </View>
          <View
            style={{
              borderBottomColor: "black",
              borderBottomWidth: StyleSheet.hairlineWidth,
            }}
          />
          <View style={styles.row}>
            <View style={{ flex: 1 }}>
              <Text style={styles.text}>Epilepsy</Text>
            </View>
            <Switch
              trackColor={{ false: "#767577", true: "#D3B9B3" }}
              thumbColor={isEnabled11 ? "#F0E8E6" : "#f4f3f4"}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleSwitch11}
              value={isEnabled11}
            />
          </View>
          <View
            style={{
              borderBottomColor: "black",
              borderBottomWidth: StyleSheet.hairlineWidth,
            }}
          />
          <View style={styles.row}>
            <View style={{ flex: 1 }}>
              <Text style={styles.text}>Breast feeding</Text>
            </View>
            <Switch
              trackColor={{ false: "#767577", true: "#D3B9B3" }}
              thumbColor={isEnabled12 ? "#F0E8E6" : "#f4f3f4"}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleSwitch12}
              value={isEnabled12}
            />
          </View>
          <View
            style={{
              borderBottomColor: "black",
              borderBottomWidth: StyleSheet.hairlineWidth,
            }}
          />
          <View style={styles.row}>
            <View style={{ flex: 1 }}>
              <Text style={styles.text}>Headaches/Migraines</Text>
            </View>
            <Switch
              trackColor={{ false: "#767577", true: "#D3B9B3" }}
              thumbColor={isEnabled13 ? "#F0E8E6" : "#f4f3f4"}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleSwitch13}
              value={isEnabled13}
            />
          </View>
          <View
            style={{
              borderBottomColor: "black",
              borderBottomWidth: StyleSheet.hairlineWidth,
            }}
          />
          <View style={styles.row}>
            <View style={{ flex: 1 }}>
              <Text style={styles.text}>Other</Text>
            </View>
            <Switch
              trackColor={{ false: "#767577", true: "#D3B9B3" }}
              thumbColor={isEnabled14 ? "#F0E8E6" : "#f4f3f4"}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleSwitch14}
              value={isEnabled14}
            />
          </View>
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