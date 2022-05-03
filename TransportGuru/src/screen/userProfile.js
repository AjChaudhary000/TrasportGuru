import { View, Text, Image, StyleSheet, TextInput, TouchableOpacity, StatusBar } from 'react-native'
import React from 'react'
import icons from '../contents/icons';
import { connect } from 'react-redux'
import { setUserData, userProfile } from '../Redux/userProfileSlice';
import color from '../contents/color';
import LottieView from 'lottie-react-native';
import AnimatedLoader from "react-native-animated-loader";
import ImageModel from '../components/imageModel';
import Toast from 'react-native-simple-toast';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
const UserProfile = (props) => {
    const [firebaseImage, setfirebaseImage] = React.useState('');
    const [imageLoading, setImageLoading] = React.useState(false);
    const [data, setdata] = React.useState({
        username: ''
    })
    React.useEffect(() => {
        if (props?.userdata.status) {
            props.setUserData({})
            props.navigation.replace('Tab')
        }

    }, [props])
    const [modalVisible1, setModalVisible1] = React.useState(false);
    const uploadData = () => {

        if (data.username === "") {
            Toast.show("Enter username")
        } else if (firebaseImage === "") {
            Toast.show("Select Image")
        } else {
            props.userProfile({ ...data, image: firebaseImage || '', token: props.token })
        }
    }
    return (

        <KeyboardAwareScrollView style={styles.contentor(props)}>
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
            {modalVisible1 && <ImageModel
                filename={"user"}
                theme={props.theme}
                modalVisibleData={modalVisible1}
                onGetImage={(val) => setfirebaseImage(val)}
                onGetLoding={(val) => setImageLoading(val)}
                onGetModalVisible={(val) => setModalVisible1(val)} />}
            <StatusBar hidden />

            <View style={{ paddingTop: 12, height: '30%', justifyContent: 'center' }}>
                {!imageLoading ?
                    <View style={{ marginHorizontal: 10 }}>
                        {!firebaseImage ?
                            <TouchableOpacity onPress={() => { setModalVisible1(true) }}>
                                <Image
                                    style={{
                                        alignSelf: 'center',
                                        width: 100,
                                        height: 100,
                                        borderRadius: 10,
                                        resizeMode: 'contain',
                                        marginVertical: 30,
                                        tintColor: props.theme ? color.drakPrimaryColors : color.primaryColors,
                                    }}
                                    source={icons.add_photo}
                                />
                            </TouchableOpacity> :
                            <TouchableOpacity style={styles.image(props)} onPress={() => { setModalVisible1(true) }}>
                                <Image
                                    style={{
                                        width: 110, height: 110, alignSelf: "center"

                                    }}
                                    source={{ uri: firebaseImage }}
                                /></TouchableOpacity>}


                    </View>
                    :
                    <View style={{ height: 100, alignContent: 'center', marginHorizontal: 10 }}>
                        <LottieView source={require('../assets/json/uploading1.json')} autoPlay loop />
                    </View>}
            </View>
            <View style={styles.titleComponets}>
                <Text style={styles.title(props)}> Here we go !</Text>
                <View>
                    <Text style={styles.text}> Please provide your name and  profile photo.</Text>
                </View>
            </View>
            <View style={styles.inputBox}>
                <View style={{ width: "10%", paddingTop: 12 }}>
                    <Image source={icons.user} style={{ width: 35, height: 35, tintColor: color.primaryColors }} />
                </View>
                <View style={{ width: "85%", marginHorizontal: 10 }}>

                    <TextInput style={styles.input(props)} placeholder={"eg: Arjun Chaudhary "}
                        onChangeText={(val) => setdata({ ...data, username: val })}
                        placeholderTextColor={'gray'} />
                </View>
            </View>

            <View style={{ marginTop: 20, height: '10%' }}>
                <TouchableOpacity style={styles.btn(props)} onPress={() => uploadData()}>
                    <Text style={styles.btnText}>
                        Finish
                    </Text>
                </TouchableOpacity>
            </View>
        </KeyboardAwareScrollView >

    )
}
const useSelector = (state) => {
    return {
        token: state.token.token,
        internet: state.token.internet,
        userdata: state.userProfile.data,
        theme: state.token.theme,
        loading: state.userProfile.loading,
    }
}
const useDispatch = (dispatch) => {
    return {
        userProfile: (data) => dispatch(userProfile(data)),
        setUserData: (data) => dispatch(setUserData(data)),
    }
}

export default connect(useSelector, useDispatch)(UserProfile)
const styles = StyleSheet.create({
    contentor: (props) => [{
        flex: 1,
        backgroundColor: props.theme ? color.drakBackgroundColor : color.backgroundColor,
        paddingHorizontal: 20,
        paddingTop: 50
    }],

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
        borderBottomWidth: 2,
        borderBottomColor: props.theme ? color.drakPrimaryColors : color.primaryColors,
        padding: 10,
        fontSize: 18,
        borderRadius: 5, color: props.theme ? color.drakFontcolor : color.fontcolor
    }],
    btn: (props) => [{
        width: '90%',
        height: 50,
        backgroundColor: props.theme ? color.drakPrimaryColors : color.primaryColors,
        borderRadius: 5,
        justifyContent: "center",
        alignItems: 'center',
        alignSelf: 'center'
    }],
    btnText: {
        fontSize: 20,
        color: 'white',
        fontWeight: 'bold'
    },


    image: (props) => [{
        marginTop: 40,
        overflow: 'hidden',
        alignSelf: 'center',
        width: 120,
        height: 120,
        borderRadius: 60,
        borderWidth: 5,
        borderColor: props.theme ? color.drakPrimaryColors : color.primaryColors,
    }],
})
