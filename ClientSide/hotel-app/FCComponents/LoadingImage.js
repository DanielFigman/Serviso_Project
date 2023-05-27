import React, { useEffect, useState } from 'react';
import { Image } from 'react-native';
import * as FileSystem from 'expo-file-system';

const imageCache = {};

const LoadingImage = ({ imageURL, style }) => {
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

      const fileName = getFileNameFromURL(imageURL);
      const cachedImagePath = FileSystem.cacheDirectory + fileName;

      try {
        await FileSystem.getInfoAsync(cachedImagePath);
        // File exists in cache, attempt to delete it
        await FileSystem.deleteAsync(cachedImagePath, { idempotent: true });
        console.log('Cache cleared successfully');
      } catch (error) {
        console.log('Failed to clear cache:', error);
      }

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

  const getFileNameFromURL = (url) => {
    if (!url) {
      return 'image.jpg';
    }

    const matches = url.match(/\/([^/]+)$/);
    if (matches && matches.length > 1) {
      return matches[1];
    }
    return 'image.jpg';
  };

  if (isLoading) {
    return <Image style={style} source={require('../assets/imageLoading.gif')} />;
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
