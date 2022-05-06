import {
    View,
    StyleSheet,
    Image,
    ScrollView,
    TouchableOpacity,
} from 'react-native';
import React from 'react';
import { connect } from 'react-redux';
import color from '../../contents/color';
import icons from '../../contents/icons';
import AdminHeader from '../../components/adminHeader';
import { Paragraph, Caption, Text, Title } from 'react-native-paper';
import { getUserDetails } from '../../Redux/UserDetails';
import AnimatedLoader from 'react-native-animated-loader';
const AdminSetting = props => {
    React.useEffect(() => {
        props.getUserDetails(props.token);
    }, []);

    return (
        <View style={styles.container(props)}>
            <AnimatedLoader
                visible={props.loading}
                overlayColor="rgba(255,255,255,0.75)"
                source={require('../../assets/json/loder.json')}
                animationStyle={{
                    width: 100,
                    height: 100,
                }}
                speed={1}>
                <Text>Loading...</Text>
            </AnimatedLoader>
            <AdminHeader name={'Setting'} />
            <ScrollView
                style={{ marginBottom: 80 }}
                showsVerticalScrollIndicator={false}>
                <View style={styles.backimage(props)}>
                    <Image
                        source={{
                            uri: 'https://www.freepnglogos.com/uploads/truck-png/truck-png-transparent-truck-images-pluspng-20.png',
                        }}
                        style={{ height: '100%', width: '100%' }}
                    />
                </View>
                <View style={styles.image(props)}>
                    <Image
                        style={{ width: 110, height: 110, alignSelf: 'center' }}
                        source={{ uri: props.adminData?.trasportAccount[0].trasportImage }}
                    />
                </View>
                <View style={{ marginTop: 10, alignItems: 'center' }}>
                    <Title
                        style={{
                            textAlign: 'center',
                            color: props.theme ? color.drakFontcolor : color.fontcolor,
                        }}>
                        {props.adminData?.trasportAccount[0].trasportName}
                    </Title>
                    <Caption style={{ fontWeight: 'bold', color: 'gray' }}>
                        {props.adminData?.email}
                    </Caption>
                </View>

                <TouchableOpacity
                    style={styles.option}
                    onPress={() => {
                        props.navigation.navigate('AdminEditAccount', {
                            item: props.adminData,
                        });
                    }}
                    activeOpacity={0.6}>
                    <View style={styles.menuIcon}>
                        <Image source={icons.edit} style={styles.menuiconStyle} />
                    </View>
                    <View style={styles.menuname}>
                        <Text style={styles.menuText}>Edit Account</Text>
                    </View>
                </TouchableOpacity>

                <View style={styles.body}>
                    <Text
                        style={{
                            fontSize: 20,
                            fontWeight: 'bold',
                            paddingVertical: 10,
                            color: props.theme ? color.drakFontcolor : color.fontcolor,
                        }}>
                        Mobile no
                    </Text>
                    <Text style={{ fontSize: 14, fontWeight: 'bold', color: 'gray' }}>
                        {props.adminData?.trasportAccount[0]?.trasportmobile || '+91'}
                    </Text>
                </View>
                <View style={styles.body}>
                    <Text
                        style={{
                            fontSize: 20,
                            fontWeight: 'bold',
                            paddingVertical: 10,
                            color: props.theme ? color.drakFontcolor : color.fontcolor,
                        }}>
                        About the company
                    </Text>
                    <Text style={{ fontSize: 14, fontWeight: 'bold', color: 'gray' }}>
                        {props.adminData?.trasportAccount[0].trasportAddress}
                    </Text>
                </View>
            </ScrollView>
        </View>
    );
};

const useDispatch = dispatch => {
    return {
        getUserDetails: data => dispatch(getUserDetails(data)),
    };
};
const useSelector = state => ({
    adminData: state.user.userData,
    loading: state.user.loading,
    theme: state.token.theme,
    token: state.token.token,
});
export default connect(useSelector, useDispatch)(AdminSetting);
const styles = StyleSheet.create({
    container: props => [
        {
            flex: 1,
            backgroundColor: props.theme
                ? color.drakBackgroundColor
                : color.backgroundColor,
        },
    ],
    backimage: props => [
        {
            width: '100%',
            height: 250,
            borderBottomWidth: 5,
            borderBottomColor: color.drakAdminprimaryColors,
        },
    ],
    image: props => [
        {
            marginTop: -55,
            overflow: 'hidden',
            alignSelf: 'center',
            width: 120,
            height: 120,
            borderRadius: 60,
            borderWidth: 5,
            backgroundColor: props.theme
                ? color.drakBackgroundColor
                : color.backgroundColor,
            borderColor: color.drakAdminprimaryColors,
        },
    ],
    body: {
        marginHorizontal: 20,
    },
    option: {
        width: '50%',
        flexDirection: 'row',
        alignSelf: 'center',
        marginVertical: 20,
    },
    menuIcon: {
        width: '20%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    menuname: {
        width: '80%',
        justifyContent: 'center',
    },

    menuText: {
        color: color.adminprimaryColors,
        fontWeight: 'bold',
        fontSize: 18,
    },
    menuiconStyle: {
        width: 25,
        height: 25,
        tintColor: color.adminprimaryColors,
    },
});
