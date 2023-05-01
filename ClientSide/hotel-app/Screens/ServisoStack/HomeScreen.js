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

const snackOptions = [
    {
        id: 1,
        name: "Cake",
        price: 45,
        imageURL: "https://www.pieceofcakeinc.com/images/products/lrg/redvelvetlayercake.jpg",
    },
    {
        id: 2,
        name: "Salad",
        price: 65,
        imageURL: "https://www.nonguiltypleasures.com/wp-content/uploads/2022/10/arabic-chopped-salad.jpg",
    },
    {
        id: 3,
        name: "French toast",
        price: 40,
        imageURL: "https://images.immediate.co.uk/production/volatile/sites/30/2020/08/french-toast_1-5bbce73.jpg?quality=90&webp=true&resize=375,341",
    },
    {
        id: 4,
        name: "Fries",
        price: 30,
        imageURL: "https://images.themodernproper.com/billowy-turkey/production/posts/2022/Homemade-French-Fries_8.jpg?w=800&q=82&fm=jpg&fit=crop&dm=1662474181&s=76f4dc7a5af1958d255ce8559579a6f2",
    },
];



const HomeScreen = () => {

    const navigation = useNavigation();
    const {language, therapies, activities_nearBy } = useContext(HotelsAppContext);
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
                                <MyCarousel data={activities_nearBy} type={'parallax'} cardStyle={{borderWidth:1}}/>
                            </View>
                        </View>
                        <View style={{ marginVertical: 10, marginTop: 10 }}>
                            <View style={{ flexDirection: "row", marginHorizontal: 40, marginBottom: 5, marginTop: 10 }}>
                                <Text style={{ flex: 1, fontWeight: "bold" }}>{screenContent.SpaTime[language]}</Text>
                                <TouchableOpacity onPress={() => navigation.navigate("SpaMainScreen")}>
                                    <Text>{screenContent.MoreSpaTreatments[language]}</Text>
                                </TouchableOpacity>
                            </View>
                            <ScrollView horizontal={true}>
                                {therapies.map((item) => (
                                    <SmallCard key={item.therapyID} item={item} type={"SPA"}/>
                                ))}
                            </ScrollView>
                        </View>
                        <View style={{ marginVertical: 10, marginTop: 10, paddingBottom:50}}>
                            <View style={{ flexDirection: "row", marginHorizontal: 40, marginBottom: 5, marginTop: 10 }}>
                                <Text style={{ flex: 1, fontWeight: "bold" }}>{screenContent.SomethingToSnack[language]}</Text>
                                <TouchableOpacity onPress={() => ""}>
                                    <Text>{screenContent.ToTheFullMenu[language]}</Text>
                                </TouchableOpacity>
                            </View>
                            <ScrollView horizontal={true}>
                                {snackOptions.map((item) => (
                                    <SmallCard key={item.id} item={item}/>
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