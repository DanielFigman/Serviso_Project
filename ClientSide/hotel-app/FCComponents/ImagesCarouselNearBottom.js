import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ImageNearBottom from './ImageNearBottom';
import { ScrollView } from 'react-native-gesture-handler';

const ImagesCarouselNearBottom = ({ urlList, image }) => {

    const renderImages = () => {
        return urlList.map((obj) => (
            <ImageNearBottom key={obj.imageID} imageUrl={obj.imageURL} />
        ));
    };


    return (
        <>
            {
                urlList && urlList.length > 0 ?
                    <ScrollView horizontal showsHorizontalScrollIndicator={false}>

                        {renderImages()}
                    </ScrollView>
                    :
                    <ImageNearBottom imageUrl={image} />
            }
        </>
    )
}

export default ImagesCarouselNearBottom