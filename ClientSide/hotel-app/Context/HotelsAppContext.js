import React, { createContext, useState } from "react";

export const HotelsAppContext = createContext();

export default function HotelsAppContextProvider(props) {
    const [language, setlanguage] = useState("EN")
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
                setFood
            }}
        >
            {props.children}
        </HotelsAppContext.Provider>
    )
}
