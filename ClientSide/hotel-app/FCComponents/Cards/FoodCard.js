import React, { useState, useMemo, useContext } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import LoadingImage from "../LoadingImage";
import ImageNearBottomDialog from "../Dialogs/ImageNearBottomDialog";
import { QuestionMarkCircleIcon } from "react-native-heroicons/outline";
import ButtonMain from "../Buttons";
import FoodDescriptionDialog from "../Dialogs/FoodDescriptionDialog";
import AddToCartDialog from "../Dialogs/AddToCartDialog";
import Languages from "../../Json_files/Languages";
import { kdf } from "crypto-js";
import { HotelsAppContext } from "../../Context/HotelsAppContext";

const FoodCard = ({ item, setCart, cart }) => {
  const { language } = useContext(HotelsAppContext);
  const screenContent = Languages.FoodCard;

  const [quantity, setQuantity] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [descModalVisible, setDescModalVisible] = useState(false);
  const [cartModalVisible, setCartModalVisible] = useState(false);
  const [isPressedWithZero, setIsPressedWithZero] = useState(false);

  const handleQuantityChange = (action) => {
    switch (action) {
      case "PLUS":
        setQuantity((prev) => prev + 1);
        if (isPressedWithZero) {
          setIsPressedWithZero(false);
        }
        break;
      case "MINUS":
        if (quantity > 0) {
          setQuantity((prev) => prev - 1);
        }
        break;
    }
  };

  // Memoize the component's rendering based on the item prop
  const memoizedRender = useMemo(() => {
    return (
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <TouchableOpacity onPress={() => setModalVisible(true)}>
            <LoadingImage
              imageURL={item.imageURL}
              style={styles.image}
              type={
                item.type === "Drink" || item.type === "Alcohol"
                  ? item.category
                  : item.type
                  ? item.type
                  : "additional"
              }
            />
          </TouchableOpacity>
        </View>
        <View style={styles.detailsContainer}>
          <Text style={styles.title}>{item.name}</Text>
          <Text style={styles.price}>
            {screenContent.Price[language]} ₪{item.price}
          </Text>
          <View style={styles.quantityContainer}>
            <TouchableOpacity onPress={() => handleQuantityChange("MINUS")}>
              <Text style={styles.quantityButton}>-</Text>
            </TouchableOpacity>
            <Text style={styles.quantityText}>{quantity}</Text>
            <TouchableOpacity onPress={() => handleQuantityChange("PLUS")}>
              <Text style={styles.quantityButton}>+</Text>
            </TouchableOpacity>
          </View>
          <ButtonMain
            text={screenContent.Add[language]}
            textStyle={styles.addButton}
            buttonStyle={styles.addButtonContainer}
            onPress={() => setCartModalVisible(true)}
          />
          {item.description || item.allergies || item.possibleChanges ? (
            <View style={styles.iconContainer}>
              <TouchableOpacity onPress={() => setDescModalVisible(true)}>
                <QuestionMarkCircleIcon size={30} color="black" />
              </TouchableOpacity>
            </View>
          ) : null}
        </View>
        {modalVisible ? (
          <ImageNearBottomDialog
            imageURL={item.imageURL}
            modalVisible={modalVisible}
            setModalVisible={setModalVisible}
            type={
              item.type === "Drink" || item.type === "Alcohol"
                ? item.category
                : item.type
                ? item.type
                : "additional"
            }
          />
        ) : (
          <></>
        )}
        {descModalVisible ? (
          <FoodDescriptionDialog
            item={item}
            modalVisible={descModalVisible}
            setModalVisible={setDescModalVisible}
          />
        ) : (
          <></>
        )}
        {cartModalVisible ? (
          <AddToCartDialog
            item={item}
            setQuantity={setQuantity}
            quantity={quantity}
            setCart={setCart}
            cart={cart}
            cartModalVisible={cartModalVisible}
            setCartModalVisible={setCartModalVisible}
            handleQuantityChange={handleQuantityChange}
            isPressedWithZero={isPressedWithZero}
            setIsPressedWithZero={setIsPressedWithZero}
          />
        ) : (
          <></>
        )}
      </View>
    );
  }, [
    item,
    quantity,
    modalVisible,
    descModalVisible,
    cartModalVisible,
    isPressedWithZero,
  ]);

  return memoizedRender;
};

export default FoodCard;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    padding: 10,
    backgroundColor: "#F8F3F2",
    borderRadius: 10,
    margin: 2,
  },
  imageContainer: {
    flex: 1,
    width: "35%",
    height: 150,
  },
  image: {
    height: "100%",
    width: "100%",
    resizeMode: "cover",
    borderRadius: 10,
  },
  detailsContainer: {
    width: "65%",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontWeight: "bold",
    fontSize: 17,
    marginHorizontal: 5,
  },
  price: {
    fontSize: 13,
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 40,
    backgroundColor: "#F0E8E6",
    padding: 7,
    margin: 20,
    marginTop: 10,
    width: "50%",
  },
  quantityButton: {
    fontSize: 25,
    marginHorizontal: 5,
  },
  quantityText: {
    marginHorizontal: 15,
    fontSize: 18,
  },
  addButton: {
    fontSize: 18,
    margin: 0,
  },
  addButtonContainer: {
    height: 30,
  },
  iconContainer: {
    position: "absolute",
    left: 210,
    bottom: 0,
  },
});
