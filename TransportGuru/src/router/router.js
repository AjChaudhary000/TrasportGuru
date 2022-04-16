import { View, Text, StatusBar, Image } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Onboardring from '../screen/onBordring/onBordring';
import SignIn from '../screen/SignIn';
import Otp from '../screen/otp';
import UserProfile from '../screen/userProfile';
import { connect } from 'react-redux';
import { getJWTToken, getTheme } from '../Redux/helper';
import Tab from './tab';
import Home from '../screen/Home';
import LottieView from 'lottie-react-native';
import color from '../contents/color';
import EditAccount from '../screen/Tab/settingTab/editAccount';
import { getThemeMode, getToken, setToken } from '../Redux/tokenSlice';
import TrasportGuruAccount from '../screen/Tab/settingTab/trasportGuruAccount';
import image from '../contents/image';
import AdminTab from './adminTab';
import AddTruck from '../screen/Admin/addTruck';
import AddDriver from '../screen/Admin/addDriver';
import TruckList from '../screen/Admin/truckList';
import DriverList from '../screen/Admin/driverList';
import AddTrasportDetails from '../screen/Admin/addTrasportDetails';
import AddRoute from '../screen/Admin/addRoute';
import Routelist from '../screen/Admin/routelist';
import TransportListDetails from '../screen/Admin/transportList';
import SearchTransportList from '../screen/Tab/searchTransportList';
import AdminProfile from '../screen/Tab/adminProfile';
import AdminEditAccount from '../screen/Admin/AdminEditAccount';
import ChatDetails from '../screen/Tab/chatDetails';
import Booking from '../screen/Tab/booking';
import Confirmation from '../screen/Tab/confirmation';
const Stack = createNativeStackNavigator();
const Router = (props) => {
    const [token, setTokenData] = React.useState('')
    const [isloading, setloadingData] = React.useState(true)
    const gettoken = async () => {
        try {
            const mytoken = await getJWTToken();
            const theme = await getTheme()
            console.log("r43t34t34", mytoken)
            setTokenData(mytoken)
            props.setToken(mytoken)
            theme === "true" ? props.getThemeMode(true) : props.getThemeMode(false)

        } catch (e) {

        }
    }
    console.log("mytoken Router 9090909090", props.token.token);
    React.useEffect(() => {
        gettoken()
        setTimeout(() => {
            setloadingData(false)
        }, 2000)

    }, [])
    if (isloading) {
        return (
            <View style={{
                flex: 1, justifyContent: 'center', alignItems: 'center',
                backgroundColor: props.theme ? color.drakPrimaryColors : color.primaryColors,
            }}>
                <StatusBar hidden />
                <View>
                    <Image source={image.Tg} style={{ width: 300, height: 200 }} />
                </View>
            </View>
        );
    }
    return (
        <NavigationContainer>
            <Stack.Navigator>
                {/* User Login /SignUp  Start */}
                {!props.token.token && <Stack.Screen name='SignIn' component={SignIn} options={{ headerShown: false }} />}
                {/* User Login /SignUp  End  */}

                {/* userSide Start */}

                <Stack.Screen name='Tab' component={Tab} options={{ headerShown: false }} />
                <Stack.Screen name='Home' component={Home} options={{ headerShown: false }} />
                <Stack.Screen name='Onboardring' component={Onboardring} options={{ headerShown: false }} />
                <Stack.Screen name='UserProfile' component={UserProfile} options={{ headerShown: false }} />
                <Stack.Screen name='Otp' component={Otp} options={{ headerShown: false }} />
                <Stack.Screen name='EditAccount' component={EditAccount} options={{ headerShown: false }} />
                <Stack.Screen name='TrasportGuruAccount' component={TrasportGuruAccount} options={{ headerShown: false }} />
                <Stack.Screen name='SearchTransportList' component={SearchTransportList} options={{ headerShown: false }} />
                <Stack.Screen name='AdminProfile' component={AdminProfile} options={{ headerShown: false }} />
                <Stack.Screen name='Booking' component={Booking} options={{ headerShown: false }} />
                <Stack.Screen name='Confirmation' component={Confirmation} options={{ headerShown: false }} />
                {/* userSide End */}

                {/* AdminSide Start */}
                <Stack.Screen name='AdminTab' component={AdminTab} options={{ headerShown: false }} />
                <Stack.Screen name='AddTruck' component={AddTruck} options={{ headerShown: false }} />
                <Stack.Screen name='AddDriver' component={AddDriver} options={{ headerShown: false }} />
                <Stack.Screen name='AddRoute' component={AddRoute} options={{ headerShown: false }} />
                <Stack.Screen name='AddTrasportDetails' component={AddTrasportDetails} options={{ headerShown: false }} />
                <Stack.Screen name='TruckList' component={TruckList} options={{ headerShown: false }} />
                <Stack.Screen name='DriverList' component={DriverList} options={{ headerShown: false }} />
                <Stack.Screen name='Routelist' component={Routelist} options={{ headerShown: false }} />
                <Stack.Screen name='TransportListDetails' component={TransportListDetails} options={{ headerShown: false }} />
                <Stack.Screen name='AdminEditAccount' component={AdminEditAccount} options={{ headerShown: false }} />
                <Stack.Screen name='ChatDetails' component={ChatDetails} options={{ headerShown: false }} />
                {/* AdminSide End */}
            </Stack.Navigator>
        </NavigationContainer>
    )
}
const useSelector = (state) => {
    return {
        token: state.token,
        theme: state.token.theme
    }
}
const useDispatch = (dispatch) => {
    return {

        setToken: (data) => dispatch(setToken(data)),
        getThemeMode: (data) => dispatch(getThemeMode(data)),

    }
}
export default connect(useSelector, useDispatch)(Router)