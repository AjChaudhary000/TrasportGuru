import { View, Text, StatusBar, Image } from 'react-native'
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
import { getToken, setToken } from '../Redux/tokenSlice';
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

const Stack = createNativeStackNavigator();
const Router = (props) => {
    const [token, setTokenData] = React.useState('')
    const [isloading, setloadingData] = React.useState(true)
    const gettoken = async () => {
        try {
            const mytoken = await getJWTToken();

            console.log("r43t34t34", mytoken)
            setTokenData(mytoken)
            props.setToken(mytoken)
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
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: color.primaryColors }}>
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
                {/* AdminSide End */}
            </Stack.Navigator>
        </NavigationContainer>
    )
}
const useSelector = (state) => {
    return {
        token: state.token
    }
}
const useDispatch = (dispatch) => {
    return {

        setToken: (data) => dispatch(setToken(data))
    }
}
export default connect(useSelector, useDispatch)(Router)