
import * as React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import CarouselComponent from '../../Features/Carousal';
import CarouselData from '../../Json_files/CarouselData';

export default function MainScreen() {

console.log(CarouselData.SpaCarousel);

  const renderItem = ({ item, index }) => {
    return (
      <View style={styles.item}>
        <Image source={{ uri: item.imageUrl }} style={styles.image} />
        <Image source= {require('hotel-app/assets/spa_2.jpeg') } style={styles.image} />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <CarouselComponent
        carouselItems={CarouselData.SpaCarousel}
        renderItem={renderItem}
        sliderWidth={300}
        itemWidth={300}
      />
    </View>
  );
  
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  image:{
    height: '60%',
    width: '50%',
  }
});
