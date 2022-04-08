import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList } from 'react-native'
import React from 'react'
import { AdminHeaderWithBackButton } from '../../components/adminHeader'
import color from '../../contents/color'
import image from '../../contents/image'
import { connect } from 'react-redux'
import { getJWTToken } from '../../Redux/helper'
import { getDriverList } from '../../Redux/Admin/driverListSlice'
import { deleteDriver } from '../../Redux/Admin/addDriverSlice'
import { getCountDriver } from '../../Redux/Admin/countAddSlice'
const DriverList = (props) => {
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
        props.getDriverList(token)
    }, [token])
    React.useEffect(() => {
        props.getCountDriver(token)
        props.deletedata.status && props.getDriverList(token)
    }, [token, props])
    const DeleteDriver = (id) => {
        console.log(id)
        props.deleteDriver({ id: id, token: token })
    }
    const EditDriver = (item) => {
       
        props.navigation.navigate("AddDriver", { item: item })
    }
    return (
        <View style={styles.container}>
            <AdminHeaderWithBackButton name={"Driver List"} navigation={props.navigation} />
            <FlatList data={props.driverList} renderItem={(item) => (
                <View style={styles.listBox}>
                    <View style={styles.image}>
                        <Image source={image.user} style={{ width: '100%', height: '100%', overflow: "hidden" }} />
                    </View>
                    <View style={styles.listData}>
                        <Text style={styles.driverName}>{item.item.driverName}</Text>
                        <Text style={styles.driverEmail}>{item.item.driverEmail}</Text>

                        <Text style={styles.driverMobileNo}>{item.item.driverMobileNo}</Text>

                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingTop: 10, paddingHorizontal: 20 }}>
                            <TouchableOpacity onPress={() => { EditDriver(item.item) }}>
                                <Text style={styles.edit}>Edit</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => { DeleteDriver(item.item._id) }}>
                                <Text style={styles.delete} >Delete</Text>
                            </TouchableOpacity>


                        </View>
                    </View>
                </View>
            )
            } />

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
        driverList: state.driverList.driverList,
        deletedata: state.addDriver.deletedata

    }
)
export default connect(useSelector, useDispatch)(DriverList);
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: color.backgroundColor
    }, listBox: {

        height: 150,
        backgroundColor: color.backgroundColor,
        marginHorizontal: 15,
        borderRadius: 20,
        justifyContent: 'center',
        flexDirection: 'row',
        shadowColor: color.fontcolor,
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        marginVertical: 10,
    },
    image: {
        width: '30%',
        borderWidth: 3,
        borderColor: color.adminprimaryColors,
        borderRadius: 15,
        marginVertical: 10,
        marginLeft: 20,
        alignItems: 'center',
        overflow: 'hidden'
    },
    listData: {
        width: '70%',
        padding: 20
    }, driverName: {
        fontSize: 20,
        fontWeight: 'bold',
        color: color.fontcolor
    }, driverMobileNo: {
        fontSize: 16,
        fontWeight: 'bold',
        color: color.adminprimaryColors,
        paddingVertical: 3
    },
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