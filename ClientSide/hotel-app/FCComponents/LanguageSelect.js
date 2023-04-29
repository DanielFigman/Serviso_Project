import { View, Text, StyleSheet, TouchableWithoutFeedback } from 'react-native'
import React, { useContext, useState } from 'react'
import { SelectList } from 'react-native-dropdown-select-list';

const LanguageSelect = ({ languageContext, setlanguageContext, buttonStyle }) => {

    const [selected, setSelected] = useState("EN");

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