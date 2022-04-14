import { View, Text, StyleSheet, Modal, TouchableOpacity, Dimensions, Image, PermissionsAndroid, Platform } from 'react-native'
import React from 'react'
import color from '../contents/color';
import icons from '../contents/icons';
import storage from '@react-native-firebase/storage';
import * as ImagePicker from 'react-native-image-picker'
const ImageModel = (props) => {
    const [modalVisible1, setModalVisible1] = React.useState(props.modalVisibleData);
    const [transferred, setTransferred] = React.useState(0);
    const camaraLaunch = async () => {
        if (Platform.OS === 'android') {
            const grantedcamera = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.CAMERA,
                {
                    title: "App Camera Permission",
                    message: "App needs access to your camera ",
                    buttonNeutral: "Ask Me Later",
                    buttonNegative: "Cancel",
                    buttonPositive: "OK"
                }
            );
            const grantedstorage = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
                {
                    title: "App Camera Permission",
                    message: "App needs access to your camera ",
                    buttonNeutral: "Ask Me Later",
                    buttonNegative: "Cancel",
                    buttonPositive: "OK"
                }
            );
            if (grantedcamera === PermissionsAndroid.RESULTS.GRANTED && grantedstorage === PermissionsAndroid.RESULTS.GRANTED) {
                console.log("Camera & storage permission given");

                console.log("Camera permission given");
            } else {
                console.log("Camera permission denied");
            }
        }
        let options = {
            title: 'You can choose one image',
            mediaType: 'photo',
                 width: 500,
                height: 500,
                quality: 0.2,
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
                const source = { uri: Response.assets[0].uri };

                props.onGetLoding(true)
                uploadImage(source)
                props.onGetModalVisible(false)
            }
        });

    }
    const GalleryLaunch = () => {
        let options = {
            title: 'You can choose one image',
            width: 500,
            height: 500,
            quality: 0.2,
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
                props.onGetLoding(true)
                uploadImage(source)
                props.onGetModalVisible(false)
            }
        });
    }
    const uploadImage = async ({ uri }) => {
        console.log(uri)
        const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri;
        const uniqueSuffix = props.filename + Date.now() + "-" + Math.round(Math.random() * 1e9);
        const filename = uniqueSuffix + uploadUri.split('.').pop();;
        setTransferred(0);
        const task = storage()
            .ref(`${props.filename}/${filename}`)
            .putFile(uploadUri);
        task.on('state_changed', snapshot => {
            setTransferred(
                Math.round(snapshot.bytesTransferred / snapshot.totalBytes) * 10000
            );
        });
        task.then(async (res) => {
            console.log(res)

            const url = await storage().ref(`${props.filename}/${filename}`).getDownloadURL();
            await  props.onGetImage(url)
            if (res.state === 'success') {
                setTimeout(() => {
                    props.onGetLoding(false)
                }, 4000)
               
            }
        })
    };
    const styles = StyleSheet.create({
        modelBox1: {
            width: Dimensions.get('screen').width - 20,
            height: 100,
            position: 'absolute',
            bottom: 0,
            backgroundColor: props.theme ? color.drakBackgroundColor : color.backgroundColor,
            alignSelf: 'center',
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
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
        Text: {
            fontSize: 17,
            color: props.theme ? color.drakFontcolor : color.fontcolor,
            fontWeight: 'bold'
        },
        modelimage: {
            width: 40,
            height: 40,
            tintColor: props.theme ? color.drakPrimaryColors : color.primaryColors,
        }, image: {
            marginTop: 40,
            overflow: 'hidden',
            alignSelf: 'center',
            width: 120,
            height: 120,
            borderRadius: 60,
            borderWidth: 5,
            borderColor: props.theme ? color.drakPrimaryColors : color.primaryColors,
        },
    })
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible1}

        >
            <View style={styles.modelBox1}>
                <TouchableOpacity style={{ flex: 1, alignItems: 'center' }} onPress={camaraLaunch}>
                    <Image source={icons.camera} style={styles.modelimage} />
                    <Text style={styles.Text}>Camera</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ flex: 1, alignItems: 'center' }} onPress={GalleryLaunch}>
                    <Image source={icons.gallery} style={styles.modelimage} />
                    <Text style={styles.Text}>Gallery</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { setModalVisible1(false), props.onGetModalVisible(false) }} style={{ alignItems: 'center', bottom: 30 }}>
                    <Image source={icons.close} style={{ width: 35, height: 35, tintColor: props.theme ? color.drakPrimaryColors : color.primaryColors, }} />
                </TouchableOpacity>
            </View>
        </Modal>

    )
}

export default ImageModel