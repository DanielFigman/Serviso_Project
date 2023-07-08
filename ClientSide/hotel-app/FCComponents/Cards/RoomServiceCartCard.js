import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import LoadingImage from '../LoadingImage'

const RoomServiceCartCard = ({ item }) => {
  return (
    <View style={styles.container}>
      <LoadingImage imageURL={item.imageURL} style={{ height: 100, width: 100, borderRadius: 5, }} />
      <View style={styles.info}>
        <View>
          <Text style={{ fontSize: 15, fontWeight: "bold", fontFamily: "Courier New" }}>{item.name}</Text>
        </View>
        <View>
          <Text style={styles.text}>Quantity: {item.amount}</Text>
        </View>
        <View style={styles.containerInner}>
          <Text style={styles.text}>Price:</Text>
          <Text style={{ left: 10, fontSize: 10, top: 10, fontWeight: "bold" }}>₪</Text>
          <Text style={[styles.text, { left: 10, fontWeight: "bold" }]}>{item.price * item.amount}</Text>
        </View>
        {
          item.changes ?
            <View>
              <Text style={styles.text}>Changes: {item.changes}</Text>
            </View>
            :
            <></>
        }
      </View>
    </View>
  )
}

export default RoomServiceCartCard

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginBottom: 10,
  },
  containerInner: {
    flexDirection: "row",
  },
  info: {
    flexDirection: "column",
    alignContent: "center",
    marginHorizontal: 10,
    marginTop: 5,
  },
  text: {
    marginTop: 5,
    fontSize: 15,
    left: 5,
  }
})