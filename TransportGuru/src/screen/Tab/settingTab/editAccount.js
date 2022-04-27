import {
    View, Text, StyleSheet, TextInput, TouchableOpacity, Image,
    PermissionsAndroid, Modal, ScrollView, Dimensions, Alert, TouchableWithoutFeedback, Keyboard
} from 'react-native'
import React from 'react'
import color from '../../../contents/color'
import icons from '../../../contents/icons'
import { connect } from 'react-redux'
import { getUserDetails } from '../../../Redux/UserDetails'
import LottieView from 'lottie-react-native';
import Toast from 'react-native-simple-toast';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { HeaderWithBackButton } from '../../../components/header'
import { usereditAccount, setUserData } from '../../../Redux/userProfileSlice'
import ImageModel from '../../../components/imageModel'
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
            console.log(data)
            console.log("firebase", firebaseImage)
            props.usereditAccount({ data: { ...data, image: firebaseImage }, id: props.route.params.item?._id, token: props.token })
        }
    };
    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.container(props)}>

                {modalVisible1 && <ImageModel
                    filename={"user"}
                    theme={props.theme}
                    modalVisibleData={modalVisible1}
                    onGetImage={(val) => setfirebaseImage(val)}
                    onGetLoding={(val) => setImageLoading(val)}
                    onGetModalVisible={(val) => setModalVisible1(val)} />}
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                        Alert.alert("Modal has been closed.");
                        setModalVisible(!modalVisible);
                    }}
                >
                    <View style={{ flex: 1, justifyContent: 'center' }}>
                        <View style={styles.modelBox(props)}>
                            <ScrollView keyboardShouldPersistTaps="handled" >
                                <TouchableOpacity onPress={() => { setModalVisible(false) }} style={{ alignItems: 'center', left: Dimensions.get('screen').width / 2 - 40 }}>
                                    <Image source={icons.close} style={{ width: 35, height: 35, tintColor: props.theme ? color.drakPrimaryColors : color.primaryColors, }} />
                                </TouchableOpacity>
                                <View style={{ marginHorizontal: 30, marginVertical: 20 }}>
                                    <Text style={{ color: 'gray', fontSize: 20, fontWeight: 'bold' }}>Search Your Address</Text>
                                </View>
                                <GooglePlacesAutocomplete
                                    placeholder='Address'
                                    placeholderTextColor={'gray'}
                                    minLength={2} // minimum length of text to search
                                    fetchDetails={true}

                                    renderDescription={row => row.description} // custom description render
                                    onPress={(dt, details = null) => {
                                        console.log(dt)
                                        setData({ ...data, UserAddress: dt.description });
                                        setModalVisible(false)
                                        // console.log(details);
                                    }}
                                    getDefaultValue={() => {
                                        return ''; // text input default value
                                    }}
                                    query={{
                                        // available options: https://developers.google.com/places/web-service/autocomplete
                                        key: 'AIzaSyDwIVgIMPOY0UMpmXrqO0hOBNSTM7dH2pA',
                                        language: 'en', // language of the results
                                        types: '', // default: 'geocode'
                                    }}
                                    styles={{

                                        textInput: {
                                            borderWidth: 2,
                                            borderColor: props.theme ? color.drakAdminprimaryColors : color.adminprimaryColors,
                                            padding: 10,
                                            fontSize: 18,
                                            borderRadius: 10,
                                            marginHorizontal: 30
                                        },
                                        description: {
                                            color: props.theme ? color.drakAdminprimaryColors : color.adminprimaryColors,
                                            fontSize: 18,

                                        }, listView: {
                                            borderWidth: 2,
                                            borderColor: props.theme ? color.drakAdminprimaryColors : color.adminprimaryColors,
                                            padding: 10,
                                            fontSize: 18,
                                            borderRadius: 10,
                                        }
                                    }}

                                    debounce={200}
                                />

                            </ScrollView>
                        </View>

                    </View>
                </Modal>
                <ScrollView>
                    <HeaderWithBackButton name={"Edit Account"} navigation={props.navigation} />
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
                                maxLength={10}
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
                    </View>
                </ScrollView>
            </View>
        </TouchableWithoutFeedback>
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
    }], modelBox: (props) => [{
        width: Dimensions.get('screen').width - 20,
        minHeight: 200,

        backgroundColor: props.theme ? color.drakBackgroundColor : color.backgroundColor,
        alignSelf: 'center',
        borderRadius: 15,
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'center',
        shadowColor: props.theme ? color.drakFontcolor : color.fontcolor,
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    }],
})

