import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, FlatList, StatusBar, Dimensions, Modal } from 'react-native'
import React from 'react'
import { AdminHeaderWithBackButton } from '../../components/adminHeader';
import color from '../../contents/color'
import icons from '../../contents/icons';
import { connect } from 'react-redux'
import { Dropdown } from 'react-native-element-dropdown';
import { getJWTToken } from '../../Redux/helper';
import { getDriverList } from '../../Redux/Admin/driverListSlice';
import { getTruckList } from '../../Redux/Admin/truckListSlice';
import DatePicker from 'react-native-date-picker'
import image from '../../contents/image';
import { getRouteList } from '../../Redux/Admin/routeSlice';
import { backgroundColor } from 'react-native/Libraries/Components/View/ReactNativeStyleAttributes';
const AddTrasportDetails = (props) => {
    const [modalVisible, setModalVisible] = React.useState(false);
    const [placetype, setPlaceType] = React.useState()
    const [token, setToken] = React.useState('');
    const [value, setValue] = React.useState(null);
    const [date, setDate] = React.useState(new Date())
    const [open, setOpen] = React.useState(false)
    const [data, setData] = React.useState({
        routeId: '',
        capicity: '',
        Tdate: '',
        truckId: "",
        driverId: ""
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
        props.getDriverList(token)
        props.getTruckList(token)
        props.getRouteList(token)
    }, [token])
    const AddTrasport = () => {
        if (data.routeId !== "" &&
            data.Tdate !== "" &&
            data.capicity !== "" &&
            data.driverId !== "" &&
            data.truckId !== "") {
            console.log("my data ", data)
        }

    }
    const renderItemDriver = (item) => {
        return (
            <View style={styles.item}>
                <Text style={styles.textItem}>{item.driverName}</Text>
                <Image source={image.user} style={{ width: 30, height: 30 }} />
            </View>
        );
    };
    const renderItemTruck = (item) => {

        return (
            <View style={styles.item}>
                <Text style={styles.textItem}>{item.truckRegistartionNo}</Text>
                <Image source={image.Truck} style={{ width: 30, height: 30 }} />
            </View>
        );
    };
    const renderItemRoute = (item) => {

        return (
            <View style={{ borderWidth: 2 ,margin:20,borderRadius:10,borderColor:color.adminprimaryColors}}>

                <View style={{ alignItems: "center" }}>
                    <Text style={{ fontWeight: 'bold', color: color.fontcolor }}>
                        {item.from}
                    </Text>
                </View>
                <View style={{ alignItems: "center", paddingVertical: 10 }}>
                    <Image source={icons.upToDown} style={{ width: 20, height: 20, tintColor: color.adminprimaryColors }} />
                </View>
                <View style={{ alignItems: "center" }}>
                    <Text style={{ fontWeight: 'bold', color: color.fontcolor }}>
                        {item.destination}
                    </Text>
                </View>
            </View >
        );
    };
    return (

        <View style={styles.container}>

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
                        labelField="from"
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
                        mode={'date'}
                        onConfirm={(dt) => {
                            setOpen(false)
                            setDate(dt)
                            setData({ ...data, Tdate: dt.toString() })
                        }}
                        onCancel={() => {
                            setOpen(false)
                        }} />
                    <View style={{ width: "85%" }}>
                        <Text style={styles.input}>{data.Tdate ? data.Tdate.slice(0, -23) : "Date"}</Text>
                    </View>
                    <TouchableOpacity style={{ width: "10%", justifyContent: 'center' }} onPress={() => setOpen(true)}>
                        <Image source={icons.editdate} style={{ width: 35, height: 35, tintColor: color.adminprimaryColors }} />
                    </TouchableOpacity>

                </View>

                <View style={{ margin: 10 }}>
                    <TextInput style={styles.input}
                        placeholder={"eg. Truck Capicity"}
                        placeholderTextColor={'gray'}
                        onChangeText={(val) => setData({ ...data, capicity: val })}
                        autoCapitalize={'none'}
                        keyboardType={'number-pad'} />

                </View>
                <View style={{ marginHorizontal: 10, marginVertical: 20 }}>
                    <TouchableOpacity style={styles.btn} onPress={() => { AddTrasport() }}>
                        <Text style={styles.btnText}>
                            Add Transport Details
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}
const useDispatch = (dispatch) => {
    return {
        getTruckList: (data) => dispatch(getTruckList(data)),
        getDriverList: (data) => dispatch(getDriverList(data)),
        getRouteList: (data) => dispatch(getRouteList(data)),
    };
}
const useSelector = (state) => (

    {
        token: state.token.token,
        driverList: state.driverList.driverList,
        truckList: state.truckList.truckList,
        routeList: state.route.routeList,

    }
)
export default connect(useSelector, useDispatch)(AddTrasportDetails);
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
    modelBox: {
        width: Dimensions.get('screen').width - 20,
        minHeight: 200,

        backgroundColor: color.backgroundColor,
        alignSelf: 'center',
        borderRadius: 15,
        flexDirection: 'row',
        alignItems: 'center',
        alignItems: "center",
        shadowColor: color.fontcolor,
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
})

