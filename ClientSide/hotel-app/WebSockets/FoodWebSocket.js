import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';

const FoodWebSocket = () => {
  const [socket, setSocket] = useState(null);
  const [message, setMessage] = useState('');
  const [receivedMessages, setReceivedMessages] = useState([]);

  useEffect(() => {
    // create the websocket connection
    const newSocket = new WebSocket('ws://ws://proj.ruppin.ac.il/cgroup97/test2/ws');

    // handle incoming messages
    newSocket.onmessage = event => {
      const message = event.data;
      setReceivedMessages(prevMessages => [...prevMessages, message]);
    };

    // handle errors
    newSocket.onerror = error => {
      console.log('WebSocket error: ', error);
    };

    // set the new socket as the state
    setSocket(newSocket);

    // close the socket when the component is unmounted
    return () => {
      newSocket.close();
    };
  }, []);

  const sendMessage = () => {
    if (socket) {
      socket.send(message);
      setMessage('');
    }
  };

  return (
    <View>
      <Text>Received messages:</Text>
      {receivedMessages.map((message, index) => (
        <Text key={index}>{message}</Text>
      ))}
      <TextInput
        value={message}
        onChangeText={setMessage}
        placeholder="Type a message"
      />
      {/* <TouchableOpacity onPress={sendMessage}>
        <Text>Send message</Text>
      </TouchableOpacity> */}
    </View>
  );
};

export default FoodWebSocket;
