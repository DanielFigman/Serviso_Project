import React, { useRef, useState } from 'react';
import { Dialog } from '@rneui/base';
import { Modal, PanResponder, ScrollView, StyleSheet, Text, View } from 'react-native';
import RoomServiceCartCard from '../Cards/RoomServiceCartCard';
import ButtonMain from '../Buttons';

const tempCart = [{ "ID": 1002001, "amount": 1, "changes": null, "imageURL": "https://i.imgur.com/0bxA1za.png", "itemsCount": 1, "name": "Grilled Chicken Sandwich", "price": 55, "type": "food" }, { "ID": 1002002, "amount": 1, "changes": null, "imageURL": "https://i.imgur.com/MvOW2Kf.png", "itemsCount": 2, "name": "Shakshuka", "price": 45, "type": "food" }, { "ID": 1002003, "amount": 1, "changes": null, "imageURL": "https://i.imgur.com/OsqDbbO.png", "itemsCount": 3, "name": "Beef Stir-Fry", "price": 75, "type": "food" }, { "ID": 1002004, "amount": 1, "changes": null, "imageURL": "https://i.imgur.com/NfXCLfZ.png", "itemsCount": 4, "name": "Grilled Salmon Salad", "price": 65, "type": "food" }, { "ID": 1002005, "amount": 1, "changes": null, "imageURL": "https://i.imgur.com/LpTIiej.png", "itemsCount": 5, "name": "Vegetable Curry", "price": 40, "type": "food" }, { "ID": 1002006, "amount": 1, "changes": null, "imageURL": "https://i.imgur.com/8AXlUBP.png", "itemsCount": 6, "name": "Falafel Plate", "price": 30, "type": "food" }, { "ID": 1002007, "amount": 1, "changes": null, "imageURL": "https://i.imgur.com/YYOHGBCs.png", "itemsCount": 7, "name": "Beef Kebab", "price": 55, "type": "food" }, { "ID": 1002008, "amount": 1, "changes": null, "imageURL": "https://i.imgur.com/b5aTD7r.jpg", "itemsCount": 8, "name": "Tofu Pad Thai", "price": 45, "type": "food" }, { "ID": 1002010, "amount": 1, "changes": null, "imageURL": "https://i.imgur.com/oXI1QIO.jpg", "itemsCount": 9, "name": "Grilled Vegetable Platter", "price": 45, "type": "food" }, { "ID": 1002011, "amount": 1, "changes": null, "imageURL": "https://i.imgur.com/Jl0IJpt.png", "itemsCount": 10, "name": "Grilled Ribeye Steak", "price": 140, "type": "food" }, { "ID": 1002012, "amount": 1, "changes": null, "imageURL": "https://i.imgur.com/5j2Hmfu.jpg", "itemsCount": 11, "name": "Lemon-Herb Roasted Chicken", "price": 95, "type": "food" }]


const FoodCartDialog = ({ modalVisible, setModalVisible, cart, setCart }) => {

    const handleScroll = (event) => {
        const offsetY = event.nativeEvent.contentOffset.y;
        if (offsetY <= -140)
            if (modalVisible) {
                setModalVisible(false)
            }
    };

    const renderCards = () => {
        return cart?.map((obj, index) => (
            <RoomServiceCartCard item={obj} key={obj.ID + "0" + index} cart={cart} setCart={setCart} />
        ));
    };

    const getTotal = () => {
        let total = 0;

        cart.forEach(obj => total += obj.amount * obj.price)

        return total;
    }

    return (
        <Dialog
            ModalComponent={Modal}
            isVisible={modalVisible}
            onBackdropPress={() => setModalVisible(false)}
            overlayStyle={styles.overlay}
            animationType="slide"
            backdropStyle={{ opacity: 0.1 }}
        >
            <View style={styles.container}>
                <Text style={styles.title}>Your Cart</Text>
                <ScrollView
                    scrollEventThrottle={16}
                    onScroll={handleScroll}
                    showsVerticalScrollIndicator={false} // Optional: hide the vertical scroll indicator
                >
                    {renderCards()}
                    <View style={{ flexDirection: "row", marginTop: 10, justifyContent: "center", right: 5, }}>
                        <Text style={styles.text}>Total Price:</Text>
                        <Text style={{ left: 10, fontSize: 10, top: 8, fontWeight: "bold" }}>₪</Text>
                        <Text style={[styles.text, { left: 10, fontWeight: "bold" }]}>
                            {
                                getTotal()
                            }
                        </Text>
                    </View>
                    <View style={{ paddingBottom: 100, marginTop: 20, justifyContent: "center" }}>
                        <ButtonMain text={"Send Order"} buttonStyle={{ height: 40 }} textStyle={{ fontSize: 22 }} />
                    </View>
                </ScrollView>
            </View>
        </Dialog>
    );
};

export default FoodCartDialog;

const styles = StyleSheet.create({
    overlay: {
        height: '94%',
        width: '100%',
        backgroundColor: 'rgba(255, 255, 255, 1)',
        bottom: -90,
        borderRadius: 10,
    },
    container: {
        flex: 1,
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 30,
    },
    text: {
        marginTop: 5,
        fontSize: 15,
        fontFamily: "Courier New",
        fontWeight: "bold"
    }
});
