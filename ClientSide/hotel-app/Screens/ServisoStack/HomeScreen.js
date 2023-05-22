import { Dimensions, Image, StyleSheet, Text, View } from 'react-native'
import React, { useContext } from 'react'
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
    const { language, therapies, activities_nearBy, food } = useContext(HotelsAppContext);
    const screenContent = Languages.HomeScreen;

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
                                <MyCarousel data={activities_nearBy} type={'parallax'} cardStyle={{ borderWidth: 1 }} />
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
                                <TouchableOpacity onPress={() => ""}>
                                    <Text>{screenContent.ToTheFullMenu[language]}</Text>
                                </TouchableOpacity>
                            </View>
                            <ScrollView horizontal={true}>
                                {food.map((item) => (
                                    <SmallCard key={item.ID} item={item} id={item.ID}/>
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