import { View, Text } from 'react-native'
import React, { useState } from 'react'

function verifyEmail(email){

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const url = "https://localhost:44375/api/EmailVerification?email=" + encodeURIComponent(email);

    return fetch(url, {
        method: 'GET',
        headers: new Headers({
            'Content-Type': 'application/json; charset=UTF-8',
        })
    })
        .then(() => {
           return true;
        },
            () => {
                return false;
            });
}

export default verifyEmail
