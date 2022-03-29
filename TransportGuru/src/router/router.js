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
const Stack = createNativeStackNavigator();
const Router = (props) => {
    const [token, setToken] = React.useState('')
    React.useEffect(() => {
        setToken(props.token)
    }, [props])
    return (
        <NavigationContainer>
            <Stack.Navigator>
                {!token &&
                    <Stack.Screen name='SignIn' component={SignIn} options={{ headerShown: false }} />}
                <Stack.Screen name='UserProfile' component={UserProfile} options={{ headerShown: false }} />
                <Stack.Screen name='Onboardring' component={Onboardring} options={{ headerShown: false }} />
                <Stack.Screen name='Otp' component={Otp} options={{ headerShown: false }} />

            </Stack.Navigator>
        </NavigationContainer>
    )
}
const useSelector = (state) => {
    return {
        token: state.token?.token?._W
    }
}
export default connect(useSelector)(Router)