import {
    View, Text, StyleSheet, TextInput, TouchableOpacity, Image
} from 'react-native'
import React from 'react'
import color from '../../../contents/color'
import icons from '../../../contents/icons'
import { connect } from 'react-redux'
import { getUserDetails } from '../../../Redux/UserDetails'
import LottieView from 'lottie-react-native';
import Toast from 'react-native-simple-toast';
import { HeaderWithBackButton } from '../../../components/header'
import { usereditAccount, setUserData } from '../../../Redux/userProfileSlice'
import ImageModel from '../../../components/imageModel'
import GoogleDialogBox from '../../../components/GoogleDialogBox'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
const EditAccount = (props) => {
    const [firebaseImage, setfirebaseImage] = React.useState(props.route.params.item.image || '');
    const [imageLoading, setImageLoading] = React.useState(false)
    const [modalVisible, setModalVisible] = React.useState(false);
    const [modalVisible1, setModalVisible1] = React.useState(false);
    const [data, setData] = React.useState({
        username: props.route.params.item.username || '',
        UserAddress: props.route.params.item?.address || 'Address',
        email: props.route.params.item.email || "",
        mobileno: props.route.params.item?.mobileno || ""
    });

    React.useEffect(() => {
        try {
            if (props.userprofile?.status) {
                props.getUserDetails(props.token);
                props.setUserData({})
                props.navigation.goBack();

            }
        } catch (e) {
            console.log("mydata ", e)
        }
    }, [props])
    const EditAccount = () => {
        if (data.username === "") {
            Toast.show("Enter  user Name")
        } else if (data.UserAddress === "") {
            Toast.show("Enter user Address ")
        } else if (data.mobileno === "") {
            Toast.show("Enter user mobileno ")
        }
        else if (data.email === "") {
            Toast.show("Enter user email ")
        } else if (firebaseImage === "") {
            Toast.show("Select Transport Image")
        } else {
            console.log("firebase", firebaseImage)
            props.usereditAccount({ data: { ...data, image: firebaseImage }, id: props.route.params.item?._id, token: props.token })
        }
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
                        <TextInput style={styles.input(props)}

                            placeholder={"eg. email"}
                            placeholderTextColor={'gray'}
                            defaultValue={props.route.params.item.email}
                            onChangeText={(val) => setData({ ...data, email: val })}
                            autoCapitalize={'none'}
                            keyboardType={'email-address'} />

                    </View>
                    <View style={{ margin: 10 }}>
                        <TextInput style={styles.input(props)}

                            placeholder={"eg. Mobile no"}
                            placeholderTextColor={'gray'}
                            defaultValue={props.route.params.item?.mobileno}
                            onChangeText={(val) => setData({ ...data, mobileno: val })}
                            autoCapitalize={'none'}
                            maxLength={13}
                            keyboardType={'number-pad'} />

                    </View>
                    <View style={{ margin: 10 }}>
                        <TouchableOpacity style={{ width: '100%' }} activeOpacity={0.80} onPress={() => { setModalVisible(true) }}>
                            <Text style={styles.input(props)}>{data.UserAddress}</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ marginHorizontal: 10, marginVertical: 20 }}>
                        <TouchableOpacity style={styles.btn(props)} onPress={() => { EditAccount() }}>
                            <Text style={styles.btnText}>
                                Continue
                            </Text>
                        </TouchableOpacity>
                    </View>
                </KeyboardAwareScrollView>
            </View>
        </View>

    )
}
const useSelector = (state) => {
    return {
        token: state.token.token,
        userprofile: state.userProfile.data,
        theme: state.token.theme
    }
}
const useDispatch = (dispatch) => {
    return {
        usereditAccount: (data) => dispatch(usereditAccount(data)),
        getUserDetails: (data) => dispatch(getUserDetails(data)),
        setUserData: (data) => dispatch(setUserData(data)),
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
        borderRadius: 10, color: props.theme ? color.drakFontcolor : color.fontcolor,
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
    }]
})

