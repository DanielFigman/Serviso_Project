import { Dimensions, Image, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import ScreenComponent from '../../FCComponents/ScreenComponent';
import ReservationCard from '../../FCComponents/Cards/ReservationCard';
import ButtonMain from '../../FCComponents/Buttons';

const { height } = Dimensions.get('window');

export default function NewCheckInScreen() {
    const upperViewHeight = height * 0.4; // the height of the image
    const lowerViewMarginTop = upperViewHeight - 50; // 50px margin

    return (
        <ScreenComponent
            topLeftButton="none"
            content={
                <>
                    <View>
                        <Image
                            style={[styles.image, { top: -height * 0.12 }]}
                            source={{
                                uri:
                                    'https://www.americaisraeltours.com/wp-content/uploads/cita1.jpg',
                            }}
                        />
                        <Text style={[styles.textHeader, { top: -height * 0.2 }]}>
                            Contactless Check-In
                        </Text>
                        <Text style={[styles.textHotel, { top: -height * 0.2 }]}>
                            David Citadel Hotel
                        </Text>
                    </View>
                    <View style={{ marginTop: -lowerViewMarginTop }}>
                        <Text style={styles.commentText}>Please review your reservation</Text>
                            <ReservationCard title={"Name"} value={"Daniel Figman"} />
                            <ReservationCard title={"Check-in"} value={"April 26, 2023"} />
                            <ReservationCard title={"Check-out"} value={"May 03, 2023"} />
                            <ReservationCard title={"Estimated Total"} value={"$1245.64"} />
                        <ButtonMain text={"Next"} buttonStyle={{ marginTop: 20, height: 40, padding: 0 }} textStyle={{ fontSize: 25 }} />
                    </View>
                </>
            }
        />
    );
}

const styles = StyleSheet.create({
    image: {
        width: '100%',
        height: '60%',
    },
    textHeader: {
        color: 'white',
        fontSize: 30,
        textAlign: 'center',
        textShadowColor: 'black',
        textShadowOffset: { width: 5, height: 5 },
        textShadowRadius: 5,
        width: '100%',
    },
    textHotel: {
        color: 'white',
        fontSize: 20,
        textAlign: 'center',
        textShadowColor: 'black',
        textShadowOffset: { width: 5, height: 5 },
        textShadowRadius: 5,
        width: '100%',
    },
    commentText: {
        fontSize: 15,
        textAlign: "center",
        marginBottom: 30,
        marginTop: 10
    }
});
