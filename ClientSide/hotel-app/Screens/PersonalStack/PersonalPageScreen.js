import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { CommonActions, useNavigation, DrawerActions } from "@react-navigation/native";
import { ArrowDownCircleIcon } from "react-native-heroicons/mini";
import { ArrowRightCircleIcon } from "react-native-heroicons/mini";
import "react-native-vector-icons/FontAwesome";
import ScreenComponent from "../../FCComponents/ScreenComponent";
import { ListItemAccordion } from "@rneui/base/dist/ListItem/ListItem.Accordion";
import { ListItem } from "@rneui/base";
import { ButtonArrow, ButtonText } from "../../FCComponents/Buttons";
import { HotelsAppContext } from "../../Context/HotelsAppContext";
import Languages from "../../Json_files/Languages";
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import { Icon } from "@rneui/themed";
import WelcomeScreen from "../MainStack/WelcomeScreen";
import { SafeAreaView } from "react-native-safe-area-context";
import LanguageSelect from "../../FCComponents/LanguageSelect";
import Loading from "../../FCComponents/Loading";

const Drawer = createDrawerNavigator();

export default function Setting() {
  const navigation = useNavigation();
  const { clearContext, language, setlanguage, user, setIsLoading, isLoading } = useContext(HotelsAppContext);

  const handleLogOut = () => {
    console.log("log out pressed");
    clearContext(); // Clear the context states
    navigation.reset({
      index: 0,
      routes: [{ name: "WelcomeScreen" }],
    });
  };

  useEffect(() => {
    if (isLoading) {
      navigation.dispatch(DrawerActions.closeDrawer());
    }
  }, [isLoading])


  const CustomDrawerContent = (props) => {
    return (
      <SafeAreaView>
        <LanguageSelect languageContext={language} setlanguageContext={setlanguage} buttonStyle={{ width: "60%", backgroundColor: "transparent", alignItems: "center", left: "18%", marginTop: 120 }} updateServer={true} email={user.email} setIsLoading={setIsLoading} />
        <DrawerItem
          label="Log Out"
          onPress={handleLogOut}
          style={{ height: "100%", display: "flex", width: "100%" }}
          labelStyle={{ textAlign: "center", fontSize: 20 }}
        />
      </SafeAreaView>
    );
  };

  return (
    <Drawer.Navigator
      initialRouteName="PersonalPageScreen"
      screenOptions={{
        drawerStyle: { width: "35%", backgroundColor: "#EBEBEB" },
        overlayColor: "rgba(128, 128, 128, 0.5)",
        drawerType: "back",
        drawerPosition: "right",
      }}
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen
        name="PersonalPageScreen"
        component={PersonalPageScreen}
        options={{ title: "My Page", drawerItemStyle: { display: "none" } }}
      />
    </Drawer.Navigator>
  );
}

const PersonalPageScreen = () => {
  const { language, user, isLoading, checkIfAlreadyScheduledAcleaning, scheduledOrder } = useContext(HotelsAppContext);

  const navigation = useNavigation();

  const [isOpen, setIsOpen] = useState(false);

  const screenContent = Languages.PersonalPageScreen;

  useEffect(() => {
    if (!scheduledOrder)
      checkIfAlreadyScheduledAcleaning();
  }, [])

  return (
    <ScreenComponent
      backgroundShapes={!isLoading}
      topLeftButton={"none"}
      bottomMenu={true}
      content={
        <>
          {
            isLoading ?
              <Loading />
              :
              <View>
                <View style={{ marginBottom: 80 }}>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <View style={{ display: "flex", flex: 1 }}>
                      <Text style={styles.title}>{screenContent.MyPage[language]}</Text>
                    </View>
                    <View style={{ right: 5 }}>
                      <TouchableOpacity
                        onPress={() => {
                          navigation.dispatch(DrawerActions.openDrawer());
                        }}
                      >
                        <Icon name="settings" />
                      </TouchableOpacity>
                    </View>
                  </View>
                  <Image
                    style={styles.Image}
                    source={
                      user.gender == "woman"
                        ? require("../../assets/persona.png")
                        : require("../../assets/male-avatar.png")
                    }
                  />
                  <Text style={styles.Details}>{user.fName + " " + user.sName}</Text>
                  <Text style={styles.Details}>{user.email}</Text>
                </View>
                <View style={styles.rowView}>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.text}>{screenContent.CheckIn[language]}</Text>
                  </View>
                  <ButtonArrow navigate={"NewCheckInScreen"} />
                </View>
                <View>
                  <ListItemAccordion
                    containerStyle={styles.listAccordionContainer}
                    icon={<ArrowRightCircleIcon style={styles.arrowList} size={30} />}
                    expandIcon={<ArrowDownCircleIcon style={styles.arrowList} size={30} />}
                    noRotation={true}
                    content={
                      <Text style={StyleSheet.flatten([styles.text, { left: 7 }])}>
                        {screenContent.HouseHold[language]}
                      </Text>
                    }
                    isExpanded={isOpen}
                    onPress={() => setIsOpen(!isOpen)}
                  >
                    <ListItem key={1} containerStyle={styles.listItemContainer}>
                      <ListItem.Content>
                        <View style={styles.listItemView}>
                          <View style={{ flex: 1 }}>
                            <Text style={styles.text}>
                              {screenContent.RoomCleaningSchedule[language]}
                            </Text>
                          </View>
                          <View>
                            <TouchableOpacity
                              onPress={() => navigation.navigate("RoomCleaningScreen")}
                            >
                              <ArrowRightCircleIcon
                                color={styles.arrow.color}
                                size={styles.arrow.fontSize}
                                style={styles.arrow}
                              />
                            </TouchableOpacity>
                          </View>
                        </View>
                      </ListItem.Content>
                    </ListItem>

                    <ListItem key={2} containerStyle={styles.listItemContainer}>
                      <ListItem.Content>
                        <View style={styles.listItemView}>
                          <View style={{ flex: 1 }}>
                            <Text style={styles.text}>
                              {screenContent.NewRequest[language]}
                            </Text>
                          </View>
                          <View>
                            <TouchableOpacity
                              onPress={() => navigation.navigate("CustomRequestScreen")}
                            >
                              <ArrowRightCircleIcon
                                color={styles.arrow.color}
                                size={styles.arrow.fontSize}
                                style={styles.arrow}
                              />
                            </TouchableOpacity>
                          </View>
                        </View>
                      </ListItem.Content>
                    </ListItem>
                  </ListItemAccordion>
                </View>
                <View style={styles.rowView}>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.text}>
                      {screenContent.HotelNavigation[language]}
                    </Text>
                  </View>
                  <ButtonArrow navigate={"HotelNavigation"} />
                </View>
              </View>
          }
        </>
      }
    />
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
    flex: 1,
  },
  title: {
    fontSize: 40,
    color: "#000000",
    alignSelf: "center",
    textAlign: "center",
  },
  Image: {
    alignSelf: "center",
    width: 124,
    height: 160,
    top: 50,
  },
  Details: {
    alignSelf: "center",
    top: 50,
  },
  arrow: {
    color: "#8E8E8E",
    fontSize: 30,
    left: 10,
    top: 5,
  },
  arrowList: {
    color: "#8E8E8E",
    left: 4,
    top: 6,
  },
  listItemView: {
    flexDirection: "row",
    marginTop: 20,
    alignItems: "center",
    marginHorizontal: 20,
  },
  rowView: {
    flexDirection: "row",
    marginTop: 20,
    alignItems: "center",
    margin: 20,
  },
  listAccordionContainer: {
    backgroundColor: "transparent",
  },
  listItemContainer: {
    backgroundColor: "transparent",
    marginTop: 0,
  },
});
