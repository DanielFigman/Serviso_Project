import { Platform } from 'react-native';
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';

// import { initializeApp } from 'firebase/app';
// import 'firebase/auth';
// import 'firebase/firestore';

// const firebaseConfig = {
//     apiKey: "AIzaSyB3Mb7rp6kvobKdv3o5PA4X5CVKyLCaelA",
//     authDomain: "serviso-hotel-app.firebaseapp.com",
//     databaseURL: "https://serviso-hotel-app-default-rtdb.europe-west1.firebasedatabase.app",
//     projectId: "serviso-hotel-app",
//     storageBucket: "serviso-hotel-app.appspot.com",
//     messagingSenderId: "271023989792",
//     appId: "1:271023989792:web:34660d934f26e0f5bf4845",
//     measurementId: "G-CN9H02N2PH"
// };

// initializeApp(firebaseConfig);

async function RegisterPushNotifications() {
    let token;

    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;

    const projectId = Constants.manifest.extra.projectId;
    const experienceId = Constants.manifest.extra.experienceId;

    if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
    }

    if (finalStatus !== 'granted') {
        alert('Failed to get push token for push notification!');
        return;
    }

    try {
        const response = await Notifications.getExpoPushTokenAsync({
            experienceId: experienceId,
            projectId: projectId,
        });
        token = response.data;
    } catch (error) {
        console.error('Error getting Expo push token: ', error);
    }

    if (Platform.OS === 'android') {
        Notifications.setNotificationChannelAsync('default', {
            name: 'default',
            importance: Notifications.AndroidImportance.MAX,
            vibrationPattern: [0, 250, 250, 250],
            lightColor: '#FF231F7C',
        });
    }

    return token;
}


export default RegisterPushNotifications;
