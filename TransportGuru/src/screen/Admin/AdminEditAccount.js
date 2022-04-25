import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, Keyboard, TouchableWithoutFeedback, Modal, ScrollView, Dimensions } from 'react-native'
import React from 'react'
import { connect } from 'react-redux'

import { getUserDetails } from '../../Redux/UserDetails'
import LottieView from 'lottie-react-native';
import Toast from 'react-native-simple-toast';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import ImageModel from '../../components/imageModel'
import color from '../../contents/color'
import icons from '../../contents/icons'
import { AdminHeaderWithBackButton } from '../../components/adminHeader'
import { usereditAccount, setUserData } from '../../Redux/userProfileSlice';
import { getTransportCompanyList } from '../../Redux/transportCompanyListSlice';
import AnimatedLoader from "react-native-animated-loader";
const AdminEditAccount = (props) => {
    const [firebaseImage, setfirebaseImage] = React.useState(props.route.params.item.trasportAccount[0].trasportImage || '');
    const [imageLoading, setImageLoading] = React.useState(false)
    const [modalVisible, setModalVisible] = React.useState(false);
    const [modalVisible1, setModalVisible1] = React.useState(false);
    const [data, setData] = React.useState({
        trasportName: props.route.params.item.trasportAccount[0].trasportName || '',
        trasportAddress: props.route.params.item?.trasportAccount[0].trasportAddress || 'Address',
        trasportmobile: props.route.params.item?.trasportAccount[0]?.trasportmobile || ""
    });
    React.useEffect(() => {
        if (props.userprofile?.status) {
            props.getTransportCompanyList(props.token)
            props.getUserDetails(props.token);
            props.setUserData({})
            props.navigation.goBack();
        }
    }, [props])
    const EditAccount = () => {
        if (data.trasportName === "") {
            Toast.show("Enter  user Name")
        } else if (data.trasportAddress === "") {
            Toast.show("Enter user Address ")
        } else if (data.trasportmobile === "") {
            Toast.show("Enter user mobileno ")
        }
        else if (firebaseImage === "") {
            Toast.show("Select Transport Image")
        } else {
            console.log(data)
            console.log("firebase", firebaseImage)
            props.usereditAccount({ data: { trasportAccount: [{ ...data, trasportImage: firebaseImage }] }, id: props.route.params.item?._id, token: props.token })

        }
    };

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: props.theme ? color.drakBackgroundColor : color.backgroundColor,

        }, inputBox: {
            marginHorizontal: 20,

        },
        input: {
            borderWidth: 2,
            borderColor: props.theme ? color.drakPrimaryColors : color.primaryColors,
            padding: 10,
            fontSize: 18,
            borderRadius: 10, color: props.theme ? color.drakFontcolor : color.fontcolor,
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
        image: {
            marginTop: 40,
            overflow: 'hidden',
            alignSelf: 'center',
            width: 120,
            height: 120,
            borderRadius: 10,
            borderWidth: 5,
            borderColor: props.theme ? color.drakPrimaryColors : color.primaryColors,
        }, modelBox: {
            width: Dimensions.get('screen').width - 20,
            minHeight: 200,

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
            elevation: 5
        },
    })
    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.container}>
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
                        <View style={styles.modelBox}>
                            <ScrollView keyboardShouldPersistTaps="handled" >

                                <GooglePlacesAutocomplete
                                    placeholder='Address'
                                    placeholderTextColor={'gray'}
                                    minLength={2} // minimum length of text to search
                                    fetchDetails={true}

                                    renderDescription={row => row.description} // custom description render
                                    onPress={(dt, details = null) => {
                                        console.log(dt)
                                        setData({ ...data, trasportAddress: dt.description });
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
                        <TouchableOpacity onPress={() => { setModalVisible(false) }} style={{ alignItems: 'center', bottom: 40 }}>
                            <Image source={icons.close} style={{ width: 35, height: 35, tintColor: props.theme ? color.drakAdminprimaryColors : color.adminprimaryColors, }} />
                        </TouchableOpacity>
                    </View>
                </Modal>
                <AdminHeaderWithBackButton name={"Edit Account"} navigation={props.navigation} />
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
                                    <TouchableOpacity style={styles.image} onPress={() => { setModalVisible1(true) }}>
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

                            placeholder={"eg. Trasport Name"}
                            placeholderTextColor={'gray'}
                            defaultValue={data.trasportName}
                            onChangeText={(val) => setData({ ...data, trasportName: val })}
                            autoCapitalize={'none'} />

                    </View>

                    <View style={{ margin: 10 }}>
                        <TextInput style={styles.input}

                            placeholder={"eg. Mobile no"}
                            placeholderTextColor={'gray'}
                            defaultValue={data.trasportmobile}
                            onChangeText={(val) => setData({ ...data, trasportmobile: val })}
                            autoCapitalize={'none'}
                            maxLength={10}
                            keyboardType={'number-pad'} />

                    </View>
                    <View style={{ margin: 10 }}>
                        <TouchableOpacity style={{ width: '100%' }} activeOpacity={0.80} onPress={() => { setModalVisible(true) }}>
                            <Text style={styles.input}>{data.trasportAddress}</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ marginHorizontal: 10, marginVertical: 20 }}>
                        <TouchableOpacity style={styles.btn} onPress={() => { EditAccount() }}>
                            <Text style={styles.btnText}>
                                Continue
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </TouchableWithoutFeedback>
    )
}
const useSelector = (state) => {
    return {
        token: state.token.token,
        userprofile: state.userProfile.data,
        loading: state.userProfile.loading,
        theme: state.token.theme
    }
}
const useDispatch = (dispatch) => {
    return {
        usereditAccount: (data) => dispatch(usereditAccount(data)),
        getUserDetails: (data) => dispatch(getUserDetails(data)),
        setUserData: (data) => dispatch(setUserData(data)),
        getTransportCompanyList: (data) => dispatch(getTransportCompanyList(data))
    }
}
export default connect(useSelector, useDispatch)(AdminEditAccount)
