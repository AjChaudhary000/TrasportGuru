import {
    View, Text, StyleSheet, TextInput, TouchableOpacity, TouchableWithoutFeedback,
    Keyboard, Image, KeyboardAvoidingView, Platform, ScrollView
} from 'react-native'
import React from 'react'
import { AdminHeaderWithBackButton } from '../../components/adminHeader';
import color from '../../contents/color'
import icons from '../../contents/icons';
import { connect } from 'react-redux'
import { sendemail, setUserData } from '../../Redux/sendEmailSlice';
import LottieView from 'lottie-react-native';
import { addDriver, setDriverData, updateDriver } from '../../Redux/Admin/addDriverSlice';
import { getCountDriver } from '../../Redux/Admin/countAddSlice';
import { getDriverList } from '../../Redux/Admin/driverListSlice';
import AnimatedLoader from "react-native-animated-loader";
import Toast from 'react-native-simple-toast';
import ImageModel from '../../components/imageModel';
const AddDriver = (props) => {

    const [firebaseImage, setfirebaseImage] = React.useState(props.route.params?.item?.driverImage || '');
    const [imageLoading, setImageLoading] = React.useState(false)
    const [modalVisible1, setModalVisible1] = React.useState(false);
    const [data, setData] = React.useState({
        driverName: props.route.params?.item?.driverName || '',
        driverEmail: props.route.params?.item?.driverEmail || '',
        driverMobileNo: props.route.params?.item?.driverMobileNo || '',

    })
    React.useEffect(() => {
        if (props?.Driverdata.status) {
            setVerifyDriverData(true)
            props.setUserData({})
        }
        if (props?.addDriverData.status) {
            Toast.show(" Driver add successful")
            props.getCountDriver(props.token)
            props.getDriverList(props.token)
            props.setDriverData({})
            props.navigation.goBack();
        }
        if (props?.error) {
            Toast.show(props.error);
        }
        ;
    }, [props])

    const VerifyDriver = () => {
        if (data.driverName === "") {
            Toast.show("Enter Driver name")
        } else if (data.driverEmail === "") {
            Toast.show("Enter Driver email")
        } else if (data.driverMobileNo === "") {
            Toast.show("Enter Driver mobile no")
        } else if (firebaseImage === "") {
            Toast.show("Select Driver Image ")
        } else {
            const regex = /[^\s@]+@[^\s@]+\.[^\s@]+/;
            if (!regex.test(data.driverEmail)) {
                Toast.show("Enter valid email ")
            } else {
                props.addDriver({ ...data, driverImage: firebaseImage, token: props.token })
                console.log("output", data)
            }
        }
    }


    const UpdateFinish = () => {
        if (data.driverName === "") {
            Toast.show("Enter Driver name")
        } else if (data.driverEmail === "") {
            Toast.show("Enter Driver email")
        } else if (data.driverMobileNo === "") {
            Toast.show("Enter Driver mobile no")
        } else if (firebaseImage === "") {
            Toast.show("Select Driver Image ")
        } else {
            const regex = /[^\s@]+@[^\s@]+\.[^\s@]+/;
            if (!regex.test(data.driverEmail)) {
                Toast.show("Enter valid email ")
            } else {
                props.updateDriver({ ...data, driverImage: firebaseImage, id: props.route.params?.item?._id, token: props.token })
            }
        }
    }
    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.container(props)}
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>

                <View style={{ flex: 1 }}>
                    <AnimatedLoader
                        visible={props.loading}
                        overlayColor="rgba(255,255,255,0.75)"
                        source={require("../../assets/json/loder.json")}
                        animationStyle={{
                            width: 100,
                            height: 100
                        }}
                        speed={1}
                    >
                        <Text>Loading...</Text>
                    </AnimatedLoader>
                    {modalVisible1 && <ImageModel
                        filename={"Driver"}
                        theme={props.theme}
                        modalVisibleData={modalVisible1}
                        onGetImage={(val) => setfirebaseImage(val)}
                        onGetLoding={(val) => setImageLoading(val)}
                        onGetModalVisible={(val) => setModalVisible1(val)} />}
                    {!props.route.params?.item?._id ?
                        // add driver
                        <ScrollView showsVerticalScrollIndicator={false}>
                            <AdminHeaderWithBackButton name={"Add Driver"} navigation={props.navigation} />


                            <View style={styles.inputBox}>
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
                                                        tintColor: props.theme ? color.drakAdminprimaryColors : color.adminprimaryColors,
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
                                        <LottieView source={require('../../assets/json/uploading1.json')} autoPlay loop />
                                    </View>}
                                <View style={{ margin: 10 }}>
                                    <TextInput style={styles.input(props)}

                                        placeholder={"eg. Driver name"}
                                        placeholderTextColor={'gray'}
                                        onChangeText={(val) => setData({ ...data, driverName: val })}
                                        autoCapitalize={'none'} />

                                </View>
                                <View style={{ margin: 10 }}>
                                    <TextInput style={styles.input(props)}
                                        placeholder={"eg. Driver mobile No"}
                                        placeholderTextColor={'gray'}
                                        maxLength={13}
                                        onChangeText={(val) => setData({ ...data, driverMobileNo: val })}
                                        autoCapitalize={'none'}
                                        keyboardType={'number-pad'} />

                                </View>
                                <View style={{ margin: 10 }}>
                                    <TextInput style={styles.input(props)}
                                        placeholder={"eg. Driver email"}
                                        placeholderTextColor={'gray'}
                                        keyboardType={'email-address'}
                                        onChangeText={(val) => setData({ ...data, driverEmail: val })}
                                        autoCapitalize={'none'} />

                                </View>

                                <View style={{ marginHorizontal: 10, marginVertical: 10 }}>
                                    <TouchableOpacity style={styles.btn(props)} onPress={() => { VerifyDriver() }}>
                                        <Text style={styles.btnText}>
                                            Verify Driver
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </ScrollView> :
                        <ScrollView showsVerticalScrollIndicator={false}>
                            <AdminHeaderWithBackButton name={"Update Driver"} navigation={props.navigation} />
                            <View style={styles.inputBox}>
                                <View style={{ marginHorizontal: 10 }}>
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
                                                            tintColor: props.theme ? color.drakAdminprimaryColors : color.adminprimaryColors,
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
                                            <LottieView source={require('../../assets/json/uploading1.json')} autoPlay loop />
                                        </View>}
                                </View>

                                <View style={{ margin: 10 }}>
                                    <TextInput style={styles.input(props)}

                                        placeholder={"eg. Driver name"}
                                        placeholderTextColor={'gray'}
                                        defaultValue={props.route.params?.item?.driverName}
                                        onChangeText={(val) => setData({ ...data, driverName: val })}
                                        autoCapitalize={'none'} />

                                </View>
                                <View style={{ margin: 10 }}>
                                    <TextInput style={styles.input(props)}
                                        placeholder={"eg. Driver mobile No"}
                                        placeholderTextColor={'gray'}
                                        maxLength={13}
                                        defaultValue={props.route.params?.item?.driverMobileNo}
                                        onChangeText={(val) => setData({ ...data, driverMobileNo: val })}
                                        autoCapitalize={'none'}
                                        keyboardType={'number-pad'} />

                                </View>
                                <View style={{ margin: 10 }}>
                                    <TextInput style={styles.input(props)}
                                        placeholder={"eg. Driver email"}
                                        defaultValue={props.route.params?.item?.driverEmail}
                                        placeholderTextColor={'gray'}
                                        onChangeText={(val) => setData({ ...data, driverEmail: val })}
                                        autoCapitalize={'none'} />

                                </View>

                                <View style={{ marginHorizontal: 10, marginVertical: 10 }}>
                                    <TouchableOpacity style={styles.btn(props)} onPress={() => { UpdateFinish() }}>
                                        <Text style={styles.btnText}>
                                            Verify Driver
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </ScrollView>
                    }
                </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    )
}
const useDispatch = (dispatch) => {
    return {
        sendemail: (data) => dispatch(sendemail(data)),
        setUserData: (data) => dispatch(setUserData(data)),
        addDriver: (data) => dispatch(addDriver(data)),
        getCountDriver: (data) => dispatch(getCountDriver(data)),
        setDriverData: (data) => dispatch(setDriverData(data)),
        updateDriver: (data) => dispatch(updateDriver(data)),
        getDriverList: (data) => dispatch(getDriverList(data)),

    };
}
const useSelector = (state) => (

    {
        token: state.token.token,
        Driverdata: state.login.userdata,
        loading: state.login.loading,
        addDriverData: state.addDriver.data,
        error: state.addDriver.error,
        theme: state.token.theme
    }
)
export default connect(useSelector, useDispatch)(AddDriver);
const styles = StyleSheet.create({
    container: (props) => [{
        flex: 1,
        backgroundColor: props.theme ? color.drakBackgroundColor : color.backgroundColor,

    }], inputBox: {
        margin: 20
    },
    input: (props) => [{
        borderWidth: 2,
        borderColor: props.theme ? color.drakAdminprimaryColors : color.adminprimaryColors,
        padding: 10,
        fontSize: 18,
        borderRadius: 10,
        color: props.theme ? color.drakFontcolor : color.fontcolor,
    }],
    btn: (props) => [{
        width: '90%',
        height: 50,
        backgroundColor: props.theme ? color.drakAdminprimaryColors : color.adminprimaryColors,
        borderRadius: 15,
        justifyContent: "center",
        alignItems: 'center',
        alignSelf: 'center'
    }],
    btnText: {
        fontSize: 20,
        color: 'white',
        fontWeight: 'bold'
    },
    resend: (props) => [{
        fontWeight: "bold",
        color: props.theme ? color.drakAdminprimaryColors : color.adminprimaryColors,
        fontSize: 18,

    }],

    titleComponets: {
        marginHorizontal: 5,
        height: '20%', marginVertical: 30
    },
    title: (props) => [{
        fontSize: 25,
        fontWeight: 'bold',
        color: props.theme ? color.drakFontcolor : color.fontcolor,
    }],
    text: {
        fontSize: 18,
        color: 'gray',
        margin: 10,
        fontWeight: 'bold',

    },


    btnresend: {
        width: '40%',
        height: 45,
        justifyContent: "center",
        alignItems: 'center',
        alignSelf: 'center'
    },
    emailbox: (props) => [{
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
    }], image: (props) => [{
        marginTop: 40,
        overflow: 'hidden',
        alignSelf: 'center',
        width: 120,
        height: 120,
        borderRadius: 10,
        borderWidth: 5,
        borderColor: props.theme ? color.drakAdminprimaryColors : color.adminprimaryColors,
    }]
})
