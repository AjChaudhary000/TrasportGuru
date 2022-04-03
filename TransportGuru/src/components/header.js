import React from 'react';
import {
    StyleSheet,
    View,
    TouchableOpacity,
    Image,
    StatusBar,
    Text,
    Platform
} from 'react-native';
import color from '../contents/color';
import icons from '../contents/icons';

export default function Header(props) {
    return (
        <>
            <View style={styles.header}>
                <StatusBar backgroundColor={color.primaryColors}/>
                <Text style={styles.headerName}>{props.name}</Text>
            </View>
        </>
    );
}
export const HeaderWithBackButton = (props) => {
    return (
        <>
            <View style={{ flexDirection: 'row', ...styles.header }}>
            <StatusBar backgroundColor={color.primaryColors}/>
                <TouchableOpacity style={{ paddingTop: Platform.OS === 'ios' ? 35 : 0, width: '10%', alignItems: 'center',justifyContent:'center' }} onPress={() => props.navigation.goBack()}>
                    <Image
                        style={{
                            width: 35,
                            height: 35,
                            resizeMode: 'contain',
                            tintColor: 'white',

                        }}
                        source={icons.back}
                    />
                </TouchableOpacity>
                <View style={{width:"90%"}}>
                    <Text style={{...styles.headerName,justifyContent:'center',paddingTop: 18,}}>{props.name}</Text>
                </View>
            </View>
        </>
    );
}
const styles = StyleSheet.create({
    header: {
        marginBottom: 15,
        height: Platform.OS === 'ios' ? 80 : 60,
        backgroundColor: color.primaryColors,
       justifyContent:'center'
    },
    headerName: {
        fontSize: 20,
        fontWeight: 'bold',
        letterSpacing: 1,
        color: 'white',
        textAlign: Platform.OS === 'ios' ? 'center' : 'left',
        paddingTop: Platform.OS === 'ios' ? 38 : 0,
        paddingLeft: Platform.OS === 'ios' ? 0 : 25,
       
    }
})