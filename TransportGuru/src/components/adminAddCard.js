import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import color from '../contents/color'
const AdminAddCard = (props) => {
    return (
        <TouchableOpacity style={styles.card} onPress={props.onPress}>
            <View style={styles.menuIcon}>
                <Image source={props.icons} style={styles.menuiconStyle} />
            </View>
            <View style={styles.menuname}>
                <Text style={styles.menuText}>{props.name}</Text>
            </View>
            <View style={styles.menuIcon}>
                <Text style={styles.menuText}>{props.count}</Text>
            </View>
        </TouchableOpacity>

    )
}

export default AdminAddCard
const styles = StyleSheet.create({
    card: {
        height: 100,
        backgroundColor: color.adminprimaryColors,
        flexDirection: 'row',
        marginHorizontal: 35,
        borderRadius: 20,
        justifyContent: 'center',
        flexDirection: 'row',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        marginVertical: 10
    },
    menuIcon: {
        width: '20%',
        justifyContent: 'center',
        alignItems: "center"
    },
    menuname: {
        width: '60%',
        justifyContent: 'center'
    },
    menuclick: {
        width: '15%',
        justifyContent: 'center',
        alignItems: "center"
    },
    menuText: {
        color: "white",
        fontWeight: 'bold',
        fontSize: 20, paddingLeft: 20
    },
    menuiconStyle: {
        width: 50,
        height: 50,
        tintColor: 'white'
    }
})