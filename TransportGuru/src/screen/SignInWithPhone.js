import {
    View,
    Text,
    Image,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    StatusBar,
} from 'react-native';
import React from 'react';
import icons from '../contents/icons';
import { sendSms, setUserData } from '../Redux/sendEmailSlice';
import { connect } from 'react-redux';
import color from '../contents/color';
import image from '../contents/image';
import Toast from 'react-native-simple-toast';
import AnimatedLoader from 'react-native-animated-loader';
import {
    GoogleSignin,
    statusCodes,
} from '@react-native-google-signin/google-signin';
import { CountryCode } from '../contents/CountryCode';
import { Dropdown } from 'react-native-element-dropdown';
import { verifyGoogle } from '../Redux/verifyOtpSlice';
import { getOnBording } from '../Redux/helper';
import { getOnBordingData } from '../Redux/tokenSlice';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import auth from '@react-native-firebase/auth';
const SignInWithPhone = props => {
    const Google = async () => {
        const onbording = await getOnBording();
        onbording === 'true'
            ? props.getOnBordingData(true)
            : props.getOnBordingData(false);
        await GoogleSignin.configure({
            webClientId:
                '261927963238-50up6aujv23o3c01hnn83ihq7rkt4t8k.apps.googleusercontent.com',
        });
    };
    React.useEffect(() => {
        Google();
    }, []);
    React.useEffect(() => {
        try {
            if (props.userdata?.status) {
                props.navigation.replace('Otp', { mobileno: props.userdata.mobileno });
                props.setUserData({});
            }
            if (props.otpdata?.status) {
                props.navigation.replace('Tab');
            }
        } catch (e) {
            console.log(e);
        }
    }, [props]);
    const [value, setValue] = React.useState('+91');
    const [phone, setPhone] = React.useState('');
    const onGoogleButtonPress = async () => {
        try {
            const { idToken } = await GoogleSignin.signIn();
            const googleCredential = auth.GoogleAuthProvider.credential(idToken);
            const userinfo = auth().signInWithCredential(googleCredential);
            userinfo
                .then(res => {
                    const googleData = {
                        username: res.user.displayName,
                        email: res.user.email,
                        image: res.user.photoURL,
                    };
                    props.verifyGoogle(googleData);
                })
                .catch(e => {
                    console.log(e);
                });
            await GoogleSignin.signOut();
        } catch (error) {
            console.log('my error', error);
        }
    };
    const sendEmail = async () => {
        if (phone !== '') {
            const phoneno = value + phone;
            props.sendSms(phoneno);
            setPhone('');
        } else {
            Toast.show('Enter valid Phone No');
        }
    };

    const renderItem = item => {
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
        <KeyboardAwareScrollView
            style={styles.contentor(props)}
            showsVerticalScrollIndicator={false}>
            <StatusBar hidden />
            <AnimatedLoader
                visible={props.loading}
                overlayColor="rgba(255,255,255,0.75)"
                source={require('../assets/json/loder.json')}
                animationStyle={{
                    width: 100,
                    height: 100,
                }}
                speed={1}>
                <Text>Loading...</Text>
            </AnimatedLoader>

            <View style={styles.truckLogo}>
                <Image
                    source={image.Tg}
                    style={{
                        width: 200,
                        height: 100,
                        tintColor: props.theme
                            ? color.drakPrimaryColors
                            : color.primaryColors,
                    }}
                />
                {/* <LottieView source={require('../assets/json/loading.json')} autoPlay loop /> */}
            </View>
            <View style={styles.titleComponets}>
                <Text style={styles.title(props)}> Welcome To Transport Guru</Text>
                <View>
                    <Text style={styles.text}>
                        Provide your phone no,so we can be able to send your confirmation
                        code.
                    </Text>
                </View>
            </View>
            <View style={styles.inputBox}>
                <View style={{ width: '100%' }}>
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
                <View
                    style={{
                        width: '20%',
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderBottomWidth: 2,
                        borderBottomColor: color.primaryColors,
                        borderRadius: 5,
                    }}>
                    <Text style={{ color: 'gray', fontSize: 20 }}>{value}</Text>
                </View>
                <View style={{ width: '75%' }}>
                    <TextInput
                        style={styles.input(props)}
                        placeholder={'eg. Phone No '}
                        placeholderTextColor={'gray'}
                        onChangeText={val => setPhone(val)}
                        keyboardType={'number-pad'}
                        maxLength={10}
                        autoCapitalize={'none'}
                    />
                </View>
            </View>

            <View>
                <TouchableOpacity style={styles.btn(props)} onPress={() => sendEmail()}>
                    <Text style={styles.btnText}>Continue</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.google}>
                <Text style={styles.googleText(props)}>Or</Text>

                <TouchableOpacity
                    onPress={() => onGoogleButtonPress()}
                    style={styles.googleBox}>
                    <View
                        style={{
                            width: '20%',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}>
                        <Image source={icons.google} style={{ width: 35, height: 35 }} />
                    </View>
                    <View
                        style={{
                            width: '80%',
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: '#4185F4',
                        }}>
                        <Text style={{ color: color.drakFontcolor, fontWeight: 'bold' }}>
                            SignIn with Google
                        </Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => props.navigation.replace('SignIn')}
                    style={styles.googleBox}>
                    <View
                        style={{
                            width: '20%',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}>
                        <Image
                            source={icons.gmail}
                            style={{
                                width: 35,
                                height: 35,
                            }}
                        />
                    </View>
                    <View
                        style={{
                            width: '80%',
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: color.primaryColors,
                        }}>
                        <Text style={{ color: color.drakFontcolor, fontWeight: 'bold' }}>
                            Sign In with Email
                        </Text>
                    </View>
                </TouchableOpacity>
            </View>
        </KeyboardAwareScrollView>
    );
};
const useDispatch = dispatch => {
    return {
        sendSms: data => dispatch(sendSms(data)),
        setUserData: data => dispatch(setUserData(data)),
        verifyGoogle: data => dispatch(verifyGoogle(data)),
        getOnBordingData: data => dispatch(getOnBordingData(data)),
    };
};
const useSelector = state => ({
    userdata: state.login.userdata,
    loading: state.login.loading,
    theme: state.token.theme,
    otpdata: state.otp.otpdata,
    error: state.otp.error,
    loading1: state.otp.loading,
});
export default connect(useSelector, useDispatch)(SignInWithPhone);
const styles = StyleSheet.create({
    contentor: props => [
        {
            flex: 1,
            paddingHorizontal: 20,
            backgroundColor: props.theme
                ? color.drakBackgroundColor
                : color.backgroundColor,
        },
    ],
    truckLogo: {
        height: 150,
        width: '40%',
        justifyContent: 'center',
    },
    titleComponets: {
        marginHorizontal: 5,
        height: 130,
    },
    title: props => [
        {
            fontSize: 25,
            fontWeight: 'bold',
            color: props.theme ? color.drakFontcolor : color.fontcolor,
        },
    ],
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
        justifyContent: 'space-between',
    },
    input: props => [
        {
            borderBottomWidth: 2,
            borderBottomColor: props.theme
                ? color.drakPrimaryColors
                : color.primaryColors,
            padding: 10,
            fontSize: 18,
            borderRadius: 5,
            height: 50,
            color: props.theme ? color.drakFontcolor : color.fontcolor,
        },
    ],
    btn: props => [
        {
            width: '100%',
            height: 50,
            backgroundColor: props.theme
                ? color.drakPrimaryColors
                : color.primaryColors,
            borderRadius: 5,
            justifyContent: 'center',
            alignItems: 'center',
            alignSelf: 'center',
            marginHorizontal: 25,
        },
    ],
    btnText: {
        fontSize: 20,
        color: 'white',
        fontWeight: 'bold',
    },
    google: {
        alignItems: 'center',

        marginVertical: 20,
        alignSelf: 'center',
        height: 150,
    },
    googleText: props => [
        {
            fontSize: 20,
            color: props.theme ? color.drakPrimaryColors : color.primaryColors,
            fontWeight: 'bold',
            marginBottom: 10,
        },
    ],
    dropdown: props => [
        {
            borderBottomWidth: 2,
            borderBottomColor: props.theme
                ? color.drakPrimaryColors
                : color.primaryColors,
            padding: 10,
            fontSize: 18,
            borderRadius: 5,
        },
    ],
    item: props => [
        {
            margin: 10,
            padding: 10,
            borderWidth: 2,
            borderColor: props.theme ? color.drakPrimaryColors : color.primaryColors,
            borderRadius: 5,
            backgroundColor: props.theme
                ? color.drakBackgroundColor
                : color.backgroundColor,
            flexDirection: 'row',
            alignItems: 'center',
        },
    ],
    textItem: props => [
        {
            flex: 1,
            fontSize: 16,
            color: props.theme ? color.drakFontcolor : color.fontcolor,
        },
    ],
    placeholderStyle: props => [
        {
            fontSize: 16,
            color: props.theme ? color.drakFontcolor : color.fontcolor,
        },
    ],
    selectedTextStyle: props => [
        {
            fontSize: 16,
            color: props.theme ? color.drakFontcolor : color.fontcolor,
        },
    ],
    inputSearchStyle: {
        height: 40,
        fontSize: 16,
    },
    iconStyle: {
        width: 20,
        height: 20,
    },
    googleBox: {
        flexDirection: 'row',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: color.primaryColors,

        marginVertical: 10,
        borderRadius: 5,

        height: 50,
    },
});
