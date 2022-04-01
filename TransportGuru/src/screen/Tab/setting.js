import { View, StyleSheet, Platform, Image, ScrollView } from 'react-native'
import { Paragraph, Caption, Avatar, Text, Title } from 'react-native-paper'
import React from 'react'
import color from '../../contents/color';
import icons from '../../contents/icons';
import SettingMenu from './settingMenu';
import { connect } from 'react-redux'
import { getUserDetails } from '../../Redux/UserDetails';
import { getJWTToken, removeJWTToken } from '../../Redux/helper';
const Setting = (props) => {
  const [token, setToken] = React.useState('');
  const fetchToken = async () => {
    try {
      const data = await getJWTToken();
      setToken(data)
    } catch (e) {
      console.log()
    }
  }
  const logout = async () => {
    try {
      await removeJWTToken()

    } catch (e) {
      console.log();
    }
  }
  React.useEffect(() => {
    fetchToken()
    props.getUserDetails(token);

  }, [token])

  return (
    <ScrollView style={styles.container}>
      <View>
        <View style={styles.header}>
          <Text style={styles.headerName}>Settings</Text>
        </View>

        <View style={{ marginTop: 40, alignItems: 'center' }}>
          <Image style={{ width: 100, height: 100, tintColor: "#0D1117" }}
            source={icons.profileimage} />
          <View >
            <Title style={{ textAlign: 'center' }}>{props.userData?.username}</Title>
            <Caption style={{ fontWeight: 'bold', color: 'gray' }}>@{props.userData?.email}</Caption>
          </View>
        </View>
      </View>

      <View style={styles.menu}>

        {/* <View style={{ marginHorizontal: 20 }}>
          <Caption style={{ fontWeight: 'bold', color: 'gray', fontSize: 16 }}>Overview</Caption>
        </View> */}

        <View style={{ marginTop: 30, marginBottom: 30 }}>
          <SettingMenu icon={icons.edit} menuName={"Edit Account"} onPress={() => { props.navigation.navigate('EditAccount') }} />
          <SettingMenu icon={icons.truck} menuName={"Trasport Guru Account"} onPress={() => { props.navigation.navigate('TrasportGuruAccount', { _id: props.userData?._id }) }} />
          <SettingMenu icon={icons.message} menuName={"Message"} onPress={() => { console.log("hello") }} />
          <SettingMenu icon={icons.privacy_policy} menuName={"Privacy Policy"} onPress={() => { console.log("hello") }} />
          <SettingMenu icon={icons.accept} menuName={"Terms of service"} onPress={() => { console.log("hello") }} />
          <SettingMenu icon={icons.support} menuName={"Support"} onPress={() => { console.log("hello") }} />
          <SettingMenu icon={icons.logout} menuName={"Logout"} onPress={() => { logout() }} />

        </View>

      </View>

    </ScrollView>
  )
}
const useDispatch = (dispatch) => {
  return {
    getUserDetails: (data) => dispatch(getUserDetails(data)),

  };
}
const useSelector = (state) => (

  {
    userData: state.user.userData,
    loading: state.user.loading
  }
)
export default connect(useSelector, useDispatch)(Setting);
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    marginTop: Platform.OS === 'android' ? 20 : 40,
    alignItems: 'flex-start',
    marginHorizontal: 20
  },
  headerName: {
    fontSize: 25,
    fontWeight: 'bold',
    letterSpacing: 2,
    color: "#0D1117"
  },
  menu: {
    marginTop: 20
  }
})