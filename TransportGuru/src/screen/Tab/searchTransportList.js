import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { connect } from 'react-redux';
import { HeaderWithBackButton } from '../../components/header'
import { getSearchTransportList } from '../../Redux/searchTransportListSlice';
import { getJWTToken } from '../../Redux/helper';
import color from '../../contents/color';
import icons from '../../contents/icons';


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
        profile: {
            width: 90,
            height: 45,
            backgroundColor: props.theme ? color.drakAdminprimaryColors : color.adminprimaryColors,
            borderRadius: 10,
            justifyContent: "center",
            alignItems: 'center', marginHorizontal: 10
        },
        pay: {
            width: 90,
            height: 45,
            backgroundColor: props.theme ? color.drakPrimaryColors : color.primaryColors,
            borderRadius: 10,
            justifyContent: "center",
            alignItems: 'center', marginHorizontal: 10
        }
    })
    return (
        <View style={styles.container}>
            <HeaderWithBackButton name={"Searching"} navigation={props.navigation} />
            <FlatList data={props.searchList} renderItem={(item) => (
                <View style={styles.listBox}>
                    <View style={{ marginHorizontal: 20, marginVertical: 10, flexDirection: "row", justifyContent: 'space-between' }}>
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
                    <View style={{ alignItems: "center" }}>
                        <Text style={{ fontWeight: 'bold', color: props.theme ? color.drakFontcolor : color.fontcolor }}>
                            {item.item.routeId.from.name}
                        </Text>
                    </View>
                    <View style={{ alignItems: "center", paddingVertical: 20 }}>
                        <Image source={icons.upToDown} style={{ width: 30, height: 30, tintColor: props.theme ? color.drakPrimaryColors : color.primaryColors }} />
                    </View>
                    <View style={{ alignItems: "center" }}>
                        <Text style={{ fontWeight: 'bold', color: props.theme ? color.drakFontcolor : color.fontcolor }}>
                            {item.item.routeId.destination.name}
                        </Text>
                    </View>

                    <View style={{ marginHorizontal: 20, marginTop: 10, flexDirection: "row", justifyContent: 'space-between' }}>
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
                        <View style={{ flexDirection: 'row', marginVertical: 20 }}>
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
                                                            .getHours() + data.item.avgTime)).toLocaleDateString("en-US", { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                                                </Text>
                                            </View>
                                            <View >
                                                <Text style={{ color: props.theme ? color.drakFontcolor : color.fontcolor, fontWeight: 'bold' }}>
                                                    {new Date(new Date(item.item.Truckdate)
                                                        .setHours(new Date(item.item.Truckdate)
                                                            .getHours() + data.item.avgTime)).toLocaleDateString("en-US", { hour: 'numeric', minute: 'numeric' }).toString().slice(-8)}
                                                </Text>
                                            </View>
                                        </View>
                                    </View>
                                )}
                                />
                            </View>
                        </View>}
                    {/* route data */}
                    <View style={{
                        marginHorizontal: 20, flexDirection: "row", justifyContent: 'space-between',
                        paddingVertical: 10, marginTop: 10
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
                        <View style={{ justifyContent: 'center', width: '80%', paddingHorizontal: 20 }}>
                            <Text style={{ fontSize: 20, fontWeight: 'bold', color: color.primaryColors }}>{item.item.tarsportUserId.trasportAccount[0].trasportName}</Text>
                            <View style={{ flexDirection: "row", justifyContent: 'space-between', padding: 10 }}>
                                <TouchableOpacity style={styles.profile}>
                                    <Text style={{ color: 'white', fontWeight: "bold" }}>Profile</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.pay}>
                                    <Text style={{ color: 'white', fontWeight: "bold" }}>Pay</Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                    </View>

                </View>
            )
            } />

        </View >
    )
}
const useDispatch = (dispatch) => {
    return {
        getSearchTransportList: (data) => dispatch(getSearchTransportList(data))
    };
}
const useSelector = (state) => (

    {
        theme: state.token.theme,
        searchList: state.search.serachData
    }
)
export default connect(useSelector, useDispatch)(SearchTransportList);