import * as React from 'react';
import {
  Text, 
  View,
  SafeAreaView} from 'react-native';
import Carousel from 'react-native-snap-carousel';

export default function CarouselComponent(props) {
  const { carouselItems, renderItem, sliderWidth, itemWidth } = props;
  const [activeIndex, setActiveIndex] = React.useState(0);


  const onSnapToItem = index => {
    setActiveIndex(index);
  }

  return (
    <SafeAreaView style={{flex: 1, backgroundColor:'white', paddingTop: 50, }}>
      <View style={{ flex: 1, flexDirection:'row', justifyContent: 'center', }}>
        <Carousel
          layout={"default"}
          data={carouselItems}
          sliderWidth={sliderWidth}
          itemWidth={itemWidth}
          renderItem={renderItem}
          onSnapToItem={onSnapToItem}
        />
      </View>
      <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
        {carouselItems.map((item, index) => (
          <Text
            key={index}
            style={{
              color: index === activeIndex ? 'red' : 'gray',
              margin: 3,
              fontSize: 20,
            }}>
            {item.title}
          </Text>
        ))}
      </View>
    </SafeAreaView>
  );
}
