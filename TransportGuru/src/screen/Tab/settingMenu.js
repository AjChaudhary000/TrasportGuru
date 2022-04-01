import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import color from '../../contents/color'
import icons from '../../contents/icons'
const SettingMenu = (props) => {
    return (
        <TouchableOpacity style={styles.option} onPress={props.onPress} activeOpacity={0.60}>
            <View style={styles.menuIcon}>
                <Image source={props.icon} style={styles.menuiconStyle} />
            </View>
            <View style={styles.menuname}>
                <Text style={styles.menuText}>{props.menuName}</Text>
            </View>
            <View style={styles.menuclick}>
                <Image source={icons.next} style={styles.menuiconStyle} />
            </View>
        </TouchableOpacity>
    )
}

export default SettingMenu;
const styles = StyleSheet.create({
    option: {
        height: 50,
        marginHorizontal: 20,

        borderRadius: 10,
        flexDirection: 'row',
        justifyContent: 'center',
        marginVertical: 2
    },
    menuIcon: {
        width: '15%',
        justifyContent: 'center',
        alignItems: "center"
    },
    menuname: {
        width: '70%',
        justifyContent: 'center'
    },
    menuclick: {
        width: '15%',
        justifyContent: 'center',
        alignItems: "center"
    },
    menuText: {
        color: color.primaryColors,
        fontWeight: 'bold',
        fontSize: 18
    },
    menuiconStyle: {
        width: 25,
        height: 25,
        tintColor: color.primaryColors
    }
})