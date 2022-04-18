
import { View, Text, Image, StyleSheet, Dimensions, TextInput, TouchableOpacity, StatusBar, Animated } from 'react-native'
import React from 'react'
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer'
import icons from '../contents/icons';
import { connect } from 'react-redux';
import { setotpData, verifyOtp } from '../Redux/verifyOtpSlice';
import { sendemail } from '../Redux/sendEmailSlice';
import color from '../contents/color';
import image from '../contents/image';
import Toast from 'react-native-simple-toast';
import AnimatedLoader from "react-native-animated-loader";
const Otp = (props) => {
    const [isTimerView, setIsTmerView] = React.useState(true);
    const [otp, setOtp] = React.useState()
    console.log(props.otpdata)
    React.useEffect(() => {
        if (props?.otpdata.account === "0" && props?.otpdata.status) {
            props.navigation.replace('UserProfile')
            props.setotpData({})
            Toast.show("User SignIn successful");
        }
        if (props?.otpdata.account === "1" && props?.otpdata.status) {
            props.navigation.replace('Tab')
            props.setotpData({})
            Toast.show("User SignIn successful");
        }if(props?.error){
            Toast.show(props.error);
        }
      
    }, [props])
    const sendOTP = async () => {

        props.verifyOtp({ email: props.route.params.email, otp: otp })

        setOtp('')
        //  props.navigation.navigate('UserProfile')
    }
    const resendOtp = () => {
        props.sendemail(props.route.params.email);
        setIsTmerView(true)
    }
    const styles = StyleSheet.create({
        contentor: {
            flex: 1,
            backgroundColor:props.theme ? color.drakBackgroundColor :color.backgroundColor,
            paddingHorizontal: 20,
        },
        truckLogo: {
            height: '25%',
            width: "40%",
            justifyContent: 'center'
    
        },
        titleComponets: {
            marginHorizontal: 5,
            height: '20%'
        },
        title: {
            fontSize: 25,
            fontWeight: 'bold',
            color: props.theme ? color.drakFontcolor : color.fontcolor
        },
        text: {
            fontSize: 18,
            color: 'gray',
            margin: 10,
            fontWeight: 'bold',
        },
        inputBox: {
            marginVertical: 20,
            width: "85%",
            height: '10%',
            alignSelf: 'center'
        },
        input: {
            borderWidth: 2,
            borderColor:props.theme ? color.drakPrimaryColors : color.primaryColors,
            padding: 10,
            fontSize: 18,
            borderRadius: 10,
            color: props.theme ? color.drakFontcolor : color.fontcolor
        },
        btn: {
            width: '90%',
            height: 50,
            backgroundColor: props.theme ? color.drakPrimaryColors : color.primaryColors,
            borderRadius: 15,
            justifyContent: "center",
            alignItems: 'center',
            alignSelf: 'center'
        },
        btnText: {
            fontSize: 20,
            color: 'white',
            fontWeight: 'bold'
        }, borderStyleBase: {
            width: 30,
            height: 45
        },
        resend: {
            fontWeight: "bold",
            color:props.theme ? color.drakPrimaryColors : color.primaryColors,
            fontSize: 18,
    
        },
        btnresend: {
            width: '40%',
            height: 45,
            justifyContent: "center",
            alignItems: 'center',
            alignSelf: 'center'
        }, btnresendText: {
            fontSize: 16,
            color:props.theme ? color.drakPrimaryColors : color.primaryColors,
            fontWeight: 'bold'
        },
        emailbox: {
            alignItems: "center",
            flexDirection: 'row',
            backgroundColor: props.theme ? color.drakBackgroundColor : color.backgroundColor,
            alignSelf: 'center',
            borderRadius: 15,
            flexDirection: 'row',
            alignItems: 'center',
            alignItems: "center",
            shadowColor: props.theme ? color.drakFontcolor : color.fontcolor,
            shadowOffset: {
                width: 0,
                height: 2
            },
            shadowOpacity: 0.25,
            shadowRadius: 4,
            elevation: 5,
            height: 50
        }
    })
    return (
        <View style={styles.contentor}>
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
            <StatusBar hidden />
            <View style={styles.truckLogo}>
                <Image source={image.Tg} style={{ width: 200, height: 100, tintColor: props.theme ? color.drakPrimaryColors : color.primaryColors,}} />
                {/* <LottieView source={require('../assets/json/loading.json')} autoPlay loop /> */}
            </View>
            <View style={styles.titleComponets}>
                <Text style={styles.title}> Verification</Text>
                <View>
                    <Text style={styles.text}>We have sent you an Gmail with a code to the number that you provided.</Text>
                </View>
            </View>
            <View style={styles.emailbox}>
                <View style={{ width: " 70%", alignItems: 'center' }}>
                    <Text style={{ fontSize: 20, fontWeight: 'bold',color:props.theme ? color.drakFontcolor : color.fontcolor, }}>{props.route.params.email}</Text>
                </View>
                <TouchableOpacity style={{ width: "20%", alignItems: 'center' }} onPress={() => { props.navigation.replace('SignIn') }}>
                    <Image source={icons.edit} style={{ width: 30, height: 30, tintColor: props.theme ? color.drakPrimaryColors : color.primaryColors, }} />
                </TouchableOpacity>
            </View>
            <View style={styles.inputBox}>
                <TextInput style={styles.input}
                    placeholder={"eg. 0000"}
                    placeholderTextColor={'gray'}
                    onChangeText={(val) => setOtp(val)}
                    autoCapitalize={'none'}
                    keyboardType={'number-pad'}
                    maxLength={4} />
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
                            ['#004777', 0.4]
                        ]}
                        onComplete={() => {
                            setIsTmerView(false)

                        }}
                    >
                        {({ remainingTime }) => (
                            <Animated.Text style={styles.resend}>
                                Resend Code :{remainingTime}
                            </Animated.Text>
                        )}

                    </CountdownCircleTimer>
                </View>
            ) : (<View style={{ marginTop: 20, height: '10%' }}>
                <TouchableOpacity style={styles.btnresend} onPress={() => resendOtp()}>
                    <Text style={styles.btnresendText}>
                        Resend Code
                    </Text>
                </TouchableOpacity>
            </View>)}



            <View style={{ marginTop: 20, height: '10%' }}>
                <TouchableOpacity style={styles.btn} onPress={() => sendOTP()}>
                    <Text style={styles.btnText}>
                        Verify
                    </Text>
                </TouchableOpacity>
            </View>

        </View>
    )
}
const useDispatch = (dispatch) => {
    return {
        verifyOtp: (data) => dispatch(verifyOtp(data)),
        sendemail: (data) => dispatch(sendemail(data)),
        setotpData: (data) => dispatch(setotpData(data)),
       
    };
}
const useSelector = (state) => (

    {
        otpdata: state.otp.otpdata,
        loading: state.otp.loading,
        error: state.otp.error,
        theme:state.token.theme
    }
)
export default connect(useSelector, useDispatch)(Otp);
