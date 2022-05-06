import {
    View,
    Text,
    StyleSheet,
    RefreshControl,
    ScrollView,
    FlatList,
    Image,
    TouchableOpacity,
    Linking,
} from 'react-native';
import React from 'react';
import { connect } from 'react-redux';
import color from '../../contents/color';
import AnimatedLoader from 'react-native-animated-loader';
import icons from '../../contents/icons';
import calcKmFind from '../../components/kmFind';
import LottieView from 'lottie-react-native';
import AdminHeader from '../../components/adminHeader';
import {
    getTransportList,
    setTransportList,
} from '../../Redux/Admin/transportSlice';
const wait = timeout => {
    return new Promise(resolve => setTimeout(resolve, timeout));
};
const AdminTracking = props => {
    const [refreshing, setRefreshing] = React.useState(false);
    const [data, setData] = React.useState([]);
    const limitValue = 4;
    const [isSkip, setIsSkip] = React.useState(0);

    const onRefresh = React.useCallback(() => {
        setIsSkip(0);
        setData([]);

        setRefreshing(true);
        props.getTransportList({ token: props.token, skip: 0, limit: limitValue });
        wait(2000).then(() => setRefreshing(false));
    }, []);
    React.useEffect(() => {
        props.getTransportList({ token: props.token, skip: 0, limit: limitValue });
    }, []);
    React.useEffect(() => {
        if (props.transportList?.status) {
            console.log(props.transportList);
            setData([...data, ...props.transportList.data]);
            props.setTransportList({});
            props.transportList = {};
        }
    }, [props]);
    const handleListFooterComponent = () => {
        return props.loading ? (
            <AnimatedLoader
                visible={props.loading}
                overlayColor="rgba(255,255,255,0.75)"
                source={require('../../assets/json/loder.json')}
                animationStyle={{
                    width: 100,
                    height: 100,
                }}
                speed={1}>
                <Text>Loading...</Text>
            </AnimatedLoader>
        ) : null;
    };
    const CallBtn = MobileNo => {
        console.log('callNumber ----> ', MobileNo);
        let phoneNumber = MobileNo;
        if (Platform.OS !== 'android') {
            phoneNumber = `telprompt:${MobileNo}`;
        } else {
            phoneNumber = `tel:${MobileNo}`;
        }
        Linking.canOpenURL(phoneNumber)
            .then(supported => {
                if (!supported) {
                    console.log(supported);
                } else {
                    return Linking.openURL(phoneNumber);
                }
            })
            .catch(err => console.log(err));
    };
    return (
        <View style={styles.container(props)}>
            <AdminHeader name={'Tracking'} />

            {data.length === 0 ? (
                <View style={{ flex: 1 }}>
                    <View style={{ height: 500, width: 200, alignSelf: 'center' }}>
                        <LottieView
                            source={require('../../assets/json/notfound.json')}
                            autoPlay
                            loop
                        />
                    </View>
                </View>
            ) : (
                <FlatList
                    data={data}
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                    renderItem={item => (
                        <TouchableOpacity
                            style={styles.listBox(props, item)}
                            onPress={() =>
                                props.navigation.navigate('AdminTrackingDetails', {
                                    id: item.item._id,
                                })
                            }>
                            <View
                                style={{
                                    marginHorizontal: 10,
                                    marginVertical: 5,
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                }}>
                                <View>
                                    <Text
                                        style={{
                                            color: 'gray',
                                            fontWeight: 'bold',
                                            fontSize: 14,
                                            paddingRight: 2,
                                        }}>
                                        {new Date(new Date(item.item.Truckdate)).toLocaleDateString(
                                            'en-US',
                                            { weekday: 'short', month: 'long', day: 'numeric' },
                                        )}
                                    </Text>
                                </View>
                                <View>
                                    <Text
                                        style={{
                                            color: color.adminprimaryColors,
                                            fontWeight: 'bold',
                                            fontSize: 14,
                                        }}>
                                        {new Date(new Date(item.item.Truckdate))
                                            .toLocaleDateString('en-US', {
                                                hour: 'numeric',
                                                minute: 'numeric',
                                                hour12: false,
                                            })
                                            .toString()
                                            .slice(-5)}
                                    </Text>
                                </View>
                            </View>
                            <View
                                style={{
                                    marginHorizontal: 10,
                                    paddingVertical: 4,
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                }}>
                                <View style={{ width: '40%', alignItems: 'center' }}>
                                    <Text
                                        style={{
                                            fontWeight: 'bold',
                                            color: props.theme
                                                ? color.drakFontcolor
                                                : color.fontcolor,
                                        }}>
                                        {item.item.routeId.from.name.split(',').reverse()[2]}
                                    </Text>
                                </View>
                                <View style={{ width: '20%', alignItems: 'center' }}>
                                    <Image
                                        source={icons.transfer}
                                        style={{
                                            width: 30,
                                            height: 30,
                                            tintColor: props.theme
                                                ? color.drakAdminprimaryColors
                                                : color.adminprimaryColors,
                                        }}
                                    />
                                </View>
                                <View style={{ width: '40%', alignItems: 'center' }}>
                                    <Text
                                        style={{
                                            fontWeight: 'bold',
                                            color: props.theme
                                                ? color.drakFontcolor
                                                : color.fontcolor,
                                        }}>
                                        {item.item.routeId.destination.name.split(',').reverse()[2]}
                                    </Text>
                                </View>
                            </View>
                            <View
                                style={{
                                    alignItems: 'center',
                                    paddingVertical: 4,
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                }}>
                                <View
                                    style={{
                                        alignItems: 'flex-start',
                                        paddingVertical: 4,
                                        marginHorizontal: 20,
                                    }}>
                                    <Text style={{ fontWeight: 'bold', color: 'gray' }}>
                                        Truck Reg No : {item.item?.truckId.truckRegistartionNo}
                                    </Text>
                                    <Text style={{ fontWeight: 'bold', color: 'gray' }}>
                                        Driver Name : {item.item?.driverId.driverName}
                                    </Text>
                                    <View
                                        style={{
                                            flexDirection: 'row',
                                            justifyContent: 'space-between',
                                        }}>
                                        <TouchableOpacity style={{ width: '90%' }}>
                                            <Text style={{ fontWeight: 'bold', color: 'gray' }}>
                                                Driver Mobile no : {item.item?.driverId.driverMobileNo}
                                            </Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            style={{ width: '10%' }}
                                            onPress={() =>
                                                CallBtn(item.item?.driverId.driverMobileNo)
                                            }>
                                            <Image
                                                source={icons.call}
                                                style={{
                                                    width: 20,
                                                    height: 20,
                                                    tintColor: props.theme
                                                        ? color.drakAdminprimaryColors
                                                        : color.adminprimaryColors,
                                                }}
                                            />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                            <View style={{ marginHorizontal: 10 }}>
                                <Text style={{ fontWeight: 'bold', color: 'gray' }}>
                                    Delivery Date
                                </Text>
                                <Text
                                    style={{
                                        color: props.theme ? color.drakFontcolor : color.fontcolor,
                                        fontWeight: 'bold',
                                        fontSize: 14,
                                        paddingRight: 2,
                                    }}>
                                    {new Date(
                                        new Date(item.item.Truckdate).setHours(
                                            new Date(item.item.Truckdate).getHours() +
                                            Math.round(
                                                calcKmFind(
                                                    item.item.routeId.from.lat,
                                                    item.item.routeId.from.lng,
                                                    item.item.routeId.destination.lat,
                                                    item.item.routeId.destination.lng,
                                                ) / 45,
                                            ),
                                        ),
                                    ).toLocaleDateString('en-US', {
                                        weekday: 'short',
                                        month: 'long',
                                        day: 'numeric',
                                        hour: 'numeric',
                                        minute: 'numeric',
                                        hour12: false,
                                    })}
                                </Text>
                            </View>
                        </TouchableOpacity>
                    )}
                    onEndReached={() => {
                        let count = isSkip + limitValue;
                        console.log('isSkip', count);
                        setIsSkip(count);

                        props.getTransportList({
                            token: props.token,
                            skip: count,
                            limit: limitValue,
                        });
                    }}
                    onEndReachedThreshold={0.5}
                    ListFooterComponent={handleListFooterComponent}
                />
            )}
        </View>
    );
};

const useSelector = state => ({
    theme: state.token.theme,
    transportList: state.transport.transportList,
    loading: state.transport.loading,
    paymentData: state.payment.paymentdata,
    token: state.token.token,
});
const useDispatch = dispatch => {
    return {
        setTransportList: data => dispatch(setTransportList(data)),
        getTransportList: data => dispatch(getTransportList(data)),
    };
};
export default connect(useSelector, useDispatch)(AdminTracking);
const styles = StyleSheet.create({
    container: props => [
        {
            flex: 1,
            backgroundColor: props.theme
                ? color.drakBackgroundColor
                : color.backgroundColor,
        },
    ],
    listBox: (props, item) => [
        {
            minHeight: 150,

            backgroundColor:
                new Date(
                    new Date(item.item.Truckdate).setHours(
                        new Date(item.item.Truckdate).getHours() +
                        Math.round(
                            calcKmFind(
                                item.item.routeId.from.lat,
                                item.item.routeId.from.lng,
                                item.item.routeId.destination.lat,
                                item.item.routeId.destination.lng,
                            ) / 45,
                        ),
                    ),
                ) <= new Date(new Date(item.item.Truckdate))
                    ? props.theme
                        ? 'rgba(0, 0, 0, 0.30)'
                        : 'rgba(255, 255, 255, 0.30)'
                    : props.theme
                        ? color.drakBackgroundColor
                        : color.backgroundColor,
            marginHorizontal: 20,
            borderRadius: 20,

            shadowColor: props.theme ? color.drakFontcolor : color.fontcolor,
            shadowOffset: {
                width: 0,
                height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 4,
            elevation: 5,
            marginVertical: 10,
            padding: 10,
        },
    ],
});
