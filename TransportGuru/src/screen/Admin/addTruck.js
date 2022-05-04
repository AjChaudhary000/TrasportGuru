import {
    View, Text, StyleSheet, TextInput, TouchableOpacity, Image, ScrollView
} from 'react-native'
import React from 'react'
import { AdminHeaderWithBackButton } from '../../components/adminHeader';
import color from '../../contents/color'
import icons from '../../contents/icons';
import { connect } from 'react-redux'
import { Dropdown } from 'react-native-element-dropdown';
import { getTruckType } from '../../Redux/Admin/trucktypeSlice';
import { addTruck, setTruckData, updateTruck } from '../../Redux/Admin/addTruckSlice';
import { getCountTruck } from '../../Redux/Admin/countAddSlice'
import LottieView from 'lottie-react-native';
import image from '../../contents/image';
import Toast from 'react-native-simple-toast';
import AnimatedLoader from "react-native-animated-loader";
import ImageModel from '../../components/imageModel';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
const AddTruck = (props) => {
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
    React.useEffect(() => {
        props.getTruckType(props.token)
    }, [])
    React.useEffect(() => {

        if (props?.truckData.status) {
            props.getCountTruck(props.token)
            props.setTruckData({})
            Toast.show("Truck add successful")
            props.navigation.goBack();
        }
        ;
    }, [props])

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
            props.addTruck({ ...data, truckImage: firebaseImage, token: props.token })
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
            props.updateTruck({ ...data, truckImage: firebaseImage, id: props.route.params?.item?._id, token: props.token })
        }

    }
    const renderItem = (item) => {
        return (
            <View style={styles.item(props)}>
                <Text style={styles.textItem(props)}>{item.TruckType}</Text>
                <Text style={styles.textItem(props)}>0 - {item.capicity} tonnes</Text>
                <Image source={image[item.truckTypeImage]} style={{ width: 50, height: 40 }} />
            </View>
        );
    };

    return (
        <View style={styles.container(props)}>

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
                <ScrollView >
                    <AdminHeaderWithBackButton name={"Add Truck"} navigation={props.navigation} />
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
                                    <LottieView source={require('../../assets/json/uploading1.json')} autoPlay loop />
                                </View>}
                        </View>
                        <View style={{ margin: 10 }}>
                            <Dropdown
                                style={styles.dropdown(props)}
                                placeholderStyle={styles.placeholderStyle(props)}
                                selectedTextStyle={styles.selectedTextStyle(props)}
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
                            <TextInput style={styles.input(props)}

                                placeholder={"eg. Truck name"}
                                placeholderTextColor={'gray'}
                                onChangeText={(val) => setData({ ...data, truckName: val })}
                                autoCapitalize={'none'} />

                        </View>
                        <View style={{ margin: 10 }}>
                            <TextInput style={styles.input(props)}
                                placeholder={"eg. Truck model name"}
                                placeholderTextColor={'gray'}
                                onChangeText={(val) => setData({ ...data, truckModelName: val })}
                                autoCapitalize={'none'} />

                        </View>
                        <View style={{ margin: 10 }}>
                            <TextInput style={styles.input(props)}
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
                            <TextInput style={styles.input(props)}
                                placeholder={"eg. Truck Capicity"}
                                placeholderTextColor={'gray'}
                                onChangeText={(val) => setData({ ...data, truckCapicity: val })}
                                autoCapitalize={'none'}
                                keyboardType={'number-pad'} />

                        </View>
                        <View style={{ marginHorizontal: 10, marginVertical: 20 }}>
                            <TouchableOpacity style={styles.btn(props)} onPress={() => { AddTruck() }}>
                                <Text style={styles.btnText}>
                                    Add Truck
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </KeyboardAwareScrollView>
                </ScrollView> :
                <ScrollView >
                    <AdminHeaderWithBackButton name={"Update Truck"} navigation={props.navigation} />
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
                                                    tintColor: color.adminprimaryColors
                                                }}
                                                source={icons.add_photo}
                                            />
                                        </TouchableOpacity> :
                                        <TouchableOpacity onPress={() => { setModalVisible1(true) }} style={styles.image(props)}>
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
                                style={styles.dropdown(props)}
                                placeholderStyle={styles.placeholderStyle(props)}
                                selectedTextStyle={styles.selectedTextStyle(props)}
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
                            <TextInput style={styles.input(props)}
                                defaultValue={props.route.params?.item?.truckName}
                                placeholder={"eg. Truck name"}
                                placeholderTextColor={'gray'}
                                onChangeText={(val) => setData({ ...data, truckName: val })}
                                autoCapitalize={'none'} />

                        </View>
                        <View style={{ margin: 10 }}>
                            <TextInput style={styles.input(props)}
                                defaultValue={props.route.params?.item?.truckModelName}
                                placeholder={"eg. Truck model name"}
                                placeholderTextColor={'gray'}
                                onChangeText={(val) => setData({ ...data, truckModelName: val })}
                                autoCapitalize={'none'} />

                        </View>
                        <View style={{ margin: 10 }}>
                            <TextInput style={styles.input(props)}
                                defaultValue={props.route.params?.item?.truckRegistartionNo}
                                placeholder={"eg. Truck RegistartionNo"}
                                placeholderTextColor={'gray'}
                                onChangeText={(val) => setData({ ...data, truckRegistartionNo: val })}
                                autoCapitalize={'none'} />

                        </View>

                        <View style={{ margin: 10 }}>
                            <TextInput style={styles.input(props)}
                                defaultValue={props.route.params?.item?.truckCapicity}
                                placeholder={"eg. Truck Capicity"}
                                placeholderTextColor={'gray'}

                                onChangeText={(val) => setData({ ...data, truckCapicity: val })}
                                autoCapitalize={'none'}
                                keyboardType={'number-pad'} />

                        </View>
                        <View style={{ marginHorizontal: 10, marginVertical: 20 }}>
                            <TouchableOpacity style={styles.btn(props)} onPress={() => { UpdateTruck() }}>
                                <Text style={styles.btnText}>
                                    Update Truck
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </KeyboardAwareScrollView>
                </ScrollView>}

        </View>
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
const styles = StyleSheet.create({
    container: (props) => [{
        flex: 1,
        backgroundColor: props.theme ? color.drakBackgroundColor : color.backgroundColor

    }], inputBox: {
        marginHorizontal: 20,

    },
    input: (props) => [{
        borderWidth: 2,
        borderColor: props.theme ? color.drakAdminprimaryColors : color.adminprimaryColors,
        color: props.theme ? color.drakFontcolor : color.fontcolor,
        padding: 10,
        fontSize: 18,
        borderRadius: 10
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
    dropdown: (props) => [{
        borderWidth: 2,
        borderColor: props.theme ? color.drakAdminprimaryColors : color.adminprimaryColors,
        padding: 10,
        fontSize: 18,
        borderRadius: 10,

    }],
    item: (props) => [{
        margin: 10,
        padding: 10,
        borderWidth: 2,
        borderColor: props.theme ? color.drakAdminprimaryColors : color.adminprimaryColors,
        borderRadius: 10,
        backgroundColor: props.theme ? color.drakBackgroundColor : color.backgroundColor,

        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    }],
    textItem: (props) => [{
        flex: 1,
        fontSize: 16,
        color: props.theme ? color.drakFontcolor : color.fontcolor,
    }],
    placeholderStyle: (props) => [{
        fontSize: 16,
        color: props.theme ? color.drakFontcolor : color.fontcolor,
    }],
    selectedTextStyle: (props) => [{
        fontSize: 16,
        color: props.theme ? color.drakFontcolor : color.fontcolor,
    }],
    inputSearchStyle: {
        height: 40,
        fontSize: 16,
    }, iconStyle: {
        width: 20,
        height: 20,
    }, image: (props) => [{
        marginTop: 40,
        overflow: 'hidden',
        alignSelf: 'center',
        width: 120,
        height: 120,
        borderRadius: 10,
        borderWidth: 5,
        borderColor: props.theme ? color.drakAdminprimaryColors : color.adminprimaryColors,
    }]
})
