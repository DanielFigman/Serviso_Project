import React, { useContext } from 'react';
import { View, Text, Linking } from 'react-native';
import { HotelsAppContext } from '../../Context/HotelsAppContext';
import ScreenComponent from '../../FCComponents/ScreenComponent';
import { ChatBubbleOvalLeftIcon } from 'react-native-heroicons/outline';
import MapView, { Marker } from 'react-native-maps';
import { TouchableOpacity } from 'react-native';
import Languages from '../../Json_files/Languages';

const HotelNavigation = () => {
    const { hotel, language } = useContext(HotelsAppContext);
    const { name, address, phone, latitude, longitude } = hotel;

    const screenContent = Languages.HotelNavigationScreen;

    const handleStartNavigation = () => {
        Linking.openURL(`https://www.waze.com/ul?ll=${latitude},${longitude}&navigate=yes`);
      };
      
    return (
        <ScreenComponent
            content={
                <View style={{ padding: 30 }}>
                    <Text style={{ fontWeight: 'bold', fontSize: 40, textAlign: 'center' }}>{name}</Text>
                    <View style={{ paddingLeft: 15 }}>
                        <Text style={{ fontSize: 15 }}>{screenContent.Address[language]} {address}</Text>
                        <Text style={{ fontSize: 15 }}>{screenContent.Phone[language]}  {phone}</Text>
                    </View>
                    <View>
                        <MapView style={{ width: '100%', height: '50%', marginVertical:50}} initialRegion={{ latitude, longitude, latitudeDelta: 0.0922, longitudeDelta: 0.0421 }}>
                            <Marker coordinate={{ latitude, longitude }} />
                        </MapView>
                        <View style={{ padding: 10 }}>
                            <TouchableOpacity
                                style={{
                                    backgroundColor: '#000000',
                                    padding: 16,
                                    alignItems: 'center',
                                    borderRadius: 25,
                                    marginBottom: 10,
                                }}
                                onPress={handleStartNavigation}
                            >
                                <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 18 }}>{screenContent.Navigate[language]}</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{ flexDirection: 'row', alignSelf: 'center', alignItems: 'center' }}>
                            <ChatBubbleOvalLeftIcon style={{ width: 30, height: 30 }} size={35} color={'black'} fill={'white'} />
                            <Text style={{ fontSize: 16, marginHorizontal: 10 }}>{screenContent.AlwaysHere[language]}</Text>
                        </View>
                    </View>
                </View>
            }
        />
    );
};

export default HotelNavigation;
