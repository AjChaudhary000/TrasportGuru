import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList } from 'react-native'
import React from 'react'
import { AdminHeaderWithBackButton } from '../../components/adminHeader'
import color from '../../contents/color'
import image from '../../contents/image'
import { connect } from 'react-redux'
import { getJWTToken } from '../../Redux/helper'
import { getTruckList } from '../../Redux/Admin/truckListSlice'
import { deleteTruck, setTruckData } from '../../Redux/Admin/addTruckSlice'
import { getCountTruck } from '../../Redux/Admin/countAddSlice'
import AnimatedLoader from "react-native-animated-loader";
import Toast from 'react-native-simple-toast';
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
    React.useEffect(() => {

        if (props.deletedata.status) {
            props.getCountTruck(token)
            props.setTruckData({})
            props.getTruckList(token)
        }
    }, [token, props])
    const DeleteTruck = (id) => {
        Toast.show(" Truck remove successful")
        props.deleteTruck({ id: id, token: token })
    }
    const EditTruck = (item) => {

        props.navigation.navigate("AddTruck", { item: item })
    }
    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: props.theme?color.drakBackgroundColor:color.backgroundColor
        }, listBox: {
    
            height: 150,
            backgroundColor: props.theme?color.drakBackgroundColor:color.backgroundColor,
            marginHorizontal: 15,
            borderRadius: 20,
            justifyContent: 'center',
            flexDirection: 'row',
            shadowColor: props.theme?color.drakFontcolor:color.fontcolor,
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
            borderColor: props.theme ? color.drakAdminprimaryColors:color.adminprimaryColors,
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
            color: props.theme?color.drakFontcolor:color.fontcolor
        }, truckmodelname: {
            fontSize: 16,
            fontWeight: 'bold',
            color: props.theme ? color.drakAdminprimaryColors:color.adminprimaryColors,
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
            color: props.theme?color.drakFontcolor:color.fontcolor
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
    return (
        <View style={styles.container}>
            <AnimatedLoader
        visible={props.loading}
       // overlayColor="rgba(255,255,255,0.75)"
        source={require("../../assets/json/loder.json")}
        animationStyle={{
          width: 100,
          height: 100
        }}
        speed={1}
      >
        <Text>Loading...</Text>
      </AnimatedLoader>
            <AdminHeaderWithBackButton name={"Truck List"} navigation={props.navigation} />
            <FlatList data={props.truckList} renderItem={(item) => (
                <View style={styles.listBox}>
                    <View style={styles.image}>
                        <Image source={{uri:item.item.truckImage}} style={{ width: '100%', height: '100%', overflow: "hidden" }} />
                    </View>
                    <View style={styles.listData}>
                        <Text style={styles.truckname}>{item.item.truckName}</Text>
                        <Text style={styles.truckmodelname}>{item.item.truckModelName}</Text>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 5 }}>
                            <Text style={styles.truckreg}>{item.item.truckRegistartionNo}</Text>
                            <Text style={styles.truckcapicity}>{item.item.truckCapicity} /-Tonnes</Text>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingTop: 10, paddingHorizontal: 20 }}>
                            <TouchableOpacity onPress={() => { EditTruck(item.item) }}>
                                <Text style={styles.edit}>Edit</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => { DeleteTruck(item.item._id) }}>
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
        getCountTruck: (data) => dispatch(getCountTruck(data)),
        deleteTruck: (data) => dispatch(deleteTruck(data)),
        setTruckData: (data) => dispatch(setTruckData(data)),
    };
}
const useSelector = (state) => (

    {
        truckList: state.truckList.truckList,
        loading: state.truckList.loading,
        deletedata: state.addTruck.data,
        theme:state.token.theme
    }
)
export default connect(useSelector, useDispatch)(TruckList);
