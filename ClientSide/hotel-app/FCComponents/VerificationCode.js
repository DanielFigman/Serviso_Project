import { Alert, Animated, Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';

import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';

import ConfirmationCodeStyles, {
  ACTIVE_CELL_BG_COLOR,
  CELL_BORDER_RADIUS,
  CELL_SIZE,
  DEFAULT_CELL_BG_COLOR,
  NOT_EMPTY_CELL_BG_COLOR,
} from '../Styles/ConfirmationCodeStyles';
import ButtonMain from './Buttons';


const { Value, Text: AnimatedText } = Animated;

const CELL_COUNT = 4;

const animationsColor = [...new Array(CELL_COUNT)].map(() => new Value(0));
const animationsScale = [...new Array(CELL_COUNT)].map(() => new Value(1));
const animateCell = ({ hasValue, index, isFocused }) => {
  Animated.parallel([
    Animated.timing(animationsColor[index], {
      useNativeDriver: false,
      toValue: isFocused ? 1 : 0,
      duration: 250,
    }),
    Animated.spring(animationsScale[index], {
      useNativeDriver: false,
      toValue: hasValue ? 0 : 1,
      duration: hasValue ? 300 : 250,
    }),
  ]).start();
};

const VerificationCode = ({ language, setVerificationSucceed, email, code }) => {

  const [value, setValue] = useState('');
  const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  }); 

  const screenContent = Languages.VerificationCodeComp;

  const onSubmit = () => {
    if(value === code){
      setVerificationSucceed(true);
    }
    else{
      showFailedAlert();
    }
  }

  
  const showFailedAlert = () => {
    Alert.alert(
        "Wrong verification code",
        "",
        [{ text: 'OK'}],
    );
}

  const renderCell = ({ index, symbol, isFocused }) => {
    const hasValue = Boolean(symbol);
    const animatedCellStyle = {
      backgroundColor: hasValue
        ? animationsScale[index].interpolate({
          inputRange: [0, 1],
          outputRange: ["black", "black"],
        })
        : animationsColor[index].interpolate({
          inputRange: [0, 1],
          outputRange: ["black", "white"],
        }),
      borderRadius: animationsScale[index].interpolate({
        inputRange: [0, 1],
        outputRange: [CELL_SIZE, CELL_BORDER_RADIUS],
      }),
      transform: [
        {
          scale: animationsScale[index].interpolate({
            inputRange: [0, 1],
            outputRange: [0.8, 1],
          }),
        },
      ],
    };

    // Run animation on next event loop tik
    // Because we need first return new style prop and then animate this value
    setTimeout(() => {
      animateCell({ hasValue, index, isFocused });
    }, 0);


    return (
      <AnimatedText
        key={index}
        style={[ConfirmationCodeStyles.cell, animatedCellStyle]}
        onLayout={getCellOnLayoutHandler(index)}>
        {symbol || (isFocused ? <Cursor /> : null)}
      </AnimatedText>
    );
  };

  return (
    <View>
      <Text style={ConfirmationCodeStyles.title}>{screenContent.EnterConfirmationCode[language]}</Text>
      <Text style={ConfirmationCodeStyles.subTitle}>{screenContent.A4DigitCodeWasSentTo[language]}</Text>
      <Text style={ConfirmationCodeStyles.smallText}>{email}</Text>
      <CodeField
        ref={ref}
        {...props}
        value={value}
        onChangeText={(val) => setValue(val)}
        cellCount={CELL_COUNT}
        rootStyle={ConfirmationCodeStyles.codeFieldRoot}
        keyboardType="number-pad"
        textContentType="oneTimeCode"
        renderCell={renderCell}
        keyboardAppearance='dark'
      />
      <ButtonMain text={screenContent.Continue[language]} buttonStyle={{ marginTop: 70 }} onPress={onSubmit}/>
    </View>
  );
};

export default VerificationCode