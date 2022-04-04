import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Setting from '../screen/Tab/setting';
import Tracking from '../screen/Tab/tracking';
import icons from '../contents/icons';
import color from '../contents/color';
import Message from '../screen/Tab/message';
import AdminHome from '../screen/Admin/adminHome';
import AddTransport from '../screen/Admin/addTransport';
const Tabs = createBottomTabNavigator();

const AdminTab = () => {
    const CustomButton = ({ children, onPress }) => (
        <TouchableOpacity style={{ top: -25, justifyContent: 'center', alignItems: 'center' }} onPress={onPress}>
            <View style={{ width: 70, height: 70, borderRadius: 35, backgroundColor: color.adminprimaryColors , borderColor: color.backgroundColor, borderWidth: 5 }}>{children}</View>
        </TouchableOpacity>
    );
    return (
        <Tabs.Navigator screenOptions={{ tabBarHideOnKeyboard: true, tabBarStyle: { borderTopWidth: 0, position: 'absolute', bottom: 0, backgroundColor: color.backgroundColor }, tabBarShowLabel: false }}>
            <Tabs.Screen name="AdminHome" component={AdminHome} options={{
                headerShown: false, tabBarIcon: ({ focused }) => (
                    <Image source={icons.home} style={{ width: 30, height: 30, tintColor: focused ? color.adminprimaryColors : 'gray' }} />
                )
            }} />

            <Tabs.Screen name="Tracking" component={Tracking} options={{
                headerShown: false, tabBarIcon: ({ focused }) => (
                    <Image source={icons.tracking} style={{ width: 30, height: 30, tintColor: focused ? color.adminprimaryColors : 'gray' }} />
                )
            }} />
            <Tabs.Screen name="AddTransport" component={AddTransport} options={{
                headerShown: false, tabBarIcon: ({ focused }) => (
                    <Image source={icons.addtotruck} style={{ width: 30, height: 30, tintColor: focused ? 'white' : 'black' }}

                    />
                ), tabBarButton: (props) => (
                    <CustomButton {...props} />)

            }} />
            <Tabs.Screen name="Message" component={Message} options={{
                headerShown: false, tabBarIcon: ({ focused }) => (
                    <Image source={icons.message} style={{ width: 30, height: 30, tintColor: focused ? color.adminprimaryColors : 'gray' }} />
                )
            }} />
            <Tabs.Screen name="Setting" component={Setting} options={{
                headerShown: false, tabBarIcon: ({ focused }) => (
                    <Image source={icons.setting} style={{ width: 30, height: 30, tintColor: focused ? color.adminprimaryColors : 'gray' }} />
                )
            }} />

        </Tabs.Navigator>
    )
}

export default AdminTab