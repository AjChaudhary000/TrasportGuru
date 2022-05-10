import {
    View,
    Text,
    Image,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    StatusBar,
    Animated,
} from 'react-native';
import React from 'react';
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer';
import icons from '../contents/icons';
import { connect } from 'react-redux';
import { setotpData, verifyOtp, verifySms } from '../Redux/verifyOtpSlice';
import { sendemail, sendSms } from '../Redux/sendEmailSlice';
import color from '../contents/color';
import image from '../contents/image';
import Toast from 'react-native-simple-toast';
import AnimatedLoader from 'react-native-animated-loader';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
const Otp = props => {
    const [isTimerView, setIsTmerView] = React.useState(true);
    
    const [otp, setOtp] = React.useState();
    React.useEffect(() => {
        if (props?.otpdata.account === '0' && props?.otpdata.status) {
            props.navigation.replace('UserProfile');
            props.setotpData({});
            Toast.show('User SignUp successful');
        }
        if (props?.otpdata.account === '1' && props?.otpdata.status) {
            props.navigation.replace('Tab');
            props.setotpData({});
            Toast.show('User SignIn successful');
        }
        if (props?.error) {
            Toast.show(props.error);
        }
    }, [props]);
    const sendOTP = async () => {
        props.route.params?.email
            ? props.verifyOtp({ email: props.route.params.email, otp: otp })
            : props.verifySms({ mobileno: props.route.params.mobileno, otp: otp });
        setOtp('');
        //  props.navigation.navigate('UserProfile')
    };
    const resendOtp = () => {
        props.route.params?.email
            ? props.sendemail(props.route.params?.email)
            : props.sendSms(props.route.params?.mobileno);
        setIsTmerView(true);
    };

    return (
        <KeyboardAwareScrollView style={styles.contentor(props)}>
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
            <StatusBar hidden />
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
                <Text style={styles.title(props)}> Verification</Text>
                <View>
                    {props.route.params?.email ? (
                        <Text style={styles.text}>
                            We have sent you an Gmail with a code to the number that you
                            provided.
                        </Text>
                    ) : (
                        <Text style={styles.text}>
                            We have sent you an SMS with a code to the number that you
                            provided.
                        </Text>
                    )}
                </View>
            </View>
            <View style={styles.emailbox(props)}>
                <View style={{ width: ' 70%', alignItems: 'center' }}>
                    <Text
                        style={{
                            fontSize: 20,
                            fontWeight: 'bold',
                            color: props.theme ? color.drakFontcolor : color.fontcolor,
                        }}>
                        {props.route.params?.email
                            ? props.route.params?.email
                            : props.route.params?.mobileno}
                    </Text>
                </View>
                <TouchableOpacity
                    style={{ width: '20%', alignItems: 'center' }}
                    onPress={() => {
                        props.navigation.replace(
                            props.route.params?.email ? 'SignIn' : 'SignInWithPhone',
                        );
                    }}>
                    <Image
                        source={icons.edit}
                        style={{
                            width: 20,
                            height: 20,
                            tintColor: props.theme
                                ? color.drakPrimaryColors
                                : color.primaryColors,
                        }}
                    />
                </TouchableOpacity>
            </View>
            <View style={styles.inputBox}>
                <TextInput
                    style={styles.input(props)}
                    placeholder={'eg. 0000'}
                    placeholderTextColor={'gray'}
                    onChangeText={val => setOtp(val)}
                    autoCapitalize={'none'}
                    keyboardType={'number-pad'}
                    maxLength={4}
                />
            </View>

            {isTimerView ? (
                <View style={{ alignSelf: 'center', height: '10%', bottom: 50 }}>
                    <CountdownCircleTimer
                        isPlaying={true}
                        duration={60}
                        strokeWidth={0}
                        size={150}
                        colors={[
                            ['#004777', 0.8],
                            ['#004777', 0.5],
                            ['#004777', 0.4],
                        ]}
                        onComplete={() => {
                            setIsTmerView(false);
                        }}>
                        {({ remainingTime }) => (
                            <Animated.Text style={styles.resend(props)}>
                                Resend Code :{remainingTime}
                            </Animated.Text>
                        )}
                    </CountdownCircleTimer>
                </View>
            ) : (
                <View style={{ marginTop: 20, height: '10%' }}>
                    <TouchableOpacity
                        style={styles.btnresend}
                        onPress={() => resendOtp()}>
                        <Text style={styles.btnresendText(props)}>Resend Code</Text>
                    </TouchableOpacity>
                </View>
            )}

            <View style={{ marginTop: 20, height: '10%' }}>
                <TouchableOpacity style={styles.btn(props)} onPress={() => sendOTP()}>
                    <Text style={styles.btnText}>Verify</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAwareScrollView>
    );
};
const useDispatch = dispatch => {
    return {
        verifyOtp: data => dispatch(verifyOtp(data)),
        verifySms: data => dispatch(verifySms(data)),
        sendemail: data => dispatch(sendemail(data)),
        sendSms: data => dispatch(sendSms(data)),
        setotpData: data => dispatch(setotpData(data)),
    };
};
const useSelector = state => ({
    otpdata: state.otp.otpdata,
    loading: state.otp.loading,
    error: state.otp.error,
    theme: state.token.theme,
});
export default connect(useSelector, useDispatch)(Otp);
const styles = StyleSheet.create({
    contentor: props => [
        {
            flex: 1,
            backgroundColor: props.theme
                ? color.drakBackgroundColor
                : color.backgroundColor,
            paddingHorizontal: 20,
        },
    ],
    truckLogo: {
        height: 150,
        width: '40%',
        justifyContent: 'center',
    },
    titleComponets: {
        marginHorizontal: 5,
        height: 150,
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
        marginVertical: 20,
        width: '85%',
        height: 50,
        alignSelf: 'center',
    },
    input: props => [
        {
            borderBottomWidth: 2,
            borderBottomColor: props.theme
                ? color.drakPrimaryColors
                : color.primaryColors,
            padding: 10,
            fontSize: 18,
            borderRadius: 10,
            color: props.theme ? color.drakFontcolor : color.fontcolor,
        },
    ],
    btn: props => [
        {
            width: '90%',
            height: 50,
            backgroundColor: props.theme
                ? color.drakPrimaryColors
                : color.primaryColors,
            borderRadius: 5,
            justifyContent: 'center',
            alignItems: 'center',
            alignSelf: 'center',
        },
    ],
    btnText: {
        fontSize: 20,
        color: 'white',
        fontWeight: 'bold',
    },
    borderStyleBase: {
        width: 30,
        height: 45,
    },
    resend: props => [
        {
            fontWeight: 'bold',
            color: props.theme ? color.drakPrimaryColors : color.primaryColors,
            fontSize: 18,
        },
    ],
    btnresend: {
        width: '40%',
        height: 45,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
    },
    btnresendText: props => [
        {
            fontSize: 16,
            color: props.theme ? color.drakPrimaryColors : color.primaryColors,
            fontWeight: 'bold',
        },
    ],
    emailbox: props => [
        {
            alignItems: 'center',
            flexDirection: 'row',
            backgroundColor: props.theme
                ? color.drakBackgroundColor
                : color.backgroundColor,
            alignSelf: 'center',
            borderRadius: 5,
            flexDirection: 'row',
            alignItems: 'center',
            alignItems: 'center',
            shadowColor: props.theme ? color.drakFontcolor : color.fontcolor,
            shadowOffset: {
                width: 0,
                height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 4,
            elevation: 5,
            height: 50,
        },
    ],
});
