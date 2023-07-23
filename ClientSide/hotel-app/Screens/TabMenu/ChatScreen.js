import { View, Text, StyleSheet, KeyboardAvoidingView, Keyboard } from 'react-native'
import React, { useCallback, useContext } from 'react'
import ScreenComponent from '../../FCComponents/ScreenComponent'
import { useEffect } from 'react';
import { useState } from 'react';
import { GiftedChat } from 'react-native-gifted-chat';
import { HotelsAppContext } from '../../Context/HotelsAppContext';
import {
    collection,
    addDoc,
    where,
    onSnapshot,
    query,
    orderBy,
} from "firebase/firestore";
import { db } from "../../Firebase/firebase-config";


const ChatScreen = () => {

    const [messages, setMessages] = useState(null);
    const { user, hotel } = useContext(HotelsAppContext)

    const chatsRef = collection(db, "chats");

    useEffect(() => {
        if (messages && messages.length === 0) {
            const initialMessage = {
                _id: "serviso4u@gmail.com",
                text: 'Hello how can I help you?',
                createdAt: new Date(),
                user: {
                    _id: "serviso4u@gmail.com",
                    name: 'React Native',
                    avatar: "https://images.unsplash.com/photo-1557862921-37829c790f19?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bWFufGVufDB8fDB8fHww&w=1000&q=80"
                },
            };
            // Set the initial message to state
            setMessages([initialMessage]);

            // Add the initial message to the database
            addDoc(chatsRef, {
                createdAt: initialMessage.createdAt.toISOString(),
                text: initialMessage.text,
                email: initialMessage.user._id,
                name: initialMessage.user.name,
                room: hotel.roomNumber,
                user: { _id: initialMessage.user._id, name: initialMessage.user.name, avatar: initialMessage.user.avatar }
            });
        }
    }, [messages])


    useEffect(() => {

        const keyboardWillShow = Keyboard.addListener('keyboardWillShow', handleKeyboardWillShow);
        const keyboardWillHide = Keyboard.addListener('keyboardWillHide', handleKeyboardWillHide);

        const queryMessages = query(
            chatsRef,
            where("room", "==", hotel.roomNumber),
            orderBy("createdAt", "desc")
        );
        const unsuscribe = onSnapshot(queryMessages, (snapshot) => {
            let messages = [];
            snapshot.forEach((doc) => {
                messages.push({ ...doc.data(), _id: doc.id });
            });
            console.log(messages);
            setMessages(messages);
        });

        return () => {
            // Clean up any listeners or subscriptions if needed
            keyboardWillShow.remove();
            keyboardWillHide.remove();
            unsuscribe();
        };
    }, []);

    const handleKeyboardWillShow = () => {
        setKeyBoardDidShow(true)
    }

    const handleKeyboardWillHide = () => {
        setKeyBoardDidShow(false)
    }

    const onSend = async (messages = []) => {
        setMessages(previousMessages =>
            GiftedChat.append(previousMessages, messages)
        );

        const { user, text, createdAt } = messages[0];
        console.log({ ...user, text, createdAt })
        await addDoc(chatsRef, {
            createdAt: createdAt.toISOString(),
            text,
            email: user._id,
            name: user.name,
            room: user.room,
            user: { _id: user._id }
        });
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
                                _id: user.email,
                                name: user.fName + " " + user.sName,
                                room: hotel.roomNumber
                            }}
                        />
                    </View>
                </>
            }
        />
    )
}

export default ChatScreen