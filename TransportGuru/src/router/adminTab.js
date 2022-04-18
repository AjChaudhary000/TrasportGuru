import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';


import icons from '../contents/icons';
import color from '../contents/color';

import AdminHome from '../screen/Admin/adminHome';
import AddTransport from '../screen/Admin/addTransport';
import { connect } from 'react-redux';
import AdminSetting from '../screen/Admin/adminSetting';
import AdminMessage from '../screen/Admin/adminMessage';
import AdminTracking from '../screen/Admin/adminTracking';

const Tabs = createBottomTabNavigator();

const AdminTab = (props) => {
    React.useEffect(()=>{
        
    },[props])
    const CustomButton = ({ children, onPress }) => (
        <TouchableOpacity style={{ top: -25, justifyContent: 'center', alignItems: 'center' }} onPress={onPress}>
            <View style={{ width: 70, height: 70, borderRadius: 35, backgroundColor: color.adminprimaryColors , borderColor: props.theme ? color.drakBackgroundColor:color.backgroundColor , borderWidth: 5 }}>{children}</View>
        </TouchableOpacity>
    );
    return (
        <Tabs.Navigator screenOptions={{ tabBarHideOnKeyboard: true, tabBarStyle: { borderTopWidth: 0, position: 'absolute', bottom: 0,
         backgroundColor:props.theme ? color.drakBackgroundColor: color.backgroundColor }, tabBarShowLabel: false }}>
            <Tabs.Screen name="AdminHome" component={AdminHome} options={{
                headerShown: false, tabBarIcon: ({ focused }) => (
                    <Image source={icons.home} style={{ width: 30, height: 30, tintColor: focused ? color.adminprimaryColors : 'gray' }} />
                )
            }} />

            <Tabs.Screen name="AdminTracking" component={AdminTracking} options={{
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
            <Tabs.Screen name="AdminMessage" component={AdminMessage} options={{
                headerShown: false, tabBarIcon: ({ focused }) => (
                    <Image source={icons.message} style={{ width: 30, height: 30, tintColor: focused ? color.adminprimaryColors : 'gray' }} />
                )
            }} />
            <Tabs.Screen name="AdminSetting" component={AdminSetting} options={{
                headerShown: false, tabBarIcon: ({ focused }) => (
                    <Image source={icons.setting} style={{ width: 30, height: 30, tintColor: focused ? color.adminprimaryColors : 'gray' }} />
                )
            }} />

        </Tabs.Navigator>
    )
}
const useDispatch = (dispatch) => {
    return {
       
    };
}
const useSelector = (state) => (

    {
        theme:state.token.theme
    }
)
export default connect(useSelector, useDispatch)(AdminTab);
