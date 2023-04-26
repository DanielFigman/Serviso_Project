import { Dimensions, Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import CarouselData from '../../Json_files/CarouselData';
import ScreenComponent from '../../FCComponents/ScreenComponent';
import MyCarousel from '../../FCComponents/MyCarousel';
import { TouchableOpacity } from 'react-native-gesture-handler';
import SmallCard from '../../FCComponents/Cards/SmallCard';
import { ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const spaOptions = [
    {
        id: 1,
        name: "Swedish Massage",
        price: "250₪",
        url: "https://smb.ibsrv.net/imageresizer/image/article_manager/1200x1200/17220/291800/heroimage0.190644001621610009.jpg",
    },
    {
        id: 2,
        name: "Hot Stone Massage",
        price: "320₪",
        url: "https://img1.wsimg.com/isteam/stock/BNQKEo8/:/rs=w:984,h:738",
    },
    {
        id: 3,
        name: "Prenatal Massage",
        price: "340₪",
        url: "https://www.somanovo.com/wp-content/uploads/2018/11/feature_prenatal-640x380.jpg",
    },
    {
        id: 4,
        name: "Combined Massage",
        price: "250₪",
        url: "https://massageofsantafe.com/wp-content/uploads/2022/09/deep-tissue-massage.jpg",
    },
];

const snackOptions = [
    {
        id: 1,
        name: "Cake",
        price: "45₪",
        url: "https://www.pieceofcakeinc.com/images/products/lrg/redvelvetlayercake.jpg",
    },
    {
        id: 2,
        name: "Salad",
        price: "65₪",
        url: "https://www.nonguiltypleasures.com/wp-content/uploads/2022/10/arabic-chopped-salad.jpg",
    },
    {
        id: 3,
        name: "French toast",
        price: "40₪",
        url: "https://images.immediate.co.uk/production/volatile/sites/30/2020/08/french-toast_1-5bbce73.jpg?quality=90&webp=true&resize=375,341",
    },
    {
        id: 4,
        name: "Fries",
        price: "30₪",
        url: "https://images.themodernproper.com/billowy-turkey/production/posts/2022/Homemade-French-Fries_8.jpg?w=800&q=82&fm=jpg&fit=crop&dm=1662474181&s=76f4dc7a5af1958d255ce8559579a6f2",
    },
];

const HomeScreen = () => {

    const navigation = useNavigation();

    return (
        <ScreenComponent topLeftButton={"none"}
            content={
                <View style={{ top: -30 }}>
                    <View style={{ alignItems: "center" }}>
                        <Image source={require('../../assets/ServisoText.png')} />
                    </View>
                    <ScrollView>
                        <View>
                            <View style={{ flexDirection: "row", marginHorizontal: 40 }}>
                                <Text style={{ flex: 1, fontWeight: "bold" }}>Perfect for you</Text>
                                <TouchableOpacity onPress={() => navigation.navigate("ConciergeMainScreen")}>
                                    <Text>To the concierge</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={{ flex: 1 }}>
                                <MyCarousel data={CarouselData.SpaCarousel} />
                            </View>
                        </View>
                        <View style={{ marginVertical: 10, marginTop: 10 }}>
                            <View style={{ flexDirection: "row", marginHorizontal: 40, marginBottom: 5, marginTop: 10 }}>
                                <Text style={{ flex: 1, fontWeight: "bold" }}>Spa time</Text>
                                <TouchableOpacity onPress={() => navigation.navigate("SpaMainScreen")}>
                                    <Text>More spa treatmants</Text>
                                </TouchableOpacity>
                            </View>
                            <ScrollView horizontal={true}>
                                {spaOptions.map((item) => (
                                    <SmallCard key={item.id} item={item} />
                                ))}
                            </ScrollView>
                        </View>
                        <View style={{ marginVertical: 10, marginTop: 10, paddingBottom:60}}>
                            <View style={{ flexDirection: "row", marginHorizontal: 40, marginBottom: 5, marginTop: 10 }}>
                                <Text style={{ flex: 1, fontWeight: "bold" }}>Something to snack on</Text>
                                <TouchableOpacity onPress={() => ""}>
                                    <Text>To the full menu</Text>
                                </TouchableOpacity>
                            </View>
                            <ScrollView horizontal={true}>
                                {snackOptions.map((item) => (
                                    <SmallCard key={item.id} item={item} />
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