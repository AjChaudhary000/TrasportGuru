import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, ScrollViewBase, ScrollView } from 'react-native'
import React from 'react'
import { connect } from 'react-redux';
import { getSearchTransportList } from '../../Redux/searchTransportListSlice';
import { getJWTToken } from '../../Redux/helper';
import color from '../../contents/color';
import icons from '../../contents/icons';
import Header from '../../components/header';
import { getTransportCompanyList } from '../../Redux/transportCompanyListSlice';


const TrasportList = (props) => {
    const [token, setToken] = React.useState('');
    const [route, setRoute] = React.useState({ type: false, id: '' })
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
        props.getTransportCompanyList(token)
    }, [token])

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: props.theme ? color.drakBackgroundColor : color.backgroundColor
        }, listBox: {
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
        },

        drivelist: {

            height: 150,
            backgroundColor: props.theme ? color.drakBackgroundColor : color.backgroundColor,
            marginHorizontal: 2,
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
        }, image: {
            overflow: 'hidden',
            alignSelf: 'center',
            width: 60,
            height: 60,
            borderRadius: 30,
            borderWidth: 3,
            borderColor: props.theme ? color.drakPrimaryColors : color.primaryColors,
            justifyContent: 'center'
        },
        listData: {
            width: '72%',
            padding: 20
        },

        profile: {
            width: "45%",
            height: 45,
            backgroundColor: props.theme ? color.drakPrimaryColors : color.primaryColors,
            borderRadius: 10,
            justifyContent: "center",
            alignItems: 'center', marginHorizontal: 10
        }, icon: {
            width: 30,
            height: 30,
            tintColor: props.theme ? color.drakPrimaryColors : color.primaryColors
        },

    })

    return (
        <View style={styles.container}>
            <Header name={"Transport List"} />
            <ScrollView style={{ marginBottom: 60 }} showsVerticalScrollIndicator={false}>
                <FlatList data={props.data} renderItem={(item) => (
                    <View style={styles.listBox}>
                        <View style={{
                            marginHorizontal: 20, flexDirection: "row", justifyContent: 'space-between',
                            paddingVertical: 2
                        }}>
                            <View style={{ width: '20%', justifyContent: 'center' }}>
                                <View style={styles.image}>
                                    <Image
                                        style={{
                                            width: 60, height: 60, alignSelf: "center"
                                        }}
                                        source={{ uri: item.item.trasportAccount[0].trasportImage }}
                                    />
                                </View>
                            </View>
                            <View style={{ justifyContent: 'center', width: '80%', paddingHorizontal: 10 }}>
                                <Text style={{ fontSize: 20, fontWeight: 'bold', color: props.theme ? color.drakPrimaryColors : color.primaryColors }}>
                                    {item.item.trasportAccount[0].trasportName}</Text>
                                <Text style={{ fontSize: 12, fontWeight: 'bold', color: 'gray' }}>

                                    {item.item.trasportAccount[0].trasportAddress.split(',').reverse()[2]},
                                    {item.item.trasportAccount[0].trasportAddress.split(',').reverse()[1]},
                                    {item.item.trasportAccount[0].trasportAddress.split(',').reverse()[0]}
                                </Text>
                            </View>

                        </View>
                        <View style={{ flexDirection: "row", justifyContent: 'space-between', padding: 5 }}>
                            <View style={{ width: "50%", flexDirection: "row", justifyContent: 'space-between', paddingVertical: 10 }}>
                                <TouchableOpacity style={{ width: "30%" }}>
                                    <Image source={icons.call} style={styles.icon} />
                                </TouchableOpacity>
                                <TouchableOpacity style={{ width: "30%" }}>
                                    <Image source={icons.message} style={styles.icon} />
                                </TouchableOpacity>
                                <TouchableOpacity style={{ width: "30%" }}>
                                    <Image source={icons.share} style={styles.icon} />
                                </TouchableOpacity>
                            </View>
                            <TouchableOpacity style={styles.profile} onPress={() => props.navigation.navigate("AdminProfile", { item: item.item })}>
                                <Text style={{ color: 'white', fontWeight: "bold" }}> View Profile</Text>
                            </TouchableOpacity>
                        </View>

                    </View>
                )
                } />
            </ScrollView>

        </View >
    )
}
const useDispatch = (dispatch) => {
    return {
        getTransportCompanyList: (data) => dispatch(getTransportCompanyList(data))
    };
}
const useSelector = (state) => (

    {
        theme: state.token.theme,
        data: state.transportCompanyList.data
    }
)
export default connect(useSelector, useDispatch)(TrasportList);