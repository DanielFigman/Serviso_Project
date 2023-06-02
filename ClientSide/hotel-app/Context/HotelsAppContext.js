import React, { createContext, useEffect, useRef, useState } from "react";
import * as Notifications from 'expo-notifications';

export const HotelsAppContext = createContext();

export default function HotelsAppContextProvider(props) {
    const [language, setlanguage] = useState("EN");
    const [isLoading, setIsLoading] = useState(false);
    const [user, setUser] = useState({ email: "", fName: "", sName: "", gender: "", phone: "", dateOfBirth: "" });
    const [order, setOrder] = useState({ orderID: "", checkInDate: "", checkOutDate: "", hotelID: "" });
    const [activities_nearBy, setActivities_nearBy] = useState(null);
    const [activities_hotel, setActivities_hotel] = useState(null);
    const [facilities, setFacilities] = useState(null);
    const [custom_Request_Types, setCustom_Request_Types] = useState(null);
    const [therapies, setTherapies] = useState(null);
    const [hotel, setHotel] = useState(null)
    const [food, setFood] = useState(null)
    const [notificationToken, setNotificationToken] = useState(undefined);
    const [retrivedNtoken, setRetrivedNtoken] = useState(undefined);

    const prevNotificationTokenRef = useRef();

    useEffect(() => {
        if (user && user.email) {
            if (notificationToken && notificationToken !== prevNotificationTokenRef.current) {
                prevNotificationTokenRef.current = notificationToken;

                if (notificationToken !== retrivedNtoken) {
                    fetchNToken();
                    console.log("fetched")
                }
            }
        }
    }, [notificationToken, user]);

    const fetchNToken = async () => {
        try {
            const response = await fetch('http://proj.ruppin.ac.il/cgroup97/test2/api/NTUPDATE', {
                method: 'PUT',
                body: JSON.stringify({
                    email: user.email,
                    NTOKEN: notificationToken
                }),
                headers: new Headers({
                    'Content-type': 'application/json; charset=UTF-8',
                })
            });
            if (response.ok) {
                console.log("NtokenUpdated");
            } else {
                const errorMessage = await response.text();
                const errorObject = JSON.parse(errorMessage);
                const errorType = errorObject.type;
                const errorMessageText = errorObject.message;
                console.log(`Error: ${response.status} - ${errorType} - ${errorMessageText}`);
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <HotelsAppContext.Provider
            value={{
                language,
                setlanguage,
                isLoading,
                setIsLoading,
                user,
                setUser,
                order,
                setOrder,
                activities_nearBy,
                setActivities_nearBy,
                activities_hotel,
                setActivities_hotel,
                facilities,
                setFacilities,
                custom_Request_Types,
                setCustom_Request_Types,
                therapies,
                setTherapies,
                hotel,
                setHotel,
                food,
                setFood,
                setNotificationToken,
                setRetrivedNtoken
            }}
        >
            {props.children}
        </HotelsAppContext.Provider>
    );
}
