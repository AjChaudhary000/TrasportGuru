import { View, Text, Image, StyleSheet, TextInput, TouchableOpacity } from 'react-native'
import React from 'react'
import color from '../../contents/color'
import icons from '../../contents/icons'
import image from '../../contents/image'
import MapView, { PROVIDER_GOOGLE } from "react-native-maps"
const HomeScreen = () => {
    return (
        <View style={styles.container}>
            <View style={styles.mapBox}>
                <MapView
                    showsUserLocation={true}
                    style={{ flex: 1 }}
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
            <View style={styles.searchBox}>
                <View style={styles.fromToDesc}>
                    <View style={{ width: "10%", justifyContent: 'center' }}>
                        <Image source={icons.journey} style={{ width: 50, height: 115, tintColor: color.primaryColors }} />
                    </View>
                    <View style={{ width: "90%", justifyContent: 'center' }}>
                        <View style={{ margin: 10, flexDirection: 'row' }}>
                            <View style={{ width: '5%', justifyContent: 'center' }}>
                                <Image source={icons.forword} style={{ width: 20, height: 20, tintColor: color.primaryColors }} />
                            </View>
                            <View style={{ width: '95%' }}>
                                <TextInput style={styles.inputBox} placeholder={"From"} placeholderTextColor={'black'} />
                            </View>
                        </View>
                        <View style={{ margin: 10, flexDirection: 'row' }}>
                            <View style={{ width: '5%', justifyContent: 'center' }}>
                                <Image source={icons.forword} style={{ width: 20, height: 20, tintColor: color.primaryColors }} />
                            </View>
                            <View style={{ width: '95%' }}>
                                <TextInput style={styles.inputBox} placeholder={"Destination"} placeholderTextColor={'black'} />
                            </View>
                        </View>
                    </View>
                </View>
                <View style={styles.reverseBtn}>
                    <Image source={icons.upToDown} style={{ width: 30, height: 30, tintColor: 'white' }} />
                </View>
                <View style={styles.dateOrCapicity}>
                    <View style={{ width: '30%', justifyContent: 'center' }}>
                        <Text style={{ fontWeight: "bold", fontSize: 18, color: 'black' }}>Goods Weight</Text>
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
    )
}

export default HomeScreen
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    mapBox: {
        flex: 1,


    },
    searchBox: {
        flex: 1,
        backgroundColor: 'white',
        bottom: 0,
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        justifyContent: 'center'
    },
    fromToDesc: {
        height: '50%',
        backgroundColor: '#dce3f5',
        marginHorizontal: 30,
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
        height: 50,
        marginHorizontal: 10,
        backgroundColor: 'white',
        paddingHorizontal: 15,
        borderRadius: 18,
        color: 'black', fontSize: 20,

    }, reverseBtn: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: color.primaryColors,
        bottom: '33%', left: '70%',
        justifyContent: 'center',
        alignItems: 'center'
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
        bottom: 30,
        marginHorizontal: 20
    }

})