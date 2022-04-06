import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, FlatList, StatusBar } from 'react-native'
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
const AddTruck = (props) => {

    const [token, setToken] = React.useState('');
    const [imageData, setimage] = React.useState([])
    const [showimage, setshowimage] = React.useState(false)
    const [value, setValue] = React.useState(null);
    const [data, setData] = React.useState({
        truckName: props.route.params?.item?.truckName || '',
        truckModelName: props.route.params?.item?.truckModelName || '',
        truckRegistartionNo: props.route.params?.item?.truckRegistartionNo || '',
        truckCapicity: props.route.params?.item?.truckCapicity || '',
        truckTypeId: props.route.params?.item?.truckTypeId || ''
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
        props.getTruckType(token)
    }, [token])
    React.useEffect(() => {

        if (props?.truckData.status) {
            props.getCountTruck(token)
            props.setTruckData({})
            props.navigation.goBack();
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
    const UpdateTruck = () => {
        if (data.truckName !== "" &&
            data.truckModelName !== "" &&
            data.truckRegistartionNo !== "" &&
            data.truckCapicity !== "" &&
            data.truckTypeId !== "") {
            props.updateTruck({ ...data, id: props.route.params?.item?._id, token: token })
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
    const renderItem = (item) => {
        return (
            <View style={styles.item}>
                <Text style={styles.textItem}>{item.TruckType}</Text>
                <Image source={icons.truck} style={{ width: 30, height: 30, tintColor: color.primaryColors }} />
            </View>
        );
    };
    return (
        <View style={styles.container}>
            {!props.route.params?.item?._id ?
                <View>
                    <AdminHeaderWithBackButton name={"Add Truck"} navigation={props.navigation} />
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
                                onChangeText={(val) => setData({ ...data, truckRegistartionNo: val })}
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
                </View> :
                <View>
                    <AdminHeaderWithBackButton name={"Update Truck"} navigation={props.navigation} />
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
                </View>}
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
        truckData: state.addTruck.data
    }
)
export default connect(useSelector, useDispatch)(AddTruck);
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
    dropdown: {
        borderWidth: 2,
        borderColor: color.adminprimaryColors,
        padding: 10,
        fontSize: 18,
        borderRadius: 10
    },
    icon: {
        marginRight: 5,
    },
    item: {
        padding: 17,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    textItem: {
        flex: 1,
        fontSize: 16,
    },
    placeholderStyle: {
        fontSize: 16,
    },
    selectedTextStyle: {
        fontSize: 16,
    },
    inputSearchStyle: {
        height: 40,
        fontSize: 16,
    }, iconStyle: {
        width: 20,
        height: 20,
    },
})