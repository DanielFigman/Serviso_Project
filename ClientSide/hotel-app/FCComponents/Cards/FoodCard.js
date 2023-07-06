import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import LoadingImage from '../LoadingImage'
import ImageNearBottomDialog from '../Dialogs/ImageNearBottomDialog'
import { ExclamationTriangleIcon, QuestionMarkCircleIcon, ShieldExclamationIcon } from 'react-native-heroicons/outline'
import ButtonMain from '../Buttons'
import FoodDescriptionDialog from '../Dialogs/FoodDescriptionDialog'

const FoodCard = ({ item, totalPrice, setTotalPrice, setCart, cart }) => {
    const [quantity, setQuantity] = useState(0)
    const [modalVisible, setModalVisible] = useState(false)
    const [descModalVisible, setDescModalVisible] = useState(false)


    const handleQuantityChange = (action) => {
        switch (action) {
            case "PLUS":
                setQuantity(prev => prev + 1);
                break;
            case "MINUS":
                if (quantity > 0) {
                    setQuantity(prev => prev - 1);
                }
                break;
        }
    };

    useEffect(() => {
        handleCart();
    }, [quantity])

    const handleCart = () => {


        if (quantity == 0) {

        } else {

        }
    }



    return (
        <View style={{ flexDirection: "row", padding: 10, backgroundColor: '#F8F3F2', borderRadius: 10, margin: 2, }}>
            <View style={{ flex: 1, width: "35%", height: 150 }}>
                <View>
                    <TouchableOpacity onPress={() => setModalVisible(true)}>
                        <LoadingImage
                            imageURL={item.imageURL}
                            style={{
                                height: "100%",
                                width: 70,
                                resizeMode: 'cover',
                                width: '100%',
                                borderRadius: 10,
                            }}
                        />
                    </TouchableOpacity>
                </View>
            </View>
            <View style={{ width: "65%", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                <View>
                    <Text style={{ fontWeight: 'bold', fontSize: 17 }}>{item.name}</Text>
                </View>

                <View>
                    <Text style={{ fontSize: 13 }}>Price: ${item.price}</Text>
                </View>

                <View
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: 40,
                        backgroundColor: '#F0E8E6',
                        padding: 7,
                        margin: 20,
                        marginTop: 10,
                        width: "50%"
                    }}
                >
                    <TouchableOpacity onPress={() => handleQuantityChange("MINUS")}>
                        <Text style={{ fontSize: 25, marginRight: 10 }}>-</Text>
                    </TouchableOpacity>

                    <Text style={{ marginHorizontal: 15, fontSize: 18 }}>
                        {quantity}
                    </Text>

                    <TouchableOpacity onPress={() => handleQuantityChange("PLUS")}>
                        <Text style={{ fontSize: 25, marginLeft: 10 }}>+</Text>
                    </TouchableOpacity>
                </View>
                <ButtonMain text={"Add to cart"} textStyle={{ fontSize: 18, margin: 0 }} buttonStyle={{ height: 30 }} />


                <View style={{ position: "absolute", left: 210, bottom: 0 }}>
                    <TouchableOpacity onPress={() => setDescModalVisible(true)}>
                        <QuestionMarkCircleIcon size={30} color={"black"} />
                    </TouchableOpacity>
                </View>


            </View>
            <ImageNearBottomDialog
                imageURL={item.imageURL}
                modalVisible={modalVisible}
                setModalVisible={setModalVisible}
            />

            <FoodDescriptionDialog
                item={item}
                modalVisible={descModalVisible}
                setModalVisible={setDescModalVisible}
            />
        </View>
    )
}

export default FoodCard

const styles = StyleSheet.create({})