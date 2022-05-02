import { View, StyleSheet, Image, ScrollView, TouchableOpacity, Linking } from 'react-native'
import React from 'react'
import { connect } from 'react-redux'
import color from '../../contents/color'
import icons from '../../contents/icons'
import { HeaderWithBackButton } from '../../components/header'
import { Caption, Text, Title } from 'react-native-paper'
import { getUserDetails } from '../../Redux/UserDetails'

import Toast from 'react-native-simple-toast';
const AdminProfile = (props) => {
    React.useEffect(() => {
        props.getUserDetails(props.token);
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
            <HeaderWithBackButton name={"Admin Profile"} navigation={props.navigation} />
            <ScrollView style={{ marginBottom: 0 }} showsVerticalScrollIndicator={false}>
                <View style={styles.backimage(props)}>
                    <Image source={{ uri: "https://www.freepnglogos.com/uploads/truck-png/truck-png-transparent-truck-images-pluspng-20.png" }} style={{ height: "100%", width: "100%" }} />
                </View>
                <View style={styles.image(props)}>
                    <Image style={{ width: 110, height: 110, alignSelf: "center" }}
                        source={{ uri: props.route.params.item.trasportAccount[0].trasportImage }} />
                </View>
                <View style={{ marginTop: 10, alignItems: 'center' }}>
                    <Title style={{ textAlign: 'center', color: props.theme ? color.drakFontcolor : color.fontcolor }}>{props.route.params.item.trasportAccount[0].trasportName}</Title>
                    <Caption style={{ fontWeight: 'bold', color: 'gray' }}>{props.route.params.item?.email}</Caption>
                </View>

                <View style={{ width: "99%", flexDirection: "row", justifyContent: 'space-between', paddingVertical: 10, marginHorizontal: 50 }}>
                    <TouchableOpacity style={{ width: "33%" }} onPress={() => CallBtn(props.route.params.item.trasportAccount[0].trasportmobile)}>
                        <Image source={icons.call} style={styles.icon(props)} />
                    </TouchableOpacity>
                    <TouchableOpacity style={{ width: "33%" }}
                        onPress={() => {
                            if (props.route.params.item?._id === props.userData._id) {
                                Toast.show("not found ...")
                            } else {
                                props.navigation.navigate("ChatDetails", { item: props.route.params.item })
                            }
                        }}>
                        <Image source={icons.message} style={styles.icon(props)} />
                    </TouchableOpacity>
                    <TouchableOpacity style={{ width: "33%" }}>
                        <Image source={icons.share} style={styles.icon(props)} />
                    </TouchableOpacity>
                </View>

                <View style={styles.body}>
                    <Text style={{ fontSize: 20, fontWeight: 'bold', paddingVertical: 10, color: props.theme ? color.drakFontcolor : color.fontcolor }}>Mobile no</Text>
                    <Text style={{ fontSize: 14, fontWeight: 'bold', color: 'gray' }}>{props.route.params.item?.trasportAccount[0]?.trasportmobile || "+91"}</Text>
                </View>
                <View style={styles.body}>
                    <Text style={{ fontSize: 20, fontWeight: 'bold', paddingVertical: 10, color: props.theme ? color.drakFontcolor : color.fontcolor }}>About the company</Text>
                    <Text style={{ fontSize: 14, fontWeight: 'bold', color: 'gray' }}>{props.route.params.item.trasportAccount[0].trasportAddress}</Text>
                </View>
            </ScrollView>
        </View>
    )
}


const useDispatch = (dispatch) => {
    return {
        getUserDetails: (data) => dispatch(getUserDetails(data)),
    };
}
const useSelector = (state) => (

    {
        userData: state.user.userData,
        loading: state.user.loading,
        theme: state.token.theme,
        token: state.token.token,

    }
)
export default connect(useSelector, useDispatch)(AdminProfile);
const styles = StyleSheet.create({
    container: (props) => [{
        flex: 1,
        backgroundColor: props.theme ? color.drakBackgroundColor : color.backgroundColor
    }], backimage: (props) => [{
        width: "100%",
        height: 250,
        borderBottomWidth: 5, borderBottomColor: props.theme ? color.drakPrimaryColors : color.primaryColors,
    }], image: (props) => [{
        marginTop: -60,
        overflow: 'hidden',
        alignSelf: 'center',
        width: 120,
        height: 120,
        borderRadius: 60,
        borderWidth: 5,
        backgroundColor: props.theme ? color.drakBackgroundColor : color.backgroundColor,
        borderColor: props.theme ? color.drakPrimaryColors : color.primaryColors
    }], body: {
        marginHorizontal: 20
    }
    , icon: (props) => [{
        width: 30,
        height: 30,
        tintColor: props.theme ? color.drakPrimaryColors : color.primaryColors
    }],
})