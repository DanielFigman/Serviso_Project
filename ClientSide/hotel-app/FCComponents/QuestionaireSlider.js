import { Icon, Slider } from '@rneui/themed'
import React, { useEffect, useState } from 'react'
import { Text, View } from 'react-native';

const QuestionaireSlider = ({ item, setQuestionaire }) => {

    const key = item.key;

    const val = item.value || item.value == 0 ? item.value : 5;

    const [value, setValue] = useState(val)


    const handleValueChange = (value) => {
        setQuestionaire((prevQuestionaire) => ({
            ...prevQuestionaire,
            [key]: value
        }));
    };

    function formatString(str) {
        const words = str.split('_');
      
        const capitalizedWords = words.map((word) =>
          word.charAt(0).toUpperCase() + word.slice(1)
        );
      
        const formattedString = capitalizedWords.join(' ');
      
        return formattedString;
      }
       

    return (
        <>
            <Text style={{ fontWeight: 'bold', fontSize: 20}}>{formatString(key)}</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop:10 }}>
                <View style={{ width: "20%", alignItems: 'center' }}>
                    <Text style={{ fontWeight: 'bold', fontSize: 16 }}>{value}</Text>
                </View>
                <Slider
                    style={{ flex: 1 }}
                    minimumValue={0}
                    minimumTrackTintColor="#D3B9B3"
                    maximumValue={10}
                    step={1}
                    value={value}
                    onValueChange={setValue}
                    onSlidingComplete={(value) => handleValueChange(value)}
                    trackStyle={{ height: 5, backgroundColor: 'transparent' }}
                    thumbStyle={{ height: 20, width: 20, backgroundColor: 'transparent' }}
                    thumbProps={{
                        children: (
                            <Icon
                                name="heartbeat"
                                type="font-awesome"
                                size={20}
                                reverse
                                containerStyle={{ bottom: 20, right: 30 }}
                            />
                        ),
                    }}
                />
            </View>
        </>
    )
}

export default QuestionaireSlider