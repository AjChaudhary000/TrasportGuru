import { View, Text, StyleSheet, RefreshControl, ScrollView, FlatList, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { connect } from 'react-redux';

import color from '../../contents/color';
import AnimatedLoader from "react-native-animated-loader";
import icons from '../../contents/icons';
import calcKmFind from '../../components/kmFind';
import { updatePayment, setPaymentData } from '../../Redux/paymentSlice';
import { trackingDetailsById } from '../../Redux/fetchByIDSlice';
import { HeaderWithBackButton } from '../../components/header';
import Toast from 'react-native-simple-toast';
import RazorpayCheckout from 'react-native-razorpay';
const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
}
const TrackingDetails = (props) => {
    // console.log(props.route.params.id)
    const [refreshing, setRefreshing] = React.useState(false);

    const [amount, setAmount] = React.useState(0)
    React.useEffect(() => {
        if (props.paymentData?.status) {
            props.trackingDetailsById({ token: props.token, id: props.route.params.id });
            props.setPaymentData([])
            props.navigation.navigate('Confirmation', { payment: amount, type: "pay" });
        }
    }, [props])
    const onRefresh = React.useCallback(() => {

        props.trackingDetailsById({ token: props.token, id: props.route.params.id });
        setRefreshing(true);
        //  props.getUserDetails(token);
        wait(2000).then(() => setRefreshing(false));
    }, []);
    React.useEffect(() => {

        props.trackingDetailsById({ token: props.token, id: props.route.params.id });
    }, [])

    const paymentHendle = (item) => {

        let paymentStatus = "";
        const payment = item.totalPayment - item.paymentHistory[0].payment
        console.log(payment)
        setAmount(payment)
        let paymentHistory = [...item.paymentHistory, { payment }]
        paymentStatus = "Completing"
        var options = {
            description: 'Transport Guru Payments ',
            image: `${props.trackingDetails[0]?.tarsportId?.tarsportUserId.trasportAccount[0].trasportImage}`,
            currency: 'INR',
            key: 'rzp_test_K3zMkXzdEHbAqq',
            amount: Math.round(amount * 100),
            name: props.trackingDetails[0]?.tarsportId?.tarsportUserId.trasportAccount[0].trasportName,
            prefill: {
                email: props.userData?.email,
                contact: props.userData?.mobileno || '9106614742',
                name: props.userData?.username
            },
            theme: { color: '#119CB9' }
        }
        RazorpayCheckout.open(options).then((data) => {
            props.updatePayment({ data: { paymentHistory, paymentStatus }, id: item._id, token: props.token })


        }).catch((error) => {
            // handle failure
            console.log(error)
        });

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
            <HeaderWithBackButton name={"Tracking Details"} navigation={props.navigation} />
            <ScrollView style={{ paddingBottom: 100 }} refreshControl={
                <RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                />
            } showsVerticalScrollIndicator={false}>
                <FlatList data={props.trackingDetails} renderItem={(item) => (
                    <View style={{ marginBottom: 100 }}>
                        <View style={styles.listBox(props)} >
                            <View style={{
                                marginHorizontal: 20, flexDirection: "row", justifyContent: 'space-between',
                                paddingVertical: 2
                            }}>
                                <View style={{ width: '20%', justifyContent: 'center' }}>
                                    <View style={styles.image(props)}>
                                        <Image
                                            style={{
                                                width: 60, height: 60, alignSelf: "center"
                                            }}
                                            source={{ uri: item.item.tarsportId?.tarsportUserId.trasportAccount[0].trasportImage }}
                                        />
                                    </View>
                                </View>
                                <View style={{ justifyContent: 'center', width: '60%', paddingHorizontal: 10 }}>
                                    <Text style={{ fontSize: 20, fontWeight: 'bold', color: props.theme ? color.drakPrimaryColors : color.primaryColors }}>
                                        {item.item.tarsportId.tarsportUserId.trasportAccount[0].trasportName}

                                    </Text>
                                </View>
                                <View style={{ width: "30%", flexDirection: "row", justifyContent: 'space-between', paddingVertical: 10 }}>
                                    <TouchableOpacity style={{ width: "50%" }} onPress={() => console.log("heloo")}>
                                        <Image source={icons.call} style={styles.icon(props)} />
                                    </TouchableOpacity>
                                    <TouchableOpacity style={{ width: "50%" }} onPress={() => {
                                        console.log(item.item?.tarsportId?.tarsportUserId)
                                        if (item.item?.tarsportId.tarsportUserId._id === props.userData._id) {
                                            Toast.show("not found ...")
                                        } else {
                                            console.log(item.item?.tarsportId?.tarsportUserId)
                                            props.navigation.navigate("ChatDetails", { item: item.item?.tarsportId?.tarsportUserId })

                                        }
                                    }}>
                                        <Image source={icons.message} style={styles.icon(props)} />
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <View style={{ alignItems: "flex-start", paddingVertical: 4, marginHorizontal: 20, }}>
                                <Text style={{ fontWeight: 'bold', color: 'gray' }}>Truck Reg No : {item.item?.tarsportId.truckId.truckRegistartionNo}</Text>
                                <Text style={{ fontWeight: 'bold', color: 'gray' }}>Driver Name : {item.item?.tarsportId.driverId.driverName}</Text>
                                <View style={{ flexDirection: "row", justifyContent: 'space-between' }}>
                                    <View style={{ width: "90%" }}>
                                        <Text style={{ fontWeight: 'bold', color: 'gray' }}>Driver Mobile no : {item.item?.tarsportId.driverId.driverMobileNo}</Text>
                                    </View>
                                    <TouchableOpacity style={{ width: "10%" }}>
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
                                        {new Date(new Date(item.item.createdAt)).toLocaleDateString("en-US", { weekday: 'short', month: 'long', day: 'numeric' })}

                                    </Text>
                                </View>
                                <View >
                                    <Text style={{ color: color.primaryColors, fontWeight: 'bold', fontSize: 14 }}>
                                        {new Date(new Date(item.item.createdAt)).toLocaleDateString("en-US", { hour: 'numeric', minute: 'numeric', hour12: false }).toString().slice(-5)}
                                    </Text>

                                </View>

                            </View>
                            <View style={{ marginHorizontal: 10, paddingVertical: 4, flexDirection: 'row', justifyContent: 'space-between' }}>
                                <View style={{ width: '40%', alignItems: "center" }}>
                                    <Text style={{ fontWeight: 'bold', color: props.theme ? color.drakFontcolor : color.fontcolor }}>

                                        {(item.item.paymentid.from.name.split(',').reverse()[2])}
                                    </Text>

                                </View>
                                <View style={{ width: '20%', alignItems: "center" }}>
                                    <Image source={icons.transfer} style={{ width: 30, height: 30, tintColor: props.theme ? color.drakPrimaryColors : color.primaryColors }} />
                                </View>
                                <View style={{ width: '40%', alignItems: "center" }}>
                                    <Text style={{ fontWeight: 'bold', color: props.theme ? color.drakFontcolor : color.fontcolor }}>
                                        {(item.item.paymentid.destination.name.split(',').reverse()[2])}</Text>

                                </View>
                            </View>
                            <View style={{ alignItems: "center", paddingVertical: 4, flexDirection: 'row', justifyContent: 'space-between' }}>
                                <View style={{ width: '50%', alignItems: "center" }}>
                                    <Text style={{ fontWeight: 'bold', color: 'gray' }}>Duration</Text>
                                    <Text style={{ fontWeight: 'bold', color: props.theme ? color.drakFontcolor : color.fontcolor }}>
                                        {Math.round((calcKmFind(item.item.paymentid.from.lat,
                                            item.item.paymentid.from.lng,
                                            item.item.paymentid.destination.lat,
                                            item.item.paymentid.destination.lng)) / 45)} hrs </Text>
                                </View>

                                <View style={{ width: '50%', alignItems: "center" }}>
                                    <Text style={{ fontWeight: 'bold', color: 'gray' }}>Distance</Text>
                                    <Text style={{ fontWeight: 'bold', color: props.theme ? color.drakFontcolor : color.fontcolor }}>
                                        {(calcKmFind(item.item.paymentid.from.lat,
                                            item.item.paymentid.from.lng,
                                            item.item.paymentid.destination.lat,
                                            item.item.paymentid.destination.lng))} Km</Text>
                                </View>
                            </View>

                            <View style={{ flexDirection: 'row', marginVertical: 5, marginHorizontal: 10 }}>
                                <View style={{ width: "3%", alignItems: 'flex-end' }}>
                                    <Image source={icons.journey} style={{ width: 5, height: 50 * (item.item.tarsportId.routeId.routeStop.length + 2), tintColor: props.theme ? color.drakPrimaryColors : color.primaryColors }} />
                                </View>
                                <View style={{ width: "97%", justifyContent: 'center', paddingBottom: 10 }}>
                                    <View>
                                        <View style={{ margin: 5, flexDirection: 'row' }}>

                                            <View style={{ width: '5%', justifyContent: 'center' }}>
                                                <Image source={icons.forword} style={{ width: 20, height: 20, tintColor: (new Date(item.item.tarsportId.Truckdate) <= new Date()) ? "green" : color.primaryColors }} />
                                            </View>
                                            <View style={{ width: '95%' }}>
                                                <Text style={{ marginHorizontal: 10, fontWeight: 'bold', color: 'gray', fontSize: 16 }}>
                                                    {item.item.tarsportId.routeId.from.name}</Text>
                                            </View>

                                        </View>
                                        <View style={{ flexDirection: "row", justifyContent: 'space-between', marginHorizontal: 30 }}>
                                            <View style={{ alignItems: 'center' }}>
                                                <Text style={{ color: props.theme ? color.drakFontcolor : color.fontcolor, }}>
                                                    {new Date(item.item.tarsportId.Truckdate).toLocaleDateString("en-US", { weekday: 'short', month: 'long', day: 'numeric' })}
                                                </Text>
                                            </View>

                                            <View style={{ alignItems: 'center' }} >
                                                <Text style={{ color: props.theme ? color.drakFontcolor : color.fontcolor }}>
                                                    {new Date(item.item.tarsportId.Truckdate).toLocaleDateString("en-US", { hour: 'numeric', minute: 'numeric', hour12: false }).toString().slice(-5)}
                                                </Text>
                                            </View>

                                        </View>
                                    </View>
                                    <FlatList data={item.item.tarsportId.routeId.routeStop} renderItem={(data) => (

                                        <View >
                                            <View style={{ margin: 5, flexDirection: 'row' }}>

                                                <View style={{ width: '5%', justifyContent: 'center' }}>
                                                    <Image source={icons.forword} style={{
                                                        width: 20, height: 20, tintColor: ((new Date(new Date(item.item.tarsportId.Truckdate)
                                                            .setHours(new Date(item.item.tarsportId.Truckdate)
                                                                .getHours() + data.item.avgTime))) <= new Date()) ? "green" : color.primaryColors
                                                    }} />
                                                </View>
                                                <View style={{ width: '95%' }}>
                                                    <Text style={{ marginHorizontal: 10, fontWeight: 'bold', color: 'gray', fontSize: 16 }}>{data.item.stops}</Text>
                                                </View>

                                            </View>
                                            <View style={{ flexDirection: "row", justifyContent: 'space-between', marginHorizontal: 30 }}>
                                                <View style={{ alignItems: 'center' }} >
                                                    <Text style={{ color: props.theme ? color.drakFontcolor : color.fontcolor }}>
                                                        {new Date(new Date(item.item.tarsportId.Truckdate)
                                                            .setHours(new Date(item.item.tarsportId.Truckdate)
                                                                .getHours() + data.item.avgTime)).toLocaleDateString("en-US", { weekday: 'short', month: 'long', day: 'numeric' })}
                                                    </Text>
                                                </View>

                                                <View style={{ alignItems: 'center' }}>
                                                    <Text style={{ color: props.theme ? color.drakFontcolor : color.fontcolor, }}>
                                                        {new Date(new Date(item.item.tarsportId.Truckdate)
                                                            .setHours(new Date(item.item.tarsportId.Truckdate)
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
                                                    width: 20, height: 20, tintColor: ((new Date(new Date(item.item.tarsportId.Truckdate)
                                                        .setHours(new Date(item.item.tarsportId.Truckdate)
                                                            .getHours() + item.item.tarsportId.routeId.destination.avgTime))) <= new Date()) ? "green" : color.primaryColors
                                                }} />
                                            </View>
                                            <View style={{ width: '95%' }}>
                                                <Text style={{ marginHorizontal: 10, fontWeight: 'bold', color: 'gray', fontSize: 16 }}>
                                                    {item.item.tarsportId.routeId.destination.name}</Text>
                                            </View>

                                        </View>
                                        <View style={{ marginHorizontal: 30, flexDirection: "row", justifyContent: 'space-between' }}>
                                            <View style={{ alignItems: 'center' }}>
                                                <Text style={{ color: props.theme ? color.drakFontcolor : color.fontcolor, }}>
                                                    {new Date(new Date(item.item.tarsportId.Truckdate)
                                                        .setHours(new Date(item.item.tarsportId.Truckdate)
                                                            .getHours() + item.item.tarsportId.routeId.destination.avgTime)).toLocaleDateString("en-US", { weekday: 'short', month: 'long', day: 'numeric' })}
                                                </Text>
                                            </View>

                                            <View style={{ alignItems: 'center' }}>
                                                <Text style={{ color: props.theme ? color.drakFontcolor : color.fontcolor, }}>
                                                    {new Date(new Date(item.item.tarsportId.Truckdate)
                                                        .setHours(new Date(item.item.tarsportId.Truckdate)
                                                            .getHours() + item.item.tarsportId.routeId.destination.avgTime)).toLocaleDateString("en-US", { hour: 'numeric', minute: 'numeric', hour12: false }).toString().slice(-5)}
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
                                        {new Date(new Date(item.item.tarsportId.Truckdate)
                                            .setHours(new Date(item.item.tarsportId.Truckdate)
                                                .getHours() + Math.round((calcKmFind(item.item.paymentid.from.lat,
                                                    item.item.paymentid.from.lng,
                                                    item.item.paymentid.destination.lat,
                                                    item.item.paymentid.destination.lng)) / 45))).toLocaleDateString("en-US", { weekday: 'short', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', hour12: false })}
                                    </Text>
                                </View>
                                <View>
                                    {item.item.paymentid.paymentStatus === "Completing" ?
                                        <TouchableOpacity style={styles.paid}
                                        >
                                            <Text style={{ color: 'white', fontWeight: "bold", fontSize: 18 }}>Paid</Text>
                                        </TouchableOpacity> :
                                        <TouchableOpacity style={styles.pay(props)}
                                            onPress={() => {
                                                paymentHendle(item.item.paymentid)
                                            }}>
                                            <Text style={{ color: 'white', fontWeight: "bold", fontSize: 18 }}>Pay</Text>
                                        </TouchableOpacity>}
                                </View>
                            </View>
                        </View>
                        <View style={{ marginVertical: 5, marginHorizontal: 20 }}>
                            <Text style={{
                                fontSize: 20, color: props.theme ? color.drakFontcolor : color.fontcolor
                                , fontWeight: 'bold'
                            }}>
                                Payment summary</Text>
                        </View>
                        <View style={{ marginHorizontal: 20 }} >
                            <FlatList data={item.item?.paymentid?.paymentHistory} renderItem={(data) => (
                                <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>

                                    <View style={{ width: "5%" }}>
                                        <Text style={{ color: 'gray', fontWeight: 'bold', fontSize: 14 }}>{data.index + 1})</Text>
                                    </View>
                                    <View style={{ width: "55%" }}>
                                        <Text style={{ color: props.theme ? color.drakFontcolor : color.fontcolor, fontWeight: 'bold', fontSize: 20, justifyContent: "center" }}>
                                            {(Number(data.item.payment)).toLocaleString('en-IN', {
                                                maximumFractionDigits: 2,
                                                style: 'currency',
                                                currency: 'INR'
                                            })}
                                        </Text>

                                    </View>
                                    <View style={{ width: "40%" }} >

                                        <Text style={{ color: 'gray', fontWeight: 'bold', fontSize: 14, paddingRight: 2, justifyContent: "center" }}>
                                            {new Date(new Date(data.item.paymentDate)).toLocaleDateString("en-US", { weekday: 'short', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', hour12: false })}
                                        </Text>
                                    </View>
                                </View>
                            )} />
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
        trackingDetails: state.fetchById.trackingDetails,
        loading: state.fetchById.loading,
        paymentData: state.payment.paymentdata,
        userData: state.user.userData,
        token: state.token.token,
    }
)
const useDispatch = (dispatch) => {
    return {
        trackingDetailsById: (data) => dispatch(trackingDetailsById(data)),
        updatePayment: (data) => dispatch(updatePayment(data)),
        setPaymentData: (data) => dispatch(setPaymentData(data)),
    };
}
export default connect(useSelector, useDispatch)(TrackingDetails);
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
    }], pay: (props) => [{
        width: 150,
        height: 50,
        backgroundColor: props.theme ? color.drakPrimaryColors : color.primaryColors,
        borderRadius: 10,
        justifyContent: "center",
        alignItems: 'center', marginHorizontal: 10
    }],
    paid: {
        width: 150,
        height: 50,
        backgroundColor: '#32a852',
        borderRadius: 10,
        justifyContent: "center",
        alignItems: 'center', marginHorizontal: 10
    }, icon: (props) => [{
        width: 30,
        height: 30,
        tintColor: props.theme ? color.drakPrimaryColors : color.primaryColors
    }],
    image: (props) => [{
        overflow: 'hidden',
        alignSelf: 'center',
        width: 60,
        height: 60,
        borderRadius: 30,
        borderWidth: 3,
        borderColor: props.theme ? color.drakPrimaryColors : color.primaryColors,
        justifyContent: 'center'
    }],

})