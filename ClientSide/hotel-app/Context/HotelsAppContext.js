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
    const [notificationToken, setNotificationToken] = useState(undefined);
    const [retrivedNtoken, setRetrivedNtoken] = useState(undefined);
    const [questionaire, setQuestionaire] = useState(null);
    const [updatedActivities, setUpdatedActivities] = useState(null);
    const [food, setFood] = useState(null)
    const [drinks, setDrinks] = useState(null)
    const [alcohol, setAlcohol] = useState(null)
    const [additionalItems, setAdditionalItems] = useState(null)
    const [cart, setCart] = useState([]);

    const [foodAndDrinksOOS, setFoodAndDrinksOOS] = useState([]);
    const [additionalItemsOOS, setAdditionalItemsOOS] = useState([]);

    const [firstSetQuestionnaire, setFirstSetQuestionnaire] = useState(false);

    const prevFoodRef = useRef(null);
    const prevDrinkRef = useRef(null);
    const prevAlcoholRef = useRef(null);
    const prevAdditionalItemsRef = useRef(null);
    const prevCartRef = useRef(null);

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

    const setLoginInfo = (email, object) => {
        setUser({ email, fName: object.fName, sName: object.sName, gender: object.gender, phone: object.phone, dateOfBirth: object.dateOfBirth });
        setRetrivedNtoken(object.Ntoken ? object.Ntoken : null)
        setOrder({ orderID: object.orderID, checkInDate: object.checkInDate, checkOutDate: object.checkOutDate, hotelID: object.hotelID });
        setActivities_nearBy(object.activities_nearBy);
        setSuggestedActivities(object.suggestedActivities);
        setActivities_hotel(object.activities_hotel);
        setFacilities(object.facilities);
        setCustom_Request_Types(object.custom_Request_Types);
        setTherapies(object.therapies);
        setHotel(object.hotel)
        setlanguage(object.languageShortName)
        setFood(object.food)
        setDrinks(object.drinks)
        setAlcohol(object.alcohol)
        setAdditionalItems(object.additionalItems)
        setNewQuestionnaire(object.questionnaire)
        setFoodAndDrinksOOS(object.foodAndDrinksOOS)
        setAdditionalItemsOOS(object.additionalItemsOOS)
    }

    useEffect(() => {
        prevCartRef.current = cart;
    }, [cart])


    useEffect(() => {
        prevFoodRef.current = food;
    }, [food])

    useEffect(() => {
        prevDrinkRef.current = drinks;
    }, [drinks])

    useEffect(() => {
        prevAlcoholRef.current = alcohol;
    }, [alcohol])

    useEffect(() => {
        prevAdditionalItemsRef.current = additionalItems;
    }, [additionalItems])

    useEffect(() => {
        let newCartFood = [];
        let newCartadditional = [];

        console.log(foodAndDrinksOOS)

        if (foodAndDrinksOOS && foodAndDrinksOOS.length > 0) {

            if (food) {
                const newFood = food.filter(obj => !foodAndDrinksOOS.includes(obj.ID));

                if (newFood && prevFoodRef.current != newFood) {
                    setFood(newFood);
                }
            }
            if (drinks) {
                const newDrinks = drinks.filter(obj => !foodAndDrinksOOS.includes(obj.ID));

                if (newDrinks && prevDrinkRef.current != newDrinks) {
                    setDrinks(newDrinks);
                }
            }
            if (alcohol) {
                const newAlcohol = alcohol.filter(obj => !foodAndDrinksOOS.includes(obj.ID));

                if (newAlcohol && prevAlcoholRef.current != newAlcohol) {
                    setAlcohol(newAlcohol)
                }
            }

            if (cart && cart.length > 0) {
                newCartFood = cart.filter(obj => !foodAndDrinksOOS?.includes(obj.ID));
            }
        }

        if (additionalItemsOOS && additionalItemsOOS.length > 0) {
            if (additionalItems) {
                const newAdditional = additionalItems?.filter(obj => !additionalItemsOOS.includes(obj.ID))

                if (newAdditional && prevAdditionalItemsRef.current != newAdditional) {
                    setAdditionalItems(newAdditional);
                }
            }

            if (cart && cart.length > 0) {
                newCartadditional = cart.filter(obj =>  !additionalItemsOOS?.includes(obj.ID));

            }
        }

        const newCart = [...newCartFood, ...newCartadditional];

        if (cart && cart.length > 0) {
        
            if (newCart && prevCartRef.current != newCart) {
                setCart(newCart);
            }
        }


    }, [foodAndDrinksOOS, additionalItemsOOS])


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
                setSuggestedActivities,
                drinks,
                setDrinks,
                alcohol,
                setAlcohol,
                additionalItems,
                setAdditionalItems,
                cart,
                setCart,
                setLoginInfo
            }}
        >
            {props.children}
        </HotelsAppContext.Provider>
    );
}
