import { View, Text, StyleSheet, RefreshControl, ScrollView, FlatList, Image, TouchableOpacity ,Linking} from 'react-native'
import React from 'react'
import color from '../../contents/color';
import { connect } from 'react-redux';
import { AdminHeaderWithBackButton } from '../../components/adminHeader';
import { trackingDetailsByTransportId } from '../../Redux/fetchByIDSlice';
import AnimatedLoader from "react-native-animated-loader";
import LottieView from 'lottie-react-native';
import icons from '../../contents/icons';
import calcKmFind from '../../components/kmFind';

const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
}
const BookingHistory = (props) => {
    const [refreshing, setRefreshing] = React.useState(false);
    const onRefresh = React.useCallback(() => {
        props.trackingDetailsByTransportId({ token: props.token, id: props.route.params.id })
        setRefreshing(true);
        wait(2000).then(() => setRefreshing(false));
    }, []);
    React.useEffect(() => {
        props.trackingDetailsByTransportId({ token: props.token, id: props.route.params.id })
    }, [])
    const CallBtn = (MobileNo) => {
        console.log('callNumber ----> ', MobileNo);
        let phoneNumber = MobileNo;
        if (Platform.OS !== 'android') {
            phoneNumber = `telprompt:${MobileNo}`;
        }
        else {
            phoneNumber = `tel:${MobileNo}`;
        }
        Linking.canOpenURL(phoneNumber)
            .then(supported => {
                if (!supported) {
                    console.log(supported)
                } else {
                    return Linking.openURL(phoneNumber);
                }
            })
            .catch(err => console.log(err));
    }
    return (
        <View style={styles.container(props)}>
            <AnimatedLoader
                visible={props.loading}
                overlayColor="rgba(255,255,255,0.75)"
                source={require("../../assets/json/loder.json")}
                animationStyle={{
                    width: 100,
                    height: 100
                }}
                speed={1}
            >
                <Text>Loading...</Text>
            </AnimatedLoader>
            <AdminHeaderWithBackButton name={"Booking History"} navigation={props.navigation} />
            <ScrollView style={{ marginBottom: 60 }} refreshControl={
                <RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                />
            } showsVerticalScrollIndicator={false}>
                {props.BookingHistoryData.length === 0 ?



                    <View style={{ flex: 1 }}>

                        <View style={{ height: 500, width: 200, alignSelf: 'center' }}>
                            <LottieView source={require('../../assets/json/notfound.json')} autoPlay loop />
                        </View>

                    </View>

                    :
                    <FlatList data={props.BookingHistoryData} renderItem={(item) => (
                        <View style={styles.listBox(props)}>
                            <View style={{ marginHorizontal: 10, marginVertical: 5, flexDirection: "row", justifyContent: 'space-between' }}>
                                <View >

                                    <Text style={{ color: 'gray', fontWeight: 'bold', fontSize: 14, paddingRight: 2 }}>
                                        {new Date(new Date(item.item.createdAt)).toLocaleDateString("en-US", { weekday: 'short', month: 'long', day: 'numeric' })}

                                    </Text>
                                </View>
                                <View >
                                    <Text style={{ color: color.primaryColors, fontWeight: 'bold', fontSize: 14 }}>
                                        {new Date(new Date(item.item.createdAt)).toLocaleDateString("en-US", { hour: 'numeric', minute: 'numeric', hour12: false }).toString().slice(-5)}
                                    </Text>

                                </View>

                            </View>
                            <View style={{ marginHorizontal: 10, paddingVertical: 4, flexDirection: 'row', justifyContent: 'space-between' }}>
                                <View style={{ width: '40%', alignItems: "center" }}>
                                    <Text style={{ fontWeight: 'bold', color: props.theme ? color.drakFontcolor : color.fontcolor }}>

                                        {(item.item.paymentid.from.name.split(',').reverse()[2])}
                                    </Text>

                                </View>
                                <View style={{ width: '20%', alignItems: "center" }}>
                                    <Image source={icons.transfer} style={{ width: 30, height: 30, tintColor: props.theme ? color.drakPrimaryColors : color.primaryColors }} />
                                </View>
                                <View style={{ width: '40%', alignItems: "center" }}>
                                    <Text style={{ fontWeight: 'bold', color: props.theme ? color.drakFontcolor : color.fontcolor }}>
                                        {(item.item.paymentid.destination.name.split(',').reverse()[2])}</Text>

                                </View>
                            </View>

                            <View style={{ alignItems: "flex-start", paddingVertical: 4, marginHorizontal: 20, }}>

                                <Text style={{ fontWeight: 'bold', color: 'gray' }}>{item.item?.userId.username}</Text>
                                <View style={{ flexDirection: "row", justifyContent: 'space-between' }}>
                                    <View style={{ width: "90%" }}>
                                        <Text style={{ fontWeight: 'bold', color: 'gray' }}>{item.item?.userId?.mobileno || "+91"}</Text>
                                    </View>
                                    <TouchableOpacity style={{ width: "10%" }} onPress={()=>CallBtn(item.item?.userId?.mobileno)}>
                                        <Image source={icons.call} style={{
                                            width: 20,
                                            height: 20,
                                            tintColor: props.theme ? color.drakPrimaryColors : color.primaryColors
                                        }} />
                                    </TouchableOpacity>
                                </View>

                            </View>
                            <View style={{ marginHorizontal: 10, alignItems: "center", paddingVertical: 4, flexDirection: 'row', justifyContent: 'space-between' }}>
                                <View>
                                    <Text style={{ fontWeight: 'bold', color: 'gray' }}>Loaded Capicity</Text>
                                    <Text style={{ color: props.theme ? color.drakFontcolor : color.fontcolor, fontWeight: 'bold', fontSize: 14, paddingRight: 2 }}>
                                        {item.item.paymentid.capicity} / - Tonnes
                                    </Text>
                                </View>
                                <View>
                                    {item.item.paymentid.paymentStatus === "Completing" ?

                                        <Text style={{ color: '#32a852', fontWeight: "bold", fontSize: 18 }}>Success</Text>
                                        :

                                        <Text style={{ color: '#F13F05', fontWeight: "bold", fontSize: 18 }}>Pending</Text>
                                    }
                                </View>
                            </View>
                        </View>

                    )}


                    />}
            </ScrollView>
        </View>
    )
}
const useDispatch = (dispatch) => {
    return {
        trackingDetailsByTransportId: (data) => dispatch(trackingDetailsByTransportId(data)),

    };
}
const useSelector = (state) => (
    {
        theme: state.token.theme,
        BookingHistoryData: state.fetchById.bookingHistory,
        loading: state.fetchById.loading,
        token: state.token.token,
    }
)
export default connect(useSelector, useDispatch)(BookingHistory);
const styles = StyleSheet.create({
    container: (props) => [{
        flex: 1,
        backgroundColor: props.theme ? color.drakBackgroundColor : color.backgroundColor,

    }],
    listBox: (props) => [{
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
    }],

});