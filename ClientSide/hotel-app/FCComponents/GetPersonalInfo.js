import { View, Text, StyleSheet, TextInput } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { HotelsAppContext } from '../Context/HotelsAppContext';
import Languages from '../Json files/Languages';
import RNDateTimePicker from '@react-native-community/datetimepicker';
import LanguageSelect from './LanguageSelect';
import ButtonMain from './Buttons';
import { SegmentedButtons } from 'react-native-paper';
import moment from 'moment';


const GetPersonalInfo = ({ setReturnedGender, setReturnedFname, setReturnedSname, setReturnedPhoneNumber, setReturnedBirthDate, setGetPersonalInfoSucceed }) => {

    //Screen content (words and sentences from Languages Json File that have been set for the current page)
    const screenContent = Languages.GetPersonalInfoComp;

    //Context (language will be used also as personal info)
    const { language, setlanguage } = useContext(HotelsAppContext)

    //Helper States
    const [checkColorMale, setCheckColorMale] = useState("#F2F2F2")
    const [checkColorFemale, setCheckColorFemale] = useState("#F2F2F2")
    const [firstNameColors, setFirstNameColors] = useState("black")
    const [lastNameColors, setLastNameColors] = useState("black")
    const [genderColors, setGenderColors] = useState("black")
    const [phoneNumberColors, setPhoneNumberColors] = useState("black")
    const [BirthDateColors, setBirthDateColors] = useState("black")



    //Personal Info States
    const [gender, setGender] = useState("")
    const [fname, setFname] = useState(null)
    const [sname, setSname] = useState(null)
    const [phoneNumber, setPhoneNumber] = useState(null)
    const [birthDate, setBirthDate] = useState(new Date())

    useEffect(() => {
        //changing the background color of the gender after selecting it 
        if (gender == "male") {
            setCheckColorMale("#d3b9b3")
            setCheckColorFemale("#F2F2F2")
        }
        else if (gender == "female") {
            setCheckColorFemale("#f0e8e6")
            setCheckColorMale("#F2F2F2")
        }
        else {
            setCheckColorFemale("#F2F2F2")
            setCheckColorMale("#F2F2F2")
        }
    }, [gender])

    const handleDateChange = (event, selectedDate) => {
        const currentDate = selectedDate || birthDate;
        setBirthDate(currentDate);
    };

    const handleSubmit = () => {

        //Check that all the fieds have changed, if not change the input text titles to red
        checkFields();

        if (gender && fname && sname && phoneNumber && birthDate != new Date()) {
            // setting the states of the parent comp (CreateUserScreen)
            setReturnedGender(gender);
            setReturnedFname(fname);
            setReturnedSname(sname);
            setReturnedPhoneNumber(phoneNumber);
            setReturnedBirthDate(birthDate);
            setGetPersonalInfoSucceed(true);
        }
    }

    const checkFields = () => {
        const warningColor = "red";
        const okColor = "black"
        const birthDateMoment = moment(birthDate);
        const todayMoment = moment();

        const isDatesEqual = birthDateMoment.isSame(todayMoment, 'day') &&
            birthDateMoment.isSame(todayMoment, 'month') &&
            birthDateMoment.isSame(todayMoment, 'year');

        if (gender == "") { setGenderColors(warningColor) } else { setGenderColors(okColor) }

        if (!fname) { setFirstNameColors(warningColor) } else { setFirstNameColors(okColor) }

        if (!sname) { setLastNameColors(warningColor) } else { setLastNameColors(okColor) }

        if (!phoneNumber) { setPhoneNumberColors(warningColor) } else { setPhoneNumberColors(okColor) }

        if (isDatesEqual) { setBirthDateColors(warningColor) } else { setBirthDateColors(okColor) }

    }


    return (
        <View style={{ height: "85%" }}>
            <Text style={styles.largeText}>{screenContent.CreateAccount[language]}</Text>
            <Text style={styles.smallText}>{screenContent.PersonalInfo[language]}</Text>
            <LanguageSelect languageContext={language} setlanguageContext={setlanguage} buttonStyle={{ marginTop: 150 }} />
            <View style={styles.textInputsView}>
                <View style={{ flexDirection: "row" }}>
                    <View style={{ flex: 1, width: "50%" }}>
                        <Text style={StyleSheet.flatten([styles.textInputesText, { color: firstNameColors }])}>{screenContent.FirstName[language]}</Text>
                        <TextInput style={styles.textInputs}
                            placeholder={"First Name"} keyboardAppearance='dark' autoCapitalize='none'
                            onChangeText={(text) => setFname(text)}
                        />
                    </View>
                    <View style={{ width: "50%" }}>
                        <Text style={StyleSheet.flatten([styles.textInputesText, { color: lastNameColors }])}>{screenContent.LastName[language]}</Text>
                        <TextInput style={styles.textInputs}
                            placeholder={"Last Name"} keyboardAppearance='dark' autoCapitalize='none'
                            onChangeText={(text) => setSname(text)}
                        />
                    </View>
                </View>
                <View style={{ flexDirection: "row" }}>
                    <View style={{ flex: 1, justifyContent: "center" }}>
                        <Text style={StyleSheet.flatten([styles.textInputesText, { color: phoneNumberColors }])}>{screenContent.PhoneNumber[language]}</Text>
                        <TextInput style={styles.textInputs}
                            placeholder={"Phone Number"} keyboardAppearance='dark' autoCapitalize='none'
                            keyboardType='number-pad'
                            onChangeText={(text) => setPhoneNumber(text)}
                        />
                    </View>
                    <View style={{ width: "30%", alignItems: "center", marginRight: 20 }}>
                        <Text style={StyleSheet.flatten([styles.textInputesText, { color: BirthDateColors }])}>{screenContent.BirthDate[language]}</Text>
                        <RNDateTimePicker display='calendar' style={styles.datePicker} mode='date' value={birthDate} maximumDate={new Date(Date.now())}
                            onChange={handleDateChange}
                        />
                    </View>
                </View>
                <Text style={StyleSheet.flatten([styles.textInputesText, { color: genderColors }])}>{screenContent.Gender[language]}</Text>
                <SegmentedButtons
                    value={gender}
                    onValueChange={(value) => setGender(value)}
                    style={{ marginHorizontal: 20, marginTop: 10 }}
                    buttons={[
                        {
                            value: 'male',
                            label: screenContent.Male[language],
                            checkedColor: "white",
                            style: { backgroundColor: checkColorMale }
                        },
                        {
                            value: 'female',
                            label: screenContent.Female[language],
                            style: { backgroundColor: checkColorFemale },
                            checkedColor: "#926255"
                        }
                    ]}
                />
                <ButtonMain text={screenContent.Continue[language]} buttonStyle={{ marginTop: 70 }}
                    onPress={handleSubmit}
                />
            </View>

        </View >

    )
}

export default GetPersonalInfo


const styles = StyleSheet.create({
    largeText: {
        fontSize: 35,
        alignSelf: "center",
        color: "black",
        marginTop: 30,
    },
    smallText: {
        fontSize: 26,
        height: 48,
        alignSelf: "center",
        color: "#565656",
        marginTop: 10
    },
    textInputs: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        borderRadius: 10,
        marginBottom: 20,
    },
    textInputsView: {
        marginTop: 100,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center"
    },
    textInputesText: {
        fontSize: 20,
        textAlign: "center"
    },
    datePicker: {
        height: 40,
        margin: 12,
        padding: 10,
        marginBottom: 20,
        right: 10,
    }
}); 