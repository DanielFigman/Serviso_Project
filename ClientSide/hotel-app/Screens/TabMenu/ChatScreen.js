import { View, Text, StyleSheet, KeyboardAvoidingView, Keyboard } from 'react-native'
import React, { useContext } from 'react'
import ScreenComponent from '../../FCComponents/ScreenComponent'
import { useEffect } from 'react';
import { useState } from 'react';
import { GiftedChat } from 'react-native-gifted-chat';
import { keyBy } from 'lodash';
import { HotelsAppContext } from '../../Context/HotelsAppContext';

const ChatScreen = () => {

    const [messages, setMessages] = useState([]);
    const { user } = useContext(HotelsAppContext)

    const { email } = user;

    useEffect(() => {

        const keyboardWillShow = Keyboard.addListener('keyboardWillShow', handleKeyboardWillShow);
        const keyboardWillHide = Keyboard.addListener('keyboardWillHide', handleKeyboardWillHide);



        // Set up listeners for incoming push notifications
        // PushNotification.configure({
        //     onNotification: (notification) => {
        //         // Handle the received notification and update the chat state
        //         const newMessage = {
        //             _id: notification.id,
        //             text: notification.message,
        //             createdAt: new Date(notification.date),
        //             user: {
        //                 _id: notification.senderId,
        //                 name: notification.senderName,
        //             },
        //         };
        //         setMessages((previousMessages) =>
        //             GiftedChat.append(previousMessages, newMessage)
        //         );

        // For this example, we'll use mock data
        if (messages.length == 0) {
            const initialMessages = [
                {
                    _id: 1,
                    text: 'Hello',
                    createdAt: new Date(),
                    user: {
                        _id: 2,
                        name: 'React Native',
                        avatar: "https://images.unsplash.com/photo-1557862921-37829c790f19?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bWFufGVufDB8fDB8fHww&w=1000&q=80"
                    },
                },
            ];
            setMessages(initialMessages);
        }


        return () => {
            // Clean up any listeners or subscriptions if needed
            keyboardWillShow.remove();
            keyboardWillHide.remove();

        };
    }, []);

    const handleKeyboardWillShow = () => {
        setKeyBoardDidShow(true)
    }

    const handleKeyboardWillHide = () => {
        setKeyBoardDidShow(false)
    }

    const onSend = (newMessages = []) => {
        setMessages((previousMessages) =>
            GiftedChat.append(previousMessages, newMessages)
        );

        // Send push notification to notify other users
        // const { _id, text, createdAt, user } = newMessages[0];
        // const notification = {
        //     id: _id,
        //     message: text,
        //     date: createdAt.toISOString(),
        //     senderId: user._id,
        //     senderName: user.name,
        // };
        // sendPushNotification(notification);
    };

    const [keyBoardDidShow, setKeyBoardDidShow] = useState(false)

    return (
        <ScreenComponent bottomMenu={true} topLeftButton={"none"} setKeyBoardDidShow={setKeyBoardDidShow} backgroundShapes={true}
            content={
                <>
                    <View style={{ display: 'flex', justifyContent: "center", alignItems: "center", height: 35, width: "100%", textDecoration: "underline" }}>
                        <Text style={{ fontSize: 30 }}>Reception</Text>
                    </View>
                    <View style={{ flex: 1, bottom: keyBoardDidShow ? -61 : 0 }}>
                        <GiftedChat
                            // isTyping={true}
                            messages={messages}
                            onSend={onSend}
                            user={{
                                _id: email,
                                name: "Daniel"
                            }}
                            on
                        />
                    </View>
                </>
            }
        />
    )
}

export default ChatScreen

const styles = StyleSheet.create({
    container: {
        top: -30,
        backgroundColor: "white"
    },
    header: {
    },
    headerText: {
        alignSelf: "center",
        fontSize: 40
    }
})