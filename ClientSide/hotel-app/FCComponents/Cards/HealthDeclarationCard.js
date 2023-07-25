import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { Switch } from "@rneui/themed";

const HealthDeclarationCard = ({ item }) => {
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => {
    setIsEnabled((previousState) => !previousState);
  };
  return (
    <View>
      <View style={styles.row}>
        <View style={{ flex: 1 }}>
          <Text style={styles.text}>{item.name}</Text>
        </View>
        <Switch
          trackColor={{ false: "#767577", true: "#D3B9B3" }}
          thumbColor={isEnabled ? "#F0E8E6" : "#f4f3f4"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch}
          value={isEnabled}
        />
      </View>
      <View
        style={{
          borderBottomColor: "black",
          borderBottomWidth: StyleSheet.hairlineWidth,
        }}
      />
    </View>
  );
};

export default HealthDeclarationCard;

const styles = StyleSheet.create({
  row: {
    left: 5,
    padding: 10,
    margin: 10,
    flexDirection: "row",
    alignItems: "center",
  },
});