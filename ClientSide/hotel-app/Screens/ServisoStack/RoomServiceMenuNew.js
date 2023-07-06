import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { useRoute } from '@react-navigation/core';
import ScreenComponent from '../../FCComponents/ScreenComponent';
import { HotelsAppContext } from '../../Context/HotelsAppContext';
import FoodCard from '../../FCComponents/Cards/FoodCard';
import FoodCartDialog from '../../FCComponents/Dialogs/FoodCartDialog';
import ImageNearBottomDialog from '../../FCComponents/Dialogs/ImageNearBottomDialog';

const RoomServiceMenuNew = () => {

    const [cart, setCart] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);

    const [cartModalVisible, setCartModalVisible] = useState(false)
    const [imageUrlToShow, setImageUrlToShow] = useState(null)

    const { food } = useContext(HotelsAppContext)

    useEffect(() => {
        let newTotalPrice = 0;
        cart.forEach((item) => {
            newTotalPrice += item.price * item.quantity;
        });
        setTotalPrice(newTotalPrice);
    }, [cart]);

    const getTitle = () => {
        return (
            <View style={{ flexDirection: 'row', display: "flex", width: "80%", alignItems: "center", paddingBottom: 10, left: 10 }}>
                <View style={{ flex: 1 }}>
                    <Text
                        style={{
                            fontWeight: 'bold', color: '#000000',
                            fontSize: 27, alignSelf: 'center', alignItems: 'center'
                        }}>
                        Food</Text>
                </View>
                <View style={{ flexDirection: "column" }}>
                    <TouchableOpacity onPress={() => setCartModalVisible(!cartModalVisible)}>
                        <Image source={require('../../assets/food.png')} style={{ width: 35, height: 35, alignSelf: "center" }} />
                        <Text style={{ color: '#000000', textAlign: "center" }}>Cart ({cart.length})</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    const renderFoodCards = () => {
        return (
            <ScrollView>
                {food.map((item) => {
                    return (
                        <FoodCard
                            item={item}
                            totalPrice={totalPrice}
                            setTotalPrice={setTotalPrice}
                            key={item.ID}
                            setCart={setCart}
                            cart={cart}
                        />
                    );
                })}
            </ScrollView>
        );
    };



    return (
        <ScreenComponent topLeftButtonStyle={{ justifyContent: "center" }}
            title={getTitle()}
            content={
                <>
                    {renderFoodCards()}
                    <FoodCartDialog
                        modalVisible={cartModalVisible}
                        setModalVisible={setCartModalVisible}
                        totalPrice={totalPrice}
                    />
                </>
            }
        />
    )
}

export default RoomServiceMenuNew

const styles = StyleSheet.create({})