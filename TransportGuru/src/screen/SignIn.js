import { View, Text, Image, StyleSheet, Dimensions, TextInput, TouchableOpacity, StatusBar } from 'react-native'
import LottieView from 'lottie-react-native';
import React from 'react'
import icons from '../contents/icons';
import { sendemail, setUserData } from '../Redux/sendEmailSlice';
import { connect } from 'react-redux'
import color from '../contents/color';
import image from '../contents/image';
import Toast from 'react-native-simple-toast';
import AnimatedLoader from "react-native-animated-loader";
const SignIn = (props) => {
    const [email, setEmail] = React.useState('');
    const [isEmailValid, setIsEmailValid] = React.useState(true);
    React.useEffect(() => {
       
        if (props.userdata?.status) {
            props.navigation.replace('Otp', { email: props.userdata.email })
            props.setUserData({})
        }
        try{
          
        }catch(e){
            console.log(e)
        }
    }, [props])
   
    const sendEmail = async () => {
        if (isEmailValid && email) {
            props.sendemail(email);
            setEmail('')
        }else{
            Toast.show('Enter valid Email');
        }
    }
    const emailHandle = (val) => {
        const regex = /[^\s@]+@[^\s@]+\.[^\s@]+/;
        !regex.test(val) ? setIsEmailValid(false) : setIsEmailValid(true);
        setEmail(val);

    }
    const styles = StyleSheet.create({
        contentor: {
            flex: 1,
            paddingHorizontal: 20,
            backgroundColor:props.theme ? color.drakBackgroundColor :color.backgroundColor
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
            flexDirection: 'row',
            height: '10%'
        },
        input: {
            borderWidth: 2,
            borderColor: props.theme ? color.drakPrimaryColors : color.primaryColors,
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
            color:  props.theme ? color.drakPrimaryColors : color.primaryColors,
            fontWeight: 'bold',
            marginBottom: 10
        }
    })
    return (
        <View style={styles.contentor}>
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
                <Image source={image.Tg} style={{ width: 200, height: 100, tintColor:  props.theme ? color.drakPrimaryColors : color.primaryColors, }} />
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
                    <Image source={icons.email} style={{ width: 35, height: 35, tintColor:  props.theme ? color.drakPrimaryColors : color.primaryColors, }} />
                </View>
                <View style={{ width: "85%", marginHorizontal: 10 }}>

                    <TextInput style={styles.input}
                        placeholder={"eg. transportguru@gmail.com"}
                        placeholderTextColor={'gray'}
                        onChangeText={(val) => emailHandle(val)}
                        keyboardType={'email-address'}
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
        setUserData: (data) => dispatch(setUserData(data)),
       
    };
}
const useSelector = (state) => (

    {
        userdata: state.login.userdata,
        loading: state.login.loading,
        theme:state.token.theme
    }
)
export default connect(useSelector, useDispatch)(SignIn);
