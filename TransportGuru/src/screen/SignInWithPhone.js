import {
    View, Text, Image, StyleSheet, KeyboardAvoidingView, TextInput, TouchableOpacity, StatusBar,
    TouchableWithoutFeedback, Keyboard, Platform
} from 'react-native'
import React from 'react'
import icons from '../contents/icons';
import { sendSms, setUserData } from '../Redux/sendEmailSlice';
import { connect } from 'react-redux'
import color from '../contents/color';
import image from '../contents/image';
import Toast from 'react-native-simple-toast';
import AnimatedLoader from "react-native-animated-loader";
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import { CountryCode } from '../contents/CountryCode'
import { Dropdown } from 'react-native-element-dropdown';
import { ScrollView } from 'react-native-gesture-handler';
const SignInWithPhone = (props) => {
    const Google = async () => {
        await GoogleSignin.configure({
            webClientId: '459209492909-qrafmo68rov0eh02edddjiba9ga850j2.apps.googleusercontent.com',
            offlineAccess: true
        });
    }
    React.useEffect(() => {
        if (Platform.OS === "android") Google()
    }, [])
    const [value, setValue] = React.useState("+91");
    const [phone, setPhone] = React.useState('');

    React.useEffect(() => {

        try {
            if (props.userdata?.status) {
                props.navigation.replace('Otp', { mobileno: props.userdata.mobileno })
                props.setUserData({})
            }
        } catch (e) {
            console.log(e)
        }
    }, [props])

    const onGoogleButtonPress = async () => {
        if (Platform.OS === "android") {
            try {
                await GoogleSignin.hasPlayServices();
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
                console.log("my error", error.toString())
            }
        }


    }
    const sendEmail = async () => {
        if (phone !== "") {
            const phoneno = value + phone
            props.sendSms(phoneno);
            setPhone('')
        } else {
            Toast.show('Enter valid Phone No');
        }
    }

    const renderItem = (item) => {

        return (
            <View style={styles.item(props)}>
                <View>
                    <Text style={styles.textItem(props)}>{item.name.en}</Text>
                </View>
                <View>
                    <Text style={styles.textItem(props)}>{item.dial_code}</Text>
                </View>
                <View>
                    <Text style={styles.textItem(props)}>{item.flag}</Text>
                </View>



            </View>
        );
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.contentor(props)}
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <ScrollView showsVerticalScrollIndicator={false}>
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
                                    Provide your phone no,so we can be able  to send your confirmation code.
                                </Text>
                            </View>
                        </View>
                        <View style={styles.inputBox}>
                            <View style={{ width: "92%", marginHorizontal: 20 }}>
                                <Dropdown
                                    style={styles.dropdown(props)}
                                    placeholderStyle={styles.placeholderStyle(props)}
                                    selectedTextStyle={styles.selectedTextStyle(props)}
                                    inputSearchStyle={styles.inputSearchStyle}
                                    iconStyle={styles.iconStyle}
                                    data={CountryCode}
                                    search
                                    maxHeight={300}
                                    labelField="name.en"
                                    valueField="dial_code"
                                    placeholder="Select Code"
                                    searchPlaceholder="Search..."

                                    value={value}
                                    onChange={item => {
                                        setValue(item.dial_code);
                                    }}
                                    renderItem={renderItem}
                                />
                            </View>
                        </View>
                        <View style={styles.inputBox}>
                            <View style={{
                                width: "20%", justifyContent: 'center', alignItems: 'center', borderWidth: 2
                                , borderColor: color.primaryColors,
                                borderRadius: 10
                            }}>
                                <Text style={{ color: 'gray', fontSize: 20 }}>{value}</Text>
                            </View>
                            <View style={{ width: "75%", marginHorizontal: 10 }}>

                                <TextInput style={styles.input(props)}
                                    placeholder={"eg. Phone No "}
                                    placeholderTextColor={'gray'}
                                    onChangeText={(val) => setPhone(val)}
                                    keyboardType={'number-pad'}
                                    maxLength={10}
                                    autoCapitalize={'none'} />
                            </View>
                        </View>

                        <View>
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
                            <TouchableOpacity onPress={() => props.navigation.replace("SignIn")} style={{
                                flexDirection: 'row',
                                justifyContent: 'center',
                                borderWidth: 2,
                                borderColor: color.primaryColors,
                                padding: 5,
                                borderRadius: 5,
                                width: 230
                            }}>
                                <View style={{ width: '20%', alignItems: 'center' }}>
                                    <Image source={icons.gmail} style={{
                                        width: 35, height: 35
                                    }} />
                                </View>
                                <View style={{ width: '80%', alignItems: 'center', justifyContent: 'center' }}>
                                    <Text style={{ color: props.theme ? color.drakFontcolor : color.fontcolor }}>
                                        signIn with email
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        </View>

                    </View>
                </ScrollView>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView >
    )

}
const useDispatch = (dispatch) => {
    return {
        sendSms: (data) => dispatch(sendSms(data)),
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
export default connect(useSelector, useDispatch)(SignInWithPhone);
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
        marginVertical: 10,
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
        width: '100%',
        height: 50,
        backgroundColor: props.theme ? color.drakPrimaryColors : color.primaryColors,
        borderRadius: 15,
        justifyContent: "center",
        alignItems: 'center',
        alignSelf: 'center',
        marginHorizontal: 25
    }],
    btnText: {
        fontSize: 20,
        color: 'white',
        fontWeight: 'bold'
    },
    google: {
        alignItems: 'center',
        width: '60%',
        alignSelf: 'center',
        marginVertical: 20
    },
    googleText: (props) => [{
        fontSize: 20,
        color: props.theme ? color.drakPrimaryColors : color.primaryColors,
        fontWeight: 'bold',
        marginBottom: 10
    }],
    dropdown: (props) => [{
        borderWidth: 2,
        borderColor: props.theme ? color.drakPrimaryColors : color.primaryColors,
        padding: 10,
        fontSize: 18,
        borderRadius: 10,

    }],
    item: (props) => [{
        margin: 10,
        padding: 10,
        borderWidth: 2,
        borderColor: props.theme ? color.drakPrimaryColors : color.primaryColors,
        borderRadius: 10,
        backgroundColor: props.theme ? color.drakBackgroundColor : color.backgroundColor,
        flexDirection: 'row',
        alignItems: 'center',
    }],
    textItem: (props) => [{
        flex: 1,
        fontSize: 16,
        color: props.theme ? color.drakFontcolor : color.fontcolor,
    }],
    placeholderStyle: (props) => [{
        fontSize: 16,
        color: props.theme ? color.drakFontcolor : color.fontcolor,
    }],
    selectedTextStyle: (props) => [{
        fontSize: 16,
        color: props.theme ? color.drakFontcolor : color.fontcolor,
    }],
    inputSearchStyle: {
        height: 40,
        fontSize: 16,
    }, iconStyle: {
        width: 20,
        height: 20,
    }
})