import React, { useEffect, useRef, useState } from 'react';
import { Dialog } from '@rneui/base';
import { Modal, PanResponder, ScrollView, StyleSheet, Text, View } from 'react-native';
import RoomServiceCartCard from '../Cards/RoomServiceCartCard';
import ButtonMain from '../Buttons';

const FoodCartDialog = ({ modalVisible, setModalVisible, cart, setCart, order }) => {

    const handleScroll = (event) => {
        const offsetY = event.nativeEvent.contentOffset.y;
        if (offsetY <= -140)
            if (modalVisible) {
                setModalVisible(false)
            }
    };

    const [isSucceed, setIsSucceed] = useState(false)

    useEffect(() => {
      if(isSucceed){
        setCart([]);
        setIsSucceed(false)
        setModalVisible(false);
      }
    }, [isSucceed])
    

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

    const handleSendOrder = async () => {
        if (cart?.length !== 0) {
            const postObject = GetRequestObject();
            try {
                const response = await fetch('http://proj.ruppin.ac.il/cgroup97/test2/api/newRequest', {
                    method: 'POST',
                    body: JSON.stringify(postObject),
                    headers: new Headers({
                        'Content-type': 'application/json; charset=UTF-8',
                    })
                });

                if (response.ok) {
                    setIsSucceed(true);
                } else {
                    const errorMessage = await response.text();
                    const errorObject = JSON.parse(errorMessage);
                    const errorType = errorObject.type;
                    const errorMessageText = errorObject.message;

                    console.log(`Error: ${response.status} - ${errorType} - ${errorMessageText}`);
                }

            } catch (error) {
                console.log(error);
            }
        }
    }

    const GetTimeNow = () => {
        const now = new Date();
        const hours = now.getHours().toString().padStart(2, '0');
        const minutes = now.getMinutes().toString().padStart(2, '0');
        const seconds = now.getSeconds().toString().padStart(2, '0');
        const timeNow = `${hours}:${minutes}:${seconds}`;

        return timeNow;
    }

    const GetRequestObject = () => {
        //creating the parent
        let retVal = {};
        const date = new Date();
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const formattedDate = `${year}/${month}/${day}`;
        const requestDate = formattedDate
        const requestHour = GetTimeNow();
        const status = "open";

        retVal["requestDate"] = requestDate;
        retVal["requestHour"] = requestHour;
        retVal["status"] = status;

        //craeting the children
        const room_Service_Order = {};
        const requestInOrder = [];

        requestInOrder[0] = { orderID: order.orderID, price: getTotal() }


        //creating the grand children
        const _ = require('lodash');

        const foodAndDrinksRoomService = _.cloneDeep(getTheNeededPropsFromFoodAndDrinks());
        const additionalItems = _.cloneDeep(getTheNeededPropsFromAdditional());

        // setting the grand child to his parent
        room_Service_Order["Food_And_Drinks_Room_Service"] = foodAndDrinksRoomService;
        room_Service_Order["Additional_Items_Room_Service"] = additionalItems;

        //setting the childredn to the parent
        retVal["Room_Service_Order"] = room_Service_Order;
        retVal["Request_In_Order"] = requestInOrder;
        
        return retVal;
    }

    const getTheNeededPropsFromFoodAndDrinks = () => {
        const retVal = cart?.filter(obj => obj.type).map(({ ID, amount, changes, itemsCount }) => ({
            ID,
            amount,
            changes,
            itemsCount
        }));
        return retVal;
    }

    const getTheNeededPropsFromAdditional = () => {
        const retVal = cart?.filter(obj => !obj.type).map(({ ID, amount, }) => ({
            ID,
            amount
        }));
        return retVal;
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
                        <ButtonMain text={"Send Order"} buttonStyle={{ height: 40 }} textStyle={{ fontSize: 22 }} onPress={handleSendOrder} />
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
