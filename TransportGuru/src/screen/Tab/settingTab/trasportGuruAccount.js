import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, FlatList, StatusBar, Modal, ScrollView, Dimensions } from 'react-native'
import React from 'react'
import color from '../../../contents/color'
import icons from '../../../contents/icons'
import { connect } from 'react-redux'
import { transportAccount } from '../../../Redux/transportAccountSlice'
import { getUserDetails } from '../../../Redux/UserDetails'
import image from '../../../contents/image'
import LottieView from 'lottie-react-native';
import Toast from 'react-native-simple-toast';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import ImageModel from '../../../components/imageModel'
import { AdminHeaderWithBackButton } from '../../../components/adminHeader'
const TrasportGuruAccount = (props) => {
    const [firebaseImage, setfirebaseImage] = React.useState('');
    const [imageLoading, setImageLoading] = React.useState(false)
    const [modalVisible, setModalVisible] = React.useState(false);
    const [modalVisible1, setModalVisible1] = React.useState(false);
    const [data, setData] = React.useState({
        trasportName: '',
        trasportAddress: 'Address'
    });
    const [isloading, setloadingData] = React.useState(true)
    React.useEffect(() => {
        setTimeout(() => {
            setloadingData(false)
            if (props.route.params.type === "Admin") {
                Toast.show("Admin Side Open")
                props.navigation.replace('AdminTab')
            }

            if (props?.admindata.status) {
                Toast.show("Admin Side Open")
                props.navigation.replace('AdminTab')
            }
            props.getUserDetails(props.token)
        }, 2000)
    }, [props])


    const TrasportAccount = () => {
        if (data.trasportName === "") {
            Toast.show("Enter The Trasport Name")
        } else if (data.trasportAddress === "") {
            Toast.show("Enter Transport Address ")
        } else if (firebaseImage === "") {
            Toast.show("Select Transport Image")
        } else {

            props.transportAccount({ ...data, trasportImage: firebaseImage, token: props.token })
        }
    };

    console.log("loading ", props.loading)
    if (isloading || props.loading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: color.adminprimaryColors }}>
                <StatusBar hidden />
                <View>
                    <Image source={image.Tg} style={{ width: 300, height: 200 }} />
                </View>
            </View>
        );
    }

    return (
        <View style={styles.container(props)}>
            {modalVisible1 && <ImageModel
                filename={"Transport"}
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
                </View>
            </Modal>
            <AdminHeaderWithBackButton name={"Transport Account"} navigation={props.navigation} />
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
                                            tintColor: color.adminprimaryColors
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

                        placeholder={"eg. Trasnport name"}
                        placeholderTextColor={'gray'}
                        onChangeText={(val) => setData({ ...data, trasportName: val })}
                        autoCapitalize={'none'} />
                    {/* <Text style={{ color: 'red', marginTop: 5 }}> * Enter value  </Text> */}
                </View>
                <View style={{ margin: 10 }}>
                    <TouchableOpacity style={{ width: '100%' }} activeOpacity={0.80} onPress={() => { setModalVisible(true) }}>
                        <Text style={styles.input(props)}>{data.trasportAddress}</Text>
                    </TouchableOpacity>

                    {/* <Text style={{ color: 'red', marginTop: 5 }}> * Enter value  </Text> */}
                </View>
                <View style={{ marginHorizontal: 10, marginVertical: 20 }}>
                    <TouchableOpacity style={styles.btn(props)} onPress={() => { TrasportAccount() }}>
                        <Text style={styles.btnText}>
                            Continue
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}
const useSelector = (state) => {
    return {
        token: state.token.token,
        admindata: state.admin.data,
        loading: state.admin.loading,
        theme: state.token.theme
    }
}
const useDispatch = (dispatch) => {
    return {
        transportAccount: (data) => dispatch(transportAccount(data)),
        getUserDetails: (data) => dispatch(getUserDetails(data)),

    }
}
export default connect(useSelector, useDispatch)(TrasportGuruAccount);
const styles = StyleSheet.create({
    container: (props) => [{
        flex: 1,
        backgroundColor: props.theme ? color.drakBackgroundColor : color.backgroundColor,

    }], inputBox: {
        marginHorizontal: 20,

    },
    input: (props) => [{
        borderWidth: 2,
        borderColor: props.theme ? color.drakAdminprimaryColors : color.adminprimaryColors,
        padding: 10,
        fontSize: 18,
        borderRadius: 10, color: props.theme ? color.drakFontcolor : color.fontcolor,
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
    image: (props) => [{
        marginTop: 40,
        overflow: 'hidden',
        alignSelf: 'center',
        width: 120,
        height: 120,
        borderRadius: 10,
        borderWidth: 5,
        borderColor: props.theme ? color.drakAdminprimaryColors : color.adminprimaryColors,
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
