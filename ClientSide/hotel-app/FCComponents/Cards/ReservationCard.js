import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const ReservationCard = ({title, value}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  )
}

export default ReservationCard

const styles = StyleSheet.create({
    container: {
      width:"80%",
      alignItems:"center",
      alignSelf:"center",
      marginBottom:20,
      marginTop:10
    },
    title:{
        color:"gray",
        marginBottom:10,
        fontSize:15
    },
    value:{
        color:"black",
        fontSize:20
    }
  });