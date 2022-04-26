import {
    View, Text, StyleSheet, TextInput, TouchableOpacity, Image, TouchableWithoutFeedback,
    Keyboard, Dimensions, Modal, ScrollView, LogBox
} from 'react-native'
import React from 'react'
import { AdminHeaderWithBackButton } from '../../components/adminHeader';
import color from '../../contents/color'
import icons from '../../contents/icons';
import { connect } from 'react-redux'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { addRoute, setRouteData, updateRoute } from '../../Redux/Admin/routeSlice';
import { getCountRoute } from '../../Redux/Admin/countAddSlice';
import DraggableFlatList from 'react-native-draggable-flatlist';
import Toast from 'react-native-simple-toast';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
const AddRoute = (props) => {
    const [modalVisible, setModalVisible] = React.useState(false);
    const [placetype, setPlaceType] = React.useState()
    const [data, setData] = React.useState({
        from: {
            name: props.route.params?.item?.from.name || 'From',
            lat: props.route.params?.item?.from.lat || 0.0,
            lng: props.route.params?.item?.from.lng || 0.0,
            avgTime: props.route.params?.item?.from.avgTime || 0
        },
        destination: {
            name: props.route.params?.item?.destination.name || 'destination',
            lat: props.route.params?.item?.destination.lat || 0.0,
            lng: props.route.params?.item?.destination.lng || 0.0,
            avgTime: props.route.params?.item?.destination.avgTime || 0,
        },
    })
    const [stopList, setStopList] = React.useState(props.route.params?.item?.routeStop || []);
    const [inputBox, setInputBox] = React.useState(false)
    const [moveBox, setMoveBox] = React.useState(false)
    React.useEffect(() => {
        LogBox.ignoreLogs(["VirtualizedLists should never be nested"])
    }, [])
    React.useEffect(() => {
        if (props?.routeData.status) {
            props.getCountRoute(props.token)
            props.setRouteData({})
            props.navigation.goBack();
        }
        ;
    }, [props])
    const AddRoute = () => {
        if (data.from.name === "From") {
            Toast.show("Enter loading from")
        } else if (data.destination.name === "Destination") {
            Toast.show("Enter unloading destination")
        } else if (stopList === []) {
            Toast.show("Enter truck rotes")
        } else {
            props.addRoute({ ...data, routeStop: stopList, token: props.token })
        }
    }
    const UpdateRoute = () => {
        if (data.from === "From") {
            Toast.show("Enter loading from")
        } else if (data.destination === "Destination") {
            Toast.show("Enter unloading destination")
        } else if (stopList === []) {
            Toast.show("Enter truck rotes")
        } else {
            props.updateRoute({ ...data, id: props.route.params?.item?._id, routeStop: stopList, token: props.token })
        }
    }


    function calcCrow(lat1, lon1, lat2, lon2) {
        console.log(lat1, lon1, lat2, lon2)
        var R = 6371; // km
        var dLat = toRad(lat2 - lat1);
        var dLon = toRad(lon2 - lon1);
        var lat1 = toRad(lat1);
        var lat2 = toRad(lat2);

        var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        var d = R * c;

        return Math.round(d / 45);
    }

    // Converts numeric degrees to radians
    function toRad(Value) {
        return Value * Math.PI / 180;
    }


    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.container(props)}>


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
                        <View style={styles.modelBox(props)}>
                            <ScrollView keyboardShouldPersistTaps="handled" >
                                <TouchableOpacity onPress={() => { setModalVisible(false) }} style={{ alignItems: 'center', left: Dimensions.get('screen').width / 2 - 40 }}>
                                    <Image source={icons.close} style={{ width: 35, height: 35, tintColor: props.theme ? color.drakPrimaryColors : color.primaryColors, }} />
                                </TouchableOpacity>
                                <View style={{ marginHorizontal: 30, marginVertical: 20 }}>
                                    <Text style={{ color: 'gray', fontSize: 20, fontWeight: 'bold' }}>Search Stops</Text>
                                </View>
                                <GooglePlacesAutocomplete
                                    placeholder={placetype === "from" ? "eg. From" : "eg. destination"}
                                    placeholderTextColor={'gray'}
                                    minLength={2} // minimum length of text to search
                                    fetchDetails={true}
                                    renderDescription={row => row.description} // custom description render
                                    onPress={(dt, details = null) => {

                                        placetype === "from" && setData({ ...data, from: { name: dt.description, lat: details.geometry.location.lat, lng: details.geometry.location.lng, avgTime: 0 } });
                                        if (placetype === "destination") {
                                            const d = calcCrow(data.from.lat, data.from.lng, details.geometry.location.lat, details.geometry.location.lng)
                                            console.log("time", d);
                                            setData({ ...data, destination: { name: dt.description, lat: details.geometry.location.lat, lng: details.geometry.location.lng, avgTime: d } });
                                        }
                                        if (placetype === "addStop") {
                                            const d = calcCrow(data.from.lat, data.from.lng, details.geometry.location.lat, details.geometry.location.lng)
                                            setStopList([...stopList, { stops: dt.description, lat: details.geometry.location.lat, lng: details.geometry.location.lng, avgTime: d }]);
                                        } setModalVisible(false)
                                        setInputBox(false)
                                        //console.log(details.geometry.location);
                                    }}
                                    getDefaultValue={() => {
                                        return ''; // text input default value
                                    }}
                                    query={{
                                        // available options: https://developers.google.com/places/web-service/autocomplete
                                        key: 'AIzaSyDwIVgIMPOY0UMpmXrqO0hOBNSTM7dH2pA',
                                        language: 'en', // language of the results
                                        types: '(cities)', // default: 'geocode'
                                    }}
                                    styles={{

                                        textInput: {
                                            borderWidth: 2,
                                            borderColor: color.adminprimaryColors,
                                            padding: 10,
                                            fontSize: 18,
                                            borderRadius: 10,
                                            marginHorizontal: 30
                                        },
                                        description: {
                                            color: color.adminprimaryColors,
                                            fontSize: 18,

                                        }, listView: {
                                            borderWidth: 2,
                                            borderColor: color.adminprimaryColors,
                                            padding: 10,
                                            fontSize: 18,
                                            borderRadius: 10,
                                        }
                                    }}

                                    debounce={200}
                                />
                            </ScrollView>
                        </View>
                    </View>
                </Modal>
                {!props.route.params?.item?._id ?
                    <View>
                        <AdminHeaderWithBackButton name={"Add Route"} navigation={props.navigation} />
                        <View style={styles.inputBox}>
                            <TouchableOpacity style={{ margin: 10 }} activeOpacity={0.80} onPress={() => { setPlaceType("from"); setModalVisible(true) }}>
                                <Text style={styles.input(props)}>{data.from.name}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={{ margin: 10 }} activeOpacity={0.80} onPress={() => { setPlaceType("destination"); setModalVisible(true) }}>
                                <Text style={styles.input(props)}>{data.destination.name}</Text>
                            </TouchableOpacity>

                            <View style={{ marginHorizontal: 10, marginVertical: 20, flexDirection: "row", justifyContent: 'space-between' }}>
                                <TouchableOpacity onPress={() => { setInputBox(true) }}>
                                    <Text style={{ color: props.theme ? color.drakAdminprimaryColors : color.adminprimaryColors, fontWeight: 'bold' }}>
                                        Add Stop
                                    </Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => { setMoveBox(!moveBox) }}>
                                    <Text style={{ color: props.theme ? color.drakAdminprimaryColors : color.adminprimaryColors, fontWeight: 'bold' }}>
                                        Move Stop
                                    </Text>
                                </TouchableOpacity>
                            </View>
                            {inputBox && <View style={{ margin: 10 }}>
                                <TouchableOpacity style={{ margin: 10 }} activeOpacity={0.80} onPress={() => { setPlaceType("addStop"); setModalVisible(true) }}>
                                    <Text style={styles.input(props)}>Stops</Text>
                                </TouchableOpacity>

                            </View>}
                            <GestureHandlerRootView style={{ width: '100%', height: '100%' }}>
                                <DraggableFlatList
                                    data={stopList}
                                    onDragEnd={({ data }) => setData(data)}
                                    keyExtractor={(item) => item.key}
                                    renderItem={({ item, index, drag }) => (
                                        <View style={styles.stopbox(props)}>
                                            {moveBox &&
                                                <TouchableOpacity style={{ alignItems: 'center' }} style={{ flexDirection: 'column' }}
                                                    onLongPress={drag}>
                                                    <Image source={icons.move} style={{ width: 30, height: 30, tintColor: props.theme ? color.drakAdminprimaryColors : color.adminprimaryColors, }} />
                                                </TouchableOpacity>}
                                            <View style={{ alignItems: 'center' }}>
                                                <Text style={{ color: props.theme ? color.drakFontcolor : color.fontcolor, fontWeight: 'bold', fontSize: 18, paddingHorizontal: 5 }}>{item.stops}</Text>
                                            </View>
                                            <TouchableOpacity style={{ alignItems: 'center' }} onPress={() => { setStopList(stopList.filter((_, ind) => ind !== index)) }}>
                                                <Image source={icons.close} style={{ width: 35, height: 35, tintColor: props.theme ? color.drakAdminprimaryColors : color.adminprimaryColors, }} />
                                            </TouchableOpacity>
                                        </View>
                                    )}
                                    onDragEnd={({ data }) => setStopList(data)}
                                    keyExtractor={(item, index) => `AJ${index + 1}`}
                                />

                                <View style={{ marginHorizontal: 10, marginVertical: 20 }}>
                                    <TouchableOpacity style={styles.btn(props)} onPress={() => { AddRoute() }}>
                                        <Text style={styles.btnText}>
                                            Add Route
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            </GestureHandlerRootView>
                        </View>
                    </View> :
                    <View>
                        <AdminHeaderWithBackButton name={"Update Route"} navigation={props.navigation} />
                        <View style={styles.inputBox}>
                            <TouchableOpacity style={{ margin: 10 }} activeOpacity={0.80} onPress={() => { setPlaceType("from"); setModalVisible(true) }}>
                                <Text style={styles.input(props)}>{data.from.name}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={{ margin: 10 }} activeOpacity={0.80} onPress={() => { setPlaceType("destination"); setModalVisible(true) }}>
                                <Text style={styles.input(props)}>{data.destination.name}</Text>
                            </TouchableOpacity>

                            <View style={{ marginHorizontal: 10, marginVertical: 20, flexDirection: "row", justifyContent: 'space-between' }}>
                                <TouchableOpacity onPress={() => { setInputBox(true) }}>
                                    <Text style={{ color: props.theme ? color.drakAdminprimaryColors : color.adminprimaryColors, fontWeight: 'bold' }}>
                                        Add Stop
                                    </Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => { setMoveBox(!moveBox) }}>
                                    <Text style={{ color: props.theme ? color.drakAdminprimaryColors : color.adminprimaryColors, fontWeight: 'bold' }}>
                                        Move Stop
                                    </Text>
                                </TouchableOpacity>
                            </View>
                            {inputBox && <View style={{ margin: 10 }}>
                                <TouchableOpacity style={{ margin: 10 }} activeOpacity={0.80} onPress={() => { setPlaceType("addStop"); setModalVisible(true) }}>
                                    <Text style={styles.input(props)}>Stops</Text>
                                </TouchableOpacity>

                            </View>}
                            <GestureHandlerRootView style={{ width: '100%', height: '100%' }}>
                                <DraggableFlatList
                                    data={stopList}
                                    onDragEnd={({ data }) => setData(data)}
                                    keyExtractor={(item) => item.key}
                                    renderItem={({ item, index, drag }) => (
                                        <View style={styles.stopbox(props)}>
                                            {moveBox &&
                                                <TouchableOpacity style={{ alignItems: 'center' }} style={{ flexDirection: 'column' }}
                                                    onLongPress={drag}>
                                                    <Image source={icons.move} style={{ width: 30, height: 30, tintColor: props.theme ? color.drakAdminprimaryColors : color.adminprimaryColors, }} />
                                                </TouchableOpacity>}
                                            <View style={{ alignItems: 'center', width: '80%' }}>
                                                <Text style={{ color: props.theme ? color.drakFontcolor : color.fontcolor, fontWeight: 'bold', fontSize: 18, paddingHorizontal: 5 }}>{item.stops}</Text>
                                            </View>
                                            <TouchableOpacity style={{ alignItems: 'center', width: '10%' }} onPress={() => { setStopList(stopList.filter((_, ind) => ind !== index)) }}>
                                                <Image source={icons.close} style={{ width: 35, height: 35, tintColor: props.theme ? color.drakAdminprimaryColors : color.adminprimaryColors, }} />
                                            </TouchableOpacity>
                                        </View>
                                    )}
                                    onDragEnd={({ data }) => setStopList(data)}
                                    keyExtractor={(item, index) => `AJ${index + 1}`}
                                />

                                <View style={{ marginHorizontal: 10, marginVertical: 20 }}>
                                    <TouchableOpacity style={styles.btn(props)} onPress={() => { UpdateRoute() }}>
                                        <Text style={styles.btnText}>
                                            Update Route
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            </GestureHandlerRootView>
                        </View>
                    </View>}
            </View >
        </TouchableWithoutFeedback>
    )
}
const useDispatch = (dispatch) => {
    return {
        addRoute: (data) => dispatch(addRoute(data)),
        setRouteData: (data) => dispatch(setRouteData(data)),
        getCountRoute: (data) => dispatch(getCountRoute(data)),
        updateRoute: (data) => dispatch(updateRoute(data)),

    };
}
const useSelector = (state) => (

    {
        token: state.token.token,
        routeData: state.route.data,
        theme: state.token.theme
    }
)
export default connect(useSelector, useDispatch)(AddRoute);
const styles = StyleSheet.create({
    container: (props)=>[{
        flex: 1,
        backgroundColor: props.theme ? color.drakBackgroundColor : color.backgroundColor

    }], inputBox: {
        marginHorizontal: 20,

    },
    input: (props)=>[{
        borderWidth: 2,
        borderColor: props.theme ? color.drakAdminprimaryColors : color.adminprimaryColors,
        padding: 10,
        fontSize: 18,
        borderRadius: 10,
        color: props.theme ? color.drakFontcolor : color.fontcolor
    }],
    btn: (props)=>[{
        width: '90%',
        height: 50,
        backgroundColor: props.theme ? color.drakAdminprimaryColors : color.adminprimaryColors,
        borderRadius: 15,
        justifyContent: "center",
        alignItems: 'center',
        alignSelf: 'center'
    }],
    btnText: {
        fontSize: 20,
        color: 'white',
        fontWeight: 'bold'
    },

    modelBox: (props)=>[{
        width: Dimensions.get('screen').width - 20,
        minHeight: 200,

        backgroundColor: props.theme ? color.drakBackgroundColor : color.backgroundColor,
        alignSelf: 'center',
        borderRadius: 15,
        flexDirection: 'row',
        alignItems: 'center',
       
        shadowColor: props.theme ? color.drakFontcolor : color.fontcolor,
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    }],
    stopbox: (props)=>[{
        height: 50,
        backgroundColor: props.theme ? color.drakBackgroundColor : color.backgroundColor,
        marginHorizontal: 8,
        borderRadius: 10,
        alignItems: 'center',
        shadowColor: props.theme ? color.drakFontcolor : color.fontcolor,
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        marginVertical: 2,
        flexDirection: 'row',
        justifyContent: "space-between", paddingHorizontal: 10
    }]
})
