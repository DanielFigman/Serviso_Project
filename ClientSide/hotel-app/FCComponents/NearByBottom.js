import { View, Text } from 'react-native'
import React from 'react'
import ScreenComponent from './ScreenComponent'
import NearByBottomBar from './NearByBottomBar'

const NearByBottom = ({ item }) => {
    return (
        <ScreenComponent topLeftButton={"none"}
            content={
                <>
                    <View style={{ flex: 1, padding: 16 }}>
                      

                        {/* Add more content for the second view */}
                    </View>
                </>
            }
        />
    )
}

export default NearByBottom