import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList } from 'react-native'
import React from 'react'
import { AdminHeaderWithBackButton } from '../../components/adminHeader'
import color from '../../contents/color'
import image from '../../contents/image'
import { connect } from 'react-redux'
import { getJWTToken } from '../../Redux/helper'
import { deleteRoute, getRouteList, setRouteData } from '../../Redux/Admin/routeSlice'
import { getCountTransport } from '../../Redux/Admin/countAddSlice'
import icons from '../../contents/icons'
import { deleteTransport, getTransportList, setTransportData } from '../../Redux/Admin/transportSlice'
import Toast from 'react-native-simple-toast';
const TransportListDetails = (props) => {
    const [token, setToken] = React.useState('');
    const [driver, setDriver] = React.useState({ type: false, id: '' });
    const [truck, setTruck] = React.useState({ type: false, id: '' });
    const [route, setRoute] = React.useState({ type: false, id: '' })
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
        props.getTransportList(token)
    }, [token])
    React.useEffect(() => {

        if (props.deletedata.status) {
            props.getTransportList(token)
            props.getCountTransport(token)
            props.setTransportData(token)
        }
    }, [token, props])
    const DeleteDriver = (id) => {

        Toast.show(" Transport remove successful")
        props.deleteTransport({ id: id, token: token })
    }
    const EditDriver = (item) => {

        props.navigation.navigate("AddTrasportDetails", { item: item })
    }
    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: props.theme ? color.drakBackgroundColor : color.backgroundColor
        }, listBox: {
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
        },

        drivelist: {

            height: 150,
            backgroundColor: props.theme ? color.drakBackgroundColor : color.backgroundColor,
            marginHorizontal: 2,
            borderRadius: 20,
            justifyContent: 'center',
            flexDirection: 'row',
            shadowColor: props.theme ? color.drakFontcolor : color.fontcolor,
            shadowOffset: {
                width: 0,
                height: 2
            },
            shadowOpacity: 0.25,
            shadowRadius: 4,
            elevation: 5,
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
        }, image: {
            width: '28%',
            borderWidth: 3,
            borderColor: props.theme ? color.drakAdminprimaryColors : color.adminprimaryColors,
            borderRadius: 15,
            marginVertical: 10,
            marginLeft: 20,
            alignItems: 'center',
            overflow: 'hidden'
        },
        listData: {
            width: '72%',
            padding: 20
        }, driverName: {
            fontSize: 20,
            fontWeight: 'bold',
            color: props.theme ? color.drakFontcolor : color.fontcolor
        }, driverMobileNo: {
            fontSize: 16,
            fontWeight: 'bold',
            color: props.theme ? color.drakAdminprimaryColors : color.adminprimaryColors,
            paddingVertical: 3
        },
        driverEmail: {
            fontSize: 14,
            fontWeight: 'bold',
            color: 'gray'
        },
        truckname: {
            fontSize: 25,
            fontWeight: 'bold',
            color: props.theme ? color.drakFontcolor : color.fontcolor
        }, truckmodelname: {
            fontSize: 16,
            fontWeight: 'bold',
            color: props.theme ? color.drakAdminprimaryColors : color.adminprimaryColors,
            paddingVertical: 3
        },
        truckreg: {
            fontSize: 14,
            fontWeight: 'bold',
            color: 'gray'
        },
        truckcapicity: {
            fontSize: 14,
            fontWeight: 'bold',
            color: props.theme ? color.drakFontcolor : color.fontcolor
        },

    })
    return (
        <View style={styles.container}>
            <AdminHeaderWithBackButton name={"Transport List"} navigation={props.navigation} />
            <FlatList data={props.transportList} renderItem={(item) => (
                <View style={styles.listBox}>
                    <View style={{ alignItems: "center" }}>
                        <Text style={{ fontWeight: 'bold', color: props.theme ? color.drakFontcolor : color.fontcolor }}>
                            {item.item.routeId.from.name}
                        </Text>
                    </View>
                    <View style={{ alignItems: "center", paddingVertical: 20 }}>
                        <Image source={icons.upToDown} style={{ width: 30, height: 30, tintColor: props.theme ? color.drakAdminprimaryColors : color.adminprimaryColors }} />
                    </View>
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
                        <TouchableOpacity onPress={() => { setDriver({ type: !driver.type, id: item.item._id }) }}>
                            <Text style={{ color: props.theme ? color.drakAdminprimaryColors : color.adminprimaryColors, fontWeight: 'bold' }}>
                                Driver
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => { setTruck({ type: !truck.type, id: item.item._id }) }}>
                            <Text style={{ color: props.theme ? color.drakAdminprimaryColors : color.adminprimaryColors, fontWeight: 'bold' }}>
                                Truck
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => { setRoute({ type: !route.type, id: item.item._id }) }}>
                            <Text style={{ color: props.theme ? color.drakAdminprimaryColors : color.adminprimaryColors, fontWeight: 'bold' }}>
                                Route
                            </Text>
                        </TouchableOpacity>
                    </View>
                    {/* driver data */}
                    {driver.type && driver.id === item.item._id &&
                        <View style={styles.drivelist} >
                            <View style={styles.image}>
                                <Image source={{ uri: item.item.driverId.driverImage }} style={{ width: '100%', height: '100%', overflow: "hidden" }} />
                            </View>

                            <View style={styles.listData}>
                                <Text style={styles.driverName}>{item.item.driverId.driverName}</Text>
                                <Text style={styles.driverEmail}>{item.item.driverId.driverEmail}</Text>
                                <Text style={styles.driverMobileNo}>{item.item.driverId.driverMobileNo}</Text>
                            </View>
                        </View>
                    }
                    {/* driver data */}
                    {truck.type && truck.id === item.item._id &&
                        <View style={styles.drivelist}>
                            <View style={styles.image}>
                                <Image source={{ uri: item.item.truckId.truckImage }} style={{ width: '100%', height: '100%', overflow: "hidden" }} />
                            </View>
                            <View style={styles.listData}>
                                <Text style={styles.truckname}>{item.item.truckId.truckName}</Text>
                                <Text style={styles.truckmodelname}>{item.item.truckId.truckModelName}</Text>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 5 }}>
                                    <Text style={styles.truckreg}>{item.item.truckId.truckRegistartionNo}</Text>
                                    <Text style={styles.truckcapicity}>{item.item.truckId.truckCapicity} /-Tonnes</Text>
                                </View>
                            </View>
                        </View>}
                    {/* route data */}
                    {route.type && route.id === item.item._id &&
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
                        </View>}
                    {/* route data */}
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 20, paddingHorizontal: 30 }}>
                        <TouchableOpacity onPress={() => { EditDriver(item.item) }}>
                            <Text style={styles.edit}>Edit</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => { DeleteDriver(item.item._id) }}>
                            <Text style={styles.delete} >Delete</Text>
                        </TouchableOpacity>



                    </View>
                </View>
            )
            } />

        </View >
    )
}
const useDispatch = (dispatch) => {
    return {
        getTransportList: (data) => dispatch(getTransportList(data)),
        deleteTransport: (data) => dispatch(deleteTransport(data)),
        getCountTransport: (data) => dispatch(getCountTransport(data)),
        setTransportData: (data) => dispatch(setTransportData(data))
    };
}
const useSelector = (state) => (

    {
        transportList: state.transport.transportList,
        deletedata: state.transport.data,
        theme: state.token.theme

    }
)
export default connect(useSelector, useDispatch)(TransportListDetails);
