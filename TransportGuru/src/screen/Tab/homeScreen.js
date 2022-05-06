import {
    View,
    Text,
    Image,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    Platform,
    LogBox,
    PermissionsAndroid,
    Dimensions,
} from 'react-native';
import Toast from 'react-native-simple-toast';
import React from 'react';
import color from '../../contents/color';
import icons from '../../contents/icons';
import { connect } from 'react-redux';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import GoogleDialogBox from '../../components/GoogleDialogBox';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import MapViewDirections from 'react-native-maps-directions';
import Geolocation from '@react-native-community/geolocation';
import config from '../../config/config';
const HomeScreen = props => {
    const [modalVisible, setModalVisible] = React.useState(false);
    const [placetype, setPlaceType] = React.useState();
    const [location, setlocation] = React.useState({
        latitude: 21.0435,
        longitude: -122.0353454,
    });
    const [data, setData] = React.useState({
        from: {
            name: 'From',
            lat: 0.0,
            lng: 0.0,
        },
        destination: {
            name: 'destination',
            lat: 0.0,
            lng: 0.0,
        },
        capicity: '',
    });
    const GeolocationFetch = async () => {
        Geolocation.getCurrentPosition(
            position => {
                setlocation({
                    ...location,
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                });
            },
            err => console.log(err),
            { enableHighAccuracy: true, timeout: 20000, maximumAge: 4000 },
        );
    };
    const AndroidPerMissionGranted = async () => {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                {
                    title: 'ReactNativeCode Location Permission',
                    message: 'ReactNativeCode App needs access to your location ',
                },
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                GeolocationFetch();
            } else {
                GeolocationFetch();
            }
        } catch (err) {
            console.log(err);
        }
    };
    React.useEffect(() => {
        LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
        if (Platform.OS == 'android') {
            AndroidPerMissionGranted();
        } else {
            if (Platform.OS === 'ios') {
                Geolocation.requestAuthorization();
            }
        }
        GeolocationFetch();
    }, []);
    const reverseBtn = () => {
        const tempFrom = data.from;
        const tempDestination = data.destination;
        setData({ ...data, from: tempDestination, destination: tempFrom });
    };
    const SearchRoute = () => {
        if (data.from.name === 'From') {
            Toast.show('Select loading loaction');
        } else if (data.destination.name === 'Destination') {
            Toast.show('Select unloading loaction');
        } else if (data.capicity === '') {
            Toast.show('Enter capicity');
        } else {
            props.navigation.navigate('SearchTransportList', data);
        }
    };
    const drakmap = [
        {
            elementType: 'geometry',
            stylers: [
                {
                    color: '#242f3e',
                },
            ],
        },
        {
            elementType: 'labels.text.fill',
            stylers: [
                {
                    color: '#746855',
                },
            ],
        },
        {
            elementType: 'labels.text.stroke',
            stylers: [
                {
                    color: '#242f3e',
                },
            ],
        },
        {
            featureType: 'administrative.locality',
            elementType: 'labels.text.fill',
            stylers: [
                {
                    color: '#d59563',
                },
            ],
        },
        {
            featureType: 'poi',
            elementType: 'labels.text.fill',
            stylers: [
                {
                    color: '#d59563',
                },
            ],
        },
        {
            featureType: 'poi.park',
            elementType: 'geometry',
            stylers: [
                {
                    color: '#263c3f',
                },
            ],
        },
        {
            featureType: 'poi.park',
            elementType: 'labels.text.fill',
            stylers: [
                {
                    color: '#6b9a76',
                },
            ],
        },
        {
            featureType: 'road',
            elementType: 'geometry',
            stylers: [
                {
                    color: '#38414e',
                },
            ],
        },
        {
            featureType: 'road',
            elementType: 'geometry.stroke',
            stylers: [
                {
                    color: '#212a37',
                },
            ],
        },
        {
            featureType: 'road',
            elementType: 'labels.text.fill',
            stylers: [
                {
                    color: '#9ca5b3',
                },
            ],
        },
        {
            featureType: 'road.highway',
            elementType: 'geometry',
            stylers: [
                {
                    color: '#746855',
                },
            ],
        },
        {
            featureType: 'road.highway',
            elementType: 'geometry.stroke',
            stylers: [
                {
                    color: '#1f2835',
                },
            ],
        },
        {
            featureType: 'road.highway',
            elementType: 'labels.text.fill',
            stylers: [
                {
                    color: '#f3d19c',
                },
            ],
        },
        {
            featureType: 'transit',
            elementType: 'geometry',
            stylers: [
                {
                    color: '#2f3948',
                },
            ],
        },
        {
            featureType: 'transit.station',
            elementType: 'labels.text.fill',
            stylers: [
                {
                    color: '#d59563',
                },
            ],
        },
        {
            featureType: 'water',
            elementType: 'geometry',
            stylers: [
                {
                    color: '#17263c',
                },
            ],
        },
        {
            featureType: 'water',
            elementType: 'labels.text.fill',
            stylers: [
                {
                    color: '#515c6d',
                },
            ],
        },
        {
            featureType: 'water',
            elementType: 'labels.text.stroke',
            stylers: [
                {
                    color: '#17263c',
                },
            ],
        },
    ];
    const lightmap = [
        {
            elementType: 'geometry',
            stylers: [
                {
                    color: '#ebe3cd',
                },
            ],
        },
        {
            elementType: 'labels.text.fill',
            stylers: [
                {
                    color: '#523735',
                },
            ],
        },
        {
            elementType: 'labels.text.stroke',
            stylers: [
                {
                    color: '#f5f1e6',
                },
            ],
        },
        {
            featureType: 'administrative',
            elementType: 'geometry.stroke',
            stylers: [
                {
                    color: '#c9b2a6',
                },
            ],
        },
        {
            featureType: 'administrative.land_parcel',
            elementType: 'geometry.stroke',
            stylers: [
                {
                    color: '#dcd2be',
                },
            ],
        },
        {
            featureType: 'administrative.land_parcel',
            elementType: 'labels.text.fill',
            stylers: [
                {
                    color: '#ae9e90',
                },
            ],
        },
        {
            featureType: 'landscape.natural',
            elementType: 'geometry',
            stylers: [
                {
                    color: '#dfd2ae',
                },
            ],
        },
        {
            featureType: 'poi',
            elementType: 'geometry',
            stylers: [
                {
                    color: '#dfd2ae',
                },
            ],
        },
        {
            featureType: 'poi',
            elementType: 'labels.text.fill',
            stylers: [
                {
                    color: '#93817c',
                },
            ],
        },
        {
            featureType: 'poi.park',
            elementType: 'geometry.fill',
            stylers: [
                {
                    color: '#a5b076',
                },
            ],
        },
        {
            featureType: 'poi.park',
            elementType: 'labels.text.fill',
            stylers: [
                {
                    color: '#447530',
                },
            ],
        },
        {
            featureType: 'road',
            elementType: 'geometry',
            stylers: [
                {
                    color: '#f5f1e6',
                },
            ],
        },
        {
            featureType: 'road.arterial',
            elementType: 'geometry',
            stylers: [
                {
                    color: '#fdfcf8',
                },
            ],
        },
        {
            featureType: 'road.highway',
            elementType: 'geometry',
            stylers: [
                {
                    color: '#f8c967',
                },
            ],
        },
        {
            featureType: 'road.highway',
            elementType: 'geometry.stroke',
            stylers: [
                {
                    color: '#e9bc62',
                },
            ],
        },
        {
            featureType: 'road.highway.controlled_access',
            elementType: 'geometry',
            stylers: [
                {
                    color: '#e98d58',
                },
            ],
        },
        {
            featureType: 'road.highway.controlled_access',
            elementType: 'geometry.stroke',
            stylers: [
                {
                    color: '#db8555',
                },
            ],
        },
        {
            featureType: 'road.local',
            elementType: 'labels.text.fill',
            stylers: [
                {
                    color: '#806b63',
                },
            ],
        },
        {
            featureType: 'transit.line',
            elementType: 'geometry',
            stylers: [
                {
                    color: '#dfd2ae',
                },
            ],
        },
        {
            featureType: 'transit.line',
            elementType: 'labels.text.fill',
            stylers: [
                {
                    color: '#8f7d77',
                },
            ],
        },
        {
            featureType: 'transit.line',
            elementType: 'labels.text.stroke',
            stylers: [
                {
                    color: '#ebe3cd',
                },
            ],
        },
        {
            featureType: 'transit.station',
            elementType: 'geometry',
            stylers: [
                {
                    color: '#dfd2ae',
                },
            ],
        },
        {
            featureType: 'water',
            elementType: 'geometry.fill',
            stylers: [
                {
                    color: '#b9d3c2',
                },
            ],
        },
        {
            featureType: 'water',
            elementType: 'labels.text.fill',
            stylers: [
                {
                    color: '#92998d',
                },
            ],
        },
    ];
    return (
        <View style={styles.container(props)}>
            <GoogleDialogBox
                modalVisibleData={modalVisible}
                theme={props.theme}
                title={'Search Source / Destination City'}
                setPlaceTypeData={placetype}
                onGet={val => setModalVisible(val)}
                onGetData={val => {
                    placetype === 'from'
                        ? setData({ ...data, from: val })
                        : setData({ ...data, destination: val });
                }}
            />
            <View style={styles.mapBox}>
                <MapView
                    showsUserLocation={true}
                    style={{ flex: 1 }}
                    scrollEnabled={true}
                    showsBuildings={true}
                    showsMyLocationButton={true}
                    customMapStyle={props.theme ? drakmap : lightmap}
                    provider={'google'}
                    region={{
                        latitude: parseFloat(location.latitude),
                        longitude: parseFloat(location.longitude),
                        latitudeDelta: 0.4,
                        longitudeDelta: 0.9,
                    }}>
                    <Marker
                        coordinate={{
                            latitude: parseFloat(data.from.lat),
                            longitude: parseFloat(data.from.lng),
                        }}
                        title={data.from.name}
                    />
                    <Marker
                        coordinate={{
                            latitude: parseFloat(data.destination.lat),
                            longitude: parseFloat(data.destination.lng),
                        }}
                        title={data.destination.name}
                    />
                    <MapViewDirections
                        origin={{
                            latitude: parseFloat(data.from.lat),
                            longitude: parseFloat(data.from.lng),
                        }}
                        destination={{
                            latitude: parseFloat(data.destination.lat),
                            longitude: parseFloat(data.destination.lng),
                        }}
                        apikey={`${config.GooglePlaceAPI}`}
                        strokeWidth={10}
                        strokeColor={color.primaryColors}
                    />
                </MapView>
            </View>
            <KeyboardAwareScrollView
                style={styles.searchBox(props)}
                showsVerticalScrollIndicator={false}>
                <View style={styles.fromToDesc(props)}>
                    <View style={{ width: '10%', justifyContent: 'center' }}>
                        <Image
                            source={icons.journey}
                            style={{
                                width: 50,
                                height: 115,
                                tintColor: props.theme
                                    ? color.drakPrimaryColors
                                    : color.primaryColors,
                            }}
                        />
                    </View>
                    <View style={{ width: '90%', justifyContent: 'center' }}>
                        <View style={{ margin: 10, flexDirection: 'row' }}>
                            <View style={{ width: '5%', justifyContent: 'center' }}>
                                <Image
                                    source={icons.forword}
                                    style={{
                                        width: 20,
                                        height: 20,
                                        tintColor: props.theme
                                            ? color.drakPrimaryColors
                                            : color.primaryColors,
                                    }}
                                />
                            </View>
                            <TouchableOpacity
                                style={{ width: '95%' }}
                                activeOpacity={0.8}
                                onPress={() => {
                                    setModalVisible(true);
                                    setPlaceType('from');
                                }}>
                                <Text style={styles.inputBox(props)}>{data.from.name}</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{ margin: 10, flexDirection: 'row' }}>
                            <View style={{ width: '5%', justifyContent: 'center' }}>
                                <Image
                                    source={icons.forword}
                                    style={{
                                        width: 20,
                                        height: 20,
                                        tintColor: props.theme
                                            ? color.drakPrimaryColors
                                            : color.primaryColors,
                                    }}
                                />
                            </View>
                            <TouchableOpacity
                                style={{ width: '95%' }}
                                activeOpacity={0.8}
                                onPress={() => {
                                    setPlaceType('destination');
                                    setModalVisible(true);
                                }}>
                                <Text style={styles.inputBox(props)}>
                                    {data.destination.name}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                <TouchableOpacity
                    style={styles.reverseBtn(props)}
                    onPress={() => reverseBtn()}>
                    <Image
                        source={icons.upToDown}
                        style={{ width: 30, height: 30, tintColor: 'white' }}
                    />
                </TouchableOpacity>
                <View style={styles.dateOrCapicity}>
                    <View style={{ width: '30%', justifyContent: 'center' }}>
                        <Text
                            style={{
                                fontWeight: 'bold',
                                fontSize: 18,
                                color: props.theme ? color.drakFontcolor : color.fontcolor,
                            }}>
                            Goods Weight
                        </Text>
                    </View>
                    <View style={{ width: '30%', justifyContent: 'center' }}>
                        <TextInput
                            style={{
                                borderBottomColor: color.primaryColors,
                                width: '70%',
                                borderBottomWidth: 2,
                                paddingHorizontal: 20,
                                height: 40,
                                fontSize: 18,
                                color: props.theme ? color.drakFontcolor : color.fontcolor,
                            }}
                            onChangeText={val => setData({ ...data, capicity: val })}
                            placeholder={'00'}
                            placeholderTextColor="gray"
                            keyboardType="number-pad"
                        />
                    </View>
                    <View style={{ width: '30%', justifyContent: 'center' }}>
                        <Text
                            style={{
                                fontWeight: 'bold',
                                fontSize: 18,
                                color: props.theme
                                    ? color.drakPrimaryColors
                                    : color.primaryColors,
                            }}>
                            / Tonnes
                        </Text>
                    </View>
                </View>
                <TouchableOpacity
                    style={styles.btn(props)}
                    onPress={() => {
                        SearchRoute();
                    }}>
                    <Text style={styles.btnText}>Search</Text>
                </TouchableOpacity>
            </KeyboardAwareScrollView>
        </View>
    );
};
const useSelector = state => ({
    theme: state.token.theme,
});
export default connect(useSelector)(HomeScreen);
const styles = StyleSheet.create({
    container: props => [
        {
            flex: 1,

            backgroundColor: props.theme
                ? color.drakBackgroundColor
                : color.backgroundColor,
        },
    ],
    mapBox: {
        height: '40%',
    },
    searchBox: props => [
        {
            height: '60%',
            backgroundColor: props.theme
                ? color.drakBackgroundColor
                : color.backgroundColor,
            bottom: 0,
            borderTopLeftRadius: 40,
            borderTopRightRadius: 40,
            paddingVertical: (Dimensions.get('window').height - 330) / 6,
        },
    ],
    fromToDesc: props => [
        {
            height: 180,
            backgroundColor: props.theme
                ? color.drakBackgroundColor
                : color.backgroundColor,
            marginHorizontal: 35,
            borderRadius: 20,
            justifyContent: 'center',
            flexDirection: 'row',
            shadowColor: props.theme ? color.drakFontcolor : color.fontcolor,
            shadowOffset: {
                width: 0,
                height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 4,
            elevation: 5,
        },
    ],
    inputBox: props => [
        {
            borderWidth: 2,
            borderColor: props.theme ? color.drakPrimaryColors : color.primaryColors,
            padding: 10,
            fontSize: 18,
            borderRadius: 10,
            marginHorizontal: 10,
            color: props.theme ? 'gray' : '#111',
        },
    ],
    reverseBtn: props => [
        {
            width: 50,
            height: 50,
            borderRadius: 25,
            backgroundColor: props.theme
                ? color.drakPrimaryColors
                : color.primaryColors,
            bottom: Platform.OS === 'android' ? '60%' : '60%',
            left: '70%',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'absolute',
        },
    ],
    btn: props => [
        {
            width: '90%',
            height: 50,
            backgroundColor: props.theme
                ? color.drakPrimaryColors
                : color.primaryColors,
            borderRadius: 15,
            justifyContent: 'center',
            alignItems: 'center',
            alignSelf: 'center',
        },
    ],
    btnText: {
        fontSize: 20,
        color: 'white',
        fontWeight: 'bold',
    },
    dateOrCapicity: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginVertical: 10,
        marginHorizontal: 20,
    },
});
