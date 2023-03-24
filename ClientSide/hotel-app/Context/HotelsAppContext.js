import React, { createContext, useState } from 'react'

export const HotelsAppContext = createContext();

export default function HotelsAppContextProvider(props) {


    return (
        <HotelsAppContext.Provider
            value={{
               
            }}
        >
            {props.children}
        </HotelsAppContext.Provider>
    )
}
