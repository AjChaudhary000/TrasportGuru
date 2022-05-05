import {
    View, Text, StyleSheet, TextInput, TouchableOpacity, Image, Animated
} from 'react-native'
import React from 'react'
import color from '../../../contents/color'
import icons from '../../../contents/icons'
import { connect } from 'react-redux'
import {
    getUserDetails, userEmailCheck, userMobileNoCheck, setEmailCheck,
    setMobileNoCheck, setOtpData, userEmailVerify, userMobileNoVerify
} from '../../../Redux/UserDetails'
import LottieView from 'lottie-react-native';
import Toast from 'react-native-simple-toast';
import { HeaderWithBackButton } from '../../../components/header'
import { usereditAccount, setUserProfile } from '../../../Redux/userProfileSlice'
import ImageModel from '../../../components/imageModel'
import GoogleDialogBox from '../../../components/GoogleDialogBox'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Dropdown } from 'react-native-element-dropdown';
import { CountryCode } from '../../../contents/CountryCode'
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer'
import { sendemail, sendSms, setUserData } from '../../../Redux/sendEmailSlice'
import { ScrollView } from 'react-native-gesture-handler'
const EditAccount = (props) => {
    const [firebaseImage, setfirebaseImage] = React.useState(props.route.params.item.image || '');
    const [imageLoading, setImageLoading] = React.useState(false)
    const [modalVisible, setModalVisible] = React.useState(false);
    const [modalVisible1, setModalVisible1] = React.useState(false);
    const [value, setValue] = React.useState("+91");
    const [verifyScreen, setVerifyScreen] = React.useState(false)
    const [data, setData] = React.useState({
        username: props.route.params.item.username || '',
        UserAddress: props.route.params.item?.address || 'Address',
        email: props.route.params.item.email || "",
        mobileno: props.route.params.item?.mobileno || ""
    });
    const [isTimerView, setIsTmerView] = React.useState(true);
    const [otp, setOtp] = React.useState()
    React.useEffect(() => {
        try {
            if (props.userprofile?.status) {
                props.getUserDetails(props.token);
                props.setUserProfile({})
                Toast.show("User Profile Update successful")
                props.navigation.goBack();
            }
            if (!props.route.params.item.emailVerify && props.emailCheck?.status) {
                if (props.emailCheck?.data.length === 0) {
                    props.sendemail(data.email)
                    props.setEmailCheck({})
                } else {
                    Toast.show("email already exists")
                }
            }
            if (!props.route.params.item.mobileNoVerify && props.mobileNoCheck?.status) {
                if (props.mobileNoCheck?.data.length === 0) {
                    props.sendSms(`${value}${data.mobileno}`)

                    props.setMobileNoCheck({})
                } else {
                    Toast.show("mobile no already exists")
                }
            }
            if (!props.route.params.item.mobileNoVerify && props.userdata?.status) {
                setVerifyScreen(true)
                props.setUserData({})
            }
            if (!props.route.params.item.emailVerify && props.userdata?.status) {
                setVerifyScreen(true)
                props.setUserData({})
            }
            if (!props.route.params.item.mobileNoVerify && props?.otpdata.status) {
                const { username, UserAddress, email, mobileno } = data
                props.usereditAccount({ data: { username, address: UserAddress, email, mobileno: `${value}${mobileno}`, image: firebaseImage, mobileNoVerify: true }, id: props.route.params.item?._id, token: props.token })
                props.setOtpData({})
            }
            if (!props.route.params.item.emailVerify && props?.otpdata.status) {
                const { username, UserAddress, email, mobileno } = data
                props.usereditAccount({ data: { username, address: UserAddress, email, mobileno: `${value}${mobileno}`, image: firebaseImage, emailVerify: true }, id: props.route.params.item?._id, token: props.token })
                props.setOtpData({})
            }
            if (props?.error) {
                Toast.show(props.error);
            }
        } catch (e) {
            console.log("mydata ", e)
        }

    }, [props])
    const resendOtp = () => {
        !props.route.params.item.mobileNoVerify && props.sendemail(data.email)
        !props.route.params.item.emailVerify && props.sendSms(`${value}${data.mobileno}`)
        setIsTmerView(true)
    }
    const VerifyUser = () => {
        if (data.username === "") {
            Toast.show("Enter  user Name")
        } else if (data.UserAddress === "Address") {
            Toast.show("Enter user Address ")
        } else if (data.mobileno === "") {
            Toast.show("Enter user mobileno ")
        }
        else if (data.email === "") {
            Toast.show("Enter user email ")
        } else if (firebaseImage === "") {
            Toast.show("Select Transport Image")
        } else {
            if (!props.route.params.item.emailVerify) {
                props.userEmailCheck({ email: data.email, token: props.token })
            } if (!props.route.params.item.mobileNoVerify) {
                props.userMobileNoCheck({ mobileno: `${value}${data.mobileno}`, token: props.token })
            }
            if (props.route.params.item.emailVerify && props.route.params.item.mobileNoVerify) {
                const { username, UserAddress } = data
                props.usereditAccount({ data: { username, address: UserAddress, image: firebaseImage }, id: props.route.params.item?._id, token: props.token })
            }
        }
    }
    const Finish = () => {
        if (otp.length === 4) {
            if (!props.route.params.item.emailVerify) {
                props.userEmailVerify({ data: { email: data.email, otp: otp }, token: props.token })
            } if (!props.route.params.item.mobileNoVerify) {
                props.userMobileNoVerify({ data: { mobileno: `${value}${data.mobileno}`, otp: otp }, token: props.token })
            }
        } else {
            Toast.show("Enter otp")
        }
    }
    const renderItem = (item) => {
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
        <View style={styles.container(props)}>
            {modalVisible1 && <ImageModel
                filename={"user"}
                theme={props.theme}
                modalVisibleData={modalVisible1}
                onGetImage={(val) => setfirebaseImage(val)}
                onGetLoding={(val) => setImageLoading(val)}
                onGetModalVisible={(val) => setModalVisible1(val)} />}
            <GoogleDialogBox
                modalVisibleData={modalVisible}
                theme={props.theme}
                title={"Search Your Address"}
                setPlaceTypeData={"Address"}
                onGet={(val) => setModalVisible(val)}
                onGetData={(val) => {
                    setData({ ...data, UserAddress: val.name })
                }}
            />
            <View>
                <HeaderWithBackButton name={"Edit Account"} navigation={props.navigation} />
                {!verifyScreen ?
                    <ScrollView>
                        <KeyboardAwareScrollView style={styles.inputBox} showsVerticalScrollIndicator={false}>
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
                                                        tintColor: color.primaryColors
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
                                        <LottieView source={require('../../../assets/json/uploading1.json')} autoPlay loop />
                                    </View>}
                            </View>
                            <View style={{ margin: 10 }}>
                                <TextInput style={styles.input(props)}

                                    placeholder={"eg. User Name"}
                                    placeholderTextColor={'gray'}
                                    defaultValue={props.route.params.item.username}
                                    onChangeText={(val) => setData({ ...data, username: val })}
                                    autoCapitalize={'none'} />

                            </View>
                            <View style={{ margin: 10 }}>
                                {props.route.params.item.emailVerify ?
                                    <Text style={styles.input(props)}>
                                        {props.route.params.item.email}
                                    </Text> :
                                    <TextInput style={styles.input(props)}

                                        placeholder={"eg. email"}
                                        placeholderTextColor={'gray'}
                                        defaultValue={props.route.params.item.email}
                                        onChangeText={(val) => setData({ ...data, email: val })}
                                        autoCapitalize={'none'}
                                        keyboardType={'email-address'} />
                                }
                            </View>
                            {!props.route.params.item.mobileNoVerify &&
                                <View style={{ margin: 10 }}>
                                    <View style={{ width: "100%" }}>
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
                            }
                            <View style={{ margin: 10 }}>
                                {props.route.params.item.mobileNoVerify ?
                                    <Text style={styles.input(props)}>
                                        {props.route.params.item.mobileno}
                                    </Text> :
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                        <View style={{
                                            width: "20%", justifyContent: 'center', alignItems: 'center', borderWidth: 2
                                            , borderColor: color.primaryColors,
                                            borderRadius: 5
                                        }}>
                                            <Text style={{ color: 'gray', fontSize: 20 }}>{value}</Text>
                                        </View>
                                        <View style={{ width: "75%" }}>
                                            <TextInput style={styles.input(props)}
                                                placeholder={"eg. Phone No "}
                                                placeholderTextColor={'gray'}
                                                onChangeText={(val) => setData({ ...data, mobileno: val })}
                                                keyboardType={'number-pad'}
                                                maxLength={10}
                                                autoCapitalize={'none'} />
                                        </View>
                                    </View>
                                }
                            </View>
                            <View style={{ margin: 10 }}>
                                <TouchableOpacity style={{ width: '100%' }} activeOpacity={0.80} onPress={() => { setModalVisible(true) }}>
                                    <Text style={styles.input(props)}>{data.UserAddress}</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={{ marginHorizontal: 10, marginVertical: 20 }}>
                                <TouchableOpacity style={styles.btn(props)} onPress={() => { VerifyUser() }}>
                                    <Text style={styles.btnText}>
                                        Verify
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </KeyboardAwareScrollView>
                    </ScrollView> :
                    <ScrollView>
                        <KeyboardAwareScrollView style={styles.otpBox} showsVerticalScrollIndicator={false}>
                            <View style={styles.emailbox(props)}>
                                <View style={{ width: " 70%", alignItems: 'center' }}>
                                    <Text style={{
                                        fontSize: 20, fontWeight: 'bold',
                                        color: props.theme ? color.drakFontcolor : color.fontcolor,
                                    }}>
                                        {!props.route.params.item.emailVerify && data.email}
                                        {!props.route.params.item.mobileNoVerify && `${value}${data.mobileno}`}
                                    </Text>
                                </View>
                                <TouchableOpacity style={{ width: "20%", alignItems: 'center' }}
                                    onPress={() => {
                                        setVerifyScreen(false)
                                    }}>
                                    <Image source={icons.edit} style={{ width: 20, height: 20, tintColor: props.theme ? color.drakPrimaryColors : color.primaryColors, }} />
                                </TouchableOpacity>
                            </View>
                            <View style={styles.inputBox}>
                                <TextInput style={styles.input(props)}
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
                                            <Animated.Text style={styles.resend(props)}>
                                                Resend Code :{remainingTime}
                                            </Animated.Text>
                                        )}

                                    </CountdownCircleTimer>
                                </View>
                            ) : (<View style={{ marginTop: 20, height: '10%' }}>
                                <TouchableOpacity style={styles.btnresend} onPress={() => resendOtp()}>
                                    <Text style={styles.btnresendText(props)}>
                                        Resend Code
                                    </Text>
                                </TouchableOpacity>
                            </View>)}



                            <View style={{ marginTop: 20, height: '10%' }}>
                                <TouchableOpacity style={styles.btn(props)} onPress={() => Finish()}>
                                    <Text style={styles.btnText}>
                                        Finish
                                    </Text>
                                </TouchableOpacity>
                            </View>


                        </KeyboardAwareScrollView>
                    </ScrollView>

                }
            </View >
        </View >

    )
}
const useSelector = (state) => {
    return {
        token: state.token.token,
        userprofile: state.userProfile.data,
        theme: state.token.theme,
        emailCheck: state.user.emailCheck,
        mobileNoCheck: state.user.mobileNoCheck,
        userdata: state.login.userdata,
        otpdata: state.user.otpdata,
        error: state.user.error
    }
}
const useDispatch = (dispatch) => {
    return {
        usereditAccount: (data) => dispatch(usereditAccount(data)),
        getUserDetails: (data) => dispatch(getUserDetails(data)),
        userEmailCheck: (data) => dispatch(userEmailCheck(data)),
        userMobileNoCheck: (data) => dispatch(userMobileNoCheck(data)),
        setUserProfile: (data) => dispatch(setUserProfile(data)),
        setEmailCheck: (data) => dispatch(setEmailCheck(data)),
        setMobileNoCheck: (data) => dispatch(setMobileNoCheck(data)),
        sendemail: (data) => dispatch(sendemail(data)),
        sendSms: (data) => dispatch(sendSms(data)),
        setUserData: (data) => dispatch(setUserData(data)),
        setOtpData: (data) => dispatch(setOtpData(data)),
        userEmailVerify: (data) => dispatch(userEmailVerify(data)),
        userMobileNoVerify: (data) => dispatch(userMobileNoVerify(data)),
    }
}
export default connect(useSelector, useDispatch)(EditAccount);

const styles = StyleSheet.create({
    container: (props) => [{
        flex: 1,
        backgroundColor: props.theme ? color.drakBackgroundColor : color.backgroundColor,

    }], inputBox: {
        marginHorizontal: 20,

    },
    input: (props) => [{
        borderWidth: 2,
        borderColor: props.theme ? color.drakPrimaryColors : color.primaryColors,
        padding: 10,
        fontSize: 18,
        borderRadius: 5, color: props.theme ? color.drakFontcolor : color.fontcolor,
    }],
    btn: (props) => [{
        width: '90%',
        height: 50,
        backgroundColor: props.theme ? color.drakPrimaryColors : color.primaryColors,
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
    dropdown: (props) => [{
        borderWidth: 2,
        borderColor: props.theme ? color.drakPrimaryColors : color.primaryColors,
        padding: 10,
        fontSize: 18,
        borderRadius: 5,

    }],
    item: (props) => [{
        margin: 10,
        padding: 10,
        borderWidth: 2,
        borderColor: props.theme ? color.drakPrimaryColors : color.primaryColors,
        borderRadius: 5,
        backgroundColor: props.theme ? color.drakBackgroundColor : color.backgroundColor,
        flexDirection: 'row',
        alignItems: 'center',
    }],
    textItem: (props) => [{
        flex: 1,
        fontSize: 16,
        color: props.theme ? color.drakFontcolor : color.fontcolor,
    }],
    placeholderStyle: (props) => [{
        fontSize: 16,
        color: props.theme ? color.drakFontcolor : color.fontcolor,
    }],
    selectedTextStyle: (props) => [{
        fontSize: 16,
        color: props.theme ? color.drakFontcolor : color.fontcolor,
    }],
    inputSearchStyle: {
        height: 40,
        fontSize: 16,
    }, iconStyle: {
        width: 20,
        height: 20,
    },
    emailbox: (props) => [{
        alignItems: "center",
        flexDirection: 'row',
        backgroundColor: props.theme ? color.drakBackgroundColor : color.backgroundColor,
        alignSelf: 'center',
        borderRadius: 5,
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
        height: 50,
        marginVertical: 10
    }],
    resend: (props) => [{
        fontWeight: "bold",
        color: props.theme ? color.drakPrimaryColors : color.primaryColors,
        fontSize: 18,

    }],
    btnresend: {
        width: '40%',
        height: 45,
        justifyContent: "center",
        alignItems: 'center',
        alignSelf: 'center'
    }, btnresendText: (props) => [{
        fontSize: 16,
        color: props.theme ? color.drakPrimaryColors : color.primaryColors,
        fontWeight: 'bold'
    }],
    otpBox: {
        marginTop: 200
    }
})

