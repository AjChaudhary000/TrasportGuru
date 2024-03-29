import {
    View,
    Text,
    StyleSheet,
    FlatList,
    Image,
    TouchableOpacity,
} from 'react-native';
import React from 'react';
import { connect } from 'react-redux';
import Header from '../../components/header';
import { getTracking } from '../../Redux/trackingSlice';
import color from '../../contents/color';
import AnimatedLoader from 'react-native-animated-loader';
import icons from '../../contents/icons';
import calcKmFind from '../../components/kmFind';
import { updatePayment, setPaymentData } from '../../Redux/paymentSlice';
import LottieView from 'lottie-react-native';
import RazorpayCheckout from 'react-native-razorpay';
const wait = timeout => {
    return new Promise(resolve => setTimeout(resolve, timeout));
};
const Tracking = props => {
    const [refreshing, setRefreshing] = React.useState(false);

    const [amount, setAmount] = React.useState(0);
    React.useEffect(() => {
        if (props.paymentData?.status) {
            props.getTracking(props.token);
            props.setPaymentData([]);
            props.navigation.navigate('Confirmation', { payment: amount, type: 'pay' });
        }
    }, [props]);
    const onRefresh = React.useCallback(() => {
        props.getTracking(props.token);
        setRefreshing(true);
        //  props.getUserDetails(token);
        wait(2000).then(() => setRefreshing(false));
    }, []);
    React.useEffect(() => {
        props.getTracking(props.token);
    }, []);

    const paymentHendle = (item, Admindata) => {
        let paymentStatus = '';
        const payment = item.totalPayment - item.paymentHistory[0].payment;
        console.log(payment);
        setAmount(payment);
        let paymentHistory = [...item.paymentHistory, { payment }];
        paymentStatus = 'Completing';
        var options = {
            description: 'Transport Guru Payments ',
            image: `${Admindata.trasportAccount[0].trasportImage}`,
            currency: 'INR',
            key: 'rzp_test_K3zMkXzdEHbAqq',
            amount: Math.round(amount * 100),
            name: Admindata.trasportAccount[0].trasportName,
            prefill: {
                email: props.userData?.email,
                contact: props.userData?.mobileno || '9106614742',
                name: props.userData?.username,
            },
            theme: { color: '#119CB9' },
        };
        RazorpayCheckout.open(options)
            .then(data => {
                props.updatePayment({
                    data: { paymentHistory, paymentStatus },
                    id: item._id,
                    token: props.token,
                });
            })
            .catch(error => {
                // handle failure
                console.log(error);
            });
    };

    return (
        <View style={styles.container(props)}>
            <AnimatedLoader
                visible={props.loading}
                overlayColor="rgba(255,255,255,0.75)"
                source={require('../../assets/json/loder.json')}
                animationStyle={{
                    width: 100,
                    height: 100,
                }}
                speed={1}>
                <Text>Loading ...</Text>
            </AnimatedLoader>
            <Header name={'Tracking'} />

            {props.trackingList.length === 0 && !props.loading ? (
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
                    data={props.trackingList}
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            style={styles.listBox(props, item)}
                            onPress={() =>
                                props.navigation.navigate('TrackingDetails', { id: item._id })
                            }
                            key={item._id}>
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
                                        {new Date(new Date(item.createdAt)).toLocaleDateString(
                                            'en-US',
                                            { weekday: 'short', month: 'long', day: 'numeric' },
                                        )}
                                    </Text>
                                </View>
                                <View>
                                    <Text
                                        style={{
                                            color: color.primaryColors,
                                            fontWeight: 'bold',
                                            fontSize: 14,
                                        }}>
                                        {new Date(new Date(item.createdAt))
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
                                        {item.paymentid.from.name.split(',').reverse()[2]}
                                    </Text>
                                </View>
                                <View style={{ width: '20%', alignItems: 'center' }}>
                                    <Image
                                        source={icons.transfer}
                                        style={{
                                            width: 30,
                                            height: 30,
                                            tintColor: props.theme
                                                ? color.drakPrimaryColors
                                                : color.primaryColors,
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
                                        {item.paymentid.destination.name.split(',').reverse()[2]}
                                    </Text>
                                </View>
                            </View>
                            <View
                                style={{
                                    marginHorizontal: 10,
                                    alignItems: 'center',
                                    paddingVertical: 4,
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                }}>
                                <View>
                                    <Text style={{ fontWeight: 'bold', color: 'gray' }}>
                                        Delivery Date
                                    </Text>
                                    <Text
                                        style={{
                                            color: props.theme
                                                ? color.drakFontcolor
                                                : color.fontcolor,
                                            fontWeight: 'bold',
                                            fontSize: 14,
                                            paddingRight: 2,
                                        }}>
                                        {new Date(
                                            new Date(item.tarsportId.Truckdate).setHours(
                                                new Date(item.tarsportId.Truckdate).getHours() +
                                                Math.round(
                                                    calcKmFind(
                                                        item.paymentid.from.lat,
                                                        item.paymentid.from.lng,
                                                        item.paymentid.destination.lat,
                                                        item.paymentid.destination.lng,
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
                                <View>
                                    {item.paymentid.paymentStatus === 'Completing' ? (
                                        <TouchableOpacity style={styles.paid}>
                                            <Text
                                                style={{
                                                    color: 'white',
                                                    fontWeight: 'bold',
                                                    fontSize: 18,
                                                }}>
                                                Paid
                                            </Text>
                                        </TouchableOpacity>
                                    ) : (
                                        <TouchableOpacity
                                            style={styles.pay(props)}
                                            onPress={() => {
                                                paymentHendle(
                                                    item.paymentid,
                                                    item.tarsportId.tarsportUserId,
                                                );
                                            }}>
                                            <Text
                                                style={{
                                                    color: 'white',
                                                    fontWeight: 'bold',
                                                    fontSize: 18,
                                                }}>
                                                Pay
                                            </Text>
                                        </TouchableOpacity>
                                    )}
                                </View>
                            </View>
                        </TouchableOpacity>
                    )}
                />
            )}
        </View>
    );
};

const useSelector = state => ({
    theme: state.token.theme,
    trackingList: state.tracking.trackingdata,
    loading: state.tracking.loading,
    paymentData: state.payment.paymentdata,
    token: state.token.token,
});
const useDispatch = dispatch => {
    return {
        getTracking: data => dispatch(getTracking(data)),
        updatePayment: data => dispatch(updatePayment(data)),
        setPaymentData: data => dispatch(setPaymentData(data)),
    };
};
export default connect(useSelector, useDispatch)(Tracking);
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
                    new Date(item.tarsportId.Truckdate).setHours(
                        new Date(item.tarsportId.Truckdate).getHours() +
                        Math.round(
                            calcKmFind(
                                item.paymentid.from.lat,
                                item.paymentid.from.lng,
                                item.paymentid.destination.lat,
                                item.paymentid.destination.lng,
                            ) / 45,
                        ),
                    ),
                ) <= new Date(new Date(item.createdAt))
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
    pay: props => [
        {
            width: 150,
            height: 50,
            backgroundColor: props.theme
                ? color.drakPrimaryColors
                : color.primaryColors,
            borderRadius: 10,
            justifyContent: 'center',
            alignItems: 'center',
            marginHorizontal: 10,
        },
    ],
    paid: {
        width: 150,
        height: 50,
        backgroundColor: '#32a852',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 10,
    },
});
