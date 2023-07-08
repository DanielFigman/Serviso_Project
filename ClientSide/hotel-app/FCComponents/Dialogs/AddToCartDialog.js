import { Alert, Keyboard, Modal, PanResponder, StyleSheet, Text, TextInput, View } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { Dialog } from '@rneui/base';
import LoadingImage from '../LoadingImage';
import { TouchableOpacity } from 'react-native-gesture-handler';
import ButtonMain from '../Buttons';

const AddToCartDialog = ({
    item,
    setQuantity,
    quantity,
    setCart,
    cart,
    cartModalVisible,
    setCartModalVisible,
    handleQuantityChange,
    isPressedWithZero,
    setIsPressedWithZero
}) => {
    const panResponder = useRef(
        PanResponder.create({
            onStartShouldSetPanResponderCapture: () => true,
            onPanResponderRelease: (_, gestureState) => {
                if (gestureState.dy > 50) {
                    setCartModalVisible(false);
                }
            },
        })
    ).current;

    const [changes, setChanges] = useState(null);
    const [keyBoardDidShow, setKeyBoardDidShow] = useState(false)
    const [added, setAdded] = useState(false)



    useEffect(() => {

        const keyboardWillShow = Keyboard.addListener('keyboardWillShow', handleKeyboardWillShow);
        const keyboardWillHide = Keyboard.addListener('keyboardWillHide', handleKeyboardWillHide);

        return () => {
            // Clean up any listeners or subscriptions if needed
            keyboardWillShow.remove();
            keyboardWillHide.remove();

        };
    }, []);

    const handleKeyboardWillShow = () => {
        setKeyBoardDidShow(true)
    }

    const handleKeyboardWillHide = () => {
        setKeyBoardDidShow(false)
    }

    const handleAddToCart = () => {
        if (quantity > 0) {
            addToCart();
        } else {
            setIsPressedWithZero(true)
        }
    }

    const addToCart = () => {

        let isSuchObjectInCart = cart?.find(obj => obj.ID === item.ID && obj.changes === changes);
        if (isSuchObjectInCart) {
            isSuchObjectInCart.amount += quantity;
            const newCart = cart.filter(obj => !(obj.ID === item.ID && obj.changes === changes));
            setCart([...newCart, isSuchObjectInCart]);
        } else {
            let objectToAdd = {};
            objectToAdd.ID = item.ID;
            objectToAdd.amount = quantity;
            objectToAdd.changes = !changes || changes === "" ? null : changes;
            objectToAdd.type = item.type;
            objectToAdd.imageURL = item.imageURL;
            objectToAdd.name = item.name;
            objectToAdd.price = item.price

            if (item.type) {
                let foodAndDrinksCount = cart?.filter(obj => obj.type !== undefined)?.length ?? 0;
                foodAndDrinksCount++;

                objectToAdd.itemsCount = foodAndDrinksCount;
            }
            setCart([...cart, objectToAdd]);
        }

        setAdded(true);
    };

    useEffect(() => {
        if (added) {
            setChanges(null);
            setQuantity(0);
            setCartModalVisible(false);
            setAdded(false);
        }
    }, [added])





    return (
        <>
            <Dialog
                ModalComponent={Modal}
                isVisible={cartModalVisible}
                onBackdropPress={() => setCartModalVisible(false)}
                overlayStyle={keyBoardDidShow ? [styles.overlay, { top: -120 }] : styles.overlay}
                animationType='slide'
                backdropStyle={{ opacity: 0.1 }}
            >
                <View style={styles.container}  {...(!keyBoardDidShow ? panResponder.panHandlers : {})}>
                    <LoadingImage
                        imageURL={item.imageURL}
                        style={styles.image}
                    />
                    <View style={styles.titleContainer}>
                        <Text style={styles.name}>{item.name}</Text>
                    </View>
                    <View>
                        <Text style={styles.price}>Price: {item.price}₪</Text>
                    </View>
                    <View style={styles.plusMinus}>
                        <TouchableOpacity onPress={() => handleQuantityChange("MINUS")}>
                            <Text style={{ fontSize: 25, marginRight: 10 }}>-</Text>
                        </TouchableOpacity>

                        <Text style={isPressedWithZero ? { marginHorizontal: 15, fontSize: 18, color: "red" } : { marginHorizontal: 15, fontSize: 18 }}>
                            {quantity}
                        </Text>

                        <TouchableOpacity onPress={() => handleQuantityChange("PLUS")}>
                            <Text style={{ fontSize: 25, marginLeft: 10 }}>+</Text>
                        </TouchableOpacity>
                    </View>
                    {
                        item.possibleChanges ?
                            <TextInput
                                style={styles.textArea}
                                multiline={true}
                                numberOfLines={5} // You can adjust the number of lines to display
                                placeholder='Enter dish notes, for example: "wihout egg".'
                                value={changes}
                                onChangeText={(value) => setChanges(value)}
                            />
                            :
                            <></>
                    }
                    <View style={StyleSheet.flatten(styles.buttonStyle)}>
                        <TouchableOpacity onPress={handleAddToCart}>
                            <Text style={StyleSheet.flatten(styles.textStyle)}>Add to cart</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Dialog>
        </>
    );
};

export default AddToCartDialog;

const styles = StyleSheet.create({
    overlay: {
        height: '100%',
        width: '100%',
        backgroundColor: 'rgba(255, 255, 255, 1)',
        bottom: -90,
        borderRadius: 10,

    },
    container: {
        flex: 1,
    },
    image: {
        height: 300,
        width: 395,
        resizeMode: 'cover',
        right: 20,
        top: -20,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
    },
    titleContainer: {

    },
    name: {
        fontSize: 22,
        fontFamily: "Courier New",
        fontWeight: "bold",
        textAlign: "center"
    },
    price: {
        textAlign: "center",
        marginTop: 10,
    },
    plusMinus: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: "center",
        borderRadius: 40,
        backgroundColor: '#F0E8E6',
        padding: 7,
        margin: 20,
        marginTop: 40,
        width: "50%",
    },
    textArea: {
        height: 150,
        textAlignVertical: 'top',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
    },
    buttonStyle: {
        height: 50,
        alignSelf: "center",
        borderRadius: 30,
        backgroundColor: "black",
        justifyContent: "center",
        marginTop: 30
    },
    textStyle: {
        color: "white",
        fontSize: 18,
        paddingHorizontal: 20,
        margin: 0
    },
});
