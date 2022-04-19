import { View, Text, TextInput, TouchableOpacity, FlatList, Image, StyleSheet } from 'react-native'
import React, { useEffect } from 'react'
import { io } from 'socket.io-client'
import { connect } from 'react-redux'
import { getJWTToken } from '../../Redux/helper'
import { HeaderWithBackButton } from '../../components/header'
import color from '../../contents/color'
import icons from '../../contents/icons';
import AnimatedLoader from "react-native-animated-loader";
import { getmessage, sendMessage, CreateRoom, getRoom, setChatList, setRoomData } from '../../Redux/chatSlice'
const ChatDetails = (props) => {
  const socket = io('http://192.168.200.123:5000');
  const [message, setMessage] = React.useState('');
  const [convessationId, setConvessationId] = React.useState()
  const [token, setToken] = React.useState('');
  const [userChatList, setUserChatList] = React.useState([])
  const id = props.route.params.item._id
  const name = props.route.params.item?.trasportAccount[0]?.trasportName || props.route.params.item?.username;
  const fetchToken = async () => {
    try {
      const TokenData = await getJWTToken();
      const data = {
        senderId: id
      }
      props.setChatList({})
      props.getRoom({ data, token: TokenData })
      setToken(TokenData)
    } catch (e) {
      console.log()
    }
  }
  React.useEffect(() => {
    socket.emit("onJoinChat", convessationId)
  })
  React.useEffect(() => {
    try {
      fetchToken()
      setChatList([])
    } catch (e) { console.log(e) }
  }, [])
  React.useEffect(() => {
    try {
      props.getmessage({ data: { convessationId }, token })
    } catch (e) { console.log(e) }
  }, [convessationId, token])
  React.useEffect(() => {
    if (props.roomdata?.data.length !== 0) {
      setConvessationId(props.roomdata?.data[0]?._id)
    }
    if (props.chatList?.status) {
      setUserChatList([...userChatList, ...props.chatList.data]);
      props.setChatList({})
    }
  }, [props])
  React.useEffect(() => {
    socket.on("onSendMesssage", (data) => {
      setUserChatList([...userChatList, data]);
      props.setChatList({})
    })
    return () => {
      socket.off("onSendMesssage")
    }
  }, [userChatList])
  const sendMessage = () => {
    try {
      props.sendMessage({ data: { senderId: id, convessationId: convessationId, message: message }, token })
      setMessage('')
    } catch (e) {
      console.log(e)
    }
  }
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: props.theme ? color.drakBackgroundColor : color.backgroundColor,

      justifyContent: 'center'
    },
    right: {
      marginTop: 10,
      minWidth: '15%',
      maxWidth: '70%',

      alignItems: 'center',
      minHeight: 40,

      backgroundColor: props.theme ? color.drakPrimaryColors : color.primaryColors,
      justifyContent: 'center',
      padding: 10,
      borderTopLeftRadius: 10,
      borderBottomLeftRadius: 10,
      borderTopRightRadius: 10

    },
    left: {
      marginTop: 10,
      minWidth: '15%',
      maxWidth: '70%',

      alignItems: 'center',
      minHeight: 40,

      backgroundColor: props.theme ? color.drakAdminprimaryColors : color.adminprimaryColors,
      justifyContent: 'center',
      padding: 10,
      borderTopLeftRadius: 10,
      borderBottomRightRadius: 10,
      borderTopRightRadius: 10
    },
    text: {
      color: props.theme ? color.drakFontcolor : color.fontcolor
    }
  });
  return (
    <View style={styles.container}>
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
      <HeaderWithBackButton name={name} navigation={props.navigation} />
      <FlatList style={{ marginBottom: 100 }} inverted contentContainerStyle={{ flexDirection: 'column-reverse' }}
        data={userChatList} renderItem={(item) => (
          <View>
            {(props.userData?._id !== item.item?.userId) ?
              <View style={{ flexDirection: "row" }}>
                <View style={styles.left}>
                  <Text style={styles.text}>{item.item.message}</Text>
                </View>
                <View style={{ justifyContent: 'flex-end' }}>
                  <Text style={{ color: 'gray', fontWeight: 'bold', fontSize: 10, paddingHorizontal: 2 }}>{new Date(item.item.createdAt).toLocaleDateString("en-US", { hour: 'numeric', minute: 'numeric', hour12: false }).toString().slice(-5)}</Text>
                </View>
              </View> :
              <View style={{ alignSelf: 'flex-end', flexDirection: 'row' }}>
                <View style={{ justifyContent: 'flex-end' }}>
                  <Text style={{ color: 'gray', fontWeight: 'bold', fontSize: 10, paddingHorizontal: 2 }}>{new Date(item.item.createdAt).toLocaleDateString("en-US", { hour: 'numeric', minute: 'numeric', hour12: false }).toString().slice(-5)}</Text>
                </View>
                <View style={styles.right}>
                  <Text style={styles.text}>{item.item.message}</Text>
                </View>
              </View>}
          </View>
        )} showsVerticalScrollIndicator={false}
      />
      <View style={{
        position: 'absolute', bottom: 0,
        height: 100, width: '100%', borderWidth: 0, flexDirection: 'row', justifyContent: 'center', alignItems: 'center',
      }}>
        <View style={{ width: "90%" }}>
          <TextInput value={message} style={{ color: props.theme ? color.drakFontcolor : color.fontcolor, height: 45, borderWidth: 1, borderColor: color.primaryColors, marginHorizontal: 10, fontSize: 20, padding: 10, borderRadius: 10 }}
            onChangeText={(value) => setMessage(value)} /></View>
        <TouchableOpacity style={{ width: "10%" }} onPress={() => { sendMessage() }} >
          <Image source={icons.send} style={{ width: 30, height: 30, tintColor: props.theme ? color.drakPrimaryColors : color.primaryColors }} />
        </TouchableOpacity>
      </View>
    </View>
  );
};
const useDispatch = (dispatch) => {
  return {
    sendMessage: (data) => dispatch(sendMessage(data)),
    getmessage: (data) => dispatch(getmessage(data)),
    CreateRoom: (data) => dispatch(CreateRoom(data)),
    getRoom: (data) => dispatch(getRoom(data)),
    setChatList: (data) => dispatch(setChatList(data)),
    setRoomData: (data) => dispatch(setRoomData(data))

  };
}
const useSelector = (state) => (

  {
    theme: state.token.theme,
    chatList: state.chat.chatList,
    loading: state.chat.loading,
    roomdata: state.chat.roomdata,
    userData: state.user.userData,
    chat: state.chat.chat,
  }
)
export default connect(useSelector, useDispatch)(ChatDetails);
