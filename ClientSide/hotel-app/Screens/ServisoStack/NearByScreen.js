import React, { useState, useRef, useEffect } from 'react';
import { View, Text, Dimensions, PanResponder, ScrollView, TouchableOpacity } from 'react-native';
import { useRoute } from '@react-navigation/native';
import MapView, { Marker } from 'react-native-maps';
import ScreenComponent from '../../FCComponents/ScreenComponent';
import NearByBottom from '../../FCComponents/NearByBottom';
import NearByBottomBar from '../../FCComponents/NearByBottomBar';
import { MapIcon } from 'react-native-heroicons/outline';
import Animated from 'react-native-reanimated';

const { height } = Dimensions.get('window');

const NearByScreen = () => {

    const [mapTpye, setMapTpye] = useState("standard")

    const handleMapChange = () => {
        if (mapTpye == "standard") {
            setMapTpye("hybrid")
        } else {
            setMapTpye("standard")

        }
    };

    const [panResponderEnabled, setPanResponderEnabled] = useState(true)

    const scrollY = useRef(new Animated.Value(0)).current;
    const panResponder = useRef(
        PanResponder.create({
            onMoveShouldSetPanResponder: (_, { dy }) => Math.abs(dy) > 5,
            onPanResponderMove: (_, { dy }) => {
                scrollY.setValue(dy);
            },
            onPanResponderRelease: (_, { dy }) => {
                if (dy > height * 0.3 && dy - height * 0.3) {
                    Animated.spring(scrollY, {
                        toValue: height * 0.3,
                        damping: 10,
                        overshootClamping: true,
                    }).start();
                }
            },
        })
    ).current;



    const { params: { item } } = useRoute();

    const longitude = item.longitude;
    const latitude = item.latitude;

    const mapMaxHeight = scrollY.interpolate({
        inputRange: [0, height * 0.3],
        outputRange: [height * 0.25, height * 0.85], // Adjust the percentage here
        extrapolate: 'clamp',
    });

    const initialLatitudeDelta = scrollY.interpolate({
        inputRange: [0, height * 0.3],
        outputRange: [0.001, 0.1],
        extrapolate: 'clamp',
    });

    const initialLongitudeDelta = scrollY.interpolate({
        inputRange: [0, height * 0.3],
        outputRange: [0.001, 0.1],
        extrapolate: 'clamp',
    });

    const mapLatitude = scrollY.interpolate({
        inputRange: [0, height * 0.3],
        outputRange: [latitude, latitude - 0.05],
        extrapolate: 'clamp',
    });

    const mapLongitude = scrollY.interpolate({
        inputRange: [0, height * 0.3],
        outputRange: [longitude, longitude],
        extrapolate: 'clamp',
    });

    const mapDelta = scrollY.interpolate({
        inputRange: [0, height * 0.3],
        outputRange: [0.01, 0.1],
        extrapolate: 'clamp',
    });

    const mapButton = <>
        <TouchableOpacity onPress={handleMapChange}>
            <MapIcon size={30} color={"white"} fill={"black"} style={{ top: 5, left: 350, zIndex: 10000, width: 100 }} />
        </TouchableOpacity>
    </>


    return (
        <ScreenComponent additionalTopButton={mapButton}
            topLeftButtonStyle={{ position: 'absolute', zIndex: 10000, width: 100 }}
            content={
                <View style={{ flex: 1 }}>
                    <Animated.View
                        {...(panResponderEnabled ? panResponder.panHandlers : {})}
                        style={{
                            width: '100%',
                            height: mapMaxHeight,
                            top: -height * 0.11
                        }}

                    >
                        <View>
                            <MapView
                                style={{ width: '100%', height: '100%' }}
                                region={{
                                    latitude: mapLatitude.__getValue(),
                                    longitude: mapLongitude.__getValue(),
                                    latitudeDelta: initialLatitudeDelta.__getValue() + mapDelta.__getValue(),
                                    longitudeDelta: initialLongitudeDelta.__getValue() + mapDelta.__getValue(),
                                }}
                                mapType={mapTpye}
                                showsCompass={false}
                                mapPadding={{ bottom: 20 }}
                                onTouchEnd={() => setPanResponderEnabled(true)}
                                onTouchMove={() => setPanResponderEnabled(false)}
                            >
                                <Marker coordinate={{ latitude, longitude }} />
                            </MapView>
                            <NearByBottomBar item={item} />
                        </View>
                    </Animated.View>
                    <Animated.View
                        style={{
                            width: '100%',
                            height: '100%',
                            top: -height * 0.07
                        }}
                    >
                        <Animated.ScrollView
                            contentContainerStyle={{ flexGrow: 1 }}
                            scrollEventThrottle={16} // Adjust the throttle value as needed
                            {...(panResponderEnabled ? panResponder.panHandlers : {})}
                            scrollEnabled={false}
                        >

                            <NearByBottom item={item} setPanResponderEnabled={setPanResponderEnabled} />
                        </Animated.ScrollView>
                    </Animated.View>
                </View>
            }
        />
    );
};

export default NearByScreen;