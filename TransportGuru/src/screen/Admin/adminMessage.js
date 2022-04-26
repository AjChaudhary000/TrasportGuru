import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet, RefreshControl, ScrollView } from 'react-native';
import React from 'react';
import AdminHeader from '../../components/adminHeader'
import AnimatedLoader from "react-native-animated-loader";
import { connect } from 'react-redux'
import color from '../../contents/color';
import LottieView from 'lottie-react-native';
import { getUserMessageList } from '../../Redux/messageListSlice';
const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
}
const AdminMessage = (props) => {
    const [refreshing, setRefreshing] = React.useState(false);
    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        props.getUserMessageList({ token: props.token })
        wait(2000).then(() => setRefreshing(false));
    }, []);
    React.useEffect(() => {
        props.getUserMessageList({ token: props.token })
    }, [])

    return (
        <View style={styles.container(props)}>
            <AnimatedLoader
                visible={props.loading}
                overlayColor="rgba(255,255,255,0.75)"
                source={require("../../assets/json/loder.json")}
                animationStyle={{
                    width: 100,
                    height: 100
                }}
                speed={1}
            >
                <Text>Loading...</Text>
            </AnimatedLoader>
            <AdminHeader name={"Messages"} />
            <ScrollView refreshControl={
                <RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                />
            }>
                {props.messageList.length === 0 ?
                    <View style={{ flex: 1 }}>

                        <View style={{ height: 500, width: 200, alignSelf: 'center' }}>
                            <LottieView source={require('../../assets/json/notfound.json')} autoPlay loop />
                        </View>

                    </View>

                    :
                    <FlatList data={props.messageList} renderItem={(item) => (

                        <TouchableOpacity style={{ flexDirection: 'row', marginVertical: 10, marginHorizontal: 20 }}
                            onPress={() => { props.navigation.navigate('ChatDetails', { item: item.item.userId }) }}>
                            <View style={styles.image(props)}>
                                <Image source={{ uri: item.item.userId?.image }}
                                    style={{
                                        width: 60, height: 60, alignSelf: "center"

                                    }} />
                            </View>
                            <View style={{
                                justifyContent: 'center', borderBottomWidth: 2,
                                borderBottomColor: color.adminprimaryColors, width: '80%', justifyContent: 'center'
                            }}>

                                <Text style={styles.text}>
                                    {item.item.userId?.username}</Text>
                            </View>

                        </TouchableOpacity>
                    )}
                    />}
            </ScrollView>
        </View>
    );
};
const useDispatch = (dispatch) => {
    return {
        getUserMessageList: (data) => dispatch(getUserMessageList(data)),
    };
}
const useSelector = (state) => (

    {
        loading: state.message.loading,
        messageList: state.message.usermessageList,
        userData: state.user.userData,
        theme: state.token.theme,
        token: state.token.token,
    }
)
export default connect(useSelector, useDispatch)(AdminMessage);
const styles = StyleSheet.create({
    container: (props) => [{
        flex: 1,
        backgroundColor: props.theme ? color.drakBackgroundColor : color.backgroundColor,
        marginBottom: 30
    }],
    image: (props) => [{
        width: '20%',
        overflow: 'hidden',
        alignSelf: 'center',
        width: 60,
        height: 60,
        borderRadius: 30,
        borderWidth: 1,
        borderColor: props.theme ? color.drakAdminprimaryColors : color.adminprimaryColors,
    }],
    text: {
        fontSize: 16,
        fontWeight: 'bold',
        letterSpacing: 1,
        marginLeft: 10,
        color: 'gray'
    }
})

