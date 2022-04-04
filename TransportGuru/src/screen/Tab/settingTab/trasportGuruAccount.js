import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, FlatList, StatusBar } from 'react-native'
import React from 'react'
import color from '../../../contents/color'
import icons from '../../../contents/icons'
import * as ImagePicker from 'react-native-image-picker'
import { HeaderWithBackButton } from '../../../components/header'
import { connect } from 'react-redux'
import { transportAccount } from '../../../Redux/transportAccountSlice'
import { getUserDetails } from '../../../Redux/UserDetails'
import image from '../../../contents/image'
const TrasportGuruAccount = (props) => {
    
    const [imageData, setimage] = React.useState([])
    const [data, setData] = React.useState({
        trasportName: '',
        trasportAddress: ''
    });
    const [isloading, setloadingData] = React.useState(true)
    React.useEffect(() => {
        setTimeout(() => {
            setloadingData(false)
            props.route.params.type === "Admin" && props.navigation.replace('AdminTab')
            props?.admindata.status && props.navigation.replace('AdminTab')
            props.getUserDetails(props.token)
        }, 2000)


    }, [props])


    const TrasportAccount = () => {
        if (data.trasportName != "" && data.trasportAddress != "") {
            props.transportAccount({ ...data, token: props.token })
        }
    };
    const [showimage, setshowimage] = React.useState(false)
    const GalleryLaunch = () => {
        let options = {
            title: 'You can choose one image',
            mediaType: 'photo',
            selectionLimit: 6,
            storageOptions: {
                skipBackup: true,
                path: 'images',
            },
        };
        ImagePicker.launchImageLibrary(options, (response) => {
            //console.log('Response = ', response)
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            } else {
                const source = Object.values(response.assets)
                setimage(source)
                setshowimage(true)
                console.log(imageData)
            }
        });

    }
    if (isloading) {
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
        <View style={styles.container}>
            <HeaderWithBackButton name={"Transport Account"} navigation={props.navigation} />
            <View style={styles.inputBox}>
                <View style={{ marginHorizontal: 10 }}>
                    <TouchableOpacity onPress={GalleryLaunch}>
                        <Image
                            style={{
                                alignSelf: 'center',
                                width: 80,
                                height: 80,
                                borderRadius: 10,
                                resizeMode: 'contain',
                                marginVertical: 30,
                                tintColor: color.primaryColors
                            }}
                            source={icons.add_photo}
                        />
                    </TouchableOpacity>
                    {showimage ?
                        <View style={{ marginLeft: 25, marginRight: 20 }}>
                            <FlatList data={imageData}
                                horizontal
                                showsHorizontalScrollIndicator={false}

                                renderItem={({ item }) => (
                                    <TouchableOpacity
                                        onLongPress={console.log("helo")}
                                        style={{ marginRight: 10 }}>
                                        <Image
                                            style={{
                                                width: 80,
                                                height: 80,
                                                resizeMode: 'contain',
                                                borderRadius: 10,
                                                overflow: 'hidden',
                                            }}
                                            source={{ uri: item.uri }}
                                        />

                                    </TouchableOpacity>
                                )} />
                        </View> : null}
                </View>
                <View style={{ margin: 10 }}>
                    <TextInput style={styles.input}

                        placeholder={"eg. Trasnport name"}
                        placeholderTextColor={'gray'}
                        onChangeText={(val) => setData({ ...data, trasportName: val })}
                        autoCapitalize={'none'} />
                    {/* <Text style={{ color: 'red', marginTop: 5 }}> * Enter value  </Text> */}
                </View>
                <View style={{ margin: 10 }}>
                    <TextInput style={styles.input}
                        placeholder={"eg. Trasnport Address"}
                        placeholderTextColor={'gray'}
                        onChangeText={(val) => setData({ ...data, trasportAddress: val })}
                        autoCapitalize={'none'} />
                    {/* <Text style={{ color: 'red', marginTop: 5 }}> * Enter value  </Text> */}
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
    }
}
const useDispatch = (dispatch) => {
    return {
        transportAccount: (data) => dispatch(transportAccount(data)),
        getUserDetails: (data) => dispatch(getUserDetails(data)),
    }
}
export default connect(useSelector, useDispatch)(TrasportGuruAccount)
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: color.backgroundColor,

    }, inputBox: {
        marginHorizontal: 20,

    },
    input: {
        borderWidth: 2,
        borderColor: color.primaryColors,
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
})