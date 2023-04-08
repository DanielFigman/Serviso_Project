import { View, Text, TextInput, ScrollView, DatePickerIOSBase } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import ScreenComponent from '../FCComponents/ScreenComponent'
import Languages from '../Json files/Languages'
import { StyleSheet } from 'react-native'
import { HotelsAppContext } from '../Context/HotelsAppContext'
import LanguageSelect from '../FCComponents/LanguageSelect'
import ButtonMain from '../FCComponents/Buttons'
import { useNavigation } from '@react-navigation/core'
import { isEqual } from 'lodash';
import RNDateTimePicker from '@react-native-community/datetimepicker'
import GetPersonalInfo from '../FCComponents/GetPersonalInfo'
import GetLoginInfo from '../FCComponents/GetLoginInfo'
import axios from 'axios'

const CreateUserScreen = () => {

    //Screen content (words and sentences from Languages Json File that have been set for the current page)
    const screenContent = Languages.CreateUserScreen;

    //Context (language will be used also as personal info)
    const {language} = useContext(HotelsAppContext)


    //Personal Info States
    const [gender, setGender] = useState(null)
    const [fname, setFname] = useState(null)
    const [sname, setSname] = useState(null)
    const [phoneNumber, setPhoneNumber] = useState(null)
    const [birthDate, setBirthDate] = useState(null)
    const [email, setEmail] = useState(null)
    const [password, setPassword] = useState(null)

    //Confirmation of Moving to the next step states (will return from the children and then we will do the next steps)
    const [getPersonalInfoSucceed, setGetPersonalInfoSucceed] = useState(false)
    const [getLoginInfoSucceed, setGetLoginInfoSucceed] = useState(false)

    //Confirmation and error message states to update if the user creation failed
    const [errorMessageAfterFetch, setErrorMessageAfterFetch] = useState("")
    const [fetchFailed, setFetchFailed] = useState(null)

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

    const languageToSend = data.filter(obj => obj.value === language).key;

    useEffect(() => {
        if(getLoginInfoSucceed){
            const url = 'http://proj.ruppin.ac.il/cgroup97/finalProject/api/signUP';

            axios.post(url, {
                email: email,
                password: password,
                languageID: languageToSend,
                dateOfBirth: birthDate,
                phone: phoneNumber,
                gender: gender,
                fName: fname,
                Sname: sname
              })
              .then((response) => {
                console.log(response);
              })
              .catch((error) => {
                console.log(error);
                setErrorMessageAfterFetch(response)
                setFetchFailed(true)
                setGetLoginInfoSucceed(false)
              });
        }
    }, [getLoginInfoSucceed])


    return (
        <ScreenComponent topLeftButton={"cancel"} cancelNavigation={"LoginScreen"}
            content={

                !getPersonalInfoSucceed
                    ?
                    <GetPersonalInfo
                        setReturnedGender={setGender}
                        setReturnedFname={setFname}
                        setReturnedSname={setSname}
                        setReturnedPhoneNumber={setPhoneNumber}
                        setReturnedBirthDate={setBirthDate}
                        setGetPersonalInfoSucceed={setGetPersonalInfoSucceed}
                    />
                    :
                    <GetLoginInfo
                        setReturnedEmail={setEmail}
                        setReturnedPassword={setPassword}
                        setGetLoginInfoSucceed={setGetLoginInfoSucceed}
                        errorMessageAfterFetch={errorMessageAfterFetch}
                        fetchFailed={fetchFailed}
                        setFetchFailed={setFetchFailed}
                    />
            }
        />
    )
}

export default CreateUserScreen