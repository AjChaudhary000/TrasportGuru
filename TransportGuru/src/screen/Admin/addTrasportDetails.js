import {
    View, Text, StyleSheet, TextInput, TouchableOpacity, Image, Dimensions, ScrollView, TouchableWithoutFeedback,
    Keyboard, Modal
} from 'react-native'
import React from 'react'
import { AdminHeaderWithBackButton } from '../../components/adminHeader';
import color from '../../contents/color'
import icons from '../../contents/icons';
import { connect } from 'react-redux'
import { Dropdown } from 'react-native-element-dropdown';
import { getDriverList } from '../../Redux/Admin/driverListSlice';
import { getTruckList } from '../../Redux/Admin/truckListSlice';
import DatePicker from 'react-native-date-picker'
import { getRouteList } from '../../Redux/Admin/routeSlice';
import { addTransport, setTransportData, updateTransport } from '../../Redux/Admin/transportSlice';
import { getCountTransport } from '../../Redux/Admin/countAddSlice';
import Toast from 'react-native-simple-toast';
const AddTrasportDetails = (props) => {
    const [modalVisible, setModalVisible] = React.useState(false);
    const [placetype, setPlaceType] = React.useState()
    const [value, setValue] = React.useState(null);
    const [date, setDate] = React.useState(new Date())
    const [open, setOpen] = React.useState(false)
    const [data, setData] = React.useState({
        routeId: props.route.params?.item?.routeId || '',
       
        Truckdate: props.route.params?.item?.Truckdate || '',
        truckId: props.route.params?.item?.truckId || "",
        driverId: props.route.params?.item?.driverId || "",
        truckPrice: props.route.params?.item?.truckPrice
    })
   
    React.useEffect(() => {
       
        props.getDriverList(props.token)
        props.getTruckList(props.token)
        props.getRouteList(props.token)
    }, [])
    React.useEffect(() => {
        if (props?.transportData.status) {
            props.getCountTransport(props.token)
            props.setTransportData({})
            props.navigation.goBack();
        }
    }, [props])
    const AddTrasport = () => {
        if (data.routeId === "") {
            Toast.show("Select Route")
        } else if (data.Truckdate === "") {
            Toast.show("Select Truck Date")
        } else if (data.driverId === "") {
            Toast.show("Select Driver")
        } else if (data.truckPrice === "") {
            Toast.show("Enter Truck Price ")
        } else {
            props.addTransport({ ...data, token:props.token })
        }

    }
    const UpdateTrasport = () => {
        if (data.routeId === "") {
            Toast.show("Select Route")
        } else if (data.Truckdate === "") {
            Toast.show("Select Truck Date")
        } else if (data.driverId === "") {
            Toast.show("Select Driver")
        } else if (data.truckId === "") {
            Toast.show("Select truck")
        } else if (data.truckPrice === "") {
            Toast.show("Enter Truck Price ")
        } else {
            props.updateTransport({ data, id: props.route.params?.item?._id, token: props.token })
        }
    }
    const renderItemDriver = (item) => {
        return (
            <View style={styles.item}>
                <Text style={styles.textItem}>{item.driverName}</Text>
                <Image source={{ uri: item.driverImage }} style={{ width: 30, height: 30 }} />
            </View>
        );
    };
    const renderItemTruck = (item) => {

        return (
            <View style={styles.item}>
                <Text style={styles.textItem}>{item.truckRegistartionNo}</Text>
                <Image source={{ uri: item.truckImage }} style={{ width: 30, height: 30 }} />
            </View>
        );
    };
    const renderItemRoute = (item) => {

        return (
            <View style={{ borderWidth: 2, backgroundColor: props.theme ? color.drakBackgroundColor : color.backgroundColor, margin: 20, borderRadius: 10, borderColor: props.theme ? color.drakAdminprimaryColors : color.adminprimaryColors }}>

                <View style={{ alignItems: "center" }}>
                    <Text style={{ fontWeight: 'bold', color: props.theme ? color.drakFontcolor : color.fontcolor }}>
                        {item.from.name}
                    </Text>
                </View>
                <View style={{ alignItems: "center", paddingVertical: 10 }}>
                    <Image source={icons.upToDown} style={{ width: 20, height: 20, tintColor: props.theme ? color.drakAdminprimaryColors : color.adminprimaryColors }} />
                </View>
                <View style={{ alignItems: "center" }}>
                    <Text style={{ fontWeight: 'bold', color: props.theme ? color.drakFontcolor : color.fontcolor }}>
                        {item.destination.name}
                    </Text>
                </View>
            </View >
        );
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
            borderColor: props.theme ? color.drakAdminprimaryColors : color.adminprimaryColors,
            padding: 10,
            fontSize: 18,
            borderRadius: 10,
            color: props.theme ? color.drakFontcolor : color.fontcolor,
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
            backgroundColor: props.theme ? color.drakAdminprimaryColors : color.adminprimaryColors,
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
        },
        modelBox: {
            width: Dimensions.get('screen').width - 20,
            minHeight: 200,
            paddingHorizontal: 20,
            backgroundColor: props.theme ? color.drakBackgroundColor : color.backgroundColor,
            alignSelf: 'center',
            borderRadius: 15,
            justifyContent: "center",
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
                            <Text style={{ color: 'red', fontWeight: 'bold' }}>*Note :- Truck calculation  </Text>

                            <Text style={{ color: 'red', fontWeight: 'bold' }}>* Ex: 10 Km , 10 Tonne , Price 10, </Text>
                            <Text style={{ color: 'gray', fontWeight: 'bold' }}> totalPrice = Price * Tonne * Km </Text>
                            <Text style={{ color: 'gray', fontWeight: 'bold' }}> 1000 = 10 * 10 * 10 </Text>
                            <Text style={{ color: 'red', fontWeight: 'bold' }}>* Ex2: 2 Km , 4 Tonne , Price 10, </Text>
                            <Text style={{ color: 'gray', fontWeight: 'bold' }}> totalPrice = Price * Tonne * Km </Text>
                            <Text style={{ color: 'gray' }}> 1000 = 10 * 10 * 10 </Text>
                            <Text style={{ color: 'red', fontWeight: 'bold' }}>calculated on the basis of minimum distance and weight.</Text>
                        </View>
                        <TouchableOpacity onPress={() => { setModalVisible(false) }} style={{ alignItems: 'center', bottom: 190,left:  Dimensions.get('screen').width  / 2 -40 }}>
                            <Image source={icons.close} style={{ width: 35, height: 35, tintColor: props.theme ? color.drakAdminprimaryColors : color.adminprimaryColors, }} />

                        </TouchableOpacity>
                    </View>
                </Modal>
                {!props.route.params?.item?._id ?
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <AdminHeaderWithBackButton name={"Add Transport Details"} navigation={props.navigation} />
                        <View style={styles.inputBox}>
                            <View style={{ margin: 10 }}>
                                <Dropdown
                                    style={styles.dropdown}
                                    placeholderStyle={styles.placeholderStyle}
                                    selectedTextStyle={styles.selectedTextStyle}
                                    inputSearchStyle={styles.inputSearchStyle}
                                    iconStyle={styles.iconStyle}
                                    data={props.routeList}
                                    search
                                    maxHeight={300}
                                    labelField="from.name"
                                    valueField="_id"
                                    placeholder="Select Route  .."
                                    searchPlaceholder="Search..."
                                    value={value}
                                    onChange={item => {
                                        setData({ ...data, routeId: item._id });
                                    }}
                                    renderItem={renderItemRoute}
                                />

                            </View>
                            <View style={{ margin: 10 }}>
                                <Dropdown
                                    style={styles.dropdown}
                                    placeholderStyle={styles.placeholderStyle}
                                    selectedTextStyle={styles.selectedTextStyle}
                                    inputSearchStyle={styles.inputSearchStyle}
                                    iconStyle={styles.iconStyle}
                                    data={props.truckList}
                                    search
                                    maxHeight={300}
                                    labelField="truckRegistartionNo"
                                    valueField="_id"
                                    placeholder="Select truck  .."
                                    searchPlaceholder="Search..."
                                    value={value}
                                    onChange={item => {
                                        setData({ ...data, truckId: item._id });
                                    }}
                                    renderItem={renderItemTruck}
                                />

                            </View>
                            <View style={{ margin: 10 }}>
                                <Dropdown
                                    style={styles.dropdown}
                                    placeholderStyle={styles.placeholderStyle}
                                    selectedTextStyle={styles.selectedTextStyle}
                                    inputSearchStyle={styles.inputSearchStyle}
                                    iconStyle={styles.iconStyle}
                                    data={props.driverList}
                                    search
                                    maxHeight={300}
                                    labelField="driverName"
                                    valueField="_id"
                                    placeholder="Select Driver  .."
                                    searchPlaceholder="Search..."
                                    value={value}
                                    onChange={item => {
                                        setData({ ...data, driverId: item._id });
                                    }}
                                    renderItem={renderItemDriver}
                                />

                            </View>

                            <View style={{ margin: 10, flexDirection: 'row', justifyContent: 'space-between' }}>
                                <DatePicker modal
                                    open={open}
                                    date={date}
                                    mode={'datetime'}
                                    onConfirm={(dt) => {
                                        setOpen(false)
                                        setDate(dt)
                                        setData({ ...data, Truckdate: dt.toString() })
                                    }}
                                    onCancel={() => {
                                        setOpen(false)
                                    }} />
                                <View style={{ width: "85%" }}>
                                    <Text style={styles.input}>{data.Truckdate ? data.Truckdate : "Date"}</Text>
                                </View>
                                <TouchableOpacity style={{ width: "10%", justifyContent: 'center' }} onPress={() => setOpen(true)}>
                                    <Image source={icons.editdate} style={{ width: 35, height: 35, tintColor: props.theme ? color.drakAdminprimaryColors : color.adminprimaryColors }} />
                                </TouchableOpacity>

                            </View>

                           
                            <View style={{ margin: 10, flexDirection: 'row', justifyContent: 'space-between' }}>
                                <View style={{ width: "85%" }}>
                                    <TextInput style={styles.input}
                                        placeholder={"eg. Truck Price"}
                                        placeholderTextColor={'gray'}

                                        onChangeText={(val) => setData({ ...data, truckPrice: val })}
                                        autoCapitalize={'none'}
                                        keyboardType={'number-pad'} />
                                </View>
                                <TouchableOpacity style={{ width: "10%", justifyContent: 'center' }} onPress={() => setModalVisible(true)}>
                                    <Image source={icons.info} style={{ width: 35, height: 35, tintColor: props.theme ? color.drakAdminprimaryColors : color.adminprimaryColors }} />
                                </TouchableOpacity>

                            </View>
                            <View style={{ marginHorizontal: 10, marginVertical: 20 }}>
                                <TouchableOpacity style={styles.btn} onPress={() => { AddTrasport() }}>
                                    <Text style={styles.btnText}>
                                        Add Transport Details
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </ScrollView> :
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <AdminHeaderWithBackButton name={"Update Transport Details"} navigation={props.navigation} />
                        <View style={styles.inputBox}>
                            <View style={{ margin: 10 }}>
                                <Dropdown
                                    style={styles.dropdown}
                                    placeholderStyle={styles.placeholderStyle}
                                    selectedTextStyle={styles.selectedTextStyle}
                                    inputSearchStyle={styles.inputSearchStyle}
                                    iconStyle={styles.iconStyle}
                                    data={props.routeList}
                                    search
                                    maxHeight={300}
                                    labelField="from.name"
                                    valueField="_id"
                                    placeholder="Select Route  .."
                                    searchPlaceholder="Search..."
                                    value={props.route.params?.item?.routeId._id}
                                    onChange={item => {
                                        setData({ ...data, routeId: item._id });
                                    }}
                                    renderItem={renderItemRoute}
                                />

                            </View>
                            <View style={{ margin: 10 }}>
                                <Dropdown
                                    style={styles.dropdown}
                                    placeholderStyle={styles.placeholderStyle}
                                    selectedTextStyle={styles.selectedTextStyle}
                                    inputSearchStyle={styles.inputSearchStyle}
                                    iconStyle={styles.iconStyle}
                                    data={props.truckList}
                                    search
                                    maxHeight={300}
                                    labelField="truckRegistartionNo"
                                    valueField="_id"
                                    placeholder="Select truck  .."
                                    searchPlaceholder="Search..."
                                    value={props.route.params?.item?.truckId._id}
                                    onChange={item => {
                                        setData({ ...data, truckId: item._id });
                                    }}
                                    renderItem={renderItemTruck}
                                />

                            </View>
                            <View style={{ margin: 10 }}>
                                <Dropdown
                                    style={styles.dropdown}
                                    placeholderStyle={styles.placeholderStyle}
                                    selectedTextStyle={styles.selectedTextStyle}
                                    inputSearchStyle={styles.inputSearchStyle}
                                    iconStyle={styles.iconStyle}
                                    data={props.driverList}
                                    search
                                    maxHeight={300}
                                    labelField="driverName"
                                    valueField="_id"
                                    placeholder="Select Driver  .."
                                    searchPlaceholder="Search..."
                                    value={props.route.params?.item?.driverId._id}
                                    onChange={item => {
                                        setData({ ...data, driverId: item._id });
                                    }}
                                    renderItem={renderItemDriver}
                                />

                            </View>

                            <View style={{ margin: 10, flexDirection: 'row', justifyContent: 'space-between' }}>
                                <DatePicker modal
                                    open={open}
                                    date={date}
                                    mode={'datetime'}
                                    onConfirm={(dt) => {
                                        setOpen(false)
                                        setDate(dt)
                                        setData({ ...data, Truckdate: dt.toString() })
                                    }}
                                    onCancel={() => {
                                        setOpen(false)
                                    }} />
                                <View style={{ width: "85%" }}>
                                    <Text style={styles.input}>{data.Truckdate ? data.Truckdate : "Date"}</Text>
                                </View>
                                <TouchableOpacity style={{ width: "10%", justifyContent: 'center' }} onPress={() => setOpen(true)}>
                                    <Image source={icons.editdate} style={{ width: 35, height: 35, tintColor: props.theme ? color.drakAdminprimaryColors : color.adminprimaryColors }} />
                                </TouchableOpacity>

                            </View>

                            
                            <View style={{ margin: 10, flexDirection: 'row', justifyContent: 'space-between' }}>
                                <View style={{ width: "85%" }}>
                                    <TextInput style={styles.input}
                                        placeholder={"eg. Truck Price"}
                                        placeholderTextColor={'gray'}
                                        defaultValue={props.route.params?.item?.truckPrice}
                                        onChangeText={(val) => setData({ ...data, truckPrice: val })}
                                        autoCapitalize={'none'}
                                        keyboardType={'number-pad'} />
                                </View>
                                <TouchableOpacity style={{ width: "10%", justifyContent: 'center' }} onPress={() => setModalVisible(true)}>
                                    <Image source={icons.info} style={{ width: 35, height: 35, tintColor: props.theme ? color.drakAdminprimaryColors : color.adminprimaryColors }} />
                                </TouchableOpacity>

                            </View>
                            <View style={{ marginHorizontal: 10, marginVertical: 20 }}>
                                <TouchableOpacity style={styles.btn} onPress={() => { UpdateTrasport() }}>
                                    <Text style={styles.btnText}>
                                        Update Transport Details
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </ScrollView>
                }
            </View>
        </TouchableWithoutFeedback>
    )
}
const useDispatch = (dispatch) => {
    return {
        getTruckList: (data) => dispatch(getTruckList(data)),
        getDriverList: (data) => dispatch(getDriverList(data)),
        getRouteList: (data) => dispatch(getRouteList(data)),
        addTransport: (data) => dispatch(addTransport(data)),
        setTransportData: (data) => dispatch(setTransportData(data)),
        getCountTransport: (data) => dispatch(getCountTransport(data)),
        updateTransport: (data) => dispatch(updateTransport(data)),
    };
}
const useSelector = (state) => (

    {
        token: state.token.token,
        driverList: state.driverList.driverList,
        truckList: state.truckList.truckList,
        routeList: state.route.routeList,
        transportData: state.transport.data,
        theme: state.token.theme

    }
)
export default connect(useSelector, useDispatch)(AddTrasportDetails);


