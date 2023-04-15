import React from 'react';
import { View, Image } from 'react-native';

const MyComponent = () => {
  return (
    <View>
      <Image 
        source={{ uri: 'assets:/spa_1.jpg' }} 
        style={{ width: 200, height: 200 }} 
      />
    </View>
  );
};

export default MyComponent;
