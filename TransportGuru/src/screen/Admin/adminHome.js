import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions } from 'react-native'
import React from 'react'
import color from '../../contents/color'
import AdminHeader from '../../components/adminHeader'
import { connect } from 'react-redux'
import { getCountDriver, getCountTruck, getCountRoute, getCountTransport } from '../../Redux/Admin/countAddSlice'
import { getJWTToken } from '../../Redux/helper'
import icons from '../../contents/icons'
const AdminHome = (props) => {
    const [token, setToken] = React.useState('');
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
        props.getCountTruck(token)
        props.getCountDriver(token)
        props.getCountRoute(token),
            props.getCountTransport(token)
    }, [token])
    return (
        <View style={styles.container}>
            <AdminHeader name={"Transport Deshboard"} />
            <View style={styles.box}>
                <TouchableOpacity style={styles.adminCard} activeOpacity={0.80} onPress={() => props.navigation.navigate('TruckList')}>
                    <View style={styles.Text}>
                        <Text style={styles.menuText}>{props.countTruck}</Text>
                    </View>
                    <View style={styles.icon}>
                        <Image source={icons.truck} style={{ width: 40, height: 40, tintColor: color.adminprimaryColors }} />
                        <Text style={styles.title}>Truck</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.adminCard} activeOpacity={0.80} onPress={() => props.navigation.navigate('DriverList')}>
                    <View style={styles.Text}>
                        <Text style={styles.menuText}>{props.countDriver}</Text>
                    </View>
                    <View style={styles.icon}>
                        <Image source={icons.driver} style={{ width: 40, height: 40, tintColor: color.adminprimaryColors }} />
                        <Text style={styles.title}>Driver</Text>
                    </View>
                </TouchableOpacity>
            </View>
            <View style={styles.box}>
                <TouchableOpacity style={styles.adminCard} activeOpacity={0.80} onPress={() => props.navigation.navigate('Routelist')}>
                    <View style={styles.Text}>
                        <Text style={styles.menuText}>{props.countRoute}</Text>
                    </View>
                    <View style={styles.icon}>
                        <Image source={icons.tracking} style={{ width: 40, height: 40, tintColor: color.adminprimaryColors }} />
                        <Text style={styles.title} >Routes</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.adminCard} activeOpacity={0.80} onPress={() => props.navigation.navigate('TransportListDetails')}>
                    <View style={styles.Text}>
                        <Text style={styles.menuText}>{props.countTransport}</Text>
                    </View>
                    <View style={styles.icon}>
                        <Image source={icons.addtotruck} style={{ width: 40, height: 40, tintColor: color.adminprimaryColors }} />
                        <Text style={styles.title} >Details</Text>
                    </View>
                </TouchableOpacity>
            </View>
            <View style={styles.box}>
                <TouchableOpacity style={styles.adminCard} activeOpacity={0.80}>
                    <View style={styles.Text}>
                        <Text style={styles.menuText}>0</Text>
                    </View>
                    <View style={styles.icon}>
                        <Image source={icons.box} style={{ width: 40, height: 40, tintColor: color.adminprimaryColors }} />
                        <Text style={styles.title} > Request</Text>
                    </View>
                </TouchableOpacity>


            </View>

        </View>
    )
}
const useDispatch = (dispatch) => {
    return {
        getCountTruck: (data) => dispatch(getCountTruck(data)),
        getCountDriver: (data) => dispatch(getCountDriver(data)),
        getCountRoute: (data) => dispatch(getCountRoute(data)),
        getCountTransport: (data) => dispatch(getCountTransport(data))
    };
}
const useSelector = (state) => (

    {
        countTruck: state.count.countTruck,
        countDriver: state.count.countDriver,
        countRoute: state.count.countRoute,
        countTransport: state.count.countTransport,
    }
)
export default connect(useSelector, useDispatch)(AdminHome);
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: color.backgroundColor,
    },
    box: {
        flexDirection: 'row',
        marginHorizontal: 10
    },
    adminCard: {
        width: Dimensions.get('window').width / 2 - 40,
        height: 150,
        backgroundColor: color.backgroundColor,
        marginHorizontal: 15,
        borderRadius: 20,
        justifyContent: 'center',

        shadowColor: color.fontcolor,
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        marginVertical: 10,
        flexDirection: 'column'
    }, Text: {
        justifyContent: "center",
        alignItems: 'center'
    },
    menuText: {
        fontSize: 50,
        fontWeight: 'bold',
        color: color.adminprimaryColors,
    }, icon: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 20
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: color.fontcolor,
        marginVertical: 10
    }
})