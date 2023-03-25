import React, { createContext, useState } from 'react'

export const HotelsAppContext = createContext();

export default function HotelsAppContextProvider(props) {
    const [language, setlanguage] = useState("EN")


    return (
        <HotelsAppContext.Provider
            value={{
                language,
                setlanguage
            }}
        >
            {props.children}
        </HotelsAppContext.Provider>
    )
}
