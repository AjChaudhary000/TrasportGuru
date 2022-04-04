import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, FlatList, StatusBar, Animated } from 'react-native'
import React from 'react'
import { AdminHeaderWithBackButton } from '../../components/adminHeader';
import color from '../../contents/color'
import * as ImagePicker from 'react-native-image-picker'
import icons from '../../contents/icons';
import { connect } from 'react-redux'
import { getJWTToken } from '../../Redux/helper';
const AddDriver = (props) => {
    const [token, setToken] = React.useState('');
    const [imageData, setimage] = React.useState([])
    const [showimage, setshowimage] = React.useState(false)
    const [data, setData] = React.useState({
        truckName: '',
        truckModelName: '',
        truckRegistartionNo: '',
        truckCapicity: '',
        truckTypeId: ""
    })
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
        // props.getTruckType(token)
    }, [token])
    React.useEffect(() => {

        if (props?.truckData.status) {
            // props.getCountTruck(token)
            // props.setTruckData({})
            // props.navigation.goBack();
        }
    }, [props, token])

    const AddTruck = () => {
        if (data.truckName !== "" &&
            data.truckModelName !== "" &&
            data.truckRegistartionNo !== "" &&
            data.truckCapicity !== "" &&
            data.truckTypeId !== "") {
            props.addTruck({ ...data, token: token })
        }

    }

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

    return (
        <View style={styles.container}>
            <AdminHeaderWithBackButton name={"Add Driver"} navigation={props.navigation} />
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
                                tintColor: color.adminprimaryColors
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

                        placeholder={"eg. Driver name"}
                        placeholderTextColor={'gray'}
                        onChangeText={(val) => setData({ ...data, truckName: val })}
                        autoCapitalize={'none'} />

                </View>
                <View style={{ margin: 10 }}>
                    <TextInput style={styles.input}
                        placeholder={"eg. Driver mobile No"}
                        placeholderTextColor={'gray'}
                        onChangeText={(val) => setData({ ...data, truckCapicity: val })}
                        autoCapitalize={'none'}
                        keyboardType={'number-pad'} />

                </View>
                <View style={{ margin: 10 }}>
                    <TextInput style={styles.input}
                        placeholder={"eg. Driver email"}
                        placeholderTextColor={'gray'}
                        onChangeText={(val) => setData({ ...data, truckModelName: val })}
                        autoCapitalize={'none'} />

                </View>

                <View style={{ marginHorizontal: 10, marginVertical: 10 }}>
                    <TouchableOpacity style={styles.btn} onPress={() => { AddTruck() }}>
                        <Text style={styles.btnText}>
                            Verify Driver
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}
const useDispatch = (dispatch) => {
    return {
        getTruckType: (data) => dispatch(getTruckType(data)),
        addTruck: (data) => dispatch(addTruck(data)),
        getCountTruck: (data) => dispatch(getCountTruck(data)),
        setTruckData: (data) => dispatch(setTruckData(data))
    };
}
const useSelector = (state) => (

    {
        token: state.token.token,
        trucktypeData: state.truck.truckData,
        loading: state.truck.loading,
        truckData: state.addTruck.data
    }
)
export default connect(useSelector, useDispatch)(AddDriver);
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: color.backgroundColor,

    }, inputBox: {
        marginHorizontal: 20,

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
    btnresend: {
        width: '40%',
        height: 45,
        justifyContent: "center",
        alignItems: 'center',
        alignSelf: 'center'
    }, btnresendText: {
        fontSize: 16,
        color: color.primaryColors,
        fontWeight: 'bold'
    },
})