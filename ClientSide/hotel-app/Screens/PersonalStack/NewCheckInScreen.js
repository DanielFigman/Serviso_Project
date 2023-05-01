import { Dimensions, Image, StyleSheet, Text, View } from 'react-native';
import React, { useContext } from 'react';
import ScreenComponent from '../../FCComponents/ScreenComponent';
import ReservationCard from '../../FCComponents/Cards/ReservationCard';
import ButtonMain from '../../FCComponents/Buttons';
import { HotelsAppContext } from '../../Context/HotelsAppContext';
import Languages from '../../Json_files/Languages';

const { height } = Dimensions.get('window');

export default function NewCheckInScreen() {
    const upperViewHeight = height * 0.4; // the height of the image
    const lowerViewMarginTop = upperViewHeight - 50; // 50px margin

    const { language } = useContext(HotelsAppContext);
    const screenContent = Languages.NewCheckInScreen;

    const hotelName = "David Citadel Hotel";
    const fullName = "Daniel Figman";
    const checkIN = "April 26, 2023";
    const checkOut = "May 03, 2023";
    const estimatedPrice = "$1245.64";

    return (
        <ScreenComponent
            topLeftButtonStyle={{ position: "absolute", top: 50, zIndex: 1 }}
            topLeftButtonColor={"black"}
            content={
                <>
                    <View>
                        <Image
                            style={[styles.image, { top: -height * 0.07 }]}
                            source={{
                                uri:
                                    'https://www.americaisraeltours.com/wp-content/uploads/cita1.jpg',
                            }}
                        />
                        <Text style={[styles.textHeader, { top: -height * 0.15 }]}>
                            {screenContent.ContactlessCheckIn[language]}
                        </Text>
                        <Text style={[styles.textHotel, { top: -height * 0.15 }]}>
                            {hotelName}
                        </Text>
                    </View>
                    <View style={{ marginTop: -lowerViewMarginTop }}>
                        <Text style={styles.commentText}>{screenContent.PleaseReviewYourReservation[language]}</Text>
                        <ReservationCard title={screenContent.Name[language]} value={fullName} />
                        <ReservationCard title={screenContent.CheckIn[language]} value={checkIN} />
                        <ReservationCard title={screenContent.CheckOut[language]} value={checkOut} />
                        <ReservationCard title={screenContent.EstimatedTotal[language]} value={estimatedPrice} />
                        <ButtonMain text={screenContent.Next[language]} buttonStyle={{ marginTop: 20, height: 40, padding: 0 }} textStyle={{ fontSize: 25 }} navigate={"PaymentScreen"}/>
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
        marginTop: 40
    }
});
