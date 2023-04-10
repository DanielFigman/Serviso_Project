import * as React from 'react';
import {Text, View} from 'react-native';
import Carousel from 'react-native-snap-carousel';
export default function CarouselComponent({ carouselItems, renderItem, sliderWidth, itemWidth}) {
  const [activeIndex, setActiveIndex] = React.useState(0);


  const onSnapToItem = index => {
    setActiveIndex(index);
  }

  return (
    <>
      <View style={{ flex: 1, flexDirection:'row', justifyContent: 'center', }} onPress={() => { { } }}>
        <Carousel
          layout={"default"}
          data={carouselItems}
          sliderWidth={sliderWidth}
          itemWidth={itemWidth}
          renderItem={renderItem}
          onSnapToItem={onSnapToItem}
        />
      </View>
      
    </>
  );
}
