import { View, Text, StyleSheet, ScrollView } from "react-native";
import ScreenComponent from "../../FCComponents/ScreenComponent";
import { SearchBar } from "@rneui/themed";
import { useState } from "react";
import { useContext } from "react";
import { HotelsAppContext } from "../../Context/HotelsAppContext";
import SmallCard from "../../FCComponents/Cards/SmallCard";
import { useEffect } from "react";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { Keyboard } from "react-native";

const SearchScreen = () => {

  const { food, therapies, facilities, activities_hotel, activities_nearBy, drinks,alcohol,additionalItems } = useContext(HotelsAppContext)

  const [searchInput, setSearchInput] = useState("")
  const [cardsToShow, setCardsToShow] = useState([])

  const updateSearch = (value) => {
    setSearchInput(value)
  }

  useEffect(() => {
    if (searchInput != "") {
      searchItems();
    }
    else {
      setCardsToShow([])
    }

  }, [searchInput])


  const searchItems = () => {
    let retVal = [];

    // Add the `type` prop to each object in `retVal`
    retVal = retVal.concat(
      food?.map(item => ({ ...item, type: 'room_service' })),
      drinks?.map(item => ({ ...item, type: 'room_service' })),
      alcohol?.map(item => ({ ...item, type: 'room_service' })),
      additionalItems?.map(item => ({ ...item, type: 'room_service' })),
      therapies?.map(item => ({ ...item, type: 'therapies' })),
      facilities?.map(item => ({ ...item, type: 'facilities' })),
      activities_hotel?.map(item => ({ ...item, type: 'activities_hotel' })),
      activities_nearBy?.map(item => ({ ...item, type: 'activities_nearBy' }))
    ).flat();

    const filteredItems = retVal.filter(item => {
      return (
        (item.name && item.name.toLowerCase().includes(searchInput.toLowerCase())) ||
        (item.description && item.description.toLowerCase().includes(searchInput.toLowerCase())) ||
        (item.tags && item.tags.toLowerCase().includes(searchInput.toLowerCase()))
      );
    });

    setCardsToShow(filteredItems);
  };


  // state of keyboard to know if keyboard is currently showen 
  const [isKeyBoardOpen, setIsKeyBoardOpen] = useState(false);

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //listiner of the keyboard that setting the setIsKeboardOpen using the handleKeyboardDidShouw and didHide functions///// 
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', handleKeyboardDidShow);
    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', handleKeyboardDidHide);

    // remove the event listeners when the component unmounts
    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  const handleKeyboardDidShow = () => {
    setIsKeyBoardOpen(true);

  };

  const handleKeyboardDidHide = () => {
    setIsKeyBoardOpen(false);

  };
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


  //TouchableWithoutFeedback function to dismiss the keyBoard if open
  const dismissKeyboard = () => {
    if (Keyboard) {
      Keyboard.dismiss();
    }
  };

  const renderItems = () => {

    const getID = (item) => {
      switch (item.type) {
        case "room_service":
          return item.ID;
        case "therapies":
          return item.therapyID;
        case "facilities":
          return item.facilityID;
        case "activities_hotel":
        case "activities_nearBy":
          return item.placeID;
      }
    }


    return (
      <TouchableWithoutFeedback disabled={!isKeyBoardOpen} onPress={dismissKeyboard}>
        <ScrollView>
          <View style={{ display: "flex", flexDirection: "row", flexWrap: "wrap", paddingBottom: 90 }}>
            {cardsToShow?.map((item, index) => (
              <View key={getID(item) + index + item.type} style={{ width: "50%" }}>
                <SmallCard id={index} item={item} withPrice={false} />
              </View>
            ))}
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    );
  };



  return (
    <ScreenComponent topLeftButton={"none"} content={
      <>
        <View style={styles.viwSearch}>
          <SearchBar
            placeholder="Type here to search..."
            value={searchInput}
            onChangeText={(value) => updateSearch(value)}
            containerStyle={{
              backgroundColor: "white",
              borderWidth: 1,
              borderRadius: 30,
              height: 45
            }}
            inputContainerStyle={{ backgroundColor: "white", height: 20 }}
          />
        </View>
        {renderItems()}
      </>
    } />
  );
};

export default SearchScreen;
const styles = StyleSheet.create({
  viwSearch: {
    margin: 10,
  },
});
