import { View, Text, StyleSheet, RefreshControl, ScrollView, FlatList, Image, TouchableOpacity, Linking } from 'react-native'
import React from 'react'
import { connect } from 'react-redux';
import color from '../../contents/color';
import AnimatedLoader from "react-native-animated-loader";
import icons from '../../contents/icons';
import calcKmFind from '../../components/kmFind';
import { updatePayment, setPaymentData } from '../../Redux/paymentSlice';
import { transportListById } from '../../Redux/fetchByIDSlice';
import { AdminHeaderWithBackButton } from '../../components/adminHeader';

const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
}
const AdminTrackingDetails = (props) => {
    // console.log(props.route.params.id)
    const [refreshing, setRefreshing] = React.useState(false);

    const onRefresh = React.useCallback(() => {
        props.transportListById({ token: props.token, id: props.route.params.id });
        setRefreshing(true);

        wait(2000).then(() => setRefreshing(false));
    }, []);
    React.useEffect(() => {

        props.transportListById({ token: props.token, id: props.route.params.id });
    }, [])
    const CallBtn = (MobileNo) => {
        console.log('callNumber ----> ', MobileNo);
        let phoneNumber = MobileNo;
        if (Platform.OS !== 'android') {
            phoneNumber = `telprompt:${MobileNo}`;
        }
        else {
            phoneNumber = `tel:${MobileNo}`;
        }
        Linking.canOpenURL(phoneNumber)
            .then(supported => {
                if (!supported) {
                    console.log(supported)
                } else {
                    return Linking.openURL(phoneNumber);
                }
            })
            .catch(err => console.log(err));
    }
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
                <Text>Loading ...</Text>
            </AnimatedLoader>
            <AdminHeaderWithBackButton name={"Tracking Details"} navigation={props.navigation} />
            <ScrollView style={{ paddingBottom: 100 }} refreshControl={
                <RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                />
            } showsVerticalScrollIndicator={false}>
                <FlatList data={props.transportList} renderItem={(item) => (
                    <View>
                        <View style={styles.listBox(props)} >

                            <View style={{ alignItems: "flex-start", paddingVertical: 4, marginHorizontal: 20, }}>
                                <Text style={{ fontWeight: 'bold', color: 'gray' }}>Truck Reg No : {item.item?.truckId.truckRegistartionNo}</Text>
                                <Text style={{ fontWeight: 'bold', color: 'gray' }}>Driver Name : {item.item?.driverId.driverName}</Text>
                                <View style={{ flexDirection: "row", justifyContent: 'space-between' }}>
                                    <View style={{ width: "90%" }}>
                                        <Text style={{ fontWeight: 'bold', color: 'gray' }}>Driver Mobile no : {item.item?.driverId.driverMobileNo}</Text>
                                    </View>
                                    <TouchableOpacity style={{ width: "10%" }} onPress={() => CallBtn(item.item?.driverId.driverMobileNo)}>
                                        <Image source={icons.call} style={{
                                            width: 20,
                                            height: 20,
                                            tintColor: props.theme ? color.drakPrimaryColors : color.primaryColors
                                        }} />
                                    </TouchableOpacity>
                                </View>

                            </View>
                            <View style={{ marginHorizontal: 10, marginVertical: 5, flexDirection: "row", justifyContent: 'space-between' }}>
                                <View >

                                    <Text style={{ color: 'gray', fontWeight: 'bold', fontSize: 14, paddingRight: 2 }}>
                                        {new Date(new Date(item.item.Truckdate)).toLocaleDateString("en-US", { weekday: 'short', month: 'long', day: 'numeric' })}

                                    </Text>
                                </View>
                                <View >
                                    <Text style={{ color: color.primaryColors, fontWeight: 'bold', fontSize: 14 }}>
                                        {new Date(new Date(item.item.Truckdate)).toLocaleDateString("en-US", { hour: 'numeric', minute: 'numeric', hour12: false }).toString().slice(-5)}
                                    </Text>

                                </View>

                            </View>
                            <View style={{ marginHorizontal: 10, paddingVertical: 4, flexDirection: 'row', justifyContent: 'space-between' }}>
                                <View style={{ width: '40%', alignItems: "center" }}>
                                    <Text style={{ fontWeight: 'bold', color: props.theme ? color.drakFontcolor : color.fontcolor }}>

                                        {(item.item.routeId.from.name.split(',').reverse()[2])}
                                    </Text>

                                </View>
                                <View style={{ width: '20%', alignItems: "center" }}>
                                    <Image source={icons.transfer} style={{ width: 30, height: 30, tintColor: props.theme ? color.drakPrimaryColors : color.primaryColors }} />
                                </View>
                                <View style={{ width: '40%', alignItems: "center" }}>
                                    <Text style={{ fontWeight: 'bold', color: props.theme ? color.drakFontcolor : color.fontcolor }}>
                                        {(item.item.routeId.destination.name.split(',').reverse()[2])}</Text>

                                </View>
                            </View>
                            <View style={{ alignItems: "center", paddingVertical: 4, flexDirection: 'row', justifyContent: 'space-between' }}>
                                <View style={{ width: '50%', alignItems: "center" }}>
                                    <Text style={{ fontWeight: 'bold', color: 'gray' }}>Duration</Text>
                                    <Text style={{ fontWeight: 'bold', color: props.theme ? color.drakFontcolor : color.fontcolor }}>
                                        {Math.round((calcKmFind(item.item.routeId.from.lat,
                                            item.item.routeId.from.lng,
                                            item.item.routeId.destination.lat,
                                            item.item.routeId.destination.lng)) / 45)} hrs </Text>
                                </View>

                                <View style={{ width: '50%', alignItems: "center" }}>
                                    <Text style={{ fontWeight: 'bold', color: 'gray' }}>Distance</Text>
                                    <Text style={{ fontWeight: 'bold', color: props.theme ? color.drakFontcolor : color.fontcolor }}>
                                        {(calcKmFind(item.item.routeId.from.lat,
                                            item.item.routeId.from.lng,
                                            item.item.routeId.destination.lat,
                                            item.item.routeId.destination.lng))} Km</Text>
                                </View>
                            </View>

                            <View style={{ flexDirection: 'row', marginVertical: 5, marginHorizontal: 10 }}>
                                <View style={{ width: "3%", alignItems: 'flex-end' }}>
                                    <Image source={icons.journey} style={{ width: 5, height: 50 * (item.item.routeId.routeStop.length + 2), tintColor: props.theme ? color.drakPrimaryColors : color.primaryColors }} />
                                </View>
                                <View style={{ width: "97%", justifyContent: 'center', paddingBottom: 10 }}>
                                    <View>
                                        <View style={{ margin: 5, flexDirection: 'row' }}>

                                            <View style={{ width: '5%', justifyContent: 'center' }}>
                                                <Image source={icons.forword} style={{ width: 20, height: 20, tintColor: (new Date(item.item.Truckdate) <= new Date()) ? "green" : color.adminprimaryColors }} />
                                            </View>
                                            <View style={{ width: '95%' }}>
                                                <Text style={{ marginHorizontal: 10, fontWeight: 'bold', color: 'gray', fontSize: 16 }}>
                                                    {item.item.routeId.from.name}</Text>
                                            </View>

                                        </View>
                                        <View style={{ flexDirection: "row", justifyContent: 'space-between', marginHorizontal: 30 }}>
                                            <View style={{ alignItems: 'center' }}>
                                                <Text style={{ color: props.theme ? color.drakFontcolor : color.fontcolor, }}>
                                                    {new Date(item.item.Truckdate).toLocaleDateString("en-US", { weekday: 'short', month: 'long', day: 'numeric' })}
                                                </Text>
                                            </View>

                                            <View style={{ alignItems: 'center' }} >
                                                <Text style={{ color: props.theme ? color.drakFontcolor : color.fontcolor }}>
                                                    {new Date(item.item.Truckdate).toLocaleDateString("en-US", { hour: 'numeric', minute: 'numeric', hour12: false }).toString().slice(-5)}
                                                </Text>
                                            </View>

                                        </View>
                                    </View>
                                    <FlatList data={item.item.routeId.routeStop} renderItem={(data) => (

                                        <View >
                                            <View style={{ margin: 5, flexDirection: 'row' }}>

                                                <View style={{ width: '5%', justifyContent: 'center' }}>
                                                    <Image source={icons.forword} style={{
                                                        width: 20, height: 20, tintColor: ((new Date(new Date(item.item.Truckdate)
                                                            .setHours(new Date(item.item.Truckdate)
                                                                .getHours() + data.item.avgTime))) <= new Date()) ? "green" : color.adminprimaryColors
                                                    }} />
                                                </View>
                                                <View style={{ width: '95%' }}>
                                                    <Text style={{ marginHorizontal: 10, fontWeight: 'bold', color: 'gray', fontSize: 16 }}>{data.item.stops}</Text>
                                                </View>

                                            </View>
                                            <View style={{ flexDirection: "row", justifyContent: 'space-between', marginHorizontal: 30 }}>
                                                <View style={{ alignItems: 'center' }} >
                                                    <Text style={{ color: props.theme ? color.drakFontcolor : color.fontcolor }}>
                                                        {new Date(new Date(item.item.Truckdate)
                                                            .setHours(new Date(item.item.Truckdate)
                                                                .getHours() + data.item.avgTime)).toLocaleDateString("en-US", { weekday: 'short', month: 'long', day: 'numeric' })}
                                                    </Text>
                                                </View>

                                                <View style={{ alignItems: 'center' }}>
                                                    <Text style={{ color: props.theme ? color.drakFontcolor : color.fontcolor, }}>
                                                        {new Date(new Date(item.item.Truckdate)
                                                            .setHours(new Date(item.item.Truckdate)
                                                                .getHours() + data.item.avgTime)).toLocaleDateString("en-US", { hour: 'numeric', minute: 'numeric', hour12: false }).toString().slice(-6)}
                                                    </Text>
                                                </View>

                                            </View>
                                        </View>
                                    )}
                                    />
                                    <View>
                                        <View style={{ margin: 5, flexDirection: 'row' }}>

                                            <View style={{ width: '5%', justifyContent: 'center' }}>
                                                <Image source={icons.forword} style={{
                                                    width: 20, height: 20, tintColor: ((new Date(new Date(item.item.Truckdate)
                                                        .setHours(new Date(item.item.Truckdate)
                                                            .getHours() + item.item.routeId.destination.avgTime))) <= new Date()) ? "green" : color.adminprimaryColors
                                                }} />
                                            </View>
                                            <View style={{ width: '95%' }}>
                                                <Text style={{ marginHorizontal: 10, fontWeight: 'bold', color: 'gray', fontSize: 16 }}>
                                                    {item.item.routeId.destination.name}</Text>
                                            </View>

                                        </View>
                                        <View style={{ marginHorizontal: 30, flexDirection: "row", justifyContent: 'space-between' }}>
                                            <View style={{ alignItems: 'center' }}>
                                                <Text style={{ color: props.theme ? color.drakFontcolor : color.fontcolor, }}>
                                                    {new Date(new Date(item.item.Truckdate)
                                                        .setHours(new Date(item.item.Truckdate)
                                                            .getHours() + item.item.routeId.destination.avgTime)).toLocaleDateString("en-US", { weekday: 'short', month: 'long', day: 'numeric' })}
                                                </Text>
                                            </View>

                                            <View style={{ alignItems: 'center' }}>
                                                <Text style={{ color: props.theme ? color.drakFontcolor : color.fontcolor, }}>
                                                    {new Date(new Date(item.item.Truckdate)
                                                        .setHours(new Date(item.item.Truckdate)
                                                            .getHours() + item.item.routeId.destination.avgTime)).toLocaleDateString("en-US", { hour: 'numeric', minute: 'numeric', hour12: false }).toString().slice(-5)}
                                                </Text>
                                            </View>

                                        </View>
                                    </View>
                                </View>
                            </View>
                            <View style={{ marginHorizontal: 10, alignItems: "center", paddingVertical: 4, flexDirection: 'row', justifyContent: 'space-between' }}>
                                <View>
                                    <Text style={{ fontWeight: 'bold', color: 'gray' }}>Delivery Date</Text>
                                    <Text style={{ color: props.theme ? color.drakFontcolor : color.fontcolor, fontWeight: 'bold', fontSize: 14, paddingRight: 2 }}>
                                        {new Date(new Date(item.item.Truckdate)
                                            .setHours(new Date(item.item.Truckdate)
                                                .getHours() + Math.round((calcKmFind(item.item.routeId.from.lat,
                                                    item.item.routeId.from.lng,
                                                    item.item.routeId.destination.lat,
                                                    item.item.routeId.destination.lng)) / 45))).toLocaleDateString("en-US", { weekday: 'short', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', hour12: false })}
                                    </Text>
                                </View>
                                <TouchableOpacity onPress={() => props.navigation.navigate("BookingHistory", { id: props.route.params.id })}>
                                    <Text style={{ fontWeight: 'bold', color: color.adminprimaryColors }}>Booking History</Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                    </View>
                )} />
            </ScrollView>
        </View>
    )
}


const useSelector = (state) => (
    {
        theme: state.token.theme,
        transportList: state.fetchById.transportList,
        loading: state.fetchById.loading,
        token: state.token.token,
    }
)
const useDispatch = (dispatch) => {
    return {
        transportListById: (data) => dispatch(transportListById(data)),

    };
}
export default connect(useSelector, useDispatch)(AdminTrackingDetails);
const styles = StyleSheet.create({
    container: (props) => [{
        flex: 1,
        backgroundColor: props.theme ? color.drakBackgroundColor : color.backgroundColor,

    }],
    listBox: (props) => [{
        minHeight: 100,
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
})