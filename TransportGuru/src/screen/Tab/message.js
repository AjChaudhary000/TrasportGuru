import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet, RefreshControl, ScrollView } from 'react-native';
import React from 'react';
import Header from '../../components/header'
import { getMessageList } from '../../Redux/messageListSlice';
import { connect } from 'react-redux'
import LottieView from 'lottie-react-native';
import color from '../../contents/color';
import AnimatedLoader from "react-native-animated-loader";
import { getBadgeMessage } from '../../Redux/badgeSlice';

const wait = (timeout) => {
  return new Promise(resolve => setTimeout(resolve, timeout));
}

const Message = (props) => {
  const [refreshing, setRefreshing] = React.useState(false);
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    props.getMessageList({ token: props.token })
    wait(2000).then(() => setRefreshing(false));
  }, []);
  React.useEffect(() => {
    props.getMessageList({ token: props.token })
  }, [])
  const Badge = (id) => {
    props.getBadgeMessage({ convessationId: id, token: props.token })
    return props.messageBadge;

  }
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
        <Text>Loading ...</Text>
      </AnimatedLoader>
      <Header name={"Messages"} />
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
          (props.messageList).map(item => (
            <TouchableOpacity style={{ flexDirection: 'row', marginVertical: 10, marginHorizontal: 20, }}
              onPress={() => { props.navigation.navigate('ChatDetails', { item: item.senderId }) }}>
              <View style={styles.image(props)}>
                <Image source={{ uri: item.senderId?.trasportAccount[0]?.trasportImage }}
                  style={{
                    width: 60, height: 60, alignSelf: "center"
                  }} />
              </View>
              <View style={{
                justifyContent: 'center', borderBottomWidth: 2,
                borderBottomColor: color.primaryColors, width: '80%', justifyContent: 'center'
              }}>
                <Text style={styles.text}>
                  {item.senderId?.trasportAccount[0]?.trasportName}</Text>
              </View>
              <View style={{
                width: 25,
                height: 25,
                borderRadius: 13,
                backgroundColor: color.primaryColors,
                justifyContent: 'center',
                alignItems: "center",
                marginHorizontal: 20,
              }} >
                <Text style={{ color: props.theme ? color.drakFontcolor : color.fontcolor }}>
                  {"2"}</Text>
              </View>
            </TouchableOpacity>
          ))}
      </ScrollView>
    </View>
  );
};
const useDispatch = (dispatch) => {
  return {
    getMessageList: (data) => dispatch(getMessageList(data)),
    getBadgeMessage: (data) => dispatch(getBadgeMessage(data))
  };
}
const useSelector = (state) => (

  {
    messageBadge: state.badge.messageBadge,
    loading: state.message.loading,
    messageList: state.message.messageList,
    theme: state.token.theme,
    token: state.token.token,
    internet: state.token.internet,
  }
)
export default connect(useSelector, useDispatch)(Message);
const styles = StyleSheet.create({
  container: (props) => [{
    flex: 1,
    backgroundColor: props.theme ? color.drakBackgroundColor : color.backgroundColor,
  }],
  image: (props) => [{
    width: '20%',
    overflow: 'hidden',
    alignSelf: 'center',
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: props.theme ? color.drakPrimaryColors : color.primaryColors,
  }],
  text: {
    fontSize: 16,
    fontWeight: 'bold',
    letterSpacing: 1,
    marginLeft: 10,
    color: 'gray'
  }
})

