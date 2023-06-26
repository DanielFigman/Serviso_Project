import { useRoute } from '@react-navigation/core';
import React, { cloneElement, useState, useEffect } from 'react';
import {
    View,
    Text,
    FlatList,
    Image,
    TouchableOpacity,
    Modal,
    StyleSheet,
    Button,
    Alert,
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import LoadingImage from '../../FCComponents/LoadingImage';
import ScreenComponent from '../../FCComponents/ScreenComponent';

// const food = [
//     { ID: 1, name: 'pasta', price: 22, Description: 'alaalla', imageURL: require('./assets/food1.png') },
//     { ID: 2, name: 'fish', price: 22, Description: 'alaalla', imageURL: require('./assets/food2.png') },
//     { ID: 3, name: 'egg', price: 22, Description: 'alaalla', imageURL: require('./assets/food3.png') },
//     { ID: 4, name: 'pizza', price: 22, Description: 'alaalla', imageURL: require('./assets/food1.png') },
//     { ID: 5, name: 'cake', price: 22, Description: 'alaalla', imageURL: require('./assets/food2.png') },
//     { ID: 6, name: 'sushi', price: 22, Description: 'alaalla', imageURL: require('./assets/food3.png') },
//     { ID: 7, name: 'saled', price: 22, Description: 'alaalla', imageURL: require('./assets/food1.png') },
//     { ID: 8, name: 'pancake', price: 22, Description: 'alaalla', imageURL: require('./assets/food2.png') },
//     { ID: 9, name: 'banana', price: 22, Description: 'alaalla', imageURL: require('./assets/food3.png') },
//     { ID: 10, name: 'apple', price: 22, Description: 'alaalla', imageURL: require('./assets/food1.png') },
// ];

export default RoomServiceMenu = () => {
    const [cart, setCart] = useState([]);
    const [showCart, setShowCart] = useState(false);
    const [totalPrice, setTotalPrice] = useState(0);

    const { params: {
        food
    } } = useRoute();

    const products = food;

    useEffect(() => {
        let newTotalPrice = 0;
        cart.forEach((item) => {
            newTotalPrice += item.price * item.quantity;
        });
        setTotalPrice(newTotalPrice);
    }, [cart]);

    const send = (itemid) => {
        console.log(`at selected time: ${itemid}`);
    };

    const addToCart = (product) => {
        const itemIndex = cart.findIndex((item) => item.ID === product.ID);
        if (itemIndex > -1) {
            const newCart = cart.map((item) => {
                if (item.ID === product.ID) {
                    if (item.quantity < 10) {
                        return { ...item, quantity: item.quantity + 1 };
                    } else {
                        alert("We apologize, we don't have that amount!");
                        return { ...item, quantity: item.quantity = 10 };
                    }
                } else {
                    return item;
                }
            });
            setCart(newCart);
        } else {
            setCart([...cart, { ...product, quantity: 1 }]);
        }
    };

    const deleteFromCart = (productId) => {
        const newCart = cart.filter((item) => item.ID !== productId);
        setCart(newCart);
    };

    const decreaseQuantity = (productId) => {
        const itemIndex = cart.findIndex((item) => item.ID === productId);
        if (itemIndex > -1) {
            const currentItem = cart[itemIndex];
            if (currentItem.quantity > 1) {
                const newCart = [...cart];
                newCart[itemIndex] = { ...currentItem, quantity: currentItem.quantity - 1 };
                setCart(newCart);
            } else {
                deleteFromCart(productId);
            }
        }
    };

    const renderProductItem = ({ item }) => {
        const cartItem = cart.find((cartItem) => cartItem.ID === item.ID);
        const quantity = cartItem ? cartItem.quantity : 0;

        return (
            <View
                style={{
                    flexDirection: 'row',
                    padding: 10,
                    backgroundColor: '#F8F3F2',
                    borderRadius: 10,
                    margin: 2,
                }}>
                <View style={{ flex: 1, zIndex: 0 }}>

                    <TouchableOpacity onPress={() => {
                        Alert.alert(item.name, item.Description, [
                            { text: 'OK', onPress: () => console.log("ok") },
                        ]);
                    }}>
                        <LoadingImage
                            imageURL={item.imageURL}
                            style={{
                                height: 124,
                                resizeMode: 'cover',
                                width: '90%',
                                borderRadius: 10,
                            }}
                        />
                    </TouchableOpacity>



                </View>
                <View style={{ justifyContent: 'center', backgroundColor: '#FBF9F8', padding: 6, borderRadius: 10, }}>
                    <Text style={{ fontWeight: 'bold', fontSize: 17 }}>{item.name}</Text>
                    <Text style={{ fontSize: 13 }}>Price: ${item.price}</Text>
                    {/* <Text style={{ fontSize: 12 }}>{item.Description}</Text> */}

                    <View style={{

                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: 4,
                        padding: 7,
                        width: 80,
                        backgroundColor: '#F0E8E6',
                        borderRadius: 40,

                    }}
                    >
                        <TouchableOpacity onPress={() => decreaseQuantity(item.ID)}>
                            <Text style={{ fontSize: 18 }}>-</Text>
                        </TouchableOpacity>
                        <Text style={{ marginHorizontal: 15, fontSize: 18 }}>{quantity}</Text>
                        <TouchableOpacity onPress={() => addToCart(item)}>
                            <Text style={{ fontSize: 18 }}>+</Text>
                        </TouchableOpacity>
                    </View>

                    <TouchableOpacity onPress={() => {
                        addToCart(item);
                    }}>

                        <View style={{ backgroundColor: '#000000', borderRadius: 20, }}>
                            <Text style={{
                                padding: 10,
                                color: '#ffffff',
                                fontWeight: 'bold',
                                fontSize: 12,
                            }}>Add to cart</Text>
                        </View>
                    </TouchableOpacity>



                </View>
            </View>
        );
    };


    return (
        <ScreenComponent content={
            <View style={{ flex: 1 }}>
                <View style={{ backgroundColor: '#FBF9F8', padding: 10, paddingLeft: '5%', paddingTop: Platform.OS === "android" ? StatusBar.TouchableHighlight : 50, flexDirection: 'row' }}>
                    <Text
                        style={{
                            fontWeight: 'bold', color: '#000000',
                            fontSize: 27, alignSelf: 'center', alignItems: 'center',
                        }}>
                        Food</Text>
                    <TouchableOpacity onPress={() => setShowCart(!showCart)}>

                        <Text style={{ color: '#000000', paddingLeft: '65%', paddingTop: 10 }}>Cart ({cart.length})</Text>
                        <Image source={require('../../assets/food.png')} style={{ width: 15, height: 15, paddingLeft: 30, position: 'absolute', marginLeft: 190, paddingTop: 32, }} />
                    </TouchableOpacity>
                </View>

                {showCart && (
                    <ScrollView style={{ backgroundColor: '#F5EEEE', color: '#000000', padding: 20, borderRadius: 20, margin: 30, zIndex: 1, position: 'absolute', width: '85%', height: '50%', marginTop: 100, }}>
                        <TouchableOpacity onPress={() => setShowCart(false)}>

                            <Image source={require('../../assets/x.png')} style={{ width: 28, height: 28, paddingLeft: 20, position: 'absolute', zIndex: 2, marginLeft: -16, paddingTop: 28, marginTop: -19 }} />
                        </TouchableOpacity>
                        <Text style={{ fontSize: 25, fontWeight: 'bold', paddingBottom: 25, textAlign: 'center' }} >Your shopping cart</Text>

                        {cart.map((item) => (
                            <View style={{ flexDirection: 'column', }}>
                                <View style={{ flexDirection: 'row', alignItems: 'center', height: 75 }}>
                                    <LoadingImage imageURL={item.imageURL} style={{ width: 70, height: 68, borderRadius: 10, margin: 2 }} />
                                    <Text style={{ fontSize: 20, fontWeight: 'bold', paddingBottom: 25 }} >{item.name}</Text>
                                    <Text style={{ paddingLeft: 10, fontSize: 15, paddingBottom: 20 }}>{`$${item.price} `}</Text>
                                    <View style={{ flexDirection: 'column', height: 70, alignItems: 'center', position: 'absolute', margin: 20, paddingLeft: 170, }}>
                                        <View style={{

                                            flexDirection: 'row',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            margin: 4,
                                            padding: 8,
                                            width: 80,
                                            backgroundColor: '#F0E8E6',
                                            borderRadius: 40,

                                        }}
                                        >
                                            <TouchableOpacity
                                                onPress={() => decreaseQuantity(item.ID)}
                                            >
                                                <Text style={{ fontSize: 18 }}>-</Text>
                                            </TouchableOpacity>
                                            <Text style={{ marginHorizontal: 10, fontSize: 18 }}>
                                                {item.quantity}
                                            </Text>
                                            <TouchableOpacity
                                                onPress={() => addToCart(item)}
                                            >
                                                <Text style={{ fontSize: 18 }}>+</Text>
                                            </TouchableOpacity>
                                        </View>
                                        <TouchableOpacity onPress={() => deleteFromCart(item.ID)}>

                                            <Image source={require('../../assets/delete.png')} style={{ width: 23, height: 23, }} />
                                            {/* <Text style={{ color: '#000000', paddingLeft: 10 }}>Delete </Text> */}

                                        </TouchableOpacity>
                                    </View>
                                </View>
                                <Image source={require('../../assets/line.png')} style={{ width: "100%", height: 0.7 }} />
                            </View>
                        ))}
                        <View style={{ flex: 1, flexDirection: 'column', alignItems: 'center', marginBottom: 15 }}>
                            <Image source={require('../../assets/line.png')} style={{ width: '100%', height: 0.9, marginTop: 1 }} />
                            <Text style={{ marginTop: 10, fontSize: 18 }}>
                                Total Price: ${totalPrice}
                            </Text>
                        </View>

                        <View style={{ flex: 1, flexDirection: 'row', justifyContent: "space-between", marginBottom: 35, }}>


                            <TouchableOpacity
                                style={{
                                    width: '48%',
                                    zIndex: 2,
                                    backgroundColor: '#000000',
                                    padding: 20,
                                    alignItems: 'center',
                                    borderRadius: 40,
                                    marginTop: 10,
                                }}
                                onPress={() => send(1)}
                            >
                                <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 15 }}>Send it to me now</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={{
                                    width: '48%',
                                    zIndex: 2,
                                    backgroundColor: '#000000',
                                    padding: 20,
                                    alignItems: 'center',
                                    borderRadius: 40,
                                    marginTop: 10,

                                }}
                                onPress={() => send(1)}
                            >
                                <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 15 }}>Continue to schedule</Text>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                )}
                <FlatList
                    data={products}
                    renderItem={renderProductItem}
                    keyExtractor={(item, index) => index}
                />

            </View>
        }
        />
    );
};