import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useContext, useEffect, useRef, useState } from 'react'
import ScreenComponent from './ScreenComponent'
import NearByBottomBar from './NearByBottomBar'
import { ScrollView } from 'react-native-gesture-handler'
import { FaceSmileIcon, HeartIcon } from 'react-native-heroicons/outline'
import DescriptionDialaog from './Dialogs/DescriptionDialaog'
import RatingIconsComp from './RatingIconsComp'
import ImagesCarouselNearBottom from './ImagesCarouselNearBottom'
import { HotelsAppContext } from '../Context/HotelsAppContext'



const NearByBottom = ({ item, setPanResponderEnabled }) => {


    var addressArray = item.address.split(" ");
    var lastElement = addressArray[addressArray.length - 1];
    const [favorite, setFavorite] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [imageModalVisible, setImageModalVisible] = useState(false);


    const MakeTheFirstLetterUpperCase = (word) => {
        const firstLetter = word.charAt(0);
        const capitalizedWord = firstLetter.toUpperCase() + word.slice(1);
        return capitalizedWord;
    }

    useEffect(() => {
        setPanResponderEnabled(!modalVisible)
    }, [modalVisible])

    useEffect(() => {
        setPanResponderEnabled(!imageModalVisible)
    }, [imageModalVisible])

    const { setUpdatedActivities, updatedActivities} = useContext(HotelsAppContext)

    useEffect(() => {
        const filteredActivities = updatedActivities.filter(obj => obj.placeID === item.placeID);
        const fav = filteredActivities.length > 0 ? filteredActivities[0].favorite : null;

        if (fav === undefined || fav === null) {
            setFavorite(false);
        } else {
            setFavorite(fav);
        }
    }, [updatedActivities]);




    useEffect(() => {
        if (favorite != null) {
            if (updatedActivities.filter(obj => obj.placeID === item.placeID).length > 0) {
                const activities = updatedActivities.map(obj => {
                    if (obj.placeID === item.placeID) {
                        obj.favorite = favorite;
                    }
                    return obj;
                });
                setUpdatedActivities(activities);
            } else {
                let newActivityUpdate = {
                    placeID: item.placeID,
                    favorite: favorite
                };
                setUpdatedActivities([...updatedActivities, newActivityUpdate]);
            }
        }
    }, [favorite]);

    const favoriteColor = favorite ? "red" : "black";

    return (
        <ScreenComponent topLeftButton={"none"}
            content={
                <>
                    <View style={styles.view}>
                        <Text style={[styles.label, { flex: 1 }]}>{item.name} | {lastElement}</Text>
                        <TouchableOpacity onPress={() => setFavorite(!favorite)}>
                            <HeartIcon
                                size={30}
                                color={favorite ? "transparent" : "black"}
                                fill={favorite ? "red" : "transparent"}
                                style={{ top: 10, shadowOffset: { width: 0.5, height: 0.5 }, shadowOpacity: 1, shadowColor: favoriteColor }}
                            />
                        </TouchableOpacity>

                    </View>
                    <View style={styles.view}>
                        <Text style={styles.category}>{MakeTheFirstLetterUpperCase(item.category)}</Text>
                    </View>
                    <View style={[styles.view, { marginTop: 16, alignItems: "center" }]}>
                        <FaceSmileIcon size={20} color={"black"} />
                        <Text style={styles.text}>{item.rating}</Text>
                    </View>
                    <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.view}>
                        <Text style={[styles.category, { marginTop: 16, textDecorationLine: "underline" }]}>
                            View Description</Text>
                    </TouchableOpacity>
                    <DescriptionDialaog setModalVisible={setModalVisible} modalVisible={modalVisible} description={item.description} name={item.name} />
                    <View style={[styles.view, { marginTop: 40, alignItems: "center", justifyContent: "center" }]}>
                        <ImagesCarouselNearBottom urlList={item.morePhotosUrls} image={item.imageURL} setModalVisible={setImageModalVisible} modalVisible={imageModalVisible}/>
                    </View>
                    <View style={[styles.view, { top: "15%" }]}>
                        <RatingIconsComp item={item}/>
                    </View>
                </>
            }
        />
    )
}

export default NearByBottom

const styles = StyleSheet.create({
    view: {
        paddingHorizontal: 16,
        flexDirection: "row",
        marginTop: 10,
        alignItems: "center"
    },
    label: {
        fontWeight: "bold",
        fontSize: 22,
        marginTop: 20
    },
    category: {
        fontSize: 16
    },
    text: {
        marginHorizontal: 10,
        alignSelf: "auto"
    }
})
