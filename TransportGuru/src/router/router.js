import { View, Text, StatusBar, Image } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Onboardring from '../screen/onBordring/onBordring';
import SignIn from '../screen/SignIn';
import Otp from '../screen/otp';
import UserProfile from '../screen/userProfile';
import { connect } from 'react-redux';
import { getJWTToken, getOnBording, getTheme } from '../Redux/helper';
import Tab from './tab';
import LottieView from 'lottie-react-native';
import color from '../contents/color';
import EditAccount from '../screen/Tab/settingTab/editAccount';
import { getNetwork, getOnBordingData, getThemeMode, getToken } from '../Redux/tokenSlice';
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
import NetInfo from "@react-native-community/netinfo";
import { getUserDetails } from '../Redux/UserDetails';
import TrackingDetails from '../screen/Tab/trackingDetails';
import AdminTrackingDetails from '../screen/Admin/adminTrackingDetails';
import PrivacyPolicy from '../screen/Tab/settingTab/privacyPolicy';
import Support from '../screen/Tab/settingTab/support';
import Termsofservice from '../screen/Tab/settingTab/termsofservice';
const Stack = createNativeStackNavigator();
import SplashScreen from 'react-native-splash-screen'
const Router = (props) => {
  
    const gettoken = async () => {
        try {
            const mytoken = await getJWTToken();
            const theme = await getTheme()
            const onbording = await getOnBording();
            console.log(mytoken)
            props.getToken(mytoken)
            props.getUserDetails(mytoken)
            theme === "true" ? props.getThemeMode(true) : props.getThemeMode(false)
            onbording === "true" ? props.getOnBordingData(true) : props.getOnBordingData(false)
            NetInfo.fetch().then(state => {
                props.getNetwork(state.isConnected)
            });
        } catch (e) {

        }
    }
    React.useEffect(() => {
        gettoken()
        setTimeout(() => {
            SplashScreen.hide();
          
        }, 2000)
    }, [])
   
    if (!props.internet) {
        return (
            <View style={{
                flex: 1,
                backgroundColor: props.theme ? color.drakPrimaryColors : color.primaryColors,
            }}>
                <StatusBar hidden />
                <View style={{ height: "100%" }}>
                    <LottieView source={require('../assets/json/internet.json')} autoPlay loop />
                </View>
                {/* <Text style={{ textAlign: 'center', bottom: "45%", fontSize: 20, letterSpacing: 2, color: '#1C22B8', fontWeight: 'bold' }}> No internet Connection</Text> */}
            </View>
        );
    }
    return (
        <NavigationContainer>
            <Stack.Navigator>
                {!props.onbording && <Stack.Screen name='Onboardring' component={Onboardring} options={{ headerShown: false }} />}
                {/* User Login /SignUp  Start */}
                {!props.token && <Stack.Screen name='SignIn' component={SignIn} options={{ headerShown: false }} />}
                {/* User Login /SignUp  End  */}

                {/* userSide Start */}

                <Stack.Screen name='Tab' component={Tab} options={{ headerShown: false }} />
                <Stack.Screen name='UserProfile' component={UserProfile} options={{ headerShown: false }} />
                <Stack.Screen name='Otp' component={Otp} options={{ headerShown: false }} />
                <Stack.Screen name='EditAccount' component={EditAccount} options={{ headerShown: false }} />
                <Stack.Screen name='TrasportGuruAccount' component={TrasportGuruAccount} options={{ headerShown: false }} />
                <Stack.Screen name='SearchTransportList' component={SearchTransportList} options={{ headerShown: false }} />
                <Stack.Screen name='AdminProfile' component={AdminProfile} options={{ headerShown: false }} />
                <Stack.Screen name='Booking' component={Booking} options={{ headerShown: false }} />
                <Stack.Screen name='Confirmation' component={Confirmation} options={{ headerShown: false }} />
                <Stack.Screen name='TrackingDetails' component={TrackingDetails} options={{ headerShown: false }} />
                <Stack.Screen name='PrivacyPolicy' component={PrivacyPolicy} options={{ headerShown: false }} />
                <Stack.Screen name='Support' component={Support} options={{ headerShown: false }} />
                <Stack.Screen name='Termsofservice' component={Termsofservice} options={{ headerShown: false }} />
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
                <Stack.Screen name='AdminTrackingDetails' component={AdminTrackingDetails} options={{ headerShown: false }} />
                {/* AdminSide End */}
            </Stack.Navigator>
        </NavigationContainer>
    )
}
const useSelector = (state) => {
    return {
        token: state.token.token,
        internet: state.token.internet,
        theme: state.token.theme,
        onbording: state.token.onbording,
    }
}
const useDispatch = (dispatch) => {
    return {

        getToken: (data) => dispatch(getToken(data)),
        getThemeMode: (data) => dispatch(getThemeMode(data)),
        getUserDetails: (data) => dispatch(getUserDetails(data)),
        getNetwork: (data) => dispatch(getNetwork(data)),
        getOnBordingData: (data) => dispatch(getOnBordingData(data)),

    }
}
export default connect(useSelector, useDispatch)(Router)