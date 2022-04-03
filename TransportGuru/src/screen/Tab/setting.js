import { View, StyleSheet, Platform, Image, ScrollView,TouchableOpacity,Switch } from 'react-native'
import { Paragraph, Caption, Avatar, Text, Title } from 'react-native-paper'
import React from 'react'
import color from '../../contents/color';
import icons from '../../contents/icons';
import SettingMenu from './settingMenu';
import { connect } from 'react-redux'
import { getUserDetails } from '../../Redux/UserDetails';
import { getJWTToken, removeJWTToken } from '../../Redux/helper';
import Header from '../../components/header';
import { logoutToken } from '../../Redux/tokenSlice';

const Setting = (props) => {
  const [token, setToken] = React.useState('');
  const [isEnabled, setIsEnabled] = React.useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  const fetchToken = async () => {
    try {
      const data = await getJWTToken();
      setToken(data)
    } catch (e) {
      console.log()
    }
  }
  const logout = async () => {
    console.log("dd3d3wqd");


    try {

      console.log("dd3d3wqd");
      props.logoutToken();
      await removeJWTToken()
      props.navigation.replace("SignIn")

    } catch (e) {
      console.log();
    }
  }
  React.useEffect(() => {
    fetchToken()
    props.getUserDetails(token);

  }, [token])

  return (

    <View style={styles.container}>
      {/* <View style={styles.header}>
          <Text style={styles.headerName}>Settings</Text>
        </View> */}
      <Header name={"Settings"} />
      <ScrollView>
        <View style={{ marginTop: 40, overflow: 'hidden', alignSelf: 'center', width: 120, height: 120, borderRadius: 60, borderWidth: 5, borderColor: color.primaryColors }}>
          <Image style={{ width: 110, height: 110, tintColor: color.fontcolor, alignSelf: "center" }}
            source={icons.profileimage} />
        </View>
        <View style={{ marginTop: 10, alignItems: 'center' }}>
          <Title style={{ textAlign: 'center' ,color:color.fontcolor}}>{props.userData?.username}</Title>
          <Caption style={{ fontWeight: 'bold', color: 'gray' }}>@{props.userData?.email}</Caption>
        </View>
        {/* </View> */}


        <View style={styles.menu}>

          {/* <View style={{ marginHorizontal: 20 }}>
          <Caption style={{ fontWeight: 'bold', color: 'gray', fontSize: 16 }}>Overview</Caption>
        </View> */}

          <View style={{ marginTop: 30, marginBottom: 30 }}>
            <SettingMenu icon={icons.edit} menuName={"Edit Account"} onPress={() => { props.navigation.navigate('EditAccount') }} />
            <SettingMenu icon={icons.truck} menuName={"Transport Guru Account"} onPress={() => { props.navigation.navigate('TrasportGuruAccount', { _id: props.userData?._id }) }} />
            <SettingMenu icon={icons.message} menuName={"Message"} onPress={() => { console.log("hello") }} />
            <TouchableOpacity style={styles.option} onPress={props.onPress} activeOpacity={0.60}>
            <View style={styles.menuIcon}>
                <Image source={icons.contrast} style={styles.menuiconStyle} />
            </View>
            <View style={styles.menuname}>
                <Text style={styles.menuText}>Drak Mode</Text>
            </View>
            <View style={styles.menuclick}>
            <Switch
        trackColor={{ false: "#767577", true: color.primaryColors }}
        thumbColor={isEnabled ? color.primaryColors : color.primaryColors}
        ios_backgroundColor="#3e3e3e"
        onValueChange={toggleSwitch}
        value={isEnabled}
      />
            </View>
        </TouchableOpacity>
            <SettingMenu icon={icons.privacy_policy} menuName={"Privacy Policy"} onPress={() => { console.log("hello") }} />
            <SettingMenu icon={icons.accept} menuName={"Terms of service"} onPress={() => { console.log("hello") }} />
            <SettingMenu icon={icons.support} menuName={"Support"} onPress={() => { console.log("hello") }} />
            <SettingMenu icon={icons.logout} menuName={"Logout"} onPress={() => { logout() }} />

          </View>

        </View>
      </ScrollView>

    </View >
  )
}
const useDispatch = (dispatch) => {
  return {
    getUserDetails: (data) => dispatch(getUserDetails(data)),
    logoutToken: () => dispatch(logoutToken())
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
    backgroundColor: color.backgroundColor,
    marginBottom: 30
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
  }, option: {
    height: 50,
    marginHorizontal: 20,

    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 2
},
menuIcon: {
    width: '15%',
    justifyContent: 'center',
    alignItems: "center"
},
menuname: {
    width: '70%',
    justifyContent: 'center'
},
menuclick: {
    width: '15%',
    justifyContent: 'center',
    alignItems: "center"
},
menuText: {
    color: color.primaryColors,
    fontWeight: 'bold',
    fontSize: 18
},
menuiconStyle: {
    width: 25,
    height: 25,
    tintColor: color.primaryColors
}
})