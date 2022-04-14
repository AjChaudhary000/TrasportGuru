

import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet } from 'react-native';
import React from 'react';
import Header from '../../components/header'
import { getMessageList } from '../../Redux/messageListSlice';
import { connect } from 'react-redux'
import { getJWTToken } from '../../Redux/helper';
import color from '../../contents/color';
const Message = (props) => {
  const [token, setToken] = React.useState('');
  const [id, setId] = React.useState('');
  const fetchToken = async () => {
    try {
      const data = await getJWTToken();
      setToken(data)


    } catch (e) {
      console.log()
    }
  }
  React.useEffect(() => {
    fetchToken();
    props.getMessageList({ token })
  }, [token, id])
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: props.theme ? color.drakBackgroundColor : color.backgroundColor,
      marginBottom: 30
    },
    image: {
      width: '20%',
      overflow: 'hidden',
      alignSelf: 'center',
      width: 60,
      height: 60,
      borderRadius: 30,
      borderWidth: 2,
      borderColor: props.theme ? color.drakPrimaryColors : color.primaryColors,
    },
    text: {
      fontSize: 16,
      fontWeight: 'bold',
      letterSpacing: 1,
      marginLeft: 10,
      color: 'gray'
    }
  })
  return (
    <View style={styles.container}>
      <Header name={"Messages"} />
      <FlatList data={props.messageList} renderItem={(item) => (

        <TouchableOpacity style={{ flexDirection: 'row', marginVertical: 10, marginHorizontal: 20 }}
          onPress={() => { props.navigation.navigate('ChatDetails', { item: item.item.senderId }) }}>
          <View style={styles.image}>
            <Image source={{ uri: item.item.senderId?.trasportAccount[0]?.trasportImage }}
              style={{
                width: 60, height: 60, alignSelf: "center"

              }} />
          </View>
          <View style={{
            justifyContent: 'center', borderBottomWidth: 2,
            borderBottomColor: color.primaryColors, width: '80%', justifyContent: 'center'
          }}>

            <Text style={styles.text}>
              {item.item.senderId?.trasportAccount[0]?.trasportName}</Text>
          </View>

        </TouchableOpacity>
      )}
      />
    </View>
  );
};
const useDispatch = (dispatch) => {
  return {
    getMessageList: (data) => dispatch(getMessageList(data)),
  };
}
const useSelector = (state) => (

  {
    messageList: state.message.messageList,
    userData: state.user.userData,
    theme: state.token.theme
  }
)
export default connect(useSelector, useDispatch)(Message);

