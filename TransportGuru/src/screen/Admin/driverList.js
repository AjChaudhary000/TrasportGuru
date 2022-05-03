import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList } from 'react-native'
import React from 'react'
import { AdminHeaderWithBackButton } from '../../components/adminHeader'
import color from '../../contents/color'
import { connect } from 'react-redux'
import LottieView from 'lottie-react-native';
import { getDriverList } from '../../Redux/Admin/driverListSlice'
import { deleteDriver } from '../../Redux/Admin/addDriverSlice'
import { getCountDriver } from '../../Redux/Admin/countAddSlice'
import Toast from 'react-native-simple-toast';
import AnimatedLoader from "react-native-animated-loader";
import ActionDialogBox from '../../components/ActionDialogBox'
const DriverList = (props) => {
    const [modalVisible, setModalVisible] = React.useState(false);
    const [Driverid, setDriverid] = React.useState('')
    React.useEffect(() => {

        props.getDriverList(props.token)
    }, [])
    React.useEffect(() => {
        props.getCountDriver(props.token)
        props.deletedata.status && props.getDriverList(props.token)
    }, [props])
    const DeleteDriver = (id) => {
        Toast.show(" Driver remove successful")
        props.deleteDriver({ id: id, token: props.token })
    }
    const EditDriver = (item) => {

        props.navigation.navigate("AddDriver", { item: item })
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
                title={"Driver Remove"}
                text={"Are you sure you want to remove driver ?"}
                onOkPress={(val) => val && DeleteDriver(Driverid)}
                onGet={(val) => setModalVisible(val)}
            />
            <AdminHeaderWithBackButton name={"Driver List"} navigation={props.navigation} />
            {props.driverList.length === 0 ?
                <View style={{ flex: 1 }}>

                    <View style={{ height: 500, width: 200, alignSelf: 'center' }}>
                        <LottieView source={require('../../assets/json/notfound.json')} autoPlay loop />
                    </View>

                </View>

                :
                <FlatList data={props.driverList} renderItem={(item) => (
                    <View style={styles.listBox(props)}>
                        <View style={styles.image(props)}>
                            <Image source={{ uri: item.item.driverImage }} style={{ width: '100%', height: '100%', overflow: "hidden" }} />
                        </View>
                        <View style={styles.listData}>
                            <Text style={styles.driverName(props)}>{item.item.driverName}</Text>
                            <Text style={styles.driverEmail}>{item.item.driverEmail}</Text>

                            <Text style={styles.driverMobileNo(props)}>{item.item.driverMobileNo}</Text>

                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingTop: 10, paddingHorizontal: 20 }}>
                                <TouchableOpacity onPress={() => { EditDriver(item.item) }}>
                                    <Text style={styles.edit}>Edit</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => { setModalVisible(true); setDriverid(item.item._id) }}>
                                    <Text style={styles.delete} >Delete</Text>
                                </TouchableOpacity>


                            </View>
                        </View>
                    </View>
                )
                } />}

        </View >
    )
}
const useDispatch = (dispatch) => {
    return {
        getDriverList: (data) => dispatch(getDriverList(data)),
        deleteDriver: (data) => dispatch(deleteDriver(data)),
        getCountDriver: (data) => dispatch(getCountDriver(data)),
    };
}
const useSelector = (state) => (

    {
        loading: state.driverList.loading,
        driverList: state.driverList.driverList,
        deletedata: state.addDriver.deletedata,
        theme: state.token.theme,
        token: state.token.token,

    }
)
export default connect(useSelector, useDispatch)(DriverList);
const styles = StyleSheet.create({
    container: (props) => [{
        flex: 1,
        backgroundColor: props.theme ? color.drakBackgroundColor : color.backgroundColor
    }], listBox: (props) => [{

        height: 150,
        backgroundColor: props.theme ? color.drakBackgroundColor : color.backgroundColor,
        marginHorizontal: 15,
        borderRadius: 20,
        justifyContent: 'center',
        flexDirection: 'row',
        shadowColor: props.theme ? color.drakFontcolor : color.fontcolor,
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        marginVertical: 10,
    }],
    image: (props) => [{
        width: '30%',
        borderWidth: 3,
        borderColor: props.theme ? color.drakAdminprimaryColors : color.adminprimaryColors,
        borderRadius: 15,
        marginVertical: 10,
        marginLeft: 20,
        alignItems: 'center',
        overflow: 'hidden'
    }],
    listData: {
        width: '70%',
        padding: 20
    }, driverName: (props) => [{
        fontSize: 20,
        fontWeight: 'bold',
        color: props.theme ? color.drakFontcolor : color.fontcolor
    }], driverMobileNo: (props) => [{
        fontSize: 16,
        fontWeight: 'bold',
        color: props.theme ? color.drakAdminprimaryColors : color.adminprimaryColors,
        paddingVertical: 3
    }],
    driverEmail: {
        fontSize: 14,
        fontWeight: 'bold',
        color: 'gray'
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
