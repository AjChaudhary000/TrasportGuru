import { View, Text, Image, StyleSheet, Dimensions, TextInput, TouchableOpacity, StatusBar, Modal, PermissionsAndroid } from 'react-native'
import React from 'react'
import icons from '../contents/icons';
import * as ImagePicker from 'react-native-image-picker'
import { connect } from 'react-redux'
import { userProfile } from '../Redux/userProfileSlice';
import color from '../contents/color';
import LottieView from 'lottie-react-native';
import storage from '@react-native-firebase/storage';
const UserProfile = (props) => {
    const [firebaseImage, setfirebaseImage] = React.useState('');
    const [imageLoading, setImageLoading] = React.useState(false);
    const [transferred, setTransferred] = React.useState(0);
    const [data, setdata] = React.useState({
        username: ''
    })
    React.useEffect(() => {
        props?.userdata.status && props.navigation.replace('Tab')

    }, [props])
    const [modalVisible, setModalVisible] = React.useState(false);
    const camaraLaunch = () => {
        PermissionsAndroid.check('camera').then(response => {
            if (response === true) {
                //Open scanner
            }
            else if (response === false) {
                Alert("Please enable camera permission in device settings.")
            }
        })
        let options = {
            title: 'You can choose one image',
            mediaType: 'photo',
            storageOptions: {
                skipBackup: true,
                path: 'images',
            },
        };
        ImagePicker.launchCamera(options, (Response) => {
            console.log('Response = ', Response)
            if (Response.didCancel) {
                console.log('User cancelled image picker');
            } else if (Response.error) {
                console.log('ImagePicker Error: ', Response.error);
            } else if (Response.customButton) {
                console.log('User tapped custom button: ', Response.customButton);
            } else {
                // setdata({
                //     ...data,
                //     imagepath: response.assets[0]
                // })
            }
        });
        setModalVisible(false)
    }
    const uploadImage = async ({ uri }) => {
        console.log(uri)
        const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri;
        const uniqueSuffix = "user" + Date.now() + "-" + Math.round(Math.random() * 1e9);
        const filename = uniqueSuffix + uploadUri.split('.').pop();;
        setTransferred(0);
        const task = storage()
            .ref(`user/${filename}`)
            .putFile(uploadUri);
        task.on('state_changed', snapshot => {
            setTransferred(
                Math.round(snapshot.bytesTransferred / snapshot.totalBytes) * 10000
            );
        });
        task.then(async (res) => {
            console.log(res)

            const url = await storage().ref(`user/${filename}`).getDownloadURL();
            await setfirebaseImage(url)
            if (res.state === 'success') {
                setTimeout(() => {
                    setImageLoading(false)
                }, 4000)

            }
        })
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
                setModalVisible(false)
            }
        });
    }
    const uploadData = () => {
        if (data.username != "" && firebaseImage != "") {
            props.userProfile({ ...data, image: firebaseImage || '', token: props.token })
            //  console.log({ ...data, image: firebaseImage || '', token: props.token })
            console.log(props.userdata)
        }
    }
    return (

        <View style={styles.contentor}>
            <StatusBar hidden />
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    Alert.alert("Modal has been closed.");
                    setModalVisible(!modalVisible);
                }}
            >
                <View style={styles.modelBox}>
                    <TouchableOpacity style={{ flex: 1, alignItems: 'center' }} onPress={camaraLaunch}>
                        <Image source={icons.camera} style={styles.modelimage} />
                        <Text style={styles.Text}>Camera</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ flex: 1, alignItems: 'center' }} onPress={GalleryLaunch}>
                        <Image source={icons.gallery} style={styles.modelimage} />
                        <Text style={styles.Text}>Gallery</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ flex: 1, alignItems: 'center' }} onPress={() => setModalVisible(false)}>
                        <Image source={icons.remove} style={styles.modelimage} />
                        <Text style={styles.Text}>Remove</Text>
                    </TouchableOpacity>
                </View>
            </Modal>
            <View style={{ paddingTop: 12, height: '30%', justifyContent: 'center' }}>
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
                        <LottieView source={require('../assets/json/uploading1.json')} autoPlay loop />
                    </View>}
            </View>
            <View style={styles.titleComponets}>
                <Text style={styles.title}> Here we go !</Text>
                <View>
                    <Text style={styles.text}> Please provide your name and optional profile photo.</Text>
                </View>
            </View>
            <View style={styles.inputBox}>
                <View style={{ width: "10%", paddingTop: 12 }}>
                    <Image source={icons.user} style={{ width: 35, height: 35, tintColor: color.primaryColors }} />
                </View>
                <View style={{ width: "85%", marginHorizontal: 10 }}>

                    <TextInput style={styles.input} placeholder={"eg: Arjun Chaudhary "}
                        onChangeText={(val) => setdata({ ...data, username: val })}
                        placeholderTextColor={'gray'} />
                </View>
            </View>

            <View style={{ marginTop: 20, height: '10%' }}>
                <TouchableOpacity style={styles.btn} onPress={() => uploadData()}>
                    <Text style={styles.btnText}>
                        Finish
                    </Text>
                </TouchableOpacity>
            </View>
        </View >
    )
}
const useSelector = (state) => {
    return {
        token: state.token.token,
        userdata: state.userProfile.data
    }
}
const useDispatch = (dispatch) => {
    return {
        userProfile: (data) => dispatch(userProfile(data))
    }
}
export default connect(useSelector, useDispatch)(UserProfile)
const styles = StyleSheet.create({
    contentor: {
        flex: 1,
        backgroundColor: color.backgroundColor,
        paddingHorizontal: 20,
    },
    truckLogo: {
        height: '25%',
        width: "40%",


    },
    titleComponets: {
        marginHorizontal: 5,
        height: '20%'
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
    inputBox: {
        marginVertical: 20,
        flexDirection: 'row',
        height: '10%'
    },
    input: {
        borderWidth: 2,
        borderColor: color.primaryColors,
        padding: 10,
        fontSize: 18,
        borderRadius: 10
    },
    btn: {
        width: '90%',
        height: 50,
        backgroundColor: color.primaryColors,
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
    modelBox: {
        width: Dimensions.get('screen').width - 20,
        height: 100,
        position: 'absolute',
        bottom: 0,
        backgroundColor: 'white',
        alignSelf: 'center',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
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
        elevation: 5
    },
    Text: {
        fontSize: 17,
        color: 'black',
        fontWeight: 'bold'
    },
    modelimage: {
        width: 40,
        height: 40,
        tintColor: 'black'
    }, image: {
        marginTop: 40,
        overflow: 'hidden',
        alignSelf: 'center',
        width: 120,
        height: 120,
        borderRadius: 60,
        borderWidth: 5,
        borderColor: color.primaryColors
    },
})