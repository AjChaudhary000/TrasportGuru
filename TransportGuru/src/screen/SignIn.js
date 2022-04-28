import { View, Text, Image, StyleSheet, KeyboardAvoidingView, TextInput, TouchableOpacity, StatusBar, TouchableWithoutFeedback, Keyboard, Platform } from 'react-native'
import LottieView from 'lottie-react-native';
import React from 'react'
import icons from '../contents/icons';
import { sendemail, setUserData } from '../Redux/sendEmailSlice';
import { connect } from 'react-redux'
import color from '../contents/color';
import image from '../contents/image';
import Toast from 'react-native-simple-toast';
import AnimatedLoader from "react-native-animated-loader";
import { GoogleSignin, statusCodes, GoogleSigninButton } from '@react-native-google-signin/google-signin';
const SignIn = (props) => {
    const Google = async () => {
        await GoogleSignin.configure({
            androidClientId: '459209492909-kiacksmffb1kuho98ke3seh5j0kk4he4.apps.googleusercontent.com',
            webClientId: '459209492909-qrafmo68rov0eh02edddjiba9ga850j2.apps.googleusercontent.com',
            offlineAccess: true
        });
    }
    React.useEffect(() => {
        if (Platform.OS === "android") Google()
    }, [])
    const [email, setEmail] = React.useState('');
    const [isEmailValid, setIsEmailValid] = React.useState(true);
    React.useEffect(() => {

        try {
            if (props.userdata?.status) {
                props.navigation.replace('Otp', { email: props.userdata.email })
                props.setUserData({})
            }
        } catch (e) {
            console.log(e)
        }
    }, [props])

    const onGoogleButtonPress = async () => {
        if (Platform.OS === "android") {
            try {
                await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
                const userInfo = await GoogleSignin.signIn();
                console.log("userInfo", userInfo)
            } catch (error) {
                if (error.code === statusCodes.SIGN_IN_CANCELLED) {
                    // user cancelled the login flow
                } else if (error.code === statusCodes.IN_PROGRESS) {
                    // operation (e.g. sign in) is in progress already
                } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
                    // play services not available or outdated
                } else {
                    // some other error happened
                }
                console.log("my error", error)
            }
        }


    }
    const sendEmail = async () => {
        if (isEmailValid && email) {
            props.sendemail(email);
            setEmail('')
        } else {
            Toast.show('Enter valid Email');
        }
    }
    const emailHandle = (val) => {
        const regex = /[^\s@]+@[^\s@]+\.[^\s@]+/;
        !regex.test(val) ? setIsEmailValid(false) : setIsEmailValid(true);
        setEmail(val);

    }

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.contentor(props)}
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={{ flex: 1 }}>
                    <StatusBar hidden />
                    <AnimatedLoader
                        visible={props.loading}
                        overlayColor="rgba(255,255,255,0.75)"
                        source={require("../assets/json/loder.json")}
                        animationStyle={{
                            width: 100,
                            height: 100
                        }}
                        speed={1}
                    >
                        <Text>Loading...</Text>
                    </AnimatedLoader>
                    <View style={styles.truckLogo}>
                        <Image source={image.Tg} style={{ width: 200, height: 100, tintColor: props.theme ? color.drakPrimaryColors : color.primaryColors, }} />
                        {/* <LottieView source={require('../assets/json/loading.json')} autoPlay loop /> */}
                    </View>
                    <View style={styles.titleComponets}>
                        <Text style={styles.title(props)}> Welcome To Transport Guru</Text>
                        <View>
                            <Text style={styles.text}>
                                Provide your email id,so we can be able  to send your confirmation code.
                            </Text>
                        </View>
                    </View>
                    <View style={styles.inputBox}>
                        <View style={{ width: "10%", paddingTop: 12 }}>
                            <Image source={icons.email} style={{ width: 35, height: 35, tintColor: props.theme ? color.drakPrimaryColors : color.primaryColors, }} />
                        </View>
                        <View style={{ width: "85%", marginHorizontal: 10 }}>

                            <TextInput style={styles.input(props)}
                                placeholder={"eg. transportguru@gmail.com"}
                                placeholderTextColor={'gray'}
                                onChangeText={(val) => emailHandle(val)}
                                keyboardType={'email-address'}
                                autoCapitalize={'none'} />
                            {!isEmailValid && <Text style={{ color: 'red', marginTop: 5 }}> * Enter valid Email  </Text>}

                        </View>
                    </View>

                    <View style={{ marginTop: 20, height: '10%' }}>
                        <TouchableOpacity style={styles.btn(props)} onPress={() => sendEmail()}>
                            <Text style={styles.btnText}>
                                Continue
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.google}>

                        <Text style={styles.googleText(props)}>
                            Or
                        </Text>


                        <TouchableOpacity onPress={() => onGoogleButtonPress()} style={{
                            flexDirection: 'row',
                            justifyContent: 'center',
                            borderWidth: 2,
                            borderColor: color.primaryColors,
                            padding: 5,
                            marginVertical: 10,
                            borderRadius: 5,
                            width: 230
                        }}>
                            <View style={{ width: '20%', alignItems: 'center' }}>
                                <Image source={icons.google} style={{ width: 35, height: 35 }} />
                            </View>
                            <View style={{ width: '80%', alignItems: 'center', justifyContent: 'center' }}>
                                <Text style={{ color: props.theme ? color.drakFontcolor : color.fontcolor }}>
                                    SignIn with google
                                </Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => props.navigation.replace("SignInWithPhone")} style={{
                            flexDirection: 'row',
                            justifyContent: 'center',
                            borderWidth: 2,
                            borderColor: color.primaryColors,
                            padding: 5,
                            borderRadius: 5,
                            width: 230
                        }}>
                            <View style={{ width: '20%', alignItems: 'center' }}>
                                <Image source={icons.phone} style={{
                                    width: 35, height: 35,
                                    tintColor: props.theme ? color.drakPrimaryColors : color.primaryColors
                                }} />
                            </View>
                            <View style={{ width: '80%', alignItems: 'center', justifyContent: 'center' }}>
                                <Text style={{ color: props.theme ? color.drakFontcolor : color.fontcolor }}>
                                    SignIn with phone no
                                </Text>
                            </View>
                        </TouchableOpacity>
                    </View>

                </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    )

}
const useDispatch = (dispatch) => {
    return {
        sendemail: (data) => dispatch(sendemail(data)),
        setUserData: (data) => dispatch(setUserData(data)),

    };
}
const useSelector = (state) => (

    {
        userdata: state.login.userdata,
        loading: state.login.loading,
        theme: state.token.theme
    }
)
export default connect(useSelector, useDispatch)(SignIn);
const styles = StyleSheet.create({
    contentor: (props) => [{
        flex: 1,
        paddingHorizontal: 20,
        backgroundColor: props.theme ? color.drakBackgroundColor : color.backgroundColor,

    }],
    truckLogo: {
        height: 150,
        width: "40%",
        justifyContent: 'center'

    },
    titleComponets: {
        marginHorizontal: 5,
        height: 150
    },
    title: (props) => [{
        fontSize: 25,
        fontWeight: 'bold',
        color: props.theme ? color.drakFontcolor : color.fontcolor
    }],
    text: {
        fontSize: 18,
        color: 'gray',
        margin: 10,
        fontWeight: 'bold',
    },
    inputBox: {
        marginVertical: 20,
        flexDirection: 'row',
        height: 50
    },
    input: (props) => [{
        borderWidth: 2,
        borderColor: props.theme ? color.drakPrimaryColors : color.primaryColors,
        padding: 10,
        fontSize: 18,
        borderRadius: 10,
        color: props.theme ? color.drakFontcolor : color.fontcolor
    }],
    btn: (props) => [{
        width: '90%',
        height: 50,
        backgroundColor: props.theme ? color.drakPrimaryColors : color.primaryColors,
        borderRadius: 15,
        justifyContent: "center",
        alignItems: 'center',
        alignSelf: 'center'
    }],
    btnText: {
        fontSize: 20,
        color: 'white',
        fontWeight: 'bold'
    },
    google: {
        alignItems: 'center',
        width: '60%',
        marginVertical: 20,
        alignSelf: 'center',
        height: 150
    },
    googleText: (props) => [{
        fontSize: 20,
        color: props.theme ? color.drakPrimaryColors : color.primaryColors,
        fontWeight: 'bold',
        marginBottom: 10
    }]
})