import { View, Text } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screen/Tab/homeScreen';
import Setting from '../screen/Tab/setting';
import Tracking from '../screen/Tab/tracking';
import TrasportList from '../screen/Tab/trasportList';
const Tabs = createBottomTabNavigator();
const Tab = () => {
    return (
        <Tabs.Navigator>
            <Tabs.Screen name="HomeScreen" component={HomeScreen} options={{ headerShown: false }} />
            <Tabs.Screen name="TrasportList" component={TrasportList} options={{ headerShown: false }} />
            <Tabs.Screen name="Tracking" component={Tracking} options={{ headerShown: false }} />
            <Tabs.Screen name="Setting" component={Setting} options={{ headerShown: false }} />
        </Tabs.Navigator>
    )
}

export default Tab