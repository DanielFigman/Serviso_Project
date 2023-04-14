import React, { createContext, useState } from 'react'

export const HotelsAppContext = createContext();

export default function HotelsAppContextProvider(props) {
    const [language, setlanguage] = useState("EN")
    const [isLoading, setIsLoading] = useState(false);


    return (
        <HotelsAppContext.Provider
            value={{
                language,
                setlanguage,
                isLoading,
                setIsLoading
            }}
        >
            {props.children}
        </HotelsAppContext.Provider>
    )
}
