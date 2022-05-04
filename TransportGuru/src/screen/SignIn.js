import { View, Text, Image, StyleSheet, TextInput, Dimensions, TouchableOpacity, StatusBar } from 'react-native'
import LottieView from 'lottie-react-native';
import React from 'react'
import icons from '../contents/icons';
import { sendemail, setUserData } from '../Redux/sendEmailSlice';
import { connect } from 'react-redux'
import color from '../contents/color';
import image from '../contents/image';
import Toast from 'react-native-simple-toast';
import AnimatedLoader from "react-native-animated-loader";
import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { verifyGoogle } from '../Redux/verifyOtpSlice';
import { getOnBording } from '../Redux/helper';
import { getOnBordingData } from '../Redux/tokenSlice';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
const SignIn = (props) => {
    const Google = async () => {
        const onbording = await getOnBording();
        onbording === "true" ? props.getOnBordingData(true) : props.getOnBordingData(false)
        await GoogleSignin.configure({
            webClientId: "261927963238-50up6aujv23o3c01hnn83ihq7rkt4t8k.apps.googleusercontent.com"
        });
    }
    React.useEffect(() => {
        Google()
    }, [])
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
    const [email, setEmail] = React.useState('');
    const [isEmailValid, setIsEmailValid] = React.useState(true);
    const onGoogleButtonPress = async () => {

        try {

            const { idToken } = await GoogleSignin.signIn();
            const googleCredential = auth.GoogleAuthProvider.credential(idToken);
            const userinfo = auth().signInWithCredential(googleCredential);
            userinfo.then((res) => {
                const googleData = {
                    username: res.user.displayName,
                    email: res.user.email,
                    image: res.user.photoURL
                }
                props.verifyGoogle(googleData)

            }).catch((e) => { console.log(e) })
            await GoogleSignin.signOut();
        } catch (error) {

            console.log("my error", error)
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

        <KeyboardAwareScrollView style={styles.contentor(props)} showsVerticalScrollIndicator={false}>
            <StatusBar hidden />
            <AnimatedLoader
                visible={props.loading || props.loading1}
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
                <View style={{ width: "85%" }}>

                    <TextInput style={styles.input(props)}
                        placeholder={"eg. transportguru@gmail.com"}
                        placeholderTextColor={'gray'}
                        onChangeText={(val) => emailHandle(val)}
                        keyboardType={'email-address'}
                        autoCapitalize={'none'} />
                    {!isEmailValid && <Text style={{ color: 'red', marginTop: 5 }}> * Enter valid Email  </Text>}

                </View>
            </View>
            <TouchableOpacity style={styles.btn(props)} onPress={() => sendEmail()}>
                <Text style={styles.btnText}>
                    Continue
                </Text>
            </TouchableOpacity>

            <View style={styles.google}>

                <Text style={styles.googleText(props)}>
                    Or
                </Text>


                <TouchableOpacity onPress={() => onGoogleButtonPress()} style={styles.googleBox}>
                    <View style={{ width: '20%', alignItems: 'center', justifyContent: 'center' }}>
                        <Image source={icons.google} style={{ width: 35, height: 35 }} />
                    </View>
                    <View style={{ width: '80%', alignItems: 'center', justifyContent: 'center', backgroundColor: '#4185F4' }}>
                        <Text style={{ color: color.drakFontcolor, fontWeight: "bold" }}>
                            SignIn with Google
                        </Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => props.navigation.replace("SignInWithPhone")} style={styles.googleBox}>
                    <View style={{ width: '20%', alignItems: 'center', justifyContent: 'center' }}>
                        <Image source={icons.phone} style={{
                            width: 35, height: 35,
                            tintColor: props.theme ? color.drakPrimaryColors : color.primaryColors
                        }} />
                    </View>
                    <View style={{ width: '80%', alignItems: 'center', justifyContent: 'center', backgroundColor: color.primaryColors }}>
                        <Text style={{ color: color.drakFontcolor, fontWeight: "bold" }}>
                            Sign In with Mobile No
                        </Text>
                    </View>
                </TouchableOpacity>
            </View>

        </KeyboardAwareScrollView>
    )

}
const useDispatch = (dispatch) => {
    return {
        sendemail: (data) => dispatch(sendemail(data)),
        setUserData: (data) => dispatch(setUserData(data)),
        verifyGoogle: (data) => dispatch(verifyGoogle(data)),
        getOnBordingData: (data) => dispatch(getOnBordingData(data)),
    };
}
const useSelector = (state) => (

    {
        userdata: state.login.userdata,
        loading: state.login.loading,
        theme: state.token.theme,
        otpdata: state.otp.otpdata,
        error: state.otp.error,
        loading1: state.otp.loading,
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
        height: 130
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
        marginVertical: 10,
        flexDirection: 'row',
        height: 50,
        justifyContent: 'space-between'
    },
    input: (props) => [{
        borderBottomWidth: 2,
        borderBottomColor: props.theme ? color.drakPrimaryColors : color.primaryColors,
        padding: 10,
        fontSize: 18,
        borderRadius: 5,
        height: 50,
        color: props.theme ? color.drakFontcolor : color.fontcolor
    }],
    btn: (props) => [{
        width: '100%',
        height: 50,
        backgroundColor: props.theme ? color.drakPrimaryColors : color.primaryColors,
        borderRadius: 5,
        justifyContent: "center",
        alignItems: 'center',
        alignSelf: 'flex-end',
        marginTop: 50
    }],
    btnText: {
        fontSize: 20,
        color: 'white',
        fontWeight: 'bold'
    },
    google: {
        alignItems: 'center',
        marginVertical: 20,
        alignSelf: 'center',
        height: 150
    },
    googleText: (props) => [{
        fontSize: 20,
        color: props.theme ? color.drakPrimaryColors : color.primaryColors,
        fontWeight: 'bold',
        marginBottom: 10
    }],
    googleBox: {

        flexDirection: 'row',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: color.primaryColors,

        marginVertical: 10,
        borderRadius: 5,
        height: 50

    },
    box: (props) => [{
        width: Dimensions.get('screen').width - 20,
        minHeight: 350,
        backgroundColor: props.theme ? color.drakBackgroundColor : color.backgroundColor,
        alignSelf: 'center',
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: props.theme ? color.drakFontcolor : color.fontcolor,
        shadowOffset: {
            width: 0,
            height: 4
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        marginHorizontal: 20, paddingHorizontal: 10
    }],
})