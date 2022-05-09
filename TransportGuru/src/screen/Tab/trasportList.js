import {
    View,
    Text,
    StyleSheet,
    FlatList,
    Image,
    TouchableOpacity,
    Linking,
} from 'react-native';
import React from 'react';
import { connect } from 'react-redux';
import color from '../../contents/color';
import icons from '../../contents/icons';
import Header from '../../components/header';
import { getTransportCompanyList } from '../../Redux/transportCompanyListSlice';
import { getUserDetails } from '../../Redux/UserDetails';
import Toast from 'react-native-simple-toast';
import AnimatedLoader from 'react-native-animated-loader';
import LottieView from 'lottie-react-native';

const wait = timeout => {
    return new Promise(resolve => setTimeout(resolve, timeout));
};

const TrasportList = props => {
    const [refreshing, setRefreshing] = React.useState(false);
    const onRefresh = React.useCallback(() => {
        setRefreshing(true);

        props.getTransportCompanyList(props.token);
        props.getUserDetails(props.token);
        wait(2000).then(() => setRefreshing(false));
    }, []);
    React.useEffect(() => {
        props.getTransportCompanyList(props.token);
    }, []);
    const CallBtn = MobileNo => {
        console.log('callNumber ----> ', MobileNo);
        let phoneNumber = MobileNo;
        if (Platform.OS !== 'android') {
            phoneNumber = `telprompt:${MobileNo}`;
        } else {
            phoneNumber = `tel:${MobileNo}`;
        }
        Linking.canOpenURL(phoneNumber)
            .then(supported => {
                if (!supported) {
                    console.log(supported);
                } else {
                    return Linking.openURL(phoneNumber);
                }
            })
            .catch(err => console.log(err));
    };
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
                <Text>Loading ...</Text>
            </AnimatedLoader>
            <Header name={'Transport List'} />
            {props.data.length === 0 && !props.loading ? (
                <View style={{ flex: 1 }}>
                    <View style={{ height: 500, width: 200, alignSelf: 'center' }}>
                        <LottieView
                            source={require('../../assets/json/notfound.json')}
                            autoPlay
                            loop
                        />
                    </View>
                </View>
            ) : (
                <FlatList
                    data={props.data}
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                    renderItem={({ item }) => (
                      
                            <View style={styles.listBox(props)} key={item._id}>
                                <View
                                    style={{
                                        marginHorizontal: 20,
                                        flexDirection: 'row',
                                        justifyContent: 'space-between',
                                        paddingVertical: 2,
                                    }}>
                                    <View style={{ width: '20%', justifyContent: 'center' }}>
                                        <View style={styles.image(props)}>
                                            <Image
                                                style={{
                                                    width: 60,
                                                    height: 60,
                                                    alignSelf: 'center',
                                                }}
                                                source={{ uri: item.trasportAccount[0].trasportImage }}
                                            />
                                        </View>
                                    </View>
                                    <View
                                        style={{
                                            justifyContent: 'center',
                                            width: '80%',
                                            paddingHorizontal: 10,
                                        }}>
                                        <Text
                                            style={{
                                                fontSize: 20,
                                                fontWeight: 'bold',
                                                color: props.theme
                                                    ? color.drakPrimaryColors
                                                    : color.primaryColors,
                                            }}>
                                            {item.trasportAccount[0].trasportName}
                                        </Text>
                                        <Text
                                            style={{ fontSize: 12, fontWeight: 'bold', color: 'gray' }}>
                                            {
                                                item.trasportAccount[0].trasportAddress
                                                    .split(',')
                                                    .reverse()[2]
                                            }
                                            ,
                                            {
                                                item.trasportAccount[0].trasportAddress
                                                    .split(',')
                                                    .reverse()[1]
                                            }
                                            ,
                                            {
                                                item.trasportAccount[0].trasportAddress
                                                    .split(',')
                                                    .reverse()[0]
                                            }
                                        </Text>
                                    </View>
                                </View>
                                <View
                                    style={{
                                        flexDirection: 'row',
                                        justifyContent: 'space-between',
                                        padding: 5,
                                    }}>
                                    <View
                                        style={{
                                            width: '50%',
                                            flexDirection: 'row',
                                            justifyContent: 'space-between',
                                            paddingVertical: 10,
                                        }}>
                                        <TouchableOpacity
                                            style={{ width: '30%' }}
                                            onPress={() =>
                                                CallBtn(item?.trasportAccount[0].trasportmobile)
                                            }>
                                            <Image source={icons.call} style={styles.icon(props)} />
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            style={{ width: '30%' }}
                                            onPress={() => {
                                                if (item?._id === props?.userData?._id) {
                                                    Toast.show('not found ...');
                                                } else {
                                                    props.navigation.navigate('ChatDetails', { item: item });
                                                }
                                            }}>
                                            <Image source={icons.message} style={styles.icon(props)} />
                                        </TouchableOpacity>
                                        <TouchableOpacity style={{ width: '30%' }}>
                                            <Image source={icons.share} style={styles.icon(props)} />
                                        </TouchableOpacity>
                                    </View>
                                    <TouchableOpacity
                                        style={styles.profile(props)}
                                        onLongPress={() => console.log('hello')}
                                        onPress={() =>
                                            props.navigation.navigate('AdminProfile', { item: item })
                                        }>
                                        <Text style={{ color: 'white', fontWeight: 'bold' }}>
                                            {' '}
                                            View Profile
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                       
                    )}
                />
            )}
        </View>
    );
};
const useDispatch = dispatch => {
    return {
        getTransportCompanyList: data => dispatch(getTransportCompanyList(data)),
        getUserDetails: data => dispatch(getUserDetails(data)),
    };
};
const useSelector = state => ({
    loading: state.transportCompanyList.loading,
    userData: state.user.userData,
    theme: state.token.theme,
    data: state.transportCompanyList.data,
    token: state.token.token,
});
export default connect(useSelector, useDispatch)(TrasportList);
const styles = StyleSheet.create({
    container: props => [
        {
            flex: 1,
            backgroundColor: props.theme
                ? color.drakBackgroundColor
                : color.backgroundColor,
        },
    ],
    listBox: props => [
        {
            minHeight: 150,
            backgroundColor: props.theme
                ? color.drakBackgroundColor
                : color.backgroundColor,
            marginHorizontal: 20,
            borderRadius: 20,

            shadowColor: props.theme ? color.drakFontcolor : color.fontcolor,
            shadowOffset: {
                width: 0,
                height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 4,
            elevation: 5,
            marginVertical: 10,
            padding: 10,
        },
    ],
    image: props => [
        {
            overflow: 'hidden',
            alignSelf: 'center',
            width: 60,
            height: 60,
            borderRadius: 30,
            borderWidth: 3,
            borderColor: props.theme ? color.drakPrimaryColors : color.primaryColors,
            justifyContent: 'center',
        },
    ],
    profile: props => [
        {
            width: '45%',
            height: 45,
            backgroundColor: props.theme
                ? color.drakPrimaryColors
                : color.primaryColors,
            borderRadius: 10,
            justifyContent: 'center',
            alignItems: 'center',
            marginHorizontal: 10,
        },
    ],
    icon: props => [
        {
            width: 30,
            height: 30,
            tintColor: props.theme ? color.drakPrimaryColors : color.primaryColors,
        },
    ],
});
