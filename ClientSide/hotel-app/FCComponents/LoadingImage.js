import React, { useEffect, useState } from 'react';
import { Image } from 'react-native';
import * as FileSystem from 'expo-file-system';
import { MD5 } from 'crypto-js';

const imageCache = {};

const LoadingImage = ({ imageURL, style, type }) => {
  const [cachedImageURI, setCachedImageURI] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const cacheImage = async () => {
      if (!imageURL) {
        setError(new Error('Image URL is missing'));
        setIsLoading(false);
        return;
      }

      if (imageCache[imageURL]) {
        // Image is already cached, use the cached URI
        setCachedImageURI(imageCache[imageURL]);
        setIsLoading(false);
        return;
      }

      const fileName = generateUniqueFileName(imageURL);
      const cachedImagePath = FileSystem.cacheDirectory + fileName;

      try {
        const { uri } = await FileSystem.downloadAsync(imageURL, cachedImagePath);
        // Cache the downloaded image URI
        imageCache[imageURL] = uri;
        setCachedImageURI(uri);
        setIsLoading(false);
      } catch (error) {
        console.error('Error caching image:', error);
        setError(error);
        setIsLoading(false);
      }
    };

    cacheImage();
  }, [imageURL]);

  const generateUniqueFileName = (url) => {
    if (!url) {
      return 'image.jpg';
    }

    const hash = MD5(url).toString();
    const extension = getExtensionFromURL(url);

    return `${hash}.${extension}`;
  };

  const getExtensionFromURL = (url) => {
    if (!url) {
      return 'jpg';
    }

    const matches = url.match(/\.[^/]+$/);
    if (matches && matches.length > 0) {
      return matches[0].substring(1);
    }
    return 'jpg';
  };

  if (isLoading) {
    if (type) {
      switch (type) {
        case "food":
          return <Image style={style} source={require('../assets/foodLoading.gif')} />
        case "HOT":
          return <Image style={style} source={require('../assets/hot-loading.gif')} />;
        case "COLD":
          return <Image style={style} source={require('../assets/coca-cola-loading.gif')} />;
        case "WINE":
          return <Image style={style} source={require('../assets/wine-loading.gif')} />;
        case "COCKTAIL":
          return <Image style={style} source={require('../assets/cocktail-loading.gif')} />;
        default:
          return <Image style={style} source={require('../assets/cart-loading.gif')} />;
      }
    } else {
      return <Image style={style} source={require('../assets/imageLoading.gif')} />;
    }
  }

  if (error) {
    // Handle the error case here
    return <Image style={style} source={require('../assets/errorImage.png')} />;
  }

  if (cachedImageURI) {
    return <Image style={style} source={{ uri: cachedImageURI }} />;
  }

  // Handle any other fallback case here
  return null;
};

export default LoadingImage;
