import {
    View, Text, StyleSheet, TouchableOpacity, Image, Dimensions, LogBox
} from 'react-native'
import React from 'react'
import { AdminHeaderWithBackButton } from '../../components/adminHeader';
import color from '../../contents/color'
import icons from '../../contents/icons';
import { connect } from 'react-redux'
import { addRoute, setRouteData, updateRoute } from '../../Redux/Admin/routeSlice';
import { getCountRoute } from '../../Redux/Admin/countAddSlice';
import DraggableFlatList from 'react-native-draggable-flatlist';
import Toast from 'react-native-simple-toast';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import calcKmFind from '../../components/kmFind';
import GoogleDialogBox from '../../components/GoogleDialogBox';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
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
    return (

        <View style={styles.container(props)}>
            <GoogleDialogBox
                modalVisibleData={modalVisible}
                theme={props.theme}
                title={"Search Stops"}
                setPlaceTypeData={placetype}
                onGet={(val) => setModalVisible(val)}
                onGetData={(val) => {
                    if (placetype === "from") {
                        const { name, lat, lng } = val
                        setData({ ...data, from: { name, lat, lng, avgTime: 0 } })
                    }
                    if (placetype === "destination") {
                        const { name, lat, lng } = val
                        const d = calcKmFind(data.from.lat, data.from.lng, lat, lng)
                        setData({ ...data, destination: { name, lat, lng, avgTime: Math.round(d / 45) } })
                    }
                    if (placetype === "addStop") {
                        const { name, lat, lng } = val
                        const d = calcKmFind(data.from.lat, data.from.lng, lat, lng)
                        setStopList([...stopList, { stops: name, lat, lng, avgTime: Math.round(d / 45) }])
                    }
                }}
            />
            {!props.route.params?.item?._id ?
                <View >
                    <AdminHeaderWithBackButton name={"Add Route"} navigation={props.navigation} />
                    <KeyboardAwareScrollView style={styles.inputBox}>
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
                        <View>
                            <GestureHandlerRootView style={{ width: '100%', height: '60%' }}>
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
                    </KeyboardAwareScrollView>
                </View> :
                <View >
                    <AdminHeaderWithBackButton name={"Update Route"} navigation={props.navigation} />
                    <KeyboardAwareScrollView style={styles.inputBox}>
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
                        <View>
                            <GestureHandlerRootView style={{ width: '100%', height: "60%" }}>
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
                    </KeyboardAwareScrollView>
                </View>}
        </View >

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
    container: (props) => [{
        flex: 1,
        backgroundColor: props.theme ? color.drakBackgroundColor : color.backgroundColor

    }], inputBox: {
        marginHorizontal: 20,

    },
    input: (props) => [{
        borderWidth: 2,
        borderColor: props.theme ? color.drakAdminprimaryColors : color.adminprimaryColors,
        padding: 10,
        fontSize: 18,
        borderRadius: 10,
        color: props.theme ? color.drakFontcolor : color.fontcolor
    }],
    btn: (props) => [{
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

    modelBox: (props) => [{
        width: Dimensions.get('screen').width - 20,
        minHeight: 200,

        backgroundColor: props.theme ? color.drakBackgroundColor : color.backgroundColor,
        alignSelf: 'center',
        borderRadius: 15,
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'center',
        shadowColor: props.theme ? color.drakFontcolor : color.fontcolor,
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    }],
    stopbox: (props) => [{
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
