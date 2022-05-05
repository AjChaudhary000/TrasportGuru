import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList } from 'react-native'
import React from 'react'
import { AdminHeaderWithBackButton } from '../../components/adminHeader'
import color from '../../contents/color'
import LottieView from 'lottie-react-native';
import { connect } from 'react-redux'
import { deleteRoute, getRouteList, setRouteData } from '../../Redux/Admin/routeSlice'
import { getCountRoute } from '../../Redux/Admin/countAddSlice'
import icons from '../../contents/icons'
import Toast from 'react-native-simple-toast';
import AnimatedLoader from "react-native-animated-loader";
import ActionDialogBox from '../../components/ActionDialogBox'
const Routelist = (props) => {
    const [modalVisible, setModalVisible] = React.useState(false);
    const [Routeid, setRouteId] = React.useState('')
    React.useEffect(() => {
        props.getRouteList(props.token)
    }, [])
    React.useEffect(() => {
        if (props.deletedata.status) {
            props.getRouteList(props.token)
            props.getCountRoute(props.token)
            props.setRouteData(props.token)
        }
    }, [props])
    const DeleteRoute = (id) => {
        Toast.show(" Route remove successful")
        props.deleteRoute({ id: id, token: props.token })
    }
    const EditDriver = (item) => {
        console.log(item)
        props.navigation.navigate("AddRoute", { item: item })
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
            <ActionDialogBox
                modalVisibleData={modalVisible}
                theme={props.theme}
                title={"Route Remove"}
                text={"Are you sure you want to remove route ?"}
                onOkPress={(val) => val && DeleteRoute(Routeid)}
                onGet={(val) => setModalVisible(val)}
            />
            <AdminHeaderWithBackButton name={"Route List"} navigation={props.navigation} />
            {(props.routelist.length === 0  && !props.loading) ?
                <View style={{ flex: 1 }}>

                    <View style={{ height: 500, width: 200, alignSelf: 'center' }}>
                        <LottieView source={require('../../assets/json/notfound.json')} autoPlay loop />
                    </View>
                </View>
                :
                <FlatList data={props.routelist} renderItem={(item) => (
                    <View style={styles.listBox(props)}>
                        <View style={{ alignItems: "center" }}>
                            <Text style={{ fontWeight: 'bold', color: props.theme ? color.drakFontcolor : color.fontcolor }}>
                                {item.item.from.name}
                            </Text>
                        </View>
                        <View style={{ alignItems: "center", paddingVertical: 20 }}>
                            <Image source={icons.upToDown} style={{ width: 30, height: 30, tintColor: props.theme ? color.drakAdminprimaryColors : color.adminprimaryColors }} />
                        </View>
                        <View style={{ alignItems: "center" }}>
                            <Text style={{ fontWeight: 'bold', color: props.theme ? color.drakFontcolor : color.fontcolor }}>
                                {item.item.destination.name}
                            </Text>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <View style={{ width: "5%", justifyContent: 'center' }}>
                                <Image source={icons.journey} style={{ width: 10, height: 40 * item.item.routeStop.length, tintColor: props.theme ? color.drakAdminprimaryColors : color.adminprimaryColors }} />
                            </View>
                            <View style={{ width: "95%", justifyContent: 'center' }}>
                                <FlatList data={item.item.routeStop} renderItem={(item) => (
                                    <View style={{ margin: 10, flexDirection: 'row' }}>
                                        <View style={{ width: '5%', justifyContent: 'center' }}>
                                            <Image source={icons.forword} style={{ width: 20, height: 20, tintColor: props.theme ? color.drakAdminprimaryColors : color.adminprimaryColors }} />
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
                            <TouchableOpacity onPress={() => { setModalVisible(true); setRouteId(item.item._id) }}>
                                <Text style={styles.delete} >Delete</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                )
                } />}
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
        loading: state.route.loading,
        routelist: state.route.routeList,
        deletedata: state.route.data,
        theme: state.token.theme,
        token: state.token.token,
    }
)
export default connect(useSelector, useDispatch)(Routelist);
const styles = StyleSheet.create({
    container: (props) => [{
        flex: 1,
        backgroundColor: props.theme ? color.drakBackgroundColor : color.backgroundColor
    }], listBox: (props) => [{
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
        padding: 20
    }],



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
