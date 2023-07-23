import {
  Animated,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import LoadingImage from "../LoadingImage";
import Swipeable from "react-native-gesture-handler/Swipeable";
import { MinusIcon, PlusIcon, TrashIcon } from "react-native-heroicons/outline";
import { HotelsAppContext } from "../Context/HotelsAppContext";
import Languages from "../../Json_files/Languages";

const RoomServiceCartCard = ({ item, cart, setCart }) => {
  const { language } = useContext(HotelsAppContext);
  const screenContent = Languages.RoomServiceCartCard;

  const [quantity, setQuantity] = useState(item.amount);

  const prevQuantityRef = useRef(null);

  useEffect(() => {
    if (quantity) {
      if (prevQuantityRef.current && prevQuantityRef.current < quantity) {
        handleIncrease();
      } else if (
        prevQuantityRef.current &&
        prevQuantityRef.current > quantity &&
        quantity > 0
      ) {
        handleDecrease();
      }
    }

    prevQuantityRef.current = quantity;
  }, [quantity]);

  const handleQuantityChange = (action) => {
    switch (action) {
      case "PLUS":
        setQuantity((prev) => prev + 1);
        break;
      case "MINUS":
        if (quantity > 0) {
          setQuantity((prev) => prev - 1);
        }
        break;
    }
  };

  const handleDelete = () => {
    if (item.type) {
      let isSuchObjectInCart = cart?.find(
        (obj) => obj.ID === item.ID && obj.itemsCount === item.itemsCount
      );
      if (isSuchObjectInCart) {
        const newCart = cart.filter(
          (obj) => !(obj.ID === item.ID && obj.itemsCount === item.itemsCount)
        );
        setCart([...newCart]);
      }
    } else {
      let isSuchObjectInCart = cart?.find((obj) => obj.ID === item.ID);
      if (isSuchObjectInCart) {
        const newCart = cart.filter((obj) => !(obj.ID === item.ID));
        setCart([...newCart]);
      }
    }
  };

  const handleIncrease = () => {
    if (item.type) {
      let isSuchObjectInCart = cart?.find(
        (obj) => obj.ID === item.ID && obj.itemsCount === item.itemsCount
      );
      if (isSuchObjectInCart) {
        isSuchObjectInCart.amount++;
        const objectIndex = cart.findIndex(
          (obj) => obj.ID === item.ID && obj.itemsCount === item.itemsCount
        );
        const newCart = [...cart];
        newCart.splice(objectIndex, 1, isSuchObjectInCart);
        setCart(newCart);
      }
    } else {
      let isSuchObjectInCart = cart?.find((obj) => obj.ID === item.ID);
      if (isSuchObjectInCart) {
        isSuchObjectInCart.amount++;
        const objectIndex = cart.findIndex((obj) => obj.ID === item.ID);
        const newCart = [...cart];
        newCart.splice(objectIndex, 1, isSuchObjectInCart);
        setCart(newCart);
      }
    }
  };

  const handleDecrease = () => {
    if (item.type) {
      let isSuchObjectInCart = cart?.find(
        (obj) => obj.ID === item.ID && obj.changes === item.changes
      );
      if (isSuchObjectInCart) {
        isSuchObjectInCart.amount--;
        const objectIndex = cart.findIndex(
          (obj) => obj.ID === item.ID && obj.changes === item.changes
        );
        const newCart = [...cart];
        newCart.splice(objectIndex, 1, isSuchObjectInCart);
        setCart(newCart);
      }
    } else {
      let isSuchObjectInCart = cart?.find((obj) => obj.ID === item.ID);
      if (isSuchObjectInCart) {
        isSuchObjectInCart.amount--;
        const objectIndex = cart.findIndex((obj) => obj.ID === item.ID);
        const newCart = [...cart];
        newCart.splice(objectIndex, 1, isSuchObjectInCart);
        setCart(newCart);
      }
    }
  };

  const renderRightActions = (progress, dragX) => {
    const trans = dragX.interpolate({
      inputRange: [-100, 0],
      outputRange: [1, 0],
    });

    return (
      <View style={{ flexDirection: "column", flex: 1 }}>
        <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
          <Animated.Text
            style={[
              styles.iconContainer,
              {
                opacity: trans,
                textAlign: "center",
                fontFamily: "Courier New",
                fontWeight: "bold",
                fontSize: 15,
              },
            ]}
          >
            {item.name}
          </Animated.Text>
          <Animated.Text
            style={[
              styles.iconContainer,
              {
                opacity: trans,
                textAlign: "center",
                fontFamily: "Courier New",
                fontWeight: "bold",
                fontSize: 15,
              },
            ]}
          >
            Quantity: {item.amount}
          </Animated.Text>
        </View>
        <View style={styles.rightActionsContainer}>
          <TouchableOpacity
            style={styles.incrementButton}
            onPress={() => handleQuantityChange("PLUS")}
          >
            <Animated.View style={[styles.iconContainer, { opacity: trans }]}>
              <PlusIcon size={30} color="black" />
            </Animated.View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
            <Animated.View
              style={[styles.deleteIconContainer, { opacity: trans }]}
            >
              <TrashIcon size={30} color="black" />
            </Animated.View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.decrementButton}
            onPress={() => handleQuantityChange("MINUS")}
          >
            <Animated.View style={[styles.iconContainer, { opacity: trans }]}>
              <MinusIcon size={30} color="black" />
            </Animated.View>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <Swipeable renderRightActions={renderRightActions}>
      <View style={styles.container}>
        <LoadingImage
          imageURL={item.imageURL}
          style={{ height: 100, width: 100, borderRadius: 5 }}
          type={
            item.type === "Drink" || item.type === "Alcohol"
              ? item.category
              : item.type
              ? item.type
              : "additional"
          }
        />
        <View style={styles.info}>
          <View>
            <Text
              style={{
                fontSize: 15,
                fontWeight: "bold",
                fontFamily: "Courier New",
              }}
            >
              {item.name}
            </Text>
          </View>
          <View>
            <Text style={styles.text}>
              {screenContent.Quantity[language]} {item.amount}
            </Text>
          </View>
          <View style={styles.containerInner}>
            <Text style={styles.text}>{screenContent.Price[language]}</Text>
            <Text
              style={{ left: 10, fontSize: 10, top: 10, fontWeight: "bold" }}
            >
              ₪
            </Text>
            <Text style={[styles.text, { left: 10, fontWeight: "bold" }]}>
              {item.price * item.amount}
            </Text>
          </View>
          {item.changes ? (
            <View>
              <Text style={styles.text}>
                {screenContent.Changes[language]} {item.changes}
              </Text>
            </View>
          ) : (
            <></>
          )}
        </View>
      </View>
    </Swipeable>
  );
};

export default RoomServiceCartCard;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginBottom: 10,
  },
  containerInner: {
    flexDirection: "row",
  },
  info: {
    flexDirection: "column",
    alignContent: "center",
    marginHorizontal: 10,
    marginTop: 5,
  },
  text: {
    marginTop: 5,
    fontSize: 15,
    left: 5,
  },
  rightActionsContainer: {
    flexDirection: "row",
    flex: 1,
    justifyContent: "space-around",
    alignItems: "center",
  },
  deleteButton: {
    width: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  incrementButton: {
    width: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  decrementButton: {
    width: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  deleteIconContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  iconContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
});
