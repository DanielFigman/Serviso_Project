import React, { useEffect } from 'react'
import { useState } from 'react'
import { Image } from 'react-native'

const LoadingImage = ({ imageURL, style }) => {


    const [image, setImage] = useState(require('../assets/imageLoading.gif'))
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        setIsLoading(true);
        setImage(require('../assets/imageLoading.gif'))
      }, []);
    

    return (
        <Image
            style={style}
            onLoad={() => setIsLoading(false)}
            source={isLoading ? image : { uri: imageURL }}
        />
    )
}

export default LoadingImage