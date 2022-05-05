import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native'
import React from 'react'
import { AdminHeaderWithBackButton } from '../../components/adminHeader'
import color from '../../contents/color'
import LottieView from 'lottie-react-native';
import { connect } from 'react-redux'

import { getCountTransport } from '../../Redux/Admin/countAddSlice'
import icons from '../../contents/icons'
import { deleteTransport, getTransportList, setTransportData, setTransportList } from '../../Redux/Admin/transportSlice'
import Toast from 'react-native-simple-toast';
import AnimatedLoader from "react-native-animated-loader";
import ActionDialogBox from '../../components/ActionDialogBox'
import DialogBox from '../../components/DialogBox';

const TransportListDetails = (props) => {
    const [driver, setDriver] = React.useState({ type: false, id: '' });
    const [truck, setTruck] = React.useState({ type: false, id: '' });
    const [route, setRoute] = React.useState({ type: false, id: '' })
    const [data, setData] = React.useState([])
    const limitValue = 3
    const [isSkip, setIsSkip] = React.useState(0);
    const [modalVisible, setModalVisible] = React.useState(false);
    const [Tid, setTId] = React.useState('')
    React.useEffect(() => {
        props.getTransportList({ token: props.token, skip: isSkip, limit: limitValue })
    }, [])
    React.useEffect(() => {
        if (props.deletedata?.status) {
            props.getCountTransport(props.token)
            props.setTransportData({})
        }
        if (props.transportList?.status) {
            setData([...data, ...props.transportList.data]);
            props.setTransportList({})
            props.transportList = {}
        }
    }, [props])

    const TrasportDelete = (id) => {
        Toast.show(" Transport remove successful")
        props.deleteTransport({ id: id, token: props.token })
    }
    const EditDriver = (item) => {
        props.navigation.navigate("AddTrasportDetails", { item: item })
    }
    const handleListFooterComponent = () => {
        return (
            (props.loading) ? (
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
                </AnimatedLoader>) : null
        )
    }
    return (
        <View style={styles.container(props)}>
            <ActionDialogBox
                modalVisibleData={modalVisible}
                theme={props.theme}
                title={"Transport Details Remove"}
                text={"Are you sure you want to remove Transport Details ?"}
                onOkPress={(val) => val && TrasportDelete(Tid)}
                onGet={(val) => setModalVisible(val)}
            />
            <AdminHeaderWithBackButton name={"Transport List"} navigation={props.navigation} />
            {(data.length === 0 && !props.loading) ?
                <View style={{ flex: 1 }}>
                    <View style={{ height: 500, width: 200, alignSelf: 'center' }}>
                        <LottieView source={require('../../assets/json/notfound.json')} autoPlay loop />
                    </View>
                </View>
                :
                <FlatList data={data} renderItem={(item) => (
                    <View style={styles.listBox(props)} key={"A" + item.index}>
                        <View style={{ alignItems: "center" }}>
                            <Text style={{ fontWeight: 'bold', color: props.theme ? color.drakFontcolor : color.fontcolor }}>
                                {item.item.routeId.from.name}
                            </Text>
                        </View>
                        <TouchableOpacity style={{ alignItems: "center", paddingVertical: 20 }} onPress={() => { props.navigation.navigate("BookingHistory", { id: item.item._id }) }}>
                            <Image source={icons.upToDown} style={{ width: 30, height: 30, tintColor: props.theme ? color.drakAdminprimaryColors : color.adminprimaryColors }} />
                        </TouchableOpacity>
                        <View style={{ alignItems: "center" }}>
                            <Text style={{ fontWeight: 'bold', color: props.theme ? color.drakFontcolor : color.fontcolor }}>
                                {item.item.routeId.destination.name}
                            </Text>
                        </View>
                        <View style={{ marginHorizontal: 20, marginVertical: 5, flexDirection: "row", justifyContent: 'space-between' }}>
                            <View >
                                <Text style={{ color: 'gray', fontWeight: 'bold' }}>
                                    {new Date(item.item.Truckdate).toLocaleDateString("en-US", { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                                </Text>
                            </View>
                            <View >
                                <Text style={{ color: 'gray', fontWeight: 'bold' }}>
                                    {new Date(item.item.Truckdate).toLocaleDateString("en-US", { hour: 'numeric', minute: 'numeric' }).toString().slice(-8)}
                                </Text>
                            </View>
                        </View>
                        <View style={{ marginHorizontal: 20, marginVertical: 5, flexDirection: "row", justifyContent: 'space-between' }}>
                            <View >
                                <Text style={{ color: props.theme ? color.drakAdminprimaryColors : color.adminprimaryColors, fontWeight: 'bold' }}>{item.item.capicity}/{item.item.truckId.truckCapicity}</Text>
                            </View>
                            <View >
                                <Text style={{ color: 'gray', fontWeight: 'bold' }}>
                                    {(item.item.truckId.truckCapicity) - (item.item.capicity)} Available</Text>
                            </View>
                        </View>
                        <View style={{ marginHorizontal: 20, marginVertical: 10, flexDirection: "row", justifyContent: 'space-between' }}>
                            <TouchableOpacity onPress={() => { setDriver({ type: true, id: item.item._id }) }}>
                                <Text style={{ color: props.theme ? color.drakAdminprimaryColors : color.adminprimaryColors, fontWeight: 'bold' }}>
                                    Driver
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => { setTruck({ type: true, id: item.item._id }) }}>
                                <Text style={{ color: props.theme ? color.drakAdminprimaryColors : color.adminprimaryColors, fontWeight: 'bold' }}>
                                    Truck
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => { setRoute({ type: true, id: item.item._id }) }}>
                                <Text style={{ color: props.theme ? color.drakAdminprimaryColors : color.adminprimaryColors, fontWeight: 'bold' }}>
                                    Route
                                </Text>
                            </TouchableOpacity>
                        </View>
                        {/* driver data */}
                        {driver.id === item.item._id &&
                            <DialogBox
                                modalVisibleData={driver.type}
                                theme={props.theme}
                                title={"Driver Details"}
                                onGet={(val) => setDriver({ ...driver, type: val })}>
                                <View style={styles.drivelist} >
                                    <View style={styles.image(props)}>
                                        <Image source={{ uri: item.item.driverId.driverImage }} style={{ width: '100%', height: '100%', overflow: "hidden" }} />
                                    </View>

                                    <View style={styles.listData}>
                                        <Text style={styles.driverName(props)}>{item.item.driverId.driverName}</Text>
                                        <Text style={styles.driverEmail}>{item.item.driverId.driverEmail}</Text>
                                        <Text style={styles.driverMobileNo(props)}>{item.item.driverId.driverMobileNo}</Text>
                                    </View>
                                </View>
                            </DialogBox>
                        }
                        {/* driver data */}
                        { truck.id === item.item._id &&
                            <DialogBox
                                modalVisibleData={truck.type}
                                theme={props.theme}
                                title={"Truck Details"}
                                onGet={(val) => setTruck({ ...truck, type: val })}>
                                <View style={styles.drivelist}>
                                    <View style={styles.image(props)}>
                                        <Image source={{ uri: item.item.truckId.truckImage }} style={{ width: '100%', height: '100%', overflow: "hidden" }} />
                                    </View>
                                    <View style={styles.listData}>
                                        <Text style={styles.truckname(props)}>{item.item.truckId.truckName}</Text>
                                        <Text style={styles.truckmodelname(props)}>{item.item.truckId.truckModelName}</Text>
                                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 5 }}>
                                            <Text style={styles.truckreg}>{item.item.truckId.truckRegistartionNo}</Text>
                                            <Text style={styles.truckcapicity(props)}>{item.item.truckId.truckCapicity} /-Tonnes</Text>
                                        </View>
                                    </View>
                                </View></DialogBox>}
                        {/* route data */}
                        {route.id === item.item._id &&
                            <DialogBox
                                modalVisibleData={route.type}
                                theme={props.theme}
                                title={"Routes Details"}
                                onGet={(val) => setRoute({ ...route, type: val })}>
                                <View style={{ flexDirection: 'row' }}>
                                    <View style={{ width: "5%", justifyContent: 'center' }}>
                                        <Image source={icons.journey} style={{ width: 10, height: 40 * item.item.routeId.routeStop.length, tintColor: props.theme ? color.drakAdminprimaryColors : color.adminprimaryColors }} />
                                    </View>

                                    <View style={{ width: "95%", justifyContent: 'center' }}>


                                        <FlatList data={item.item.routeId.routeStop} renderItem={(item) => (
                                            <View style={{ margin: 10, flexDirection: 'row' }}>

                                                <View style={{ width: '5%', justifyContent: 'center' }}>
                                                    <Image source={icons.forword} style={{ width: 20, height: 20, tintColor: props.theme ? color.drakAdminprimaryColors : color.adminprimaryColors }} />
                                                </View>
                                                <View style={{ width: '95%' }}>
                                                    <Text style={{ marginHorizontal: 10, fontWeight: 'bold', color: 'gray' }}>{item.item.stops}</Text>
                                                </View>
                                            </View>)}
                                        />


                                    </View>
                                </View></DialogBox>}
                        {/* route data */}
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 20, paddingHorizontal: 30 }}>
                            <TouchableOpacity onPress={() => { EditDriver(item.item) }}>
                                <Text style={styles.edit}>Edit</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => { setModalVisible(true); setTId(item.item._id) }}>
                                <Text style={styles.delete} >Delete</Text>
                            </TouchableOpacity>



                        </View>

                    </View>
                )
                }
                    onEndReached={() => {
                        let count = isSkip + limitValue
                        console.log("isSkip", count)
                        setIsSkip(count);

                        props.getTransportList({ token: props.token, skip: count, limit: limitValue })
                    }}
                    onEndReachedThreshold={0.2}
                    ListFooterComponent={handleListFooterComponent}


                />
            }
        </View >
    )
}
const useDispatch = (dispatch) => {
    return {
        getTransportList: (data) => dispatch(getTransportList(data)),
        deleteTransport: (data) => dispatch(deleteTransport(data)),
        getCountTransport: (data) => dispatch(getCountTransport(data)),
        setTransportData: (data) => dispatch(setTransportData(data)),
        setTransportList: (data) => dispatch(setTransportList(data))
    };
}
const useSelector = (state) => (

    {
        transportList: state.transport.transportList,
        deletedata: state.transport.data,
        theme: state.token.theme,
        loading: state.transport.loading,
        token: state.token.token,

    }
)
export default connect(useSelector, useDispatch)(TransportListDetails);
const styles = StyleSheet.create({
    container: (props) => [{
        flex: 1,
        backgroundColor: props.theme ? color.drakBackgroundColor : color.backgroundColor
    }], listBox: (props) => [{
        minHeight: 150,
        backgroundColor: props.theme ? color.drakBackgroundColor : color.backgroundColor,
        marginHorizontal: 20,
        borderRadius: 20,

        shadowColor: props.theme ? color.drakFontcolor : color.fontcolor,
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        marginVertical: 10,
        padding: 10
    }],

    drivelist: {

        height: 150,

        justifyContent: 'center',
        flexDirection: 'row',

        marginVertical: 10,
    },

    edit: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'green'
    },
    delete: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'red'
    }, image: (props) => [{
        width: '30%',
        borderWidth: 3,
        borderColor: props.theme ? color.drakAdminprimaryColors : color.adminprimaryColors,
        borderRadius: 15,
        marginVertical: 10,
        marginLeft: 20,
        alignItems: 'center',
        overflow: 'hidden'
    }],
    listData: {
        width: '72%',
        padding: 20
    }, driverName: (props) => [{
        fontSize: 20,
        fontWeight: 'bold',
        color: props.theme ? color.drakFontcolor : color.fontcolor
    }], driverMobileNo: (props) => [{
        fontSize: 16,
        fontWeight: 'bold',
        color: props.theme ? color.drakAdminprimaryColors : color.adminprimaryColors,
        paddingVertical: 3
    }],
    driverEmail: {
        fontSize: 14,
        fontWeight: 'bold',
        color: 'gray'
    },
    truckname: (props) => [{
        fontSize: 25,
        fontWeight: 'bold',
        color: props.theme ? color.drakFontcolor : color.fontcolor
    }], truckmodelname: (props) => [{
        fontSize: 16,
        fontWeight: 'bold',
        color: props.theme ? color.drakAdminprimaryColors : color.adminprimaryColors,
        paddingVertical: 3
    }],
    truckreg: {
        fontSize: 14,
        fontWeight: 'bold',
        color: 'gray'
    },
    truckcapicity: (props) => [{
        fontSize: 14,
        fontWeight: 'bold',
        color: props.theme ? color.drakFontcolor : color.fontcolor
    }],

})
