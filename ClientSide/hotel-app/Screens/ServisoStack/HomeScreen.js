import { Dimensions, Image, StyleSheet, Text, View } from 'react-native'
import React, { useContext, useEffect } from 'react'
import CarouselData from '../../Json_files/CarouselData';
import ScreenComponent from '../../FCComponents/ScreenComponent';
import MyCarousel from '../../FCComponents/MyCarousel';
import { TouchableOpacity } from 'react-native-gesture-handler';
import SmallCard from '../../FCComponents/Cards/SmallCard';
import { ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { HotelsAppContext } from '../../Context/HotelsAppContext';
import Languages from '../../Json_files/Languages';


const HomeScreen = () => {

    const navigation = useNavigation();
    const { language, therapies, suggestedActivities, food, user, setUpdatedActivities} = useContext(HotelsAppContext);
    const screenContent = Languages.HomeScreen;

    useEffect(() => {
        GetUpdatedActivities();
    }, [])


    const GetUpdatedActivities = async () => {
        try {
            const response = await fetch(`http://proj.ruppin.ac.il/cgroup97/test2/api/getUpdatedActivities?email=${user.email}`, {
                method: 'GET',
                headers: new Headers({
                    'Content-type': 'application/json; charset=UTF-8',
                })
            });

            if (response.ok) {
                const message = await response.text();
                const object = JSON.parse(message);
                setUpdatedActivities(object);
            } else {
                const errorMessage = await response.text();
                const errorObject = JSON.parse(errorMessage);
                const errorType = errorObject.type;
                const errorMessageText = errorObject.message;

                console.log(`Error: ${response.status} - ${errorType} - ${errorMessageText}`);
            }

        } catch (error) {
            console.log(error);
        }
    }

    return (
        <ScreenComponent topLeftButton={"none"}
            content={
                <View>
                    <View style={{ alignItems: "center" }}>
                        <Image source={require('../../assets/ServisoText.png')} />
                    </View>
                    <ScrollView>
                        <View>
                            <View style={{ flexDirection: "row", marginHorizontal: 40 }}>
                                <Text style={{ flex: 1, fontWeight: "bold" }}>{screenContent.PerfectForYou[language]}</Text>
                                <TouchableOpacity onPress={() => navigation.navigate("ConciergeMainScreen")}>
                                    <Text>{screenContent.ToTheConcierge[language]}</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={{ flex: 1 }}>
                                <MyCarousel data={suggestedActivities} type={'parallax'} cardStyle={{ borderWidth: 1 }} />
                            </View>
                        </View>
                        <View style={{ marginVertical: 10, marginTop: 10 }}>
                            <View style={{ flexDirection: "row", marginHorizontal: 40, marginBottom: 5, marginTop: 10 }}>
                                <Text style={{ flex: 1, fontWeight: "bold" }}>{screenContent.SpaTime[language]}</Text>
                                <TouchableOpacity onPress={() => navigation.navigate("SpaMainScreen")}>
                                    <Text>{screenContent.MoreSpaTreatments[language]}</Text>
                                </TouchableOpacity>
                            </View>
                            {therapies ?
                                <ScrollView horizontal={true}>
                                    {therapies.map((item) => (
                                        <SmallCard key={item.therapyID} item={item} type={"SPA"} />
                                    ))}
                                </ScrollView>
                                :
                                ""
                            }
                        </View>
                        <View style={{ marginVertical: 10, marginTop: 10, paddingBottom: 50 }}>
                            <View style={{ flexDirection: "row", marginHorizontal: 40, marginBottom: 5, marginTop: 10 }}>
                                <Text style={{ flex: 1, fontWeight: "bold" }}>{screenContent.SomethingToSnack[language]}</Text>
                                <TouchableOpacity onPress={() => navigation.navigate("RoomServiceMenuNew")}>
                                    <Text>{screenContent.ToTheFullMenu[language]}</Text>
                                </TouchableOpacity>
                            </View>
                            <ScrollView horizontal={true}>
                                {food.map((item) => (
                                    <SmallCard key={item.ID} item={item} id={item.ID} />
                                ))}
                            </ScrollView>
                        </View>
                    </ScrollView >
                </View >
            }
        />
    )
}

export default HomeScreen

const styles = StyleSheet.create({})