import { View, Text, StyleSheet, TextInput, TouchableOpacity, ActivityIndicator, Image, FlatList, StatusBar, Animated, Platform, Alert } from 'react-native'
import React from 'react'
import { AdminHeaderWithBackButton } from '../../components/adminHeader';
import color from '../../contents/color'
import * as ImagePicker from 'react-native-image-picker'
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer'
import icons from '../../contents/icons';
import { connect } from 'react-redux'
import { getJWTToken } from '../../Redux/helper';
import { sendemail, setUserData } from '../../Redux/sendEmailSlice';
import LottieView from 'lottie-react-native';
import { addDriver, setDriverData, updateDriver } from '../../Redux/Admin/addDriverSlice';
import { getCountDriver } from '../../Redux/Admin/countAddSlice';
import { getDriverList } from '../../Redux/Admin/driverListSlice';
import storage from '@react-native-firebase/storage';
const AddDriver = (props) => {
    const [isTimerView, setIsTmerView] = React.useState(true);
    const [token, setToken] = React.useState('');
    const [firebaseImage, setfirebaseImage] = React.useState(props.route.params?.item?.driverImage || '');
    const [imageLoading, setImageLoading] = React.useState(false)
    const [verifyDriverData, setVerifyDriverData] = React.useState(false)
    const [transferred, setTransferred] = React.useState(0);
    const [data, setData] = React.useState({
        driverName: props.route.params?.item?.driverName || '',
        driverEmail: props.route.params?.item?.driverEmail || '',
        driverMobileNo: props.route.params?.item?.driverMobileNo || '',
        driverOtp: ''
    })
    const resendOtp = () => {
        props.sendemail(data.driverEmail);
        setIsTmerView(true)
    }
    const fetchToken = async () => {
        try {
            const data = await getJWTToken();
            setToken(data)

        } catch (e) {
            console.log()
        }
    }
    React.useEffect(() => {
        fetchToken()
    }, [token])
    React.useEffect(() => {
        if (props?.Driverdata.status) {
            setVerifyDriverData(true)
            props.setUserData({})
        }
        if (props?.addDriverData.status) {
            props.getCountDriver(token)
            props.getDriverList(token)
            props.setDriverData({})
            props.navigation.goBack();
        }
    }, [props, token])

    const VerifyDriver = () => {
        if (data.driverName !== "" &&
            data.driverEmail !== "" &&
            data.driverMobileNo !== "", firebaseImage !== "") {
            props.sendemail(data.driverEmail);
        }
    }
    const editDriver = () => {
        setData({
            driverEmail: "",
            driverMobileNo: "",
            driverName: "",
            driverOtp: "",

        });
        setImageLoading(false)
        setVerifyDriverData(false)
    }
    const Finish = () => {
        console.log(token)
        props.addDriver({ ...data, driverImage: firebaseImage, token: token })
        console.log("output", data)
    }
    const UpdateFinish = () => {
        props.updateDriver({ ...data, driverImage: firebaseImage, id: props.route.params?.item?._id, token: token })

    }
    const GalleryLaunch = () => {
        let options = {
            title: 'You can choose one image',
            storageOptions: {
                skipBackup: true,
                path: 'images',
            },
        };
        ImagePicker.launchImageLibrary(options, (response) => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            } else {
                const source = { uri: response.assets[0].uri };
                setImageLoading(true)
                uploadImage(source)

            }
        });
    }
    const uploadImage = async ({ uri }) => {
        console.log(uri)
        const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri;
        const uniqueSuffix = "Driver" + Date.now() + "-" + Math.round(Math.random() * 1e9);
        const filename = uniqueSuffix + uploadUri.split('.').pop();;
        setTransferred(0);
        const task = storage()
            .ref(`driver/${filename}`)
            .putFile(uploadUri);
        task.on('state_changed', snapshot => {
            setTransferred(
                Math.round(snapshot.bytesTransferred / snapshot.totalBytes) * 10000
            );
        });
        task.then(async (res) => {
            console.log(res)

            const url = await storage().ref(`driver/${filename}`).getDownloadURL();
            await setfirebaseImage(url)
            if (res.state === 'success') {
                setTimeout(() => {
                    setImageLoading(false)
                }, 4000)

            }
        })
    };
    if (props?.loading) {
        return (
            <View style={{ flex: 1, backgroundColor: color.backgroundColor }}>
                <StatusBar hidden />
                <View style={{ height: "100%" }}>
                    <LottieView source={require('../../assets/json/loder.json')} autoPlay loop />
                </View>
            </View>
        );
    }
    return (
        <View style={styles.container}>
            {!props.route.params?.item?._id ?
                // add driver
                <View>
                    <AdminHeaderWithBackButton name={"Add Driver"} navigation={props.navigation} />

                    {!verifyDriverData ?
                        <View style={styles.inputBox}>
                            {!imageLoading ?
                                <View style={{ marginHorizontal: 10 }}>
                                    {!firebaseImage ?
                                        <TouchableOpacity onPress={GalleryLaunch}>
                                            <Image
                                                style={{
                                                    alignSelf: 'center',
                                                    width: 100,
                                                    height: 100,
                                                    borderRadius: 10,
                                                    resizeMode: 'contain',
                                                    marginVertical: 30,
                                                    tintColor: color.adminprimaryColors
                                                }}
                                                source={icons.add_photo}
                                            />
                                        </TouchableOpacity> :
                                        <View style={styles.image}>
                                            <Image
                                                style={{
                                                    width: 110, height: 110, alignSelf: "center"

                                                }}
                                                source={{ uri: firebaseImage }}
                                            /></View>}


                                </View>
                                :
                                <View style={{ height: 100, alignContent: 'center', marginHorizontal: 10 }}>
                                    <LottieView source={require('../../assets/json/uploading1.json')} autoPlay loop />
                                </View>}
                            <View style={{ margin: 10 }}>
                                <TextInput style={styles.input}

                                    placeholder={"eg. Driver name"}
                                    placeholderTextColor={'gray'}
                                    onChangeText={(val) => setData({ ...data, driverName: val })}
                                    autoCapitalize={'none'} />

                            </View>
                            <View style={{ margin: 10 }}>
                                <TextInput style={styles.input}
                                    placeholder={"eg. Driver mobile No"}
                                    placeholderTextColor={'gray'}
                                    onChangeText={(val) => setData({ ...data, driverMobileNo: val })}
                                    autoCapitalize={'none'}
                                    keyboardType={'number-pad'} />

                            </View>
                            <View style={{ margin: 10 }}>
                                <TextInput style={styles.input}
                                    placeholder={"eg. Driver email"}
                                    placeholderTextColor={'gray'}
                                    onChangeText={(val) => setData({ ...data, driverEmail: val })}
                                    autoCapitalize={'none'} />

                            </View>

                            <View style={{ marginHorizontal: 10, marginVertical: 10 }}>
                                <TouchableOpacity style={styles.btn} onPress={() => { VerifyDriver() }}>
                                    <Text style={styles.btnText}>
                                        Verify Driver
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View> :
                        <View style={styles.inputBox}>

                            <View style={styles.titleComponets}>
                                <Text style={styles.title}>Driver Verification</Text>
                                <View>
                                    <Text style={styles.text}>We have sent you an Gmail with a code to the number that you provided.</Text>
                                </View>
                            </View>
                            <View style={styles.emailbox}>
                                <View style={{ width: " 70%", alignItems: 'center' }}>
                                    <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{data.driverEmail}</Text>
                                </View>
                                <TouchableOpacity style={{ width: "20%", alignItems: 'center' }} onPress={() => { editDriver() }}>
                                    <Image source={icons.edit} style={{ width: 30, height: 30, tintColor: color.primaryColors }} />
                                </TouchableOpacity>
                            </View>
                            <View style={{ margin: 10 }}>
                                <TextInput style={styles.input}
                                    placeholder={"eg. 0000"}
                                    placeholderTextColor={'gray'}
                                    onChangeText={(val) => setData({ ...data, driverOtp: val })}
                                    autoCapitalize={'none'}
                                    keyboardType={'number-pad'}
                                    maxLength={4} />
                                {(props?.error) ? <Text style={{ color: 'red', marginTop: 5 }}> * otp invalid  </Text> : null}
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
                            <View style={{ marginHorizontal: 10, marginVertical: 10 }}>
                                <TouchableOpacity style={styles.btn} onPress={() => { Finish() }}>
                                    <Text style={styles.btnText}>
                                        Finish
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    }
                </View> :
                <View>
                    <AdminHeaderWithBackButton name={"Update Driver"} navigation={props.navigation} />

                    {!verifyDriverData ?
                        <View style={styles.inputBox}>
                            <View style={{ marginHorizontal: 10 }}>
                                {!imageLoading ?
                                    <View style={{ marginHorizontal: 10 }}>
                                        {!firebaseImage ?
                                            <TouchableOpacity onPress={GalleryLaunch}>
                                                <Image
                                                    style={{
                                                        alignSelf: 'center',
                                                        width: 100,
                                                        height: 100,
                                                        borderRadius: 10,
                                                        resizeMode: 'contain',
                                                        marginVertical: 30,
                                                        tintColor: color.adminprimaryColors
                                                    }}
                                                    source={icons.add_photo}
                                                />
                                            </TouchableOpacity> :
                                            <TouchableOpacity onPress={GalleryLaunch} style={styles.image}>
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
                                <TextInput style={styles.input}

                                    placeholder={"eg. Driver name"}
                                    placeholderTextColor={'gray'}
                                    defaultValue={props.route.params?.item?.driverName}
                                    onChangeText={(val) => setData({ ...data, driverName: val })}
                                    autoCapitalize={'none'} />

                            </View>
                            <View style={{ margin: 10 }}>
                                <TextInput style={styles.input}
                                    placeholder={"eg. Driver mobile No"}
                                    placeholderTextColor={'gray'}
                                    defaultValue={props.route.params?.item?.driverMobileNo}
                                    onChangeText={(val) => setData({ ...data, driverMobileNo: val })}
                                    autoCapitalize={'none'}
                                    keyboardType={'number-pad'} />

                            </View>
                            <View style={{ margin: 10 }}>
                                <TextInput style={styles.input}
                                    placeholder={"eg. Driver email"}
                                    defaultValue={props.route.params?.item?.driverEmail}
                                    placeholderTextColor={'gray'}
                                    onChangeText={(val) => setData({ ...data, driverEmail: val })}
                                    autoCapitalize={'none'} />

                            </View>

                            <View style={{ marginHorizontal: 10, marginVertical: 10 }}>
                                <TouchableOpacity style={styles.btn} onPress={() => { VerifyDriver() }}>
                                    <Text style={styles.btnText}>
                                        Verify Driver
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View> :
                        <View style={styles.inputBox}>

                            <View style={styles.titleComponets}>
                                <Text style={styles.title}>Driver Verification</Text>
                                <View>
                                    <Text style={styles.text}>We have sent you an Gmail with a code to the number that you provided.</Text>
                                </View>
                            </View>
                            <View style={styles.emailbox}>
                                <View style={{ width: " 70%", alignItems: 'center' }}>
                                    <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{data.driverEmail}</Text>
                                </View>
                                <TouchableOpacity style={{ width: "20%", alignItems: 'center' }} onPress={() => { editDriver() }}>
                                    <Image source={icons.edit} style={{ width: 30, height: 30, tintColor: color.primaryColors }} />
                                </TouchableOpacity>
                            </View>
                            <View style={{ margin: 10 }}>
                                <TextInput style={styles.input}
                                    placeholder={"eg. 0000"}
                                    placeholderTextColor={'gray'}
                                    onChangeText={(val) => setData({ ...data, driverOtp: val })}
                                    autoCapitalize={'none'}
                                    keyboardType={'number-pad'}
                                    maxLength={4} />
                                {(props?.error) ? <Text style={{ color: 'red', marginTop: 5 }}> * otp invalid  </Text> : null}
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
                            <View style={{ marginHorizontal: 10, marginVertical: 10 }}>
                                <TouchableOpacity style={styles.btn} onPress={() => { UpdateFinish() }}>
                                    <Text style={styles.btnText}>
                                        Finish
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    }
                </View>
            }
        </View>
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
        error: state.addDriver.error
    }
)
export default connect(useSelector, useDispatch)(AddDriver);
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: color.backgroundColor,

    }, inputBox: {
        margin: 20
    },
    input: {
        borderWidth: 2,
        borderColor: color.adminprimaryColors,
        padding: 10,
        fontSize: 18,
        borderRadius: 10
    }, header: {
        marginTop: 40,
        alignItems: 'center',
        marginHorizontal: 20
    },
    headerName: {
        fontSize: 25,
        fontWeight: 'bold',
        letterSpacing: 2,
        color: "#0D1117"
    },
    btn: {
        width: '90%',
        height: 50,
        backgroundColor: color.adminprimaryColors,
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
    resend: {
        fontWeight: "bold",
        color: color.primaryColors,
        fontSize: 18,

    },

    titleComponets: {
        marginHorizontal: 5,
        height: '20%', marginVertical: 30
    },
    title: {
        fontSize: 25,
        fontWeight: 'bold',
        color: color.fontcolor
    },
    text: {
        fontSize: 18,
        color: 'gray',
        margin: 10,
        fontWeight: 'bold',

    },
    borderStyleBase: {
        width: 30,
        height: 45
    },
    resend: {
        fontWeight: "bold",
        color: color.primaryColors,
        fontSize: 18,

    },

    emailbox: {
        alignItems: "center",
        flexDirection: 'row',
        backgroundColor: 'white',
        alignSelf: 'center',
        borderRadius: 15,
        flexDirection: 'row',
        alignItems: 'center',
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        height: 50
    }, image: {
        marginTop: 40,
        overflow: 'hidden',
        alignSelf: 'center',
        width: 120,
        height: 120,
        borderRadius: 10,
        borderWidth: 5,
        borderColor: color.primaryColors
    }
})