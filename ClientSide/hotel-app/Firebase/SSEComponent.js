import { useEffect } from 'react';
import EventSource from "react-native-sse";
import NetInfo from "@react-native-community/netinfo";
import { useState } from 'react';

const SSEComponent = () => {
    const [count, setCount] = useState(0);

    useEffect(() => {
        const eventSource = new EventSource('http://proj.ruppin.ac.il/cgroup97/test2/api/SSE');

        eventSource.addEventListener('message', (event) => {
            const eventData = JSON.parse(event.data);
            console.log(eventData);
        });

        eventSource.addEventListener('error', (error) => {
            console.log('SSE error:', error);
        });

        return () => {
            // Clean up the SSE connection
            if (eventSource) {
                eventSource.close();
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
