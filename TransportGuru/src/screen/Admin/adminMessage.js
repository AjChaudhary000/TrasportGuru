import {
    View,
    Text,
    FlatList,
    Image,
    TouchableOpacity,
    StyleSheet,
} from 'react-native';
import React from 'react';
import AdminHeader from '../../components/adminHeader';
import AnimatedLoader from 'react-native-animated-loader';
import { connect } from 'react-redux';
import color from '../../contents/color';
import LottieView from 'lottie-react-native';
import { getUserMessageList } from '../../Redux/messageListSlice';
const wait = timeout => {
    return new Promise(resolve => setTimeout(resolve, timeout));
};
const AdminMessage = props => {
    const [refreshing, setRefreshing] = React.useState(false);
    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        props.getUserMessageList({ token: props.token });
        wait(2000).then(() => setRefreshing(false));
    }, []);
    React.useEffect(() => {
        props.getUserMessageList({ token: props.token });
    }, []);
    console.log(props.messageList)
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
            <AdminHeader name={'Messages'} />
            {props.messageList?.length === 0 && !props.loading ? (
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
                    data={props.messageList}
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            style={{
                                flexDirection: 'row',
                                marginVertical: 10,
                                marginHorizontal: 10
                            }}
                            onPress={() => {
                                props.navigation.navigate('ChatDetails', {
                                    item: item.userId,
                                });
                            }}>
                            <View style={styles.image(props)}>
                                <Image
                                    source={{ uri: item.userId?.image }}
                                    style={{
                                        width: 60,
                                        height: 60,
                                        alignSelf: 'center',
                                    }}
                                />
                            </View>
                            <View
                                style={{
                                    justifyContent: 'center',

                                    width: '65%',
                                    justifyContent: 'center',
                                }}>
                                <Text style={styles.text}>{item.userId?.username}</Text>
                                <Text style={styles.textmessage(props)} numberOfLines={1}>
                                    {item.lastMessage?.message}
                                </Text>
                            </View>
                            <View
                                style={{
                                    justifyContent: 'center',
                                    width: '15%',
                                    justifyContent: 'center',
                                }}>
                                <Text style={styles.textdate(item.messageCount)}>
                                    {new Date(item.lastMessage?.createdAt)
                                        .toLocaleDateString('en-US', {
                                            hour: 'numeric',
                                            minute: 'numeric',
                                            hour12: false,
                                        })
                                        .toString()
                                        .slice(-5)}
                                </Text>
                                {item.messageCount !== 0 && (
                                    <View
                                        style={{
                                            width: 20,
                                            height: 20,
                                            borderRadius: 10,
                                            backgroundColor: color.adminprimaryColors,
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            alignSelf: 'flex-end',
                                            marginTop: 5,
                                        }}>
                                        <Text
                                            style={{
                                                color: props.theme
                                                    ? color.drakFontcolor
                                                    : color.fontcolor,
                                            }}>
                                            {item.messageCount}
                                        </Text>
                                    </View>
                                )}
                            </View>
                        </TouchableOpacity>
                    )}
                />
            )}
        </View>
    );
};
const useDispatch = dispatch => {
    return {
        getUserMessageList: data => dispatch(getUserMessageList(data)),
    };
};
const useSelector = state => ({
    loading: state.message.loading,
    messageList: state.message.usermessageList,
    userData: state.user.userData,
    theme: state.token.theme,
    token: state.token.token,
});
export default connect(useSelector, useDispatch)(AdminMessage);
const styles = StyleSheet.create({
    container: props => [
        {
            flex: 1,
            backgroundColor: props.theme
                ? color.drakBackgroundColor
                : color.backgroundColor,
            marginBottom: 30,
        },
    ],
    image: props => [
        {
            width: '20%',
            overflow: 'hidden',
            alignSelf: 'center',
            width: 50,
            height: 50,
            borderRadius: 25,
           
        },
    ],
    text: {
        fontSize: 16,
        fontWeight: 'bold',
        letterSpacing: 1,
        marginLeft: 10,
        color: 'gray',
    },
    textdate: count => [
        {
            fontSize: 12,
            fontWeight: 'bold',
            letterSpacing: 1,
            alignSelf: 'flex-end',
            color: count !== 0 ? color.adminprimaryColors : 'gray',
        },
    ],
    textmessage: props => [
        {
            fontSize: 14,
            marginLeft: 10,
            color: props.theme ? color.drakFontcolor : color.fontcolor,
        },
    ],
});
