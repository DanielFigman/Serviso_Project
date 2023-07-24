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
import Languages from '../../Json_files/Languages';


const ChatScreen = () => {


    const [messages, setMessages] = useState(null);
    const { user, hotel, language } = useContext(HotelsAppContext)

    const scrennContent = Languages.ChatScreen;

    const chatsRef = collection(db, "chats");

    const GetTranslatedMessage = async (text) => {
        try {
            const response = await fetch(
                "http://proj.ruppin.ac.il/cgroup97/test2/api/translateMessage",
                {
                    method: "POST",
                    body: JSON.stringify({
                        email: "serviso4u@gmail.com",
                        message: text,
                    }),
                    headers: {
                        "Content-type": "application/json; charset=UTF-8",
                    },
                }
            );

            if (response.ok) {
                const responseString = await response.text();
                return responseString.substring(1, responseString.length - 1);
            } else {
                return null;
            }
        } catch (error) {
            return null;
        }
    }

    useEffect(() => {
        if (messages && messages.length === 0) {
            const initialMessage = {
                _id: "serviso4u@gmail.com",
                text: 'Hello how can I help you?',
                translatedText: scrennContent.HelloHowCanIHelpYou[language],
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
                translatedText: initialMessage.translatedText,
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

        const translatedMessage = await GetTranslatedMessage(messages[0].text);
        const { user, text, createdAt } = messages[0];
        await addDoc(chatsRef, {
            createdAt: createdAt.toISOString(),
            text,
            translatedText: translatedMessage,
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
                    <View style={{ display: 'flex', justifyContent: "center", alignItems: "center", height: 35, width: "100%" }}>
                        <Text style={{ fontSize: 30, textDecorationLine: "underline" }}>Reception</Text>
                    </View>
                    <View style={{ flex: 1, bottom: keyBoardDidShow ? -61 : 0 }}>
                        <GiftedChat
                            // isTyping={true}
                            messages={messages && messages.map((message) => ({
                                ...message,
                                text: message.email === user.email ? message.text : message.translatedText,
                            }))}
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