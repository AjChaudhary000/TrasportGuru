import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, FlatList, StatusBar, Modal, ScrollView, Dimensions } from 'react-native'
import React from 'react'
import color from '../../../contents/color'
import icons from '../../../contents/icons'
import * as ImagePicker from 'react-native-image-picker'
import { connect } from 'react-redux'
import { transportAccount } from '../../../Redux/transportAccountSlice'
import { getUserDetails } from '../../../Redux/UserDetails'
import image from '../../../contents/image'
import LottieView from 'lottie-react-native';
import storage from '@react-native-firebase/storage';
import Toast from 'react-native-simple-toast';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { HeaderWithBackButton } from '../../../components/header'

const AdminEditAccount = (props) => {
    const [firebaseImage, setfirebaseImage] = React.useState('');
    const [imageLoading, setImageLoading] = React.useState(false)
    const [modalVisible, setModalVisible] = React.useState(false);
    const [transferred, setTransferred] = React.useState(0);
    const [data, setData] = React.useState({
        username: props.route.params.item.username||'',
        UserAddress: props.route.params.item?.UserAddress||'Address',
        email: props.route.params.item.email||"",
        mobileno:props.route.params.item?.mobileno|| ""
    });
    const [isloading, setloadingData] = React.useState(true)
    React.useEffect(() => {
        setTimeout(() => {
            setloadingData(false)

        }, 2000)


    }, [props])


    const TrasportAccount = () => {
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

            props.transportAccount({ ...data, trasportImage: firebaseImage, token: props.token })
        }
    };
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
        const uniqueSuffix = "Transport" + Date.now() + "-" + Math.round(Math.random() * 1e9);
        const filename = uniqueSuffix + uploadUri.split('.').pop();;
        setTransferred(0);
        const task = storage()
            .ref(`Transport/${filename}`)
            .putFile(uploadUri);
        task.on('state_changed', snapshot => {
            setTransferred(
                Math.round(snapshot.bytesTransferred / snapshot.totalBytes) * 10000
            );
        });
        task.then(async (res) => {
            console.log(res)

            const url = await storage().ref(`Transport/${filename}`).getDownloadURL();
            await setfirebaseImage(url)
            if (res.state === 'success') {
                setTimeout(() => {
                    setImageLoading(false)
                }, 4000)

            }
        })
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
        <View style={styles.container}>
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
                    <TouchableOpacity onPress={() => { setModalVisible(false) }} style={{ alignItems: 'center', bottom: 40 }}>
                        <Image source={icons.close} style={{ width: 35, height: 35, tintColor: props.theme ? color.drakAdminprimaryColors : color.adminprimaryColors, }} />
                    </TouchableOpacity>
                </View>
            </Modal>
            <HeaderWithBackButton name={"Edit Account"} navigation={props.navigation} />
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
                                            tintColor: color.primaryColors
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
                            <LottieView source={require('../../../assets/json/uploading1.json')} autoPlay loop />
                        </View>}
                </View>
                <View style={{ margin: 10 }}>
                    <TextInput style={styles.input}

                        placeholder={"eg. User Name"}
                        placeholderTextColor={'gray'}
                        defaultValue={props.route.params.item.username}
                        onChangeText={(val) => setData({ ...data, username: val })}
                        autoCapitalize={'none'} />

                </View>
                <View style={{ margin: 10 }}>
                    <TextInput style={styles.input}

                        placeholder={"eg. email"}
                        placeholderTextColor={'gray'}
                        defaultValue={props.route.params.item.email}
                        onChangeText={(val) => setData({ ...data, email: val })}
                        autoCapitalize={'none'}
                        keyboardType={'email-address'} />

                </View>
                <View style={{ margin: 10 }}>
                    <TextInput style={styles.input}

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
                        <Text style={styles.input}>{data.UserAddress}</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ marginHorizontal: 10, marginVertical: 20 }}>
                    <TouchableOpacity style={styles.btn} onPress={() => { TrasportAccount() }}>
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
export default connect(useSelector, useDispatch)(AdminEditAccount)