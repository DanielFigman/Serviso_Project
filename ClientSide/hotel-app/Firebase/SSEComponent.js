import { useContext, useEffect } from 'react';
import EventSource from "react-native-sse";
import NetInfo from "@react-native-community/netinfo";
import { useState } from 'react';
import { HotelsAppContext } from '../Context/HotelsAppContext';

const SSEComponent = () => {
    const [count, setCount] = useState(0);
    const { user, setLoginInfo } = useContext(HotelsAppContext)

    useEffect(() => {

        const eventSource = new EventSource(`http://proj.ruppin.ac.il/cgroup97/test2/api/SSE?email=${user.email}`);

        eventSource.addEventListener('message', (event) => {
            const eventData = JSON.parse(event.data);
            const type = eventData[0];
            const loginDTO = eventData[1];

            console.log(type)

            if(type && type === "LoginDTO"){
                setLoginInfo(user.email,loginDTO)
            }
        });

        eventSource.addEventListener('error', (error) => {
            console.log('SSE error:', "SSE disconnected");
        });

        return () => {
            // Clean up the SSE connection
            if (eventSource) {
                eventSource.close();
                console.log("SSE Cleared")
            }
        };
    }, [count]);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCount((prevCount) => prevCount + 1);
        }, 15000);

        return () => {
            clearInterval(intervalId);
        };
    }, []);
};

export default SSEComponent;
