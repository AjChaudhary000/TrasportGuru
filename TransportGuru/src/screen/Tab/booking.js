import { View, Text } from 'react-native'
import React from 'react'

const Booking = (props) => {
  console.log("props1",props.route.params.item)
  return (
    <View>
      <Text>Booking</Text>
    </View>
  )
}

export default Booking