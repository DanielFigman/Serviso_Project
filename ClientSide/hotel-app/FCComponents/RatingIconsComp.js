import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { faFaceGrinHearts, faFaceAngry, faFaceFrown, faFaceSmile, faFaceMeh } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'

const RatingIconsComp = ({ prevRated }) => {


    const [currRated, setCurrRated] = useState("")

    useEffect(() => {
        if (prevRated) {
            setCurrRated(prevRated);
        }

    }, [])

    const handleSelection = (value) => {
        if (value !== currRated) {
            setCurrRated(value)
        } else {
            setCurrRated("")
        }
    }


    return (
        <>
            <View style={{ display: "flex", flexDirection: "column", flex: 1 }}>
                <Text style={{ marginBottom: 20, fontSize: 15, fontWeight: "bold" }}>What are your thoughts about the place?</Text>
                <View style={{ display: "flex", flexDirection: "row", marginHorizontal: 10, justifyContent: "space-between", flex: 1 }}>

                    <TouchableOpacity onPress={() => handleSelection("faFaceGrinHearts")}>
                        <View style={currRated === "faFaceGrinHearts" ? styles.selected : styles.notSelected}>
                            <FontAwesomeIcon icon={faFaceGrinHearts} style={styles.icon} size={50} color='#d8b0b0' />
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => handleSelection("faFaceSmile")}>
                        <View style={currRated === "faFaceSmile" ? styles.selected : styles.notSelected}>

                            <FontAwesomeIcon icon={faFaceSmile} style={styles.icon} size={50} color='#d8b0b0' />
                        </View>

                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => handleSelection("faFaceMeh")}>
                        <View style={currRated === "faFaceMeh" ? styles.selected : styles.notSelected}>

                            <FontAwesomeIcon icon={faFaceMeh} style={styles.icon} size={50} color='#d8b0b0' />
                        </View>

                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => handleSelection("faFaceFrown")}>
                        <View style={currRated === "faFaceFrown" ? styles.selected : styles.notSelected}>

                            <FontAwesomeIcon icon={faFaceFrown} style={styles.icon} size={50} color='#d8b0b0' />
                        </View>

                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => handleSelection("faFaceAngry")}>
                        <View style={currRated === "faFaceAngry" ? styles.selected : styles.notSelected}>

                            <FontAwesomeIcon icon={faFaceAngry} style={styles.icon} size={50} color='#d8b0b0' />
                        </View>

                    </TouchableOpacity>
                </View>
            </View>
        </>
    )
}

export default RatingIconsComp

const styles = StyleSheet.create({
    selected: {
        borderRadius: "50%", borderColor: "black", borderWidth: 2, padding: 3
    },
    notSelected: {
        borderRadius: "50%", borderColor: "transparent", borderWidth: 2, padding: 3
    }
})