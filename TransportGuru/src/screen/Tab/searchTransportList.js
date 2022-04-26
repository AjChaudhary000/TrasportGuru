import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, ScrollView, Modal, Dimensions, Linking } from 'react-native'
import React from 'react'
import { connect } from 'react-redux';
import { HeaderWithBackButton } from '../../components/header'
import { getSearchTransportList } from '../../Redux/searchTransportListSlice';
import color from '../../contents/color';
import icons from '../../contents/icons';
import Toast from 'react-native-simple-toast';
import calcKmFind from '../../components/kmFind';
import AnimatedLoader from "react-native-animated-loader";
import LottieView from 'lottie-react-native';
const SearchTransportList = (props) => {


    const [modalVisible, setModalVisible] = React.useState(false);
    const [route, setRoute] = React.useState({ type: false, id: '' })

    React.useEffect(() => {


        props.getSearchTransportList({ ...props.route.params, token: props.token })

    }, [])
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
            <HeaderWithBackButton name={"Searching"} navigation={props.navigation} />
            <ScrollView style={{ marginBottom: 0 }} showsVerticalScrollIndicator={false}>
                {props.searchList.length === 0 ?



                    <View style={{ flex: 1 }}>

                        <View style={{ height: 500, width: 200, alignSelf: 'center' }}>
                            <LottieView source={require('../../assets/json/notfound.json')} autoPlay loop />
                        </View>

                    </View>

                    :
                    <FlatList data={props.searchList} renderItem={(item) => (
                        <View style={styles.listBox(props)}>
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
                                            source={{ uri: item.item.tarsportUserId.trasportAccount[0].trasportImage }}
                                        />
                                    </View>
                                </View>
                                <View style={{ justifyContent: 'center', width: '60%', paddingHorizontal: 10 }}>
                                    <Text style={{ fontSize: 20, fontWeight: 'bold', color: props.theme ? color.drakPrimaryColors : color.primaryColors }}>{item.item.tarsportUserId.trasportAccount[0].trasportName}</Text>
                                </View>
                                <View style={{ width: "30%", flexDirection: "row", justifyContent: 'space-between', paddingVertical: 10 }}>
                                    <TouchableOpacity style={{ width: "50%" }} onPress={() => { Linking.canOpenURL(`tel:${item.item.tarsportUserId.trasportAccount[0].trasportmobile}`) }}>
                                        <Image source={icons.call} style={styles.icon(props)} />
                                    </TouchableOpacity>
                                    <TouchableOpacity style={{ width: "50%" }} onPress={() => {

                                        if (item.item?.tarsportUserId._id === props.userData._id) {
                                            Toast.show("not found ...")
                                        } else {
                                            props.navigation.navigate("ChatDetails", { item: item.item?.tarsportUserId })
                                        }
                                    }}>
                                        <Image source={icons.message} style={styles.icon(props)} />
                                    </TouchableOpacity>
                                </View>
                            </View>

                            <View style={{ alignItems: "center" }}>
                                <Text style={{ fontWeight: 'bold', color: props.theme ? color.drakFontcolor : color.fontcolor }}>
                                    {props.route.params.from.name}
                                </Text>
                                <View style={{ marginHorizontal: 20, marginVertical: 5, flexDirection: "row", justifyContent: 'space-between' }}>
                                    <View >

                                        <Text style={{ color: 'gray', fontWeight: 'bold', fontSize: 14, paddingRight: 2 }}>
                                            {new Date(new Date(item.item.Truckdate)
                                                .setHours(new Date(item.item.Truckdate)
                                                    .getHours() + Math.round((calcKmFind(item.item.routeId.from.lat,
                                                        item.item.routeId.from.lng,
                                                        props?.route.params.from.lat,
                                                        props?.route.params.from.lng)) / 45))).toLocaleDateString("en-US", { weekday: 'short', month: 'long', day: 'numeric' })}

                                        </Text>
                                    </View>
                                    <View >
                                        <Text style={{ color: color.primaryColors, fontWeight: 'bold', fontSize: 14 }}>
                                            {new Date(new Date(item.item.Truckdate)
                                                .setHours(new Date(item.item.Truckdate)
                                                    .getHours() + Math.round((calcKmFind(item.item.routeId.from.lat,
                                                        item.item.routeId.from.lng,
                                                        props?.route.params.from.lat,
                                                        props?.route.params.from.lng)) / 45))).toLocaleDateString("en-US", { hour: 'numeric', minute: 'numeric', hour12: false }).toString().slice(-5)}
                                        </Text>

                                    </View>

                                </View>
                            </View>
                            <View style={{ alignItems: "center", paddingVertical: 4, flexDirection: 'row', justifyContent: 'center' }}>
                                <View style={{ width: '33%', alignItems: "center" }}>
                                    <Text style={{ fontWeight: 'bold', color: 'gray' }}>Duration</Text>
                                    <Text style={{ fontWeight: 'bold', color: props.theme ? color.drakFontcolor : color.fontcolor }}>
                                        {Math.round((calcKmFind(props.route.params.from.lat,
                                            props.route.params.from.lng,
                                            props.route.params.destination.lat,
                                            props.route.params.destination.lng)) / 45)} hrs </Text>
                                </View>
                                <View style={{ width: '34%', alignItems: "center" }}>
                                    <Image source={icons.upToDown} style={{ width: 30, height: 30, tintColor: props.theme ? color.drakPrimaryColors : color.primaryColors }} />
                                </View>
                                <View style={{ width: '33%', alignItems: "center" }}>
                                    <Text style={{ fontWeight: 'bold', color: 'gray' }}>Distance</Text>
                                    <Text style={{ fontWeight: 'bold', color: props.theme ? color.drakFontcolor : color.fontcolor }}>
                                        {(calcKmFind(props.route.params.from.lat,
                                            props.route.params.from.lng,
                                            props.route.params.destination.lat,
                                            props.route.params.destination.lng))} Km</Text>
                                </View>
                            </View>
                            <View style={{ alignItems: "center" }}>
                                <Text style={{ fontWeight: 'bold', color: props.theme ? color.drakFontcolor : color.fontcolor, textAlign: "center" }}>
                                    {props.route.params.destination.name}
                                </Text>
                                <View style={{ marginHorizontal: 20, paddingTop: 5, flexDirection: "row", justifyContent: 'center' }}>
                                    <View >
                                        <Text style={{ color: 'gray', fontWeight: 'bold', fontSize: 14, paddingRight: 2 }}>
                                            {new Date(new Date(item.item.Truckdate)
                                                .setHours(new Date(item.item.Truckdate)
                                                    .getHours() + Math.round((calcKmFind(props.route.params.from.lat,
                                                        props.route.params.from.lng,
                                                        props.route.params.destination.lat,
                                                        props.route.params.destination.lng)) / 45))).toLocaleDateString("en-US", { weekday: 'short', month: 'long', day: 'numeric' })}
                                        </Text>
                                    </View>
                                    <View >
                                        <Text style={{ color: color.primaryColors, fontWeight: 'bold', fontSize: 14 }}>
                                            {new Date(new Date(item.item.Truckdate)
                                                .setHours(new Date(item.item.Truckdate)
                                                    .getHours() + Math.round((calcKmFind(props.route.params.from.lat,
                                                        props.route.params.from.lng,
                                                        props.route.params.destination.lat,
                                                        props.route.params.destination.lng)) / 45))).toLocaleDateString("en-US", { hour: 'numeric', minute: 'numeric', hour12: false }).toString().slice(-5)}
                                        </Text>
                                    </View>
                                </View>
                            </View>

                            <View style={{ marginHorizontal: 10, marginTop: 5, flexDirection: "row", justifyContent: 'space-between' }}>
                                <TouchableOpacity onPress={() => { setRoute({ type: !route.type, id: item.item.routeId._id }), setModalVisible(true) }}>
                                    <Text style={{ color: color.primaryColors, fontWeight: 'bold' }}>
                                        Routes</Text>
                                </TouchableOpacity>
                                <View >
                                    <Text style={{ color: 'gray', fontWeight: 'bold' }}>
                                        {(item.item.truckId.truckCapicity) - (item.item.capicity)} Available / Tonnes </Text>
                                </View>
                            </View>
                            {/* route data */}
                            {route.type && route.id === item.item.routeId._id &&
                                <Modal
                                    animationType="slide"
                                    transparent={true}
                                    visible={modalVisible}
                                    onRequestClose={() => {
                                        Alert.alert("Modal has been closed.");
                                        setModalVisible(!modalVisible);
                                    }} >
                                    <View style={{ flex: 1, justifyContent: 'center' }}>

                                        <View style={styles.modelBox(props)}>
                                            <TouchableOpacity onPress={() => { setRoute({ type: !route.type, id: item.item.routeId._id }), setModalVisible(false) }} style={{ alignItems: 'center', left: Dimensions.get('screen').width / 2 - 40 }}>
                                                <Image source={icons.close} style={{ width: 35, height: 35, tintColor: props.theme ? color.drakPrimaryColors : color.primaryColors, }} />
                                            </TouchableOpacity>
                                            <View style={{ flexDirection: 'row', marginVertical: 5, }}>
                                                <View style={{ width: "3%", alignItems: 'flex-end' }}>
                                                    <Image source={icons.journey} style={{ width: 5, height: 50 * (item.item.routeId.routeStop.length + 2), tintColor: props.theme ? color.drakPrimaryColors : color.primaryColors }} />
                                                </View>
                                                <View style={{ width: "97%", justifyContent: 'center', paddingBottom: 10 }}>
                                                    <View>
                                                        <View style={{ margin: 5, flexDirection: 'row' }}>

                                                            <View style={{ width: '5%', justifyContent: 'center' }}>
                                                                <Image source={icons.forword} style={{ width: 20, height: 20, tintColor: props.theme ? color.drakPrimaryColors : color.primaryColors }} />
                                                            </View>
                                                            <View style={{ width: '95%' }}>
                                                                <Text style={{ marginHorizontal: 10, fontWeight: 'bold', color: 'gray', fontSize: 16 }}>
                                                                    {item.item.routeId.from.name}</Text>
                                                            </View>

                                                        </View>
                                                        <View style={{ marginHorizontal: 20, flexDirection: "row", justifyContent: 'space-between' }}>
                                                            <View style={{ width: "33%", alignItems: 'center' }}>
                                                                <Text style={{ color: props.theme ? color.drakFontcolor : color.fontcolor, }}>
                                                                    {new Date(item.item.Truckdate).toLocaleDateString("en-US", { weekday: 'short', month: 'long', day: 'numeric' })}
                                                                </Text>
                                                            </View>

                                                            <View style={{ width: "33%", alignItems: 'center' }} >
                                                                <Text style={{ color: props.theme ? color.drakFontcolor : color.fontcolor }}>
                                                                    {new Date(item.item.Truckdate).toLocaleDateString("en-US", { hour: 'numeric', minute: 'numeric', hour12: false }).toString().slice(-5)}
                                                                </Text>
                                                            </View>
                                                            <View style={{ width: "34%", alignItems: 'center' }}>
                                                                <Text style={{ color: props.theme ? color.drakFontcolor : color.fontcolor, fontWeight: 'bold' }}>
                                                                    -
                                                                </Text>
                                                            </View>
                                                        </View>
                                                    </View>
                                                    <FlatList data={item.item.routeId.routeStop} renderItem={(data) => (

                                                        <View >
                                                            <View style={{ margin: 5, flexDirection: 'row' }}>

                                                                <View style={{ width: '5%', justifyContent: 'center' }}>
                                                                    <Image source={icons.forword} style={{ width: 20, height: 20, tintColor: props.theme ? color.drakPrimaryColors : color.primaryColors }} />
                                                                </View>
                                                                <View style={{ width: '95%' }}>
                                                                    <Text style={{ marginHorizontal: 10, fontWeight: 'bold', color: 'gray', fontSize: 16 }}>{data.item.stops}</Text>
                                                                </View>

                                                            </View>
                                                            <View style={{ marginHorizontal: 20, flexDirection: "row", justifyContent: 'space-between' }}>
                                                                <View style={{ width: "33%", alignItems: 'center' }} >
                                                                    <Text style={{ color: props.theme ? color.drakFontcolor : color.fontcolor }}>
                                                                        {new Date(new Date(item.item.Truckdate)
                                                                            .setHours(new Date(item.item.Truckdate)
                                                                                .getHours() + data.item.avgTime)).toLocaleDateString("en-US", { weekday: 'short', month: 'long', day: 'numeric' })}
                                                                    </Text>
                                                                </View>

                                                                <View style={{ width: "33%", alignItems: 'center' }}>
                                                                    <Text style={{ color: props.theme ? color.drakFontcolor : color.fontcolor, }}>
                                                                        {new Date(new Date(item.item.Truckdate)
                                                                            .setHours(new Date(item.item.Truckdate)
                                                                                .getHours() + data.item.avgTime)).toLocaleDateString("en-US", { hour: 'numeric', minute: 'numeric', hour12: false }).toString().slice(-6)}
                                                                    </Text>
                                                                </View>
                                                                <View style={{ width: "34%", alignItems: 'center' }}>
                                                                    <Text style={{ color: props.theme ? color.drakFontcolor : color.fontcolor, fontWeight: 'bold' }}>
                                                                        {((calcKmFind(props.route.params.from.lat,
                                                                            props.route.params.from.lng,
                                                                            data.item.lat,
                                                                            data.item.lng)) * (props.route.params.capicity) * (item.item.truckPrice)).toLocaleString('en-IN', {
                                                                                maximumFractionDigits: 2,
                                                                                style: 'currency',
                                                                                currency: 'INR'
                                                                            })}
                                                                    </Text>
                                                                </View>
                                                            </View>
                                                        </View>
                                                    )}
                                                    />
                                                    <View>
                                                        <View style={{ margin: 5, flexDirection: 'row' }}>

                                                            <View style={{ width: '5%', justifyContent: 'center' }}>
                                                                <Image source={icons.forword} style={{ width: 20, height: 20, tintColor: props.theme ? color.drakPrimaryColors : color.primaryColors }} />
                                                            </View>
                                                            <View style={{ width: '95%' }}>
                                                                <Text style={{ marginHorizontal: 10, fontWeight: 'bold', color: 'gray', fontSize: 16 }}>
                                                                    {item.item.routeId.destination.name}</Text>
                                                            </View>

                                                        </View>
                                                        <View style={{ marginHorizontal: 20, flexDirection: "row", justifyContent: 'space-between' }}>
                                                            <View style={{ width: "34%", alignItems: 'center' }}>
                                                                <Text style={{ color: props.theme ? color.drakFontcolor : color.fontcolor, }}>
                                                                    {new Date(new Date(item.item.Truckdate)
                                                                        .setHours(new Date(item.item.Truckdate)
                                                                            .getHours() + item.item.routeId.destination.avgTime)).toLocaleDateString("en-US", { weekday: 'short', month: 'long', day: 'numeric' })}
                                                                </Text>
                                                            </View>

                                                            <View style={{ width: "33%", alignItems: 'center' }}>
                                                                <Text style={{ color: props.theme ? color.drakFontcolor : color.fontcolor, }}>
                                                                    {new Date(new Date(item.item.Truckdate)
                                                                        .setHours(new Date(item.item.Truckdate)
                                                                            .getHours() + item.item.routeId.destination.avgTime)).toLocaleDateString("en-US", { hour: 'numeric', minute: 'numeric', hour12: false }).toString().slice(-5)}
                                                                </Text>
                                                            </View>
                                                            <View style={{ width: "34%", alignItems: 'center' }}>
                                                                <Text style={{ color: props.theme ? color.drakFontcolor : color.fontcolor, fontWeight: 'bold' }}>
                                                                    {((calcKmFind(props.route.params.from.lat,
                                                                        props.route.params.from.lng,
                                                                        item.item.routeId.destination.lat,
                                                                        item.item.routeId.destination.lng)) * (props.route.params.capicity) * (item.item.truckPrice)).toLocaleString('en-IN', {
                                                                            maximumFractionDigits: 2,
                                                                            style: 'currency',
                                                                            currency: 'INR'
                                                                        })}
                                                                </Text>
                                                            </View>
                                                        </View>
                                                    </View>
                                                </View>
                                            </View>
                                        </View>
                                    </View>
                                </Modal>}
                            {/* route data */}



                            <TouchableOpacity style={styles.pay(props)}
                                onPress={() => {
                                    props.navigation.navigate("Booking", {
                                        tarsportId: item.item._id,
                                        from: props.route.params.from,
                                        destination: props.route.params.destination,
                                        capicity: props.route.params.capicity
                                    })
                                }}>
                                <Text style={{ color: 'white', fontWeight: "bold" }}>Book Now</Text>
                            </TouchableOpacity>

                        </View>
                    )
                    } />}
            </ScrollView >
        </View >
    )
}
const useDispatch = (dispatch) => {
    return {
        getSearchTransportList: (data) => dispatch(getSearchTransportList(data)),
        //  getUserDetails: (data) => dispatch(getUserDetails(data)),
    };
}
const useSelector = (state) => (

    {
        userData: state.user.userData,
        theme: state.token.theme,
        searchList: state.search.serachData,
        loading: state.search.loading,
        token: state.token.token,
    }
)
export default connect(useSelector, useDispatch)(SearchTransportList);
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
    }], image: (props) => [{
        overflow: 'hidden',
        alignSelf: 'center',
        width: 60,
        height: 60,
        borderRadius: 30,
        borderWidth: 3,
        borderColor: props.theme ? color.drakPrimaryColors : color.primaryColors,
        justifyContent: 'center'
    }],
    listData: {
        width: '72%',
        padding: 20
    },

    pay: (props) => [{
        width: "90%",
        height: 45,
        backgroundColor: props.theme ? color.drakPrimaryColors : color.primaryColors,
        borderRadius: 10,
        justifyContent: "center",
        alignItems: 'center',
        alignSelf: "center"
    }], icon: (props) => [{
        width: 30,
        height: 30,
        tintColor: props.theme ? color.drakPrimaryColors : color.primaryColors
    }], modelBox: (props) => [{
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
    }],
})
