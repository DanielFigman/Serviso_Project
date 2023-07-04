import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { HotelsAppContext } from '../../Context/HotelsAppContext'
import ScreenComponent from '../../FCComponents/ScreenComponent'
import HotelActivityCarouselCard from '../../FCComponents/Cards/HotelActivityCarouselCard'
import ConciergeCarouselCard from '../../FCComponents/Cards/ConciergeCarouselCard'

const FavoritesScreen = () => {

    const { updatedActivities, activities_hotel, activities_nearBy } = useContext(HotelsAppContext)
    const [cardsToShow, setCardsToShow] = useState([])



    const generateCardsToShow = () => {
        let setVal = [];

        const likedIds = updatedActivities.filter(obj => obj.favorite).map(obj => obj.placeID);

        let activitiesHotelToSet = activities_hotel.filter(obj => likedIds.includes(obj.placeID));
        let activitiesNearBy = activities_nearBy.filter(obj => likedIds.includes(obj.placeID));


        // Add the `type` prop to each object in `retVal`
        setVal = setVal.concat(
            activitiesHotelToSet.map(item => ({ ...item, type: 'activities_hotel' })),
            activitiesNearBy.map(item => ({ ...item, type: 'activities_nearBy' }))
        ).flat();

        setCardsToShow(setVal);
    };

    useEffect(() => {
        generateCardsToShow();

    }, [updatedActivities])

    const renderItems = () => {
        return (
            <ScrollView>
                <View style={{ display: "flex", flexDirection: "row", flexWrap: "wrap", paddingBottom: 90 }}>
                    {cardsToShow?.map((item, index) => (
                        <View key={item.placeID + index + item.type} style={{ width: "50%" }}>
                            {
                                item.type === "activities_hotel" ?
                                    <HotelActivityCarouselCard id={index} item={item} />
                                    :
                                    <ConciergeCarouselCard id={index} item={item} />
                            }
                        </View>
                    ))}
                </View>
            </ScrollView>
        );
    }


    return (
        <ScreenComponent title={
            <Text
                style={{
                    fontWeight: 'bold',
                    fontSize: 30,
                    marginHorizontal: 100
                }}>
                Favorites
            </Text>
        }
            content={
                <View>
                    {
                        renderItems()
                    }
                </View>
            } />

    )
}

export default FavoritesScreen

const styles = StyleSheet.create({})