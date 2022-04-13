import { View, Text, TextInput, TouchableOpacity, FlatList, Image } from 'react-native'
import React, { useEffect } from 'react'
import { io } from 'socket.io-client'
import { connect } from 'react-redux'
import TrasportApi from '../../api/TrasportApi'
import icons from '../../contents/icons';
import { getJWTToken } from '../../Redux/helper'
const ChatDetails = (props) => {
  const socket = io('http://192.168.200.123:5000');
  const [roomData, setRoomData] = React.useState([])
  const [message, setMessage] = React.useState('');
  const [convessationId, setConvessationId] = React.useState('')

  const id = props.route.params.item;

  

  socket.on('welcome', async (data) => {
    try {
      const token = await getJWTToken()
      // const response = await TrasportApi.post('/chatroom', { convessationId: convessationId }, { headers: { Authorization: `Bearer ${token}` } })
      setRoomData([]);
    } catch (e) {
      console.log(e)
    }
  })
  const sendMessage = async () => {
    try {
      const token = await getJWTToken()
      await TrasportApi.post('/chat', { senderId: id, convessationId: convessationId, message: message }, { headers: { Authorization: `Bearer ${token}` } })
      socket.emit("sendMessage", { room: convessationId, message })
      setMessage('')
    } catch (e) {
      console.log(e)
    }
  }
  const CreateConvessationRoom = async () => {
    try {
      const token = await getJWTToken()
      const convessionData = {
        senderId: id
      }
      const response = await TrasportApi.post('/roomData', convessionData, { headers: { Authorization: `Bearer ${token}` } });
      console.log(response.data)
      if (response.data.length === 0) {

        const data = await TrasportApi.post('/room', convessionData, { headers: { Authorization: `Bearer ${token}` } });
        console.log("myroom", data.data)
        setConvessationId(data.data._id)
      } else {
        // console.log("mydata ", response.data[0]._id)
        setConvessationId(response.data[0]._id)
      }
    } catch (e) {
      console.log(e)
    }
  }
  React.useEffect(() => {
    CreateConvessationRoom()
  }, [])
  return (
    <View style={{ flex: 1, justifyContent: 'center' }}>
      <FlatList style={{ marginBottom: 100 }} inverted contentContainerStyle={{ flexDirection: 'column-reverse' }}
        data={roomData} renderItem={(item) => (
          <View>
            {(id == item.item.userId) ?
              <View style={{
                marginTop: 10, minWidth: '15%', maxWidth: '70%', alignSelf: 'flex-start', alignItems: 'center',
                height: 40, borderRadius: 10, backgroundColor: "#839bd4", justifyContent: 'center', padding: 10, borderBottomLeftRadius: 5, borderTopLeftRadius: 120
              }}>
                <Text>{item.item.message}</Text>
              </View> : <TouchableOpacity onLongPress={() => { console.log("delete"); }} style={{
                marginTop: 10, minWidth: '15%', maxWidth: '70%', alignSelf: 'flex-end', alignItems: 'center',
                height: 40, borderRadius: 10, backgroundColor: "#1469c4", justifyContent: 'center', padding: 10, borderBottomRightRadius: 100
              }}>
                <Text>{item.item.message}</Text>
              </TouchableOpacity>}
          </View>
        )}
      />
      <View style={{
        position: 'absolute', bottom: 0,
        height: 100, width: '100%', borderWidth: 0, flexDirection: 'row', justifyContent: 'center', alignItems: 'center',
      }}>
        <View style={{ width: "90%" }}>
          <TextInput value={message} style={{ backgroundColor: 'white', height: 50, borderWidth: 1, marginHorizontal: 10, fontSize: 20, padding: 10, borderRadius: 20 }}
            onChangeText={(value) => setMessage(value)} /></View>
        <TouchableOpacity style={{ width: "10%" }} onPress={() => { sendMessage() }} >
          <Image source={icons.add} style={{ width: 30, height: 30 }} />
        </TouchableOpacity>
      </View>
    </View>
  );
};
const useDispatch = (dispatch) => {
  return {

  };
}
const useSelector = (state) => (

  {
    theme: state.token.theme
  }
)
export default connect(useSelector, useDispatch)(ChatDetails);
