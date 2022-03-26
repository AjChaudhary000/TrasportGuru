import { View, Text, Image, StyleSheet, Dimensions, TextInput, TouchableOpacity, StatusBar } from 'react-native'
import LottieView from 'lottie-react-native';
import React from 'react'
import icons from '../contents/icons';
const SignIn = (props) => {
    return (

        <View style={styles.contentor}>
            <StatusBar hidden />

            <View style={styles.truckLogo}>
                <LottieView source={require('../assets/json/loading.json')} autoPlay loop />
            </View>
            <View style={styles.titleComponets}>
                <Text style={styles.title}> Welcome To Trasport guru</Text>
                <View>
                    <Text style={styles.text}> Provide your email id,so we can be able  to send your confirmation code.</Text>
                </View>
            </View>
            <View style={styles.inputBox}>
                <View style={{ width: "10%", paddingTop: 12 }}>
                    <Image source={icons.email} style={{ width: 35, height: 35 }} />
                </View>
                <View style={{ width: "85%", marginHorizontal: 10 }}>

                    <TextInput style={styles.input} placeholder={"email id "} placeholderTextColor={'gray'} />
                </View>
            </View>

            <View style={{ marginTop: 20, height: '10%' }}>
                <TouchableOpacity style={styles.btn} onPress={() => props.navigation.navigate('Otp')}>
                    <Text style={styles.btnText}>
                        Continue
                    </Text>
                </TouchableOpacity>
            </View>
            <View style={styles.google}>
                <Text style={styles.googleText}>
                    Sign in with google
                </Text>
                <Image source={icons.google} style={{ width: 35, height: 35 }} />
            </View>

        </View>

    )
}

export default SignIn
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
        flexDirection: 'row',
        height: '10%'
    },
    input: {
        borderBottomWidth: 2,
        borderBottomColor: '#1C22B8',
        padding: 10,
        fontSize: 18
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
    }
})