import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, ScrollView } from 'react-native'
import React from 'react'
import { connect } from 'react-redux';
import { HeaderWithBackButton } from '../../components/header'
import { getSearchTransportList } from '../../Redux/searchTransportListSlice';
import { getJWTToken } from '../../Redux/helper';
import color from '../../contents/color';
import icons from '../../contents/icons';
import { getUserDetails } from '../../Redux/UserDetails';
import Toast from 'react-native-simple-toast';
import calcKmFind from '../../components/kmFind';
const SearchTransportList = (props) => {
    const [token, setToken] = React.useState('');
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
        props.getSearchTransportList({ ...props.route.params, token: token })
        props.getUserDetails(token)
    }, [token])

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
        }, image: {
            overflow: 'hidden',
            alignSelf: 'center',
            width: 60,
            height: 60,
            borderRadius: 30,
            borderWidth: 3,
            borderColor: props.theme ? color.drakPrimaryColors : color.primaryColors,
            justifyContent: 'center'
        },
        listData: {
            width: '72%',
            padding: 20
        },

        pay: {
            width: "45%",
            height: 45,
            backgroundColor: props.theme ? color.drakPrimaryColors : color.primaryColors,
            borderRadius: 10,
            justifyContent: "center",
            alignItems: 'center', marginHorizontal: 10
        }, icon: {
            width: 30,
            height: 30,
            tintColor: props.theme ? color.drakPrimaryColors : color.primaryColors
        }
    })
    console.log(props.searchList)
    return (
        <View style={styles.container}>
            <HeaderWithBackButton name={"Searching"} navigation={props.navigation} />
            <ScrollView style={{ marginBottom: 0 }} showsVerticalScrollIndicator={false}>
                <FlatList data={props.searchList} renderItem={(item) => (
                    <View style={styles.listBox}>
                        <View style={{
                            marginHorizontal: 20, flexDirection: "row", justifyContent: 'space-between',
                            paddingVertical: 2
                        }}>
                            <View style={{ width: '20%', justifyContent: 'center' }}>
                                <View style={styles.image}>
                                    <Image
                                        style={{
                                            width: 60, height: 60, alignSelf: "center"
                                        }}
                                        source={{ uri: item.item.tarsportUserId.trasportAccount[0].trasportImage }}
                                    />
                                </View>
                            </View>
                            <View style={{ justifyContent: 'center', width: '80%', paddingHorizontal: 10 }}>
                                <Text style={{ fontSize: 20, fontWeight: 'bold', color: props.theme ? color.drakPrimaryColors : color.primaryColors }}>{item.item.tarsportUserId.trasportAccount[0].trasportName}</Text>
                            </View>

                        </View>

                        <View style={{ alignItems: "center" }}>
                            <Text style={{ fontWeight: 'bold', color: props.theme ? color.drakFontcolor : color.fontcolor }}>
                                {item.item.routeId.from.name}
                            </Text>
                            <View style={{ marginHorizontal: 20, marginVertical: 5, flexDirection: "row", justifyContent: 'space-between' }}>
                                <View >
                                    <Text style={{ color: 'gray', fontWeight: 'bold', fontSize: 14, paddingRight: 2 }}>
                                        {new Date(item.item.Truckdate).toLocaleDateString("en-US", { weekday: 'short', month: 'long', day: 'numeric' })}
                                    </Text>
                                </View>
                                <View >
                                    <Text style={{ color: color.primaryColors, fontWeight: 'bold', fontSize: 14 }}>
                                        {new Date(item.item.Truckdate).toLocaleDateString("en-US", { hour: 'numeric', minute: 'numeric', hour12: false }).toString().slice(-5)}
                                    </Text>

                                </View>

                            </View>
                        </View>
                        <View style={{ alignItems: "center", paddingVertical: 4, flexDirection: 'row', justifyContent: 'center' }}>
                            <View style={{ width: '33%', alignItems: "center" }}>
                                <Text style={{fontWeight:'bold',color:props.theme?color.drakFontcolor:color.fontcolor}}>
                                    {item.item.routeId.destination.avgTime}hr:00m:00s</Text>
                            </View>
                            <View style={{ width: '34%', alignItems: "center" }}>
                                <Image source={icons.upToDown} style={{ width: 30, height: 30, tintColor: props.theme ? color.drakPrimaryColors : color.primaryColors }} />
                            </View>
                            <View style={{ width: '33%', alignItems: "center" }}>
                                <Text style={{fontWeight:'bold',color:props.theme?color.drakFontcolor:color.fontcolor}}> {calcKmFind(item.item.routeId.from.lat, 
                                    item.item.routeId.from.lng,
                                     item.item.routeId.destination.lat,
                                      item.item.routeId.destination.lng)} Km</Text>
                            </View>
                        </View>
                        <View style={{ alignItems: "center" }}>
                            <Text style={{ fontWeight: 'bold', color: props.theme ? color.drakFontcolor : color.fontcolor, textAlign: "center" }}>
                                {item.item.routeId.destination.name}
                            </Text>
                            <View style={{ marginHorizontal: 20, paddingTop: 5, flexDirection: "row", justifyContent: 'center' }}>
                                <View >
                                    <Text style={{ color: 'gray', fontWeight: 'bold', fontSize: 14, paddingRight: 2 }}>
                                        {new Date(new Date(item.item.Truckdate)
                                            .setHours(new Date(item.item.Truckdate)
                                                .getHours() + item.item.routeId.destination.avgTime)).toLocaleDateString("en-US", { weekday: 'short', month: 'long', day: 'numeric' })}
                                    </Text>
                                </View>
                                <View >
                                    <Text style={{ color: color.primaryColors, fontWeight: 'bold', fontSize: 14 }}>
                                        {new Date(new Date(item.item.Truckdate)
                                            .setHours(new Date(item.item.Truckdate)
                                                .getHours() + item.item.routeId.destination.avgTime)).toLocaleDateString("en-US", { hour: 'numeric', minute: 'numeric', hour12: false }).toString().slice(-5)}
                                    </Text>
                                </View>
                            </View>
                        </View>

                        <View style={{ marginHorizontal: 10, marginTop: 5, flexDirection: "row", justifyContent: 'space-between' }}>
                            <TouchableOpacity onPress={() => { setRoute({ type: !route.type, id: item.item.routeId._id }) }}>
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
                            <View style={{ flexDirection: 'row', marginVertical: 10 }}>
                                <View style={{ width: "5%", justifyContent: 'center' }}>
                                    <Image source={icons.journey} style={{ width: 10, height: 70 * item.item.routeId.routeStop.length, tintColor: props.theme ? color.drakPrimaryColors : color.primaryColors }} />
                                </View>
                                <View style={{ width: "95%", justifyContent: 'center', paddingBottom: 10 }}>
                                    <FlatList data={item.item.routeId.routeStop} renderItem={(data) => (
                                        <View>
                                            <View style={{ margin: 10, flexDirection: 'row' }}>

                                                <View style={{ width: '5%', justifyContent: 'center' }}>
                                                    <Image source={icons.forword} style={{ width: 20, height: 20, tintColor: props.theme ? color.drakPrimaryColors : color.primaryColors }} />
                                                </View>
                                                <View style={{ width: '95%' }}>
                                                    <Text style={{ marginHorizontal: 10, fontWeight: 'bold', color: 'gray', fontSize: 16 }}>{data.item.stops}</Text>
                                                </View>

                                            </View>
                                            <View style={{ marginHorizontal: 20, marginVertical: 1, flexDirection: "row", justifyContent: 'space-between' }}>
                                                <View >
                                                    <Text style={{ color: props.theme ? color.drakFontcolor : color.fontcolor, fontWeight: 'bold' }}>
                                                        {new Date(new Date(item.item.Truckdate)
                                                            .setHours(new Date(item.item.Truckdate)
                                                                .getHours() + data.item.avgTime)).toLocaleDateString("en-US", { weekday: 'short', month: 'long', day: 'numeric' })}
                                                    </Text>
                                                </View>
                                                <View >
                                                    <Text style={{ color: props.theme ? color.drakFontcolor : color.fontcolor, fontWeight: 'bold' }}>
                                                        {new Date(new Date(item.item.Truckdate)
                                                            .setHours(new Date(item.item.Truckdate)
                                                                .getHours() + data.item.avgTime)).toLocaleDateString("en-US", { hour: 'numeric', minute: 'numeric', hour12: false }).toString().slice(-6)}
                                                    </Text>
                                                </View>
                                            </View>
                                        </View>
                                    )}
                                    />
                                </View>
                            </View>}
                        {/* route data */}

                        <View style={{ flexDirection: "row", justifyContent: 'space-between', padding: 5 }}>
                            <View style={{ width: "50%", flexDirection: "row", justifyContent: 'space-between', paddingVertical: 10 }}>
                                <TouchableOpacity style={{ width: "30%" }}>
                                    <Image source={icons.call} style={styles.icon} />
                                </TouchableOpacity>
                                <TouchableOpacity style={{ width: "30%" }} onPress={() => {

                                    if (item.item?.tarsportUserId._id === props.userData._id) {
                                        Toast.show("not found ...")
                                    } else {
                                        props.navigation.navigate("ChatDetails", { item: item.item?.tarsportUserId })
                                    }
                                }}>
                                    <Image source={icons.message} style={styles.icon} />
                                </TouchableOpacity>
                                <TouchableOpacity style={{ width: "30%" }}>
                                    <Image source={icons.share} style={styles.icon} />
                                </TouchableOpacity>
                            </View>
                            <TouchableOpacity style={styles.pay} onPress={() => { props.navigation.navigate("Booking", { item: item.item }) }}>
                                <Text style={{ color: 'white', fontWeight: "bold" }}>Book Now</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                )
                } />
            </ScrollView>
        </View >
    )
}
const useDispatch = (dispatch) => {
    return {
        getSearchTransportList: (data) => dispatch(getSearchTransportList(data)),
        getUserDetails: (data) => dispatch(getUserDetails(data)),
    };
}
const useSelector = (state) => (

    {
        userData: state.user.userData,
        theme: state.token.theme,
        searchList: state.search.serachData
    }
)
export default connect(useSelector, useDispatch)(SearchTransportList);