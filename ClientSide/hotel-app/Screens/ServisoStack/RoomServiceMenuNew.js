import React, { useContext, useEffect, useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useRoute } from '@react-navigation/core';
import ScreenComponent from '../../FCComponents/ScreenComponent';
import { HotelsAppContext } from '../../Context/HotelsAppContext';
import FoodCard from '../../FCComponents/Cards/FoodCard';
import FoodCartDialog from '../../FCComponents/Dialogs/FoodCartDialog';
import { SegmentedButtons } from 'react-native-paper';
import { FlatList } from 'react-native';

const RoomServiceMenuNew = () => {
    const [totalPrice, setTotalPrice] = useState(0);
    const [cartModalVisible, setCartModalVisible] = useState(false);
    const [imageUrlToShow, setImageUrlToShow] = useState(null);
    const { food, drinks, alcohol, additionalItems, cart, setCart } = useContext(HotelsAppContext);

    useEffect(() => {
        let newTotalPrice = 0;
        cart.forEach((item) => {
            newTotalPrice += item.price * item.quantity;
        });
        setTotalPrice(newTotalPrice);
    }, [cart]);

    const getTitle = () => {
        return (
            <View style={{ flexDirection: 'row', display: 'flex', width: '80%', alignItems: 'center', paddingBottom: 10, left: 10 }}>
                <View style={{ flex: 1 }}>
                    <Text style={{ fontWeight: 'bold', color: '#000000', fontSize: 27, alignSelf: 'center', alignItems: 'center' }}>Room Service</Text>
                </View>
                <View style={{ flexDirection: 'column' }}>
                    <TouchableOpacity onPress={() => setCartModalVisible(!cartModalVisible)}>
                        <Image source={require('../../assets/food.png')} style={{ width: 35, height: 35, alignSelf: 'center' }} />
                        <Text style={{ color: '#000000', textAlign: 'center' }}>Cart ({cart.length})</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    };

    const [selectedTab, setSelectedTab] = useState('food');
    const [selectedSecodaryTab, setSelectedSecodaryTab] = useState('cold');
    const [selectedAlcoholTab, setSelectedAlcoholTab] = useState('cocktails');

    const listMapping = {
        food: food,
        drinks: drinks,
        alcohol: alcohol,
        moreItems: additionalItems,
    };

    const listToShow = listMapping[selectedTab] || [];

    const filterListBySecondaryTab = (list) => {
        if (selectedTab === 'drinks') {
            if (selectedSecodaryTab === 'cold') {
                return list.filter((item) => item.category === 'COLD');
            }
            if (selectedSecodaryTab === 'hot') {
                return list.filter((item) => item.category === 'HOT');
            }
        } else if(selectedTab === "alcohol"){
            if(selectedAlcoholTab === 'cocktails'){
                return list.filter((item) => item.category === 'COCKTAIL');
            }
            if(selectedAlcoholTab === 'wine'){
                return list.filter((item) => item.category === 'WINE');
            }
        }
        return list;
    };

    const filteredList = filterListBySecondaryTab(listToShow);


    return (
        <ScreenComponent
            topLeftButtonStyle={{ justifyContent: 'center' }}
            title={getTitle()}
            content={
                <>
                    <SegmentedButtons
                        value={selectedTab}
                        onValueChange={(value) => setSelectedTab(value)}
                        style={{ marginHorizontal: 20, padding: 10 }}
                        density='small'
                        buttons={[
                            {
                                value: 'food',
                                label: 'Food',
                                checkedColor: 'white',
                                style: selectedTab === 'food' ? { backgroundColor: 'black' } : { backgroundColor: 'white' },
                            },
                            {
                                value: 'drinks',
                                label: 'Drinks',
                                checkedColor: 'white',
                                style: selectedTab === 'drinks' ? { backgroundColor: 'black' } : { backgroundColor: 'white' },
                            },
                            {
                                value: 'alcohol',
                                label: 'Alcohol',
                                checkedColor: 'white',
                                style: selectedTab === 'alcohol' ? { backgroundColor: 'black' } : { backgroundColor: 'white' },
                            },
                            {
                                value: 'moreItems',
                                label: 'More',
                                checkedColor: 'white',
                                style: selectedTab === 'moreItems' ? { backgroundColor: 'black' } : { backgroundColor: 'white' },
                            },
                        ]}
                    />
                    {
                        selectedTab === "drinks" ?
                            <SegmentedButtons
                                value={selectedSecodaryTab}
                                onValueChange={(value) => setSelectedSecodaryTab(value)}
                                style={{ marginHorizontal: 20, padding: 10 }}
                                density='small'
                                buttons={[
                                    {
                                        value: 'cold',
                                        label: 'Cold Drinks',
                                        checkedColor: 'white',
                                        style: selectedSecodaryTab === 'cold' ? { backgroundColor: 'black' } : { backgroundColor: 'white' },
                                    },
                                    {
                                        value: 'hot',
                                        label: 'Hot Drinks',
                                        checkedColor: 'white',
                                        style: selectedSecodaryTab === 'hot' ? { backgroundColor: 'black' } : { backgroundColor: 'white' },
                                    },
                                ]}
                            />
                            :
                            <></>
                    }
                    {
                        selectedTab === "alcohol" ?
                            <SegmentedButtons
                                value={selectedAlcoholTab}
                                onValueChange={(value) => setSelectedAlcoholTab(value)}
                                style={{ marginHorizontal: 20, padding: 10 }}
                                density='small'
                                buttons={[
                                    {
                                        value: 'cocktails',
                                        label: 'Cocktails',
                                        checkedColor: 'white',
                                        style: selectedAlcoholTab === 'cocktails' ? { backgroundColor: 'black' } : { backgroundColor: 'white' },
                                    },
                                    {
                                        value: 'wine',
                                        label: 'Wine',
                                        checkedColor: 'white',
                                        style: selectedAlcoholTab === 'wine' ? { backgroundColor: 'black' } : { backgroundColor: 'white' },
                                    },
                                ]}
                            />
                            :
                            <></>
                    }
                    <FlatList
                        data={filteredList}
                        renderItem={({ item }) => (
                            <FoodCard
                                item={item}
                                totalPrice={totalPrice}
                                setTotalPrice={setTotalPrice}
                                key={item.ID}
                                setCart={setCart}
                                cart={cart}
                            />
                        )}
                        keyExtractor={(item) => item.ID}
                    />
                    <FoodCartDialog modalVisible={cartModalVisible} setModalVisible={setCartModalVisible} totalPrice={totalPrice} cart={cart} />
                </>
            }
        />
    );
};

export default RoomServiceMenuNew;

const styles = StyleSheet.create({});
