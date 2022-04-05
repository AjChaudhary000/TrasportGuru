import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList } from 'react-native'
import React from 'react'
import { AdminHeaderWithBackButton } from '../../components/adminHeader'
import color from '../../contents/color'
import image from '../../contents/image'
import { connect } from 'react-redux'
import { getJWTToken } from '../../Redux/helper'
import { getTruckList } from '../../Redux/Admin/truckListSlice'
const TruckList = (props) => {
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
        props.getTruckList(token)
    }, [token])

    return (
        <View style={styles.container}>
            <AdminHeaderWithBackButton name={"Truck List"} navigation={props.navigation} />
            <FlatList data={props.truckList} renderItem={(item) => (
                <View style={styles.listBox}>
                    <View style={styles.image}>
                        <Image source={image.Truck} style={{ width: '100%', height: '100%', overflow: "hidden" }} />
                    </View>
                    <View style={styles.listData}>
                        <Text style={styles.truckname}>{item.item.truckName}</Text>
                        <Text style={styles.truckmodelname}>{item.item.truckModelName}</Text>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 5 }}>
                            <Text style={styles.truckreg}>{item.item.truckRegistartionNo}</Text>
                            <Text style={styles.truckcapicity}>{item.item.truckCapicity} /-Tonnes</Text>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingTop: 10, paddingHorizontal: 20 }}>
                            <TouchableOpacity>
                                <Text style={styles.edit}>Edit</Text>
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <Text style={styles.delete}>Delete</Text>
                            </TouchableOpacity>


                        </View>
                    </View>
                </View>
            )} />

        </View>
    )
}
const useDispatch = (dispatch) => {
    return {
        getTruckList: (data) => dispatch(getTruckList(data)),

    };
}
const useSelector = (state) => (

    {
        truckList: state.truckList.truckList,

    }
)
export default connect(useSelector, useDispatch)(TruckList);
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
    }, truckname: {
        fontSize: 25,
        fontWeight: 'bold',
        color: color.fontcolor
    }, truckmodelname: {
        fontSize: 16,
        fontWeight: 'bold',
        color: color.adminprimaryColors,
        paddingVertical: 3
    },
    truckreg: {
        fontSize: 14,
        fontWeight: 'bold',
        color: 'gray'
    },
    truckcapicity: {
        fontSize: 14,
        fontWeight: 'bold',
        color: 'black'
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