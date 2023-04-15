import { View, Text, StyleSheet, ScrollView } from "react-native";
import ScreenComponent from "../FCComponents/ScreenComponent";
import { ButtonArrow } from "../FCComponents/Buttons";
import { SearchBar } from "@rneui/themed";

const SearchScreen = () => {
  return (
    <ScreenComponent
      content={
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
      }
    />
  );
};

export default SearchScreen;
const styles = StyleSheet.create({
  viwSearch: {
    margin: 10,
    top: 20,
  },
});
