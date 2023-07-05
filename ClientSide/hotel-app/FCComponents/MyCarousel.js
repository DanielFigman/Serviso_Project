import { Dimensions, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Carousel from 'react-native-reanimated-carousel'
import BigCard from './Cards/BigCard'

const MyCarousel = ({data, type, style, cardStyle, cardType}) => {
    const width = Dimensions.get('window').width;

    return (
        <Carousel
            loop
            mode={type}
            width={width}
            height={width / 2}
            autoPlay={true}
            data={data}
            scrollAnimationDuration={1000}
            withAnimation={{
                type: "spring",
                config: {
                    damping: 13,
                },
            }}
            modeConfig={{
                parallaxScrollingScale: 0.9,
                parallaxScrollingOffset: 50,
            }}
            autoPlayInterval={2500}
            renderItem={({ item }) => (
                <BigCard key={item.placeID} item={item} cardStyle={cardStyle}/>
            )}
            style={style}
        />
    )
}

export default MyCarousel

const styles = StyleSheet.create({})