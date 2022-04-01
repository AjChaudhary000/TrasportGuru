import { View, Text, StatusBar } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Onboardring from '../screen/onBordring/onBordring';
import SignIn from '../screen/SignIn';
import Otp from '../screen/otp';
import UserProfile from '../screen/userProfile';
import { connect } from 'react-redux';
import { getJWTToken } from '../Redux/helper';
import Tab from './tab';
import Home from '../screen/Home';
import LottieView from 'lottie-react-native';
import color from '../contents/color';
import EditAccount from '../screen/Tab/settingTab/editAccount';
import { getToken } from '../Redux/tokenSlice';
import TrasportGuruAccount from '../screen/Tab/settingTab/trasportGuruAccount';

const Stack = createNativeStackNavigator();
const Router = (props) => {
    const [token, setToken] = React.useState('')
    const [isloading, setloadingData] = React.useState(true)
    const gettoken = async () => {
        try {
            const mytoken = await getJWTToken();
            setToken(mytoken)
        } catch (e) {

        }
    }
    console.log("mytoken Router ", props.token);
    React.useEffect(() => {
        gettoken()
        setTimeout(() => {
            setloadingData(false)
        }, 2000)

    }, [])
    if (isloading) {
        return (
            <View style={{ flex: 1 }}>
                <StatusBar hidden />
                <View style={{ height: "100%" }}>
                    <LottieView source={require('../assets/json/loading.json')} autoPlay loop />
                </View>
                <Text style={{ textAlign: 'center', bottom: "45%", fontSize: 20, letterSpacing: 2, color: color.primaryColors, fontWeight: 'bold' }}>Trasport guru</Text>
            </View>
        );
    }
    return (
        <NavigationContainer>
            <Stack.Navigator>
                {!token && <Stack.Screen name='SignIn' component={SignIn} options={{ headerShown: false }} />}
                {/* userSide */}
                <Stack.Screen name='Tab' component={Tab} options={{ headerShown: false }} />
                <Stack.Screen name='Home' component={Home} options={{ headerShown: false }} />
                <Stack.Screen name='UserProfile' component={UserProfile} options={{ headerShown: false }} />
                <Stack.Screen name='Onboardring' component={Onboardring} options={{ headerShown: false }} />
                <Stack.Screen name='Otp' component={Otp} options={{ headerShown: false }} />
                <Stack.Screen name='EditAccount' component={EditAccount} options={{ headerShown: false }} />
                <Stack.Screen name='TrasportGuruAccount' component={TrasportGuruAccount} options={{ headerShown: false }} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}
const useSelector = (state) => {
    return {
        token: state.token?.token
    }
}

export default connect(useSelector)(Router)