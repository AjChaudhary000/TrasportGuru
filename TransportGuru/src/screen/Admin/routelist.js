import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList } from 'react-native'
import React from 'react'
import { AdminHeaderWithBackButton } from '../../components/adminHeader'
import color from '../../contents/color'
import image from '../../contents/image'
import { connect } from 'react-redux'
import { getJWTToken } from '../../Redux/helper'
import { deleteRoute, getRouteList, setRouteData } from '../../Redux/Admin/routeSlice'
import { getCountRoute } from '../../Redux/Admin/countAddSlice'
import icons from '../../contents/icons'
const Routelist = (props) => {
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
        props.getRouteList(token)
    }, [token])
    React.useEffect(() => {

        if (props.deletedata.status) {
            props.getRouteList(token)
            props.getCountRoute(token)
            props.setRouteData(token)
        }
    }, [token, props])
    const DeleteDriver = (id) => {
        console.log(id)
        props.deleteRoute({ id: id, token: token })
    }
    const EditDriver = (item) => {
        console.log(item)
        props.navigation.navigate("AddRoute", { item: item })
    }
    return (
        <View style={styles.container}>
            <AdminHeaderWithBackButton name={"Route List"} navigation={props.navigation} />
            <FlatList data={props.routelist} renderItem={(item) => (
                <View style={styles.listBox}>
                    <View style={{ alignItems: "center" }}>
                        <Text style={{ fontWeight: 'bold', color: color.fontcolor }}>
                            {item.item.from}
                        </Text>
                    </View>
                    <View style={{ alignItems: "center", paddingVertical: 20 }}>
                        <Image source={icons.upToDown} style={{ width: 30, height: 30, tintColor: color.adminprimaryColors }} />
                    </View>
                    <View style={{ alignItems: "center" }}>
                        <Text style={{ fontWeight: 'bold', color: color.fontcolor }}>
                            {item.item.destination}
                        </Text>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <View style={{ width: "10%", justifyContent: 'center' }}>
                            <Image source={icons.journey} style={{ width: 20, height: 200, tintColor: color.adminprimaryColors }} />
                        </View>
                        <View style={{ width: "90%", justifyContent: 'center' }}>


                            <FlatList data={item.item.routeStop} renderItem={(item) => (
                                <View style={{ margin: 10, flexDirection: 'row' }}>

                                    <View style={{ width: '5%', justifyContent: 'center' }}>
                                        <Image source={icons.forword} style={{ width: 20, height: 20, tintColor: color.adminprimaryColors }} />
                                    </View>
                                    <View style={{ width: '95%' }}>
                                        <Text style={{ marginHorizontal: 10, fontWeight: 'bold', color: 'gray' }}>{item.item.stops}</Text>
                                    </View>
                                </View>)}
                            />


                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 20, paddingHorizontal: 30 }}>
                        <TouchableOpacity onPress={() => { EditDriver(item.item) }}>
                            <Text style={styles.edit}>Edit</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => { DeleteDriver(item.item._id) }}>
                            <Text style={styles.delete} >Delete</Text>
                        </TouchableOpacity>



                    </View>
                </View>
            )
            } />

        </View >
    )
}
const useDispatch = (dispatch) => {
    return {
        getRouteList: (data) => dispatch(getRouteList(data)),
        deleteRoute: (data) => dispatch(deleteRoute(data)),
        getCountRoute: (data) => dispatch(getCountRoute(data)),
        setRouteData: (data) => dispatch(setRouteData(data))
    };
}
const useSelector = (state) => (

    {
        routelist: state.route.routeList,
        deletedata: state.route.data

    }
)
export default connect(useSelector, useDispatch)(Routelist);
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: color.backgroundColor
    }, listBox: {
        minHeight: 150,
        backgroundColor: color.backgroundColor,
        marginHorizontal: 20,
        borderRadius: 20,

        shadowColor: color.fontcolor,
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        marginVertical: 10,
        padding: 20
    },



    edit: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'green'
    },
    delete: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'red'
    }
})