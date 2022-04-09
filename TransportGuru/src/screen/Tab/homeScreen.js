import {
    View, Text, Image,
    StyleSheet, TextInput,
    TouchableOpacity,
    KeyboardAvoidingView,
    TouchableWithoutFeedback,
    Keyboard, Platform, Modal, Dimensions, FlatList, ScrollView, LogBox
} from 'react-native'
import React from 'react'
import color from '../../contents/color'
import icons from '../../contents/icons'
import image from '../../contents/image'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import MapView, { PROVIDER_GOOGLE } from "react-native-maps"

const HomeScreen = () => {
    const [modalVisible, setModalVisible] = React.useState(false);
    const [placetype, setPlaceType] = React.useState()
    const [data, setData] = React.useState({
        from: 'From',
        destination: 'Destination',
        capicity: '',
    })
    React.useEffect(() => {
        LogBox.ignoreLogs(["VirtualizedLists should never be nested"])
    }, [])
    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.container}
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>

                <View>
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
                                            console.log(dt)
                                            placetype === "from" && setData({ ...data, from: dt.description });
                                            placetype === "destination" && setData({ ...data, destination: dt.description });
                                            setModalVisible(false)
                                             console.log(details);
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
                                                borderColor: color.primaryColors,
                                                padding: 10,
                                                fontSize: 18,
                                                borderRadius: 10,
                                                marginHorizontal: 30
                                            },
                                            description: {
                                                color: color.primaryColors,
                                                fontSize: 18,

                                            }, listView: {
                                                borderWidth: 2,
                                                borderColor: color.primaryColors,
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
                    <View style={styles.mapBox}>
                        <MapView
                            showsUserLocation={true}
                            style={{ height: "100%" }}
                            zoomEnabled={true}
                            scrollEnabled={true}
                            showsBuildings={true}
                            showsMyLocationButton={true}
                            provider={"google"}
                            region={{
                                latitude: 37.78825,
                                longitude: -122.4324,
                                latitudeDelta: 0.015,
                                longitudeDelta: 0.0121,
                            }}
                        >

                        </MapView>
                        {/* <Image source={image.truck} style={{ width: '100%', height: '100%', }} /> */}
                    </View>
                    <View style={styles.searchBox} >
                        <View style={styles.fromToDesc}>
                            <View style={{ width: "10%", justifyContent: 'center' }}>
                                <Image source={icons.journey} style={{ width: 50, height: 115, tintColor: color.primaryColors }} />
                            </View>
                            <View style={{ width: "90%", justifyContent: 'center' }}>
                                <View style={{ margin: 10, flexDirection: 'row' }}>
                                    <View style={{ width: '5%', justifyContent: 'center' }}>
                                        <Image source={icons.forword} style={{ width: 20, height: 20, tintColor: color.primaryColors }} />
                                    </View>
                                    <TouchableOpacity style={{ width: '95%' }} activeOpacity={0.80} onPress={() => { setPlaceType("from"); setModalVisible(true) }}>
                                        <Text style={styles.inputBox}>{data.from}</Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={{ margin: 10, flexDirection: 'row' }}>
                                    <View style={{ width: '5%', justifyContent: 'center' }}>
                                        <Image source={icons.forword} style={{ width: 20, height: 20, tintColor: color.primaryColors }} />
                                    </View>
                                    <TouchableOpacity style={{ width: '95%' }} activeOpacity={0.80} onPress={() => { setPlaceType("destination"); setModalVisible(true) }}>
                                        <Text style={styles.inputBox}>{data.destination}</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                        <View style={styles.reverseBtn}>
                            <Image source={icons.upToDown} style={{ width: 30, height: 30, tintColor: 'white' }} />
                        </View>
                        <View style={styles.dateOrCapicity}>
                            <View style={{ width: '30%', justifyContent: 'center' }}>
                                <Text style={{ fontWeight: "bold", fontSize: 18, color: color.fontcolor }}>Goods Weight</Text>
                            </View>
                            <View style={{ width: '30%', justifyContent: 'center' }}>
                                <TextInput style={{
                                    borderBottomColor: color.primaryColors,
                                    width: '70%',
                                    borderBottomWidth: 2, paddingHorizontal: 20
                                    , height: 40, fontSize: 18
                                }} />
                            </View>
                            <View style={{ width: '30%', justifyContent: 'center' }}>
                                <Text style={{ fontWeight: "bold", fontSize: 18, color: color.primaryColors }}>/ Tonnes</Text>
                            </View>
                        </View>
                        <TouchableOpacity style={styles.btn} >
                            <Text style={styles.btnText}>
                                Search
                            </Text>
                        </TouchableOpacity>
                    </View>


                </View>
            </TouchableWithoutFeedback>

        </KeyboardAvoidingView>
    )
}

export default HomeScreen
const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingBottom: 40
    },
    mapBox: {
        height: "40%"


    },
    searchBox: {
        height: "60%",
        backgroundColor: color.backgroundColor,
        bottom: 0,
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        justifyContent: 'center',

    },
    fromToDesc: {
        height: 220,
        backgroundColor: '#dce3f5',
        marginHorizontal: 35,
        borderRadius: 20,
        justifyContent: 'center',
        flexDirection: 'row',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,

    }, inputBox: {
        borderWidth: 2,
        borderColor: color.primaryColors,
        padding: 10,
        fontSize: 18,
        borderRadius: 10,
        marginHorizontal: 10

    }, reverseBtn: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: color.primaryColors,
        bottom: Platform.OS === 'android' ? '59%' : "57%", left: '70%',
        justifyContent: 'center',
        alignItems: 'center', position: "absolute"
    },
    btn: {
        width: '90%',
        height: 50,
        backgroundColor: color.primaryColors,
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
    dateOrCapicity: {
        flexDirection: "row",
        justifyContent: 'center',
        marginVertical: 10,
        marginHorizontal: 20
    }, modelBox: {
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

})