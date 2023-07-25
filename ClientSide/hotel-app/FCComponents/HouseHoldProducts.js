import { View } from "react-native";
import HouseHoldProductCard from "./HouseHoldProductCard";

const HouseHoldProducts = () => {
  const products = [
    {
      _id: "1",
      name: "Towel",
      image:
        "https://m.media-amazon.com/images/I/81Az9scCx8L._AC_UF1000,1000_QL80_.jpg",
      discription: "Towels for the room.",
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
        <HouseHoldProductCard
          key={product._id}
          productID={product._id}
          productName={product.name}
          productImage={product.image}
        />
      ))}
    </View>
  );
};

export default HouseHoldProducts;
