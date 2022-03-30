import { View, Text } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Onboardring from '../screen/onBordring/onBordring';
import SignIn from '../screen/SignIn';
import Otp from '../screen/otp';
import UserProfile from '../screen/userProfile';
import { connect } from 'react-redux';
import { getJWTToken } from '../Redux/helper';
import HomeScreen from '../screen/Tab/homeScreen';
import Tab from './tab';
import Home from '../screen/Home';
const Stack = createNativeStackNavigator();
const Router = (props) => {
    const [token, setToken] = React.useState('')
    const gettoken = async () => {
        try {
            const mytoken = await getJWTToken();
            setToken(mytoken)
        } catch (e) {

        }
    }
    React.useEffect(() => {
        gettoken()
    }, [])
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name='Tab' component={Tab} options={{ headerShown: false }} />
                {!token && <Stack.Screen name='SignIn' component={SignIn} options={{ headerShown: false }} />}
                <Stack.Screen name='Home' component={Home} options={{ headerShown: false }} />
                <Stack.Screen name='UserProfile' component={UserProfile} options={{ headerShown: false }} />
                <Stack.Screen name='Onboardring' component={Onboardring} options={{ headerShown: false }} />
                <Stack.Screen name='Otp' component={Otp} options={{ headerShown: false }} />

            </Stack.Navigator>
        </NavigationContainer>
    )
}
const useSelector = (state) => {
    return {
        token: state.token.token
    }
}
export default connect(useSelector)(Router)