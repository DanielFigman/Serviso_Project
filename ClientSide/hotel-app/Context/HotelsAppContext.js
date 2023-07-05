import React, { createContext, useEffect, useRef, useState } from "react";
import * as Notifications from 'expo-notifications';
import { AppState } from "react-native";
import { isEqual } from "lodash";

export const HotelsAppContext = createContext();

export default function HotelsAppContextProvider(props) {


    const [language, setlanguage] = useState("EN");
    const [isLoading, setIsLoading] = useState(false);
    const [user, setUser] = useState(null);
    const [order, setOrder] = useState(null);
    const [activities_nearBy, setActivities_nearBy] = useState(null);
    const [suggestedActivities, setSuggestedActivities] = useState(null);
    const [activities_hotel, setActivities_hotel] = useState(null);
    const [facilities, setFacilities] = useState(null);
    const [custom_Request_Types, setCustom_Request_Types] = useState(null);
    const [therapies, setTherapies] = useState(null);
    const [hotel, setHotel] = useState(null)
    const [food, setFood] = useState(null)
    const [notificationToken, setNotificationToken] = useState(undefined);
    const [retrivedNtoken, setRetrivedNtoken] = useState(undefined);
    const [questionaire, setQuestionaire] = useState(null);
    const [updatedActivities, setUpdatedActivities] = useState(null);

    const [firstSetQuestionnaire, setFirstSetQuestionnaire] = useState(false);

    const clearContext = () => {
        setIsLoading(false);
        setUser(null);
        setOrder(null);
        setActivities_nearBy(null);
        setActivities_hotel(null);
        setFacilities(null);
        setCustom_Request_Types(null);
        setTherapies(null);
        setHotel(null);
        setFood(null);
        setNotificationToken(undefined);
        setRetrivedNtoken(undefined);
        setQuestionaire(null);
        setFirstSetQuestionnaire(false);

        console.log("Context cleared")
    }

    const updatedActivitiesRef = useRef(null)
    const updatedActivitiesInitRef = useRef(null)
    const emailRef = useRef(null)

    useEffect(() => {
        if (questionaire && !firstSetQuestionnaire) {
            setFirstSetQuestionnaire(true);
        }
        else if (questionaire && firstSetQuestionnaire) {
            postQuestionnaire();
        }

    }, [questionaire])


    const postQuestionnaire = async () => {
        try {
            const response = await fetch('http://proj.ruppin.ac.il/cgroup97/test2/api/updateQuestionnaire', {
                method: 'POST',
                body: JSON.stringify(getPostQuestObject()),
                headers: new Headers({
                    'Content-type': 'application/json; charset=UTF-8',
                })
            });

            if (response.ok) {
                console.log("The questionnaire updated");
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
    }

    const getPostQuestObject = () => {
        return { ...questionaire, email: user.email }
    }

    const setNewQuestionnaire = (questionnaireObject) => {
        console.log(questionnaireObject)
        let newQuestionnaireObj = {};

        Object.keys(questionnaireObject).forEach((key) => {
            const val = questionnaireObject[key] || questionnaireObject[key] == 0 ? questionnaireObject[key] : 5;
            newQuestionnaireObj[key] = val;
        });

        setQuestionaire(newQuestionnaireObj);
    };

    const prevNotificationTokenRef = useRef();

    useEffect(() => {
        if (user && user.email) {

            emailRef.current = user.email;

            if (notificationToken && notificationToken !== prevNotificationTokenRef.current) {
                prevNotificationTokenRef.current = notificationToken;

                if (notificationToken !== retrivedNtoken) {
                    fetchNToken();
                    console.log("fetched")
                }
            }
        }
    }, [notificationToken, user]);

    useEffect(() => {
        if (updatedActivities !== null && updatedActivities !== undefined) {
            updatedActivitiesRef.current = JSON.parse(JSON.stringify(updatedActivities));

            if (updatedActivitiesInitRef.current === null) {
                updatedActivitiesInitRef.current = JSON.parse(JSON.stringify(updatedActivities));
            }
        }
    }, [updatedActivities]);

    useEffect(() => {

        // Subscribe to AppState change event
        const handleAppStateChange = (nextAppState) => {
            if (nextAppState === 'background') {
                // App is being backgrounded or closed, execute the code that should run when closing the app
                console.log("App is closing");

                if (
                    updatedActivitiesRef?.current?.length !== updatedActivitiesInitRef?.current?.length ||
                    updatedActivitiesRef?.current?.some((activity, index) => !isEqual(activity, updatedActivitiesInitRef.current[index]))
                ) {
                    postFavorite();
                }

            }
        };

        // Add event listener for AppState change
        AppState.addEventListener("change", handleAppStateChange);

        // Cleanup function to remove the event listener
        return () => {
            AppState.removeEventListener("change", handleAppStateChange);
        };
    }, []);

    const postFavorite = () => {
        try {
            console.log(getNeededFavsToPost());
            fetch(`http://proj.ruppin.ac.il/cgroup97/test2/api/updateFavsAndRatings?&email=${emailRef.current}`, {
                method: 'POST',
                body: JSON.stringify(getNeededFavsToPost()),
                headers: new Headers({
                    'Content-type': 'application/json; charset=UTF-8',
                }),
            })
                .then(response => {
                    if (response.ok) {
                        console.log("Favorites posted");
                        updatedActivitiesInitRef.current = updatedActivitiesRef.current;
                    } else {
                        console.log(`Error in posting favorites`);
                    }
                })
                .catch(error => {
                    console.log(error);
                });
        } catch (error) {
            console.log(error);
        }
    };



    const getNeededFavsToPost = () => {
        const neededFavs = [];

        updatedActivitiesRef.current.forEach(updatedActivityRef => {
            const matchingInitActivity = updatedActivitiesInitRef.current.find(
                initActivity => initActivity.placeID === updatedActivityRef.placeID
            );

            if (!matchingInitActivity || !isEqual(updatedActivityRef, matchingInitActivity)) {
                neededFavs.push(updatedActivityRef);
            }
        });

        return neededFavs;
    };

    const fetchNToken = async () => {
        try {
            const response = await fetch('http://proj.ruppin.ac.il/cgroup97/test2/api/NTUPDATE', {
                method: 'PUT',
                body: JSON.stringify({
                    email: user.email,
                    NTOKEN: notificationToken
                }),
                headers: new Headers({
                    'Content-type': 'application/json; charset=UTF-8',
                })
            });
            if (response.ok) {
                console.log("NtokenUpdated");
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
    };

    const getFavorite = (placeID) => {
        const filteredActivities = updatedActivities.filter(obj => obj.placeID === placeID);
        const fav = filteredActivities.length > 0 ? filteredActivities[0].favorite : null;

        return fav;
    }

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
                setFood,
                setNotificationToken,
                setRetrivedNtoken,
                questionaire,
                setQuestionaire,
                setNewQuestionnaire,
                clearContext,
                updatedActivities,
                setUpdatedActivities,
                getFavorite,
                suggestedActivities,
                setSuggestedActivities
            }}
        >
            {props.children}
        </HotelsAppContext.Provider>
    );
}
