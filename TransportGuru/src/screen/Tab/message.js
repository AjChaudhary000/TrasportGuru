import { View, Text } from 'react-native'
import React from 'react'
import Header from '../../components/header'
const Message = () => {
    return (
        <View>
            <Header name={"Messages"} />
            <Text>Message</Text>
        </View>
    )
}

export default Message