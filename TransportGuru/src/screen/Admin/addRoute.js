import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, FlatList, StatusBar, Dimensions, Modal, ScrollView, LogBox } from 'react-native'
import React from 'react'
import { AdminHeaderWithBackButton } from '../../components/adminHeader';
import color from '../../contents/color'
import icons from '../../contents/icons';
import { connect } from 'react-redux'
import { getJWTToken } from '../../Redux/helper';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { addRoute, setRouteData, updateRoute } from '../../Redux/Admin/routeSlice';
import { getCountRoute } from '../../Redux/Admin/countAddSlice';
import DraggableFlatList from 'react-native-draggable-flatlist';
const AddRoute = (props) => {
    const [modalVisible, setModalVisible] = React.useState(false);
    const [placetype, setPlaceType] = React.useState()
    const [token, setToken] = React.useState('');
    const [data, setData] = React.useState({
        from: props.route.params?.item?.from || 'From',
        destination: props.route.params?.item?.destination || 'Destination',
    })
    const [stopList, setStopList] = React.useState(props.route.params?.item?.routeStop || []);
    const [inputBox, setInputBox] = React.useState(false)
    const [moveBox, setMoveBox] = React.useState(false)
    // setStopList([..stopList,{num:"1.6","str":"cup jg"}])
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
    }, [token])
    React.useEffect(() => {
        LogBox.ignoreLogs(["VirtualizedLists should never be nested"])
    }, [])
    React.useEffect(() => {
        if (props?.routeData.status) {
            props.getCountRoute(token)
            props.setRouteData({})
            props.navigation.goBack();
        }
    }, [props, token])
    const AddRoute = () => {
        if (data.from != "From" && data.destination != "Destination" && stopList != []) {
            props.addRoute({ ...data, routeStop: stopList, token: token })
        }
    }
    const UpdateRoute = () => {
        if (data.from != "From" && data.destination != "Destination" && stopList != []) {
            props.updateRoute({ ...data, id: props.route.params?.item?._id, routeStop: stopList, token: token })
        }
    }
    return (
        <View style={styles.container}>


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
                    <View style={styles.modelBox}>
                        <ScrollView keyboardShouldPersistTaps="handled" >
                            <GooglePlacesAutocomplete
                                placeholder={placetype === "from" ? "eg. From" : "eg. destination"}
                                placeholderTextColor={'gray'}
                                minLength={2} // minimum length of text to search
                                fetchDetails={true}
                                renderDescription={row => row.description} // custom description render
                                onPress={(dt, details = null) => {

                                    placetype === "from" && setData({ ...data, from: dt.description });
                                    placetype === "destination" && setData({ ...data, destination: dt.description });
                                    placetype === "addStop" && setStopList([...stopList, { stops: dt.description }]);
                                    setModalVisible(false)
                                    setInputBox(false)
                                    // console.log(details);
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
                    <TouchableOpacity onPress={() => { setModalVisible(false) }} style={{ alignItems: "center", bottom: 20 }}>
                        <Text>Close</Text>
                    </TouchableOpacity>
                </View>
            </Modal>
            {!props.route.params?.item?._id ?
                <View>
                    <AdminHeaderWithBackButton name={"Add Route"} navigation={props.navigation} />
                    <View style={styles.inputBox}>
                        <TouchableOpacity style={{ margin: 10 }} activeOpacity={0.80} onPress={() => { setPlaceType("from"); setModalVisible(true) }}>
                            <Text style={styles.input}>{data.from}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{ margin: 10 }} activeOpacity={0.80} onPress={() => { setPlaceType("destination"); setModalVisible(true) }}>
                            <Text style={styles.input}>{data.destination}</Text>
                        </TouchableOpacity>

                        <View style={{ marginHorizontal: 10, marginVertical: 20, flexDirection: "row", justifyContent: 'space-between' }}>
                            <TouchableOpacity onPress={() => { setInputBox(true) }}>
                                <Text style={{ color: color.adminprimaryColors, fontWeight: 'bold' }}>
                                    Add Stop
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => { setMoveBox(!moveBox) }}>
                                <Text style={{ color: color.adminprimaryColors, fontWeight: 'bold' }}>
                                    Move Stop
                                </Text>
                            </TouchableOpacity>
                        </View>
                        {inputBox && <View style={{ margin: 10 }}>
                            <TouchableOpacity style={{ margin: 10 }} activeOpacity={0.80} onPress={() => { setPlaceType("addStop"); setModalVisible(true) }}>
                                <Text style={styles.input}>Stops</Text>
                            </TouchableOpacity>

                        </View>}
                        <DraggableFlatList
                            data={stopList}
                            onDragEnd={({ data }) => setData(data)}
                            keyExtractor={(item) => item.key}
                            renderItem={({ item, index, drag }) => (
                                <View style={styles.stopbox}>
                                    {moveBox &&
                                        <TouchableOpacity style={{ alignItems: 'center' }} style={{ flexDirection: 'column' }}
                                            onLongPress={drag}>
                                            <Image source={icons.move} style={{ width: 30, height: 30, tintColor: color.adminprimaryColors }} />
                                        </TouchableOpacity>}
                                    <View style={{ alignItems: 'center' }}>
                                        <Text style={{ color: color.fontcolor, fontWeight: 'bold', fontSize: 18, paddingHorizontal: 5 }}>{item.stops}</Text>
                                    </View>
                                    <TouchableOpacity style={{ alignItems: 'center' }} onPress={() => { setStopList(stopList.filter((_, ind) => ind !== index)) }}>
                                        <Image source={icons.close} style={{ width: 35, height: 35, tintColor: color.adminprimaryColors }} />
                                    </TouchableOpacity>
                                </View>
                            )}
                            onDragEnd={({ data }) => setStopList(data)}
                            keyExtractor={(item, index) => `AJ${index + 1}`}
                        />

                        <View style={{ marginHorizontal: 10, marginVertical: 20 }}>
                            <TouchableOpacity style={styles.btn} onPress={() => { AddRoute() }}>
                                <Text style={styles.btnText}>
                                    Add Route
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View> :
                <View>
                    <AdminHeaderWithBackButton name={"Update Route"} navigation={props.navigation} />
                    <View style={styles.inputBox}>
                        <TouchableOpacity style={{ margin: 10 }} activeOpacity={0.80} onPress={() => { setPlaceType("from"); setModalVisible(true) }}>
                            <Text style={styles.input}>{data.from}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{ margin: 10 }} activeOpacity={0.80} onPress={() => { setPlaceType("destination"); setModalVisible(true) }}>
                            <Text style={styles.input}>{data.destination}</Text>
                        </TouchableOpacity>

                        <View style={{ marginHorizontal: 10, marginVertical: 20, flexDirection: "row", justifyContent: 'space-between' }}>
                            <TouchableOpacity onPress={() => { setInputBox(true) }}>
                                <Text style={{ color: color.adminprimaryColors, fontWeight: 'bold' }}>
                                    Add Stop
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => { setMoveBox(!moveBox) }}>
                                <Text style={{ color: color.adminprimaryColors, fontWeight: 'bold' }}>
                                    Move Stop
                                </Text>
                            </TouchableOpacity>
                        </View>
                        {inputBox && <View style={{ margin: 10 }}>
                            <TouchableOpacity style={{ margin: 10 }} activeOpacity={0.80} onPress={() => { setPlaceType("addStop"); setModalVisible(true) }}>
                                <Text style={styles.input}>Stops</Text>
                            </TouchableOpacity>

                        </View>}

                        <DraggableFlatList
                            data={stopList}
                            onDragEnd={({ data }) => setData(data)}
                            keyExtractor={(item) => item.key}
                            renderItem={({ item, index, drag }) => (
                                <View style={styles.stopbox}>
                                    {moveBox &&
                                        <TouchableOpacity style={{ alignItems: 'center' }} style={{ flexDirection: 'column' }}
                                            onLongPress={drag}>
                                            <Image source={icons.move} style={{ width: 30, height: 30, tintColor: color.adminprimaryColors }} />
                                        </TouchableOpacity>}
                                    <View style={{ alignItems: 'center' }}>
                                        <Text style={{ color: color.fontcolor, fontWeight: 'bold', fontSize: 18, paddingHorizontal: 5 }}>{item.stops}</Text>
                                    </View>
                                    <TouchableOpacity style={{ alignItems: 'center' }} onPress={() => { setStopList(stopList.filter((_, ind) => ind !== index)) }}>
                                        <Image source={icons.close} style={{ width: 35, height: 35, tintColor: color.adminprimaryColors }} />
                                    </TouchableOpacity>
                                </View>
                            )}
                            onDragEnd={({ data }) => setStopList(data)}
                            keyExtractor={(item, index) => `AJ${index + 1}`}
                        />
                        <View style={{ marginHorizontal: 10, marginVertical: 20 }}>
                            <TouchableOpacity style={styles.btn} onPress={() => { UpdateRoute() }}>
                                <Text style={styles.btnText}>
                                    Update Route
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>}
        </View >
    )
}
const useDispatch = (dispatch) => {
    return {
        addRoute: (data) => dispatch(addRoute(data)),
        setRouteData: (data) => dispatch(setRouteData(data)),
        getCountRoute: (data) => dispatch(getCountRoute(data)),
        updateRoute: (data) => dispatch(updateRoute(data))
    };
}
const useSelector = (state) => (

    {
        routeData: state.route.data
    }
)
export default connect(useSelector, useDispatch)(AddRoute);
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
    stopbox: {
        height: 50,
        backgroundColor: color.backgroundColor,
        marginHorizontal: 8,
        borderRadius: 10,
        alignItems: 'center',
        shadowColor: color.fontcolor,
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
    }
})