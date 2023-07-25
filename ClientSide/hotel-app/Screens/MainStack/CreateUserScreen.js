import { Alert } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import ScreenComponent from '../../FCComponents/ScreenComponent'
import Languages from '../../Json_files/Languages'
import { StyleSheet } from 'react-native'
import { HotelsAppContext } from '../../Context/HotelsAppContext'
import { useNavigation } from '@react-navigation/core'
import GetPersonalInfo from '../../FCComponents/GetPersonalInfo'
import GetLoginInfo from '../../FCComponents/GetLoginInfo'
import { auth } from '../../Firebase/firebase-config';
import { createUserWithEmailAndPassword } from 'firebase/auth';

const CreateUserScreen = () => {
    const navigation = useNavigation();

    //Screen content (words and sentences from Languages Json File that have been set for the current page)
    const screenContent = Languages.CreateUserScreen;

    //Context (language will be used also as personal info)
    const { language, setIsLoading } = useContext(HotelsAppContext)


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
    const [creationSucceed, setCreationSucceed] = useState(false)


    useEffect(() => {
        if (creationSucceed) {
            showSucceedAlert();
            setCreationSucceed(null);
        }
    }, [creationSucceed])

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

    const showSucceedAlert = () => {
        Alert.alert(
            "Account creation Succeed",
            `for ${email}`,
            [{ text: 'OK', onPress: () => navigation.navigate("LoginScreen") }],
        );
    }

    const fetchThis = async () => {
        setIsLoading(true);

        try {
            const response = await fetch('http://proj.ruppin.ac.il/cgroup97/prod/api/signUP', {
                method: 'POST',
                body: JSON.stringify(
                    {
                        email: email,
                        password: password,
                        languageID: data.find(obj => obj.value === language).key,
                        dateOfBirth: birthDate,
                        phone: phoneNumber,
                        gender: gender,
                        fName: fname,
                        sName: sname
                    }
                ),
                headers: new Headers({
                    'Content-type': 'application/json; charset=UTF-8',
                })
            });

            if (response.ok) {
                console.log("User created successfully");
                // Create a new user account with email and password
                await createUserWithEmailAndPassword(auth, email, password)
                    .then((userCredential) => {
                        // The user account has been created successfully
                        const user = userCredential.user;
                        console.log('New user created:', user.uid);
                        // You can perform any additional actions for a successful sign-up here
                    })
                    .catch((error) => {
                        // Handle sign-up errors
                        console.error('Sign-up error:', error.message);
                    });
                setCreationSucceed(true)

            } else {
                const errorMessage = await response.text();
                const errorObject = JSON.parse(errorMessage);
                const errorType = errorObject.type;
                const errorMessageText = errorObject.message;

                console.log(`Error: ${response.status} - ${errorType} - ${errorMessageText}`);
                setErrorMessageAfterFetch(errorMessageText)
                setFetchFailed(true)
                setGetLoginInfoSucceed(false)
            }
            setIsLoading(false)

        } catch (error) {
            console.log(error);
            setIsLoading(false)

        }
    };

    useEffect(() => {
        if (getLoginInfoSucceed) {
            setFetchFailed(null)
            fetchThis();
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