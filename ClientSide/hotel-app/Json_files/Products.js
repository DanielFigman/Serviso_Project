import {
  View,
  Text,
  ScrollView,
  Pressable,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
// import React, { useState } from "react";

// const [count, setCount] = useState(0);

// function incrementCount() {
//   count = count + 1;
//   setCount(count);
// }
// function decrementCount() {
//   count = count - 1;
//   setCount(count);
// }

const Products = () => {
  const products = [
    {
      _id: "1",
      name: "Towel",
      image:
        "https://m.media-amazon.com/images/I/81Az9scCx8L._AC_UF1000,1000_QL80_.jpg",
      discription: "Towels for the room.",
      // "Towels for the room. The options are a small towel - for the face, a medium towel - for the floor and a large towel - for the body.",
    },
    {
      _id: "2",
      name: "Toilet Paper",
      image:
        "http://cdn.shopify.com/s/files/1/0035/9468/2435/articles/types-of-toilet-paper-what-are-they-what-makes-them-different-reel-talk-756384_1024x1024.jpg?v=1593016778",
      discription: "Additional toilet paper",
    },
    {
      _id: "3",
      name: "Blanket",
      image:
        "https://media.glamourmagazine.co.uk/photos/639757677e3711cde6a43485/3:4/w_1440,h_1920,c_limit/WEIGHTED%20BLANKETS%20121222%20Screenshot-2022-12-12-at-16.28.43_SQ.jpeg",
      discription: "Extra blanket",
    },
  ];
  return (
    <View style={{ marginTop: 35 }}>
      {products.map((product) => (
        <Pressable key={product._id}>
          <View style={styles.rowView}>
            <Image
              source={{ url: product.image }}
              style={{ width: 90, height: 90 }}
            />
            <Text style={styles.text}>{product.name}</Text>
            <Pressable
              style={{
                flexDirection: "row",
                paddingHorizontal: 10,
                paddingVertical: 5,
                alignSelf: "center",
              }}
              //   onPress={() => {
              //     decrementCount();
              //   }}
            >
              <TouchableOpacity>
                <Text
                  style={{
                    fontSize: 20,
                    color: "#926255",
                    paddingHorizontal: 6,
                    fontWeight: "900",
                  }}
                >
                  -
                </Text>
              </TouchableOpacity>
              {/* <Pressable> */}
              <Text
                style={{
                  fontSize: 19,
                  color: "#926255",
                  paddingHorizontal: 8,
                  fontWeight: "800",
                }}
              >
                0{/* {count} */}
              </Text>
              {/* </Pressable> */}
              <TouchableOpacity
              //   onPress={() => {
              //     incrementCount();
              //   }}
              >
                <Text
                  style={{
                    fontSize: 20,
                    color: "#926255",
                    paddingHorizontal: 6,
                    fontWeight: "800",
                  }}
                >
                  +
                </Text>
              </TouchableOpacity>
            </Pressable>
          </View>
        </Pressable>
      ))}
    </View>
  );
};

export default Products;

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
    flex: 1,
    padding: 10,
  },
  discription: {
    flex: 1,
    fontSize: 15,
  },
  Details: {
    alignSelf: "center",
    top: 50,
  },
  listItemView: {
    flexDirection: "row",
    marginTop: 20,
    alignItems: "center",
    marginHorizontal: 20,
  },
  rowView: {
    flexDirection: "row",
    marginTop: 10,
    alignItems: "center",
    margin: 10,
    borderColor: "#926255",
    borderWidth: 1,
    borderRadius: 2,
  },
});

//     <View style={{ marginTop: 50 }}>
//       {products.map((product) => (
//         <View key={product._id}>
//           <View style={styles.rowView}>
//             <View style={{}}>
//               <Image
//                 source={{ url: product.image }}
//                 style={{ width: 90, height: 90 }}
//               />
//             </View>
//             <View>
//               <Text style={styles.text}>{product.name}</Text>
//             </View>
//           </View>
//           <View
//             style={{
//               flexDirection: "row",
//               paddingHorizontal: 10,
//               paddingVertical: 5,
//               alignSelf: "center",
//             }}
//           >
//             <TouchableOpacity>
//               <Text
//                 style={{
//                   fontSize: 20,
//                   color: "#D3B9B3",
//                   paddingHorizontal: 6,
//                   fontWeight: "900",
//                 }}
//               >
//                 -
//               </Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//       ))}
//     </View>
