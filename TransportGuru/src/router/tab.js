import { View, Text, Image } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screen/Tab/homeScreen';
import Setting from '../screen/Tab/setting';
import Tracking from '../screen/Tab/tracking';
import TrasportList from '../screen/Tab/trasportList';
import icons from '../contents/icons';
import color from '../contents/color';
import Message from '../screen/Tab/message';
const Tabs = createBottomTabNavigator();

const Tab = () => {
    return (
        <Tabs.Navigator screenOptions={{ tabBarHideOnKeyboard: true, tabBarStyle: { borderTopWidth: 0, position: 'absolute', bottom: 0 }, tabBarShowLabel: false }}>
            <Tabs.Screen name="HomeScreen" component={HomeScreen} options={{
                headerShown: false, tabBarIcon: ({ focused }) => (
                    <Image source={icons.home} style={{ width: 30, height: 30, tintColor: focused ? color.primaryColors : 'gray' }} />
                )
            }} />
            <Tabs.Screen name="TrasportList" component={TrasportList} options={{
                headerShown: false, tabBarIcon: ({ focused }) => (
                    <Image source={icons.truck} style={{ width: 30, height: 30, tintColor: focused ? color.primaryColors : 'gray' }} />
                )
            }} />
            <Tabs.Screen name="Tracking" component={Tracking} options={{
                headerShown: false, tabBarIcon: ({ focused }) => (
                    <Image source={icons.tracking} style={{ width: 30, height: 30, tintColor: focused ? color.primaryColors : 'gray' }} />
                )
            }} />
            <Tabs.Screen name="Message" component={Message} options={{
                headerShown: false, tabBarIcon: ({ focused }) => (
                    <Image source={icons.message} style={{ width: 30, height: 30, tintColor: focused ? color.primaryColors : 'gray' }} />
                )
            }} />
            <Tabs.Screen name="Setting" component={Setting} options={{
                headerShown: false, tabBarIcon: ({ focused }) => (
                    <Image source={icons.setting} style={{ width: 30, height: 30, tintColor: focused ? color.primaryColors : 'gray' }} />
                )
            }} />

        </Tabs.Navigator>
    )
}

export default Tab