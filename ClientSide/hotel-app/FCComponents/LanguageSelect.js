import { View, Text, StyleSheet, TouchableWithoutFeedback } from 'react-native'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { SelectList } from 'react-native-dropdown-select-list';
import { HotelsAppContext } from '../Context/HotelsAppContext';

const LanguageSelect = ({ languageContext, setlanguageContext, buttonStyle, updateServer, email, setIsLoading }) => {

    const [selected, setSelected] = useState(languageContext);

    const {setLoginInfo} = useContext(HotelsAppContext)

    const prevSelectedRef = useRef(null)

    const data = [
        { key: '1', value: 'EN' },
        { key: '2', value: 'HE' },
        { key: '3', value: 'AR' },
        { key: '4', value: 'ES' },
        { key: '5', value: 'RU' },
        { key: '6', value: 'FR' },
        { key: '7', value: 'POR' },
        { key: '8', value: 'CH' },
        { key: '9', value: 'JP' }
    ]

    useEffect(() => {
        console.log("initial useEffect")
        prevSelectedRef.current = languageContext;
    }, [])


    useEffect(() => {
        console.log("entered to use Effect")
        if (updateServer && prevSelectedRef.current !== selected) {
            console.log("got insided the if ")
            SetUserLanguageOnServer();
        }
    }, [selected])

    const SetUserLanguageOnServer = async () => {
        setIsLoading(true);
        try {
            const response = await fetch(`http://proj.ruppin.ac.il/cgroup97/test2/api/changeLanguage?email=${email}&languageShortName=${selected}`, {
                method: 'PUT', 
                headers: new Headers({
                    'Content-type': 'application/json; charset=UTF-8',
                })
            });
            if (response.ok) {
                console.log("resposne is ok")
                const message = await response.text();
                const object = JSON.parse(message);
                setLoginInfo(email, object);
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
        finally {
            setIsLoading(false);
        }
    }


    return (

        <View style={StyleSheet.flatten([styles.buttonStyle, buttonStyle])}>
            <SelectList
                setSelected={(val) => setSelected(val)}
                data={data}
                placeholder={languageContext}
                save="value"
                onSelect={() => setlanguageContext(selected)}
                label="Languages"
                search={false}
            />
        </View>
    )
}

export default LanguageSelect

const styles = StyleSheet.create({
    container: {
        height: "100%"
    },
    buttonStyle: {
        width: "20%",
        left: 12,
        marginTop: 150,
        position: "absolute",
        zIndex: 1,
        backgroundColor: "#F2F2F2",
        justifyContent: "space-between"
    }
});