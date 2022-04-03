import { View, Text, Image, StyleSheet, Dimensions, TextInput, TouchableOpacity, StatusBar } from 'react-native'
import LottieView from 'lottie-react-native';
import React from 'react'
import icons from '../contents/icons';
import { sendemail, setUserData } from '../Redux/sendEmailSlice';
import { connect } from 'react-redux'
import color from '../contents/color';
import image from '../contents/image';
const SignIn = (props) => {
    const [email, setEmail] = React.useState('');
    const [isEmailValid, setIsEmailValid] = React.useState(true);
    React.useEffect(() => {
        if (props.userdata?.status) {
            props.navigation.replace('Otp', { email: props.userdata.email })
            props.setUserData({})
        }

    }, [props])
    const sendEmail = async () => {
        if (isEmailValid && email) {
            props.sendemail(email);
            setEmail('')
        }
    }
    const emailHandle = (val) => {
        const regex = /[^\s@]+@[^\s@]+\.[^\s@]+/;
        !regex.test(val) ? setIsEmailValid(false) : setIsEmailValid(true);
        setEmail(val);

    }
    if (props?.loading) {
        return (
            <View style={{ flex: 1 }}>
                <StatusBar hidden />
                <View style={{ height: "100%" }}>
                    <LottieView source={require('../assets/json/loder.json')} autoPlay loop />
                </View>
            </View>
        );
    }
    return (
        <View style={styles.contentor}>
            <StatusBar hidden />

            <View style={styles.truckLogo}>
            <Image source={image.Tg} style={{width:200,height:100,tintColor:color.primaryColors}} />
                {/* <LottieView source={require('../assets/json/loading.json')} autoPlay loop /> */}
            </View>
            <View style={styles.titleComponets}>
                <Text style={styles.title}> Welcome To Transport guru</Text>
                <View>
                    <Text style={styles.text}>
                        Provide your email id,so we can be able  to send your confirmation code.
                    </Text>
                </View>
            </View>
            <View style={styles.inputBox}>
                <View style={{ width: "10%", paddingTop: 12 }}>
                    <Image source={icons.email} style={{ width: 35, height: 35, tintColor: color.primaryColors }} />
                </View>
                <View style={{ width: "85%", marginHorizontal: 10 }}>

                    <TextInput style={styles.input}
                        placeholder={"eg. transportguru@gmail.com"}
                        placeholderTextColor={'gray'}
                        onChangeText={(val) => emailHandle(val)}
                        autoCapitalize={'none'} />
                    {!isEmailValid && <Text style={{ color: 'red', marginTop: 5 }}> * Enter valid Email  </Text>}

                </View>
            </View>

            <View style={{ marginTop: 20, height: '10%' }}>
                <TouchableOpacity style={styles.btn} onPress={() => sendEmail()}>
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
const useDispatch = (dispatch) => {
    return {
        sendemail: (data) => dispatch(sendemail(data)),
        setUserData: (data) => dispatch(setUserData(data))
    };
}
const useSelector = (state) => (

    {
        userdata: state.login.userdata,
        loading: state.login.loading
    }
)
export default connect(useSelector, useDispatch)(SignIn);
const styles = StyleSheet.create({
    contentor: {
        flex: 1,
        backgroundColor: 'white',
       paddingHorizontal:20,
      
    },
    truckLogo: {
        height: '25%',
        width: "40%",
        justifyContent:'center'

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
        borderBottomColor: color.primaryColors,
        padding: 10,
        fontSize: 18
    },
    btn: {
        width: '90%',
        height: 50,
        backgroundColor: color.primaryColors,
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
        color: color.primaryColors,
        fontWeight: 'bold',
        marginBottom: 10
    }
})