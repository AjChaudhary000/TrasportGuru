import {
    View, Text, StyleSheet, TextInput, TouchableOpacity, Image, ScrollView, TouchableWithoutFeedback,
    Keyboard
} from 'react-native'
import React from 'react'
import { AdminHeaderWithBackButton } from '../../components/adminHeader';
import color from '../../contents/color'
import * as ImagePicker from 'react-native-image-picker'
import icons from '../../contents/icons';
import { connect } from 'react-redux'
import { Dropdown } from 'react-native-element-dropdown';
import { getTruckType } from '../../Redux/Admin/trucktypeSlice';
import { getJWTToken } from '../../Redux/helper';
import { addTruck, setTruckData, updateTruck } from '../../Redux/Admin/addTruckSlice';
import { getCountTruck } from '../../Redux/Admin/countAddSlice'
import LottieView from 'lottie-react-native';
import storage from '@react-native-firebase/storage';
import image from '../../contents/image';
import Toast from 'react-native-simple-toast';
import AnimatedLoader from "react-native-animated-loader";
import ImageModel from '../../components/imageModel';
const AddTruck = (props) => {

    const [token, setToken] = React.useState('');
    const [firebaseImage, setfirebaseImage] = React.useState(props.route.params?.item?.truckImage || '');
    const [imageLoading, setImageLoading] = React.useState(false)
    const [modalVisible1, setModalVisible1] = React.useState(false);
    const [value, setValue] = React.useState(null);
    const [data, setData] = React.useState({
        truckName: props.route.params?.item?.truckName || '',
        truckModelName: props.route.params?.item?.truckModelName || '',
        truckRegistartionNo: props.route.params?.item?.truckRegistartionNo || '',
        truckCapicity: props.route.params?.item?.truckCapicity || '',
        truckTypeId: props.route.params?.item?.truckTypeId || ''
    })
    let regno = "";
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
        props.getTruckType(token)
    }, [token])
    React.useEffect(() => {

        if (props?.truckData.status) {
            props.getCountTruck(token)
            props.setTruckData({})
            props.navigation.goBack();
        }
        ;
    }, [props, token])

    const AddTruck = () => {



        if (firebaseImage === "") {
            Toast.show("Select The Truck Image ")
        }
        else if (data.truckTypeId === "") {
            Toast.show("Enter Truck type")
        } else if (data.truckName === "") {
            Toast.show("Enter Truck Name")
        } else if (data.truckModelName === "") {
            Toast.show("Enter Truck Model ")
        } else if (data.truckRegistartionNo === "") {
            Toast.show("Enter Truck RegistartionNo")
        }
        else if (data.truckCapicity === "") {
            Toast.show("Enter Truck capicity")
        } else {
            props.addTruck({ ...data, truckImage: firebaseImage, token: token })
        }

    }
    const UpdateTruck = () => {
        if (firebaseImage === "") {
            Toast.show("Select The Truck Image ")
        }
        else if (data.truckTypeId === "") {
            Toast.show("Enter Truck type")
        } else if (data.truckName === "") {
            Toast.show("Enter Truck Name")
        } else if (data.truckModelName === "") {
            Toast.show("Enter Truck Model ")
        } else if (data.truckRegistartionNo === "") {
            Toast.show("Enter Truck RegistartionNo")
        }
        else if (data.truckCapicity === "") {
            Toast.show("Enter Truck capicity")
        } else {
            props.updateTruck({ ...data, truckImage: firebaseImage, id: props.route.params?.item?._id, token: token })
        }

    }
    const renderItem = (item) => {
        return (
            <View style={styles.item}>
                <Text style={styles.textItem}>{item.TruckType}</Text>
                <Text style={styles.textItem}>0 - {item.capicity} tonnes</Text>
                <Image source={image[item.truckTypeImage]} style={{ width: 50, height: 40 }} />
            </View>
        );
    };
    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: props.theme ? color.drakBackgroundColor : color.backgroundColor

        }, inputBox: {
            marginHorizontal: 20,

        },
        input: {
            borderWidth: 2,
            borderColor: props.theme ? color.drakAdminprimaryColors : color.adminprimaryColors,
            color: props.theme ? color.drakFontcolor : color.fontcolor,
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
        dropdown: {
            borderWidth: 2,
            borderColor: props.theme ? color.drakAdminprimaryColors : color.adminprimaryColors,
            padding: 10,
            fontSize: 18,
            borderRadius: 10,

        },
        icon: {
            marginRight: 5,
        },
        item: {
            margin: 10,
            padding: 10,
            borderWidth: 2,
            borderColor: props.theme ? color.drakAdminprimaryColors : color.adminprimaryColors,
            borderRadius: 10,
            backgroundColor: props.theme ? color.drakBackgroundColor : color.backgroundColor,

            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
        },
        textItem: {
            flex: 1,
            fontSize: 16,
            color: props.theme ? color.drakFontcolor : color.fontcolor,
        },
        placeholderStyle: {
            fontSize: 16,
            color: props.theme ? color.drakFontcolor : color.fontcolor,
        },
        selectedTextStyle: {
            fontSize: 16,
            color: props.theme ? color.drakFontcolor : color.fontcolor,
        },
        inputSearchStyle: {
            height: 40,
            fontSize: 16,
        }, iconStyle: {
            width: 20,
            height: 20,
        }, image: {
            marginTop: 40,
            overflow: 'hidden',
            alignSelf: 'center',
            width: 120,
            height: 120,
            borderRadius: 10,
            borderWidth: 5,
            borderColor: props.theme ? color.drakAdminprimaryColors : color.adminprimaryColors,
        }
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
                    filename={"Driver"}
                    theme={props.theme}
                    modalVisibleData={modalVisible1}
                    onGetImage={(val) => setfirebaseImage(val)}
                    onGetLoding={(val) => setImageLoading(val)}
                    onGetModalVisible={(val) => setModalVisible1(val)} />}
                {!props.route.params?.item?._id ?
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <AdminHeaderWithBackButton name={"Add Truck"} navigation={props.navigation} />
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
                                <Dropdown
                                    style={styles.dropdown}
                                    placeholderStyle={styles.placeholderStyle}
                                    selectedTextStyle={styles.selectedTextStyle}
                                    inputSearchStyle={styles.inputSearchStyle}
                                    iconStyle={styles.iconStyle}
                                    data={props.trucktypeData}
                                    search
                                    maxHeight={300}
                                    labelField="TruckType"
                                    valueField="_id"
                                    placeholder="Select truck type .."
                                    searchPlaceholder="Search..."
                                    value={value}
                                    onChange={item => {
                                        setData({ ...data, truckTypeId: item._id });
                                    }}
                                    renderItem={renderItem}
                                />

                            </View>
                            <View style={{ margin: 10 }}>
                                <TextInput style={styles.input}

                                    placeholder={"eg. Truck name"}
                                    placeholderTextColor={'gray'}
                                    onChangeText={(val) => setData({ ...data, truckName: val })}
                                    autoCapitalize={'none'} />

                            </View>
                            <View style={{ margin: 10 }}>
                                <TextInput style={styles.input}
                                    placeholder={"eg. Truck model name"}
                                    placeholderTextColor={'gray'}
                                    onChangeText={(val) => setData({ ...data, truckModelName: val })}
                                    autoCapitalize={'none'} />

                            </View>
                            <View style={{ margin: 10 }}>
                                <TextInput style={styles.input}
                                    placeholder={"eg. Truck RegistartionNo"}
                                    placeholderTextColor={'gray'}
                                    value={data.truckRegistartionNo}
                                    maxLength={13}
                                    onChangeText={(val) => {
                                        setData({ ...data, truckRegistartionNo: val.toUpperCase() })
                                    }}
                                    autoCapitalize={'none'} />

                            </View>

                            <View style={{ margin: 10 }}>
                                <TextInput style={styles.input}
                                    placeholder={"eg. Truck Capicity"}
                                    placeholderTextColor={'gray'}
                                    onChangeText={(val) => setData({ ...data, truckCapicity: val })}
                                    autoCapitalize={'none'}
                                    keyboardType={'number-pad'} />

                            </View>
                            <View style={{ marginHorizontal: 10, marginVertical: 20 }}>
                                <TouchableOpacity style={styles.btn} onPress={() => { AddTruck() }}>
                                    <Text style={styles.btnText}>
                                        Add Truck
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </ScrollView> :
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <AdminHeaderWithBackButton name={"Update Truck"} navigation={props.navigation} />
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
                                            <TouchableOpacity onPress={() => { setModalVisible1(true) }} style={styles.image}>
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
                                <Dropdown
                                    style={styles.dropdown}
                                    placeholderStyle={styles.placeholderStyle}
                                    selectedTextStyle={styles.selectedTextStyle}
                                    inputSearchStyle={styles.inputSearchStyle}
                                    iconStyle={styles.iconStyle}
                                    data={props.trucktypeData}
                                    search
                                    maxHeight={300}
                                    labelField="TruckType"
                                    valueField="_id"
                                    placeholder="Select truck type .."
                                    searchPlaceholder="Search..."
                                    value={props.route.params?.item?.truckTypeId._id}
                                    onChange={item => {
                                        setData({ ...data, truckTypeId: item._id });
                                    }}
                                    renderItem={renderItem}
                                />

                            </View>
                            <View style={{ margin: 10 }}>
                                <TextInput style={styles.input}
                                    defaultValue={props.route.params?.item?.truckName}
                                    placeholder={"eg. Truck name"}
                                    placeholderTextColor={'gray'}
                                    onChangeText={(val) => setData({ ...data, truckName: val })}
                                    autoCapitalize={'none'} />

                            </View>
                            <View style={{ margin: 10 }}>
                                <TextInput style={styles.input}
                                    defaultValue={props.route.params?.item?.truckModelName}
                                    placeholder={"eg. Truck model name"}
                                    placeholderTextColor={'gray'}
                                    onChangeText={(val) => setData({ ...data, truckModelName: val })}
                                    autoCapitalize={'none'} />

                            </View>
                            <View style={{ margin: 10 }}>
                                <TextInput style={styles.input}
                                    defaultValue={props.route.params?.item?.truckRegistartionNo}
                                    placeholder={"eg. Truck RegistartionNo"}
                                    placeholderTextColor={'gray'}
                                    onChangeText={(val) => setData({ ...data, truckRegistartionNo: val })}
                                    autoCapitalize={'none'} />

                            </View>

                            <View style={{ margin: 10 }}>
                                <TextInput style={styles.input}
                                    defaultValue={props.route.params?.item?.truckCapicity}
                                    placeholder={"eg. Truck Capicity"}
                                    placeholderTextColor={'gray'}

                                    onChangeText={(val) => setData({ ...data, truckCapicity: val })}
                                    autoCapitalize={'none'}
                                    keyboardType={'number-pad'} />

                            </View>
                            <View style={{ marginHorizontal: 10, marginVertical: 20 }}>
                                <TouchableOpacity style={styles.btn} onPress={() => { UpdateTruck() }}>
                                    <Text style={styles.btnText}>
                                        Update Truck
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </ScrollView>}
            </View>
        </TouchableWithoutFeedback>
    )
}
const useDispatch = (dispatch) => {
    return {
        getTruckType: (data) => dispatch(getTruckType(data)),
        addTruck: (data) => dispatch(addTruck(data)),
        getCountTruck: (data) => dispatch(getCountTruck(data)),
        setTruckData: (data) => dispatch(setTruckData(data)),
        updateTruck: (data) => dispatch(updateTruck(data)),

    };
}
const useSelector = (state) => (

    {
        token: state.token.token,
        trucktypeData: state.truck.truckData,
        loading: state.truck.loading,
        truckData: state.addTruck.data,
        theme: state.token.theme
    }
)
export default connect(useSelector, useDispatch)(AddTruck);
