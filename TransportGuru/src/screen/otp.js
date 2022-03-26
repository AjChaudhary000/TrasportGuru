
import { View, Text, Image, StyleSheet, Dimensions, TextInput, TouchableOpacity, StatusBar, Animated } from 'react-native'
import LottieView from 'lottie-react-native';
import React from 'react'
import OTPTextInput from 'react-native-otp-textinput'
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer'
const Otp = (props) => {
    const [isTimerView, setIsTmerView] = React.useState(true);
    const [isResendButtonVisible, setIsResendButtonVisible] = React.useState(false);
    return (
        <View style={styles.contentor}>

            <StatusBar hidden />
            <View style={styles.truckLogo}>
                <LottieView source={require('../assets/json/loading.json')} autoPlay loop />
            </View>
            <View style={styles.titleComponets}>
                <Text style={styles.title}> Verification</Text>
                <View>
                    <Text style={styles.text}>We have sent you an Gmail with a code to the number that you provided.</Text>
                </View>
            </View>
            <View style={styles.inputBox}>
                <OTPTextInput tintColor={"#1C22B8"} />
            </View>


            {isTimerView ? (
                <View style={{ alignSelf: 'center', height: '10%', bottom: 50 }}>
                    <CountdownCircleTimer
                        isPlaying
                        duration={5}
                        strokeWidth={0}
                        size={150}
                        colors={[
                            ['#004777', 0.8],
                            ['#004777', 0.5],
                            ['#004777', 0.4]
                        ]}
                        onComplete={() => {
                            setIsTmerView(false)
                            setIsResendButtonVisible(true)
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
                <TouchableOpacity style={styles.btnresend}>
                    <Text style={styles.btnresendText}>
                        Resend Code
                    </Text>
                </TouchableOpacity>
            </View>)}



            <View style={{ marginTop: 20, height: '10%' }}>
                <TouchableOpacity style={styles.btn} onPress={() => props.navigation.navigate('UserProfile')}>
                    <Text style={styles.btnText}>
                        Verifiy
                    </Text>
                </TouchableOpacity>
            </View>

        </View>
    )
}

export default Otp
const styles = StyleSheet.create({
    contentor: {
        flex: 1,

        marginHorizontal: 20
    },
    truckLogo: {
        height: '25%',
        width: "40%",


    },
    titleComponets: {
        marginHorizontal: 5,
        height: '20%'
    },
    title: {
        fontSize: 25,
        fontWeight: 'bold',
        color: 'black'
    },
    text: {
        fontSize: 18,
        color: 'gray',
        margin: 10,
        fontWeight: 'bold',
    },
    inputBox: {
        marginVertical: 20,

        height: '10%',
        alignSelf: 'center'
    },

    btn: {
        width: '90%',
        height: 50,
        backgroundColor: "#1C22B8",
        borderRadius: 15,
        justifyContent: "center",
        alignItems: 'center',
        alignSelf: 'center'
    },
    btnText: {
        fontSize: 20,
        color: 'white',
        fontWeight: 'bold'
    },
    google: {
        alignItems: 'center',
        width: '60%',
        marginTop: 20,
        paddingTop: 30,
        alignSelf: 'center',
        height: "15%"
    },
    googleText: {
        fontSize: 20,
        color: '#1C22B8',
        fontWeight: 'bold',
        marginBottom: 10
    }, borderStyleBase: {
        width: 30,
        height: 45
    },
    resend: {
        fontWeight: "bold",
        color: '#1C22B8',
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
        color: '#1C22B8',
        fontWeight: 'bold'
    }
})