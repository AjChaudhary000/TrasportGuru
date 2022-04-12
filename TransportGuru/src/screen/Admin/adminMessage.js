import { View, Text } from 'react-native'
import React from 'react'
import AdminHeader from '../../components/adminHeader'
const AdminMessage = () => {
    return (
        <View>
            <AdminHeader name={"Messages"} />
            <Text>Message</Text>
        </View>
    )
}

export default AdminMessage