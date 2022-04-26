import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions, ScrollView, RefreshControl } from 'react-native'
import React from 'react'
import color from '../../contents/color'
import AdminHeader from '../../components/adminHeader'
import { connect } from 'react-redux'
import { getCountDriver, getCountTruck, getCountRoute, getCountTransport } from '../../Redux/Admin/countAddSlice'
import icons from '../../contents/icons'
import AnimatedLoader from "react-native-animated-loader";
const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
}
const AdminHome = (props) => {

    const [refreshing, setRefreshing] = React.useState(false);

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);

        props.getCountTruck(props.token)
        props.getCountDriver(props.token)
        props.getCountRoute(props.token),
            props.getCountTransport(props.token)
        wait(2000).then(() => setRefreshing(false));
    }, []);

    React.useEffect(() => {

        props.getCountTruck(props.token)
        props.getCountDriver(props.token)
        props.getCountRoute(props.token),
            props.getCountTransport(props.token)
    }, [])



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
            <AdminHeader name={"Transport Deshboard"} />
            <ScrollView style={{ marginBottom: 50 }} showsVerticalScrollIndicator={false} refreshControl={
                <RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                />
            }>
                <View style={styles.box}>
                    <TouchableOpacity style={styles.adminCard(props)} activeOpacity={0.80} onPress={() => props.navigation.navigate('TruckList')}>
                        <View style={styles.Text}>
                            <Text style={styles.menuText(props)}>{props.countTruck}</Text>
                        </View>
                        <View style={styles.icon}>
                            <Image source={icons.truck} style={{ width: 40, height: 40, tintColor: color.adminprimaryColors }} />
                            <Text style={styles.title(props)}>Truck</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.adminCard(props)} activeOpacity={0.80} onPress={() => props.navigation.navigate('DriverList')}>
                        <View style={styles.Text}>
                            <Text style={styles.menuText(props)}>{props.countDriver}</Text>
                        </View>
                        <View style={styles.icon}>
                            <Image source={icons.driver} style={{ width: 40, height: 40, tintColor: color.adminprimaryColors }} />
                            <Text style={styles.title(props)}>Driver</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={styles.box}>
                    <TouchableOpacity style={styles.adminCard(props)} activeOpacity={0.80} onPress={() => props.navigation.navigate('Routelist')}>
                        <View style={styles.Text}>
                            <Text style={styles.menuText(props)}>{props.countRoute}</Text>
                        </View>
                        <View style={styles.icon}>
                            <Image source={icons.tracking} style={{ width: 40, height: 40, tintColor: color.adminprimaryColors }} />
                            <Text style={styles.title(props)} >Routes</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.adminCard(props)} activeOpacity={0.80} onPress={() => props.navigation.navigate('TransportListDetails')}>
                        <View style={styles.Text}>
                            <Text style={styles.menuText(props)}>{props.countTransport}</Text>
                        </View>
                        <View style={styles.icon}>
                            <Image source={icons.addtotruck} style={{ width: 40, height: 40, tintColor: color.adminprimaryColors }} />
                            <Text style={styles.title(props)} >Details</Text>
                        </View>
                    </TouchableOpacity>
                </View>

            </ScrollView>
        </View>
    )
}
const useDispatch = (dispatch) => {
    return {
        getCountTruck: (data) => dispatch(getCountTruck(data)),
        getCountDriver: (data) => dispatch(getCountDriver(data)),
        getCountRoute: (data) => dispatch(getCountRoute(data)),
        getCountTransport: (data) => dispatch(getCountTransport(data)),

    };
}
const useSelector = (state) => (

    {
        countTruck: state.count.countTruck,
        countDriver: state.count.countDriver,
        countRoute: state.count.countRoute,
        countTransport: state.count.countTransport,
        loading: state.count.loading,
        theme: state.token.theme,
        token: state.token.token,
    }
)
export default connect(useSelector, useDispatch)(AdminHome);
const styles = StyleSheet.create({
    container: (props) => [{
        flex: 1,
        backgroundColor: props.theme ? color.drakBackgroundColor : color.backgroundColor,
    }],
    box: {
        flexDirection: 'row',
        marginHorizontal: 10
    },
    adminCard: (props) => [{
        width: Dimensions.get('window').width / 2 - 40,
        height: 150,
        backgroundColor: props.theme ? color.drakBackgroundColor : color.backgroundColor,
        marginHorizontal: 15,
        borderRadius: 20,
        justifyContent: 'center',

        shadowColor: props.theme ? color.drakFontcolor : color.fontcolor,
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 6,
        marginVertical: 10,
        flexDirection: 'column'
    }], Text: {
        justifyContent: "center",
        alignItems: 'center'
    },
    menuText: (props) => [{
        fontSize: 50,
        fontWeight: 'bold',
        color: props.theme ? color.drakAdminprimaryColors : color.adminprimaryColors,
    }], icon: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 20
    },
    title: (props) => [{
        fontSize: 18,
        fontWeight: 'bold',
        color: props.theme ? color.drakFontcolor : color.fontcolor,
        marginVertical: 10
    }]
})
