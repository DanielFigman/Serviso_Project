import { Animated, Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';

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
import Languages from '../Json files/Languages';
import { XCircleIcon } from 'react-native-heroicons/mini';
import { useNavigation } from '@react-navigation/core';


const { Value, Text: AnimatedText } = Animated;

const CELL_COUNT = 4;
const source = {
  uri: 'https://user-images.githubusercontent.com/4661784/56352614-4631a680-61d8-11e9-880d-86ecb053413d.png',
};

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

const VerificationCode = () => {

  const navigation = useNavigation();

  const [value, setValue] = useState('');
  const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  const screenContent = Languages.VerificationCodeComp;


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
    <SafeAreaView style={ConfirmationCodeStyles.root}>
      <View style={styles.leftArrowView}>
        <TouchableOpacity onPress={()=> navigation.navigate("LoginScreen")}>
          <XCircleIcon color={styles.leftArrow.color} size={styles.leftArrow.fontSize} style={styles.leftArrow} />
        </TouchableOpacity>
      </View>
      <Text style={ConfirmationCodeStyles.title}>{screenContent.EnterConfirmationCode.EN}</Text>
      <Text style={ConfirmationCodeStyles.subTitle}>{screenContent.A4DigitCodeWasSentTo.EN}</Text>

      <CodeField
        ref={ref}
        {...props}
        value={value}
        onChangeText={setValue}
        cellCount={CELL_COUNT}
        rootStyle={ConfirmationCodeStyles.codeFieldRoot}
        keyboardType="number-pad"
        textContentType="oneTimeCode"
        renderCell={renderCell}
      />
      <View style={ConfirmationCodeStyles.nextButton}>
        <Text style={ConfirmationCodeStyles.nextButtonText}>Continue</Text>
      </View>
    </SafeAreaView>
  );
};

export default VerificationCode

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    height: "100%"
  },
  leftArrow: {
    color: "#8E8E8E",
    width: 2,
    fontSize: 30,
    left: 10,
    top: 5,
  },
  leftArrowView: {
    height: 60,
    width: 2
  },
  topTextView: {

  },
  largeText: {
    fontSize: 40,
    height: 48,
    alignSelf: "center",
    color: "#535150",
    marginTop: 20,
  },
  smallText: {
    fontSize: 18,
    height: 48,
    alignSelf: "center",
    color: "#565656"
  },
  textInputs: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  textInputsView: {
    marginTop: 100
  },
  loginButton: {
    width: 281,
    height: 62,
    marginTop: 50,
    alignSelf: "center",
    borderRadius: 30,
    backgroundColor: "black",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  loginText: {
    color: "white",
    fontSize: 36
  },
  additionalOptions: {
    fontSize: 15,
    color: "#6B6B6B",
    textAlign: "center",
    marginTop: 20,
  },
  additionalOptionsView: {
    alignItems: "center",
    marginTop: 15
  },
  servisoFlower: {
    width: 134,
    height: 68,
    top: 40,
    alignSelf: "center"
  },
  selectList: {
    width: "20%",
    left: 12,
    top: 250,
    position: "absolute",
    zIndex: 1,
    backgroundColor: "white"
  }
});