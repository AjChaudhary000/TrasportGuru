import { View, StyleSheet, Image, ScrollView, TouchableOpacity, Switch, Modal, Dimensions } from 'react-native'
import { Caption, Text, Title } from 'react-native-paper'
import React from 'react'
import color from '../../contents/color';
import icons from '../../contents/icons';
import SettingMenu from './settingMenu';
import { connect } from 'react-redux'
import { getUserDetails } from '../../Redux/UserDetails';
import { removeJWTToken, saveTheme } from '../../Redux/helper';
import Header from '../../components/header';
import { getThemeMode, logoutToken } from '../../Redux/tokenSlice';
import AnimatedLoader from "react-native-animated-loader";
import { setotpData } from '../../Redux/verifyOtpSlice';

const Setting = (props) => {
  const [isEnabled, setIsEnabled] = React.useState(props.theme);
  const [modalVisible, setModalVisible] = React.useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  const saveThemeData = async (drakmode) => {
    try {
      await saveTheme(drakmode)
    } catch (e) {
      console.log(e);
    }
  }
  React.useEffect(() => {
    saveThemeData(isEnabled)
    props.getThemeMode(isEnabled)
  }, [isEnabled])
  const logout = async () => {
    try {
      props.setotpData({})
      props.logoutToken();
      await removeJWTToken()
      props.navigation.replace("SignIn")
    } catch (e) {
      console.log();
    }
  }
  React.useEffect(() => {
    props.getUserDetails(props.token);
  }, [])


  return (

    <View style={styles.container(props)}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={{ flex: 1, justifyContent: 'center' }}>

          <View style={styles.modelBox(props)}>
            <Text style={styles.text}> Are you sure you want to logout ? </Text>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', margin: 30 }}>
              <TouchableOpacity style={styles.btn1} onPress={() => { logout(), setModalVisible(false) }}>
                <Text style={styles.btntext}>
                  Yes
                </Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.btn} onPress={() => setModalVisible(false)}>
                <Text style={styles.btntext}>
                  No
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
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
        <Text>Loading 2...</Text>
      </AnimatedLoader>
      <Header name={"Settings"} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ marginTop: 40, overflow: 'hidden', alignSelf: 'center', width: 120, height: 120, borderRadius: 60, borderWidth: 5, borderColor: color.primaryColors }}>
          <Image style={{ width: 110, height: 110, alignSelf: "center" }}
            source={{ uri: props.userData?.image || "https://firebasestorage.googleapis.com/v0/b/trasnsportguru.appspot.com/o/user%2Fuser.jpg?alt=media&token=69b96dfc-7eec-4402-9f61-f6f53d0c0c7e" }} />
        </View>
        <View style={{ marginTop: 10, alignItems: 'center' }}>
          <Title style={{ textAlign: 'center', color: props.theme ? color.drakFontcolor : color.fontcolor }}>{props.userData?.username}</Title>
          <Caption style={{ fontWeight: 'bold', color: 'gray' }}>@{props.userData?.email}</Caption>
        </View>
        <View style={styles.menu}>
          <View style={{ marginTop: 30, marginBottom: 30 }}>
            <SettingMenu icon={icons.edit} menuName={"Edit Account"} onPress={() => { props.navigation.navigate('EditAccount', { item: props.userData }) }} />
            <SettingMenu icon={icons.truck} menuName={"Transport Guru Account"} onPress={() => { props.navigation.navigate('TrasportGuruAccount', { type: props.userData?.accountType }) }} />

            <TouchableOpacity style={styles.option} onPress={props.onPress} activeOpacity={0.60}>
              <View style={styles.menuIcon}>
                <Image source={icons.contrast} style={styles.menuiconStyle(props)} />
              </View>
              <View style={styles.menuname}>
                <Text style={styles.menuText(props)}>Drak Mode</Text>
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
            <SettingMenu icon={icons.privacy_policy} menuName={"Privacy Policy"} onPress={() => { props.navigation.navigate('PrivacyPolicy') }} />
            <SettingMenu icon={icons.accept} menuName={"Terms of service"} onPress={() => { props.navigation.navigate('Termsofservice') }} />
            <SettingMenu icon={icons.support} menuName={"Support"} onPress={() => { props.navigation.navigate('Support') }} />
            <SettingMenu icon={icons.logout} menuName={"Logout"} onPress={() => { setModalVisible(true) }} />

          </View>

        </View>
      </ScrollView>

    </View >
  )
}
const useDispatch = (dispatch) => {
  return {
    getUserDetails: (data) => dispatch(getUserDetails(data)),
    logoutToken: () => dispatch(logoutToken()),
    getThemeMode: (data) => dispatch(getThemeMode(data)),
    setotpData: (data) => dispatch(setotpData(data))
  };
}
const useSelector = (state) => (

  {
    userData: state.user.userData,
    loading: state.user.loading,
    theme: state.token.theme,
    token: state.token.token,
  }
)
export default connect(useSelector, useDispatch)(Setting);
const styles = StyleSheet.create({
  container: (props) => [{
    flex: 1,
    backgroundColor: props.theme ? color.drakBackgroundColor : color.backgroundColor,
    marginBottom: 30
  }],
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
  menuText: (props) => [{
    color: props.theme ? color.drakPrimaryColors : color.primaryColors,
    fontWeight: 'bold',
    fontSize: 18
  }],
  menuiconStyle: (props) => [{
    width: 25,
    height: 25,
    tintColor: props.theme ? color.drakPrimaryColors : color.primaryColors
  }],
  modelBox: (props) => [{
    width: Dimensions.get('screen').width - 20,
    minHeight: 200,
    alignSelf: 'center',
    backgroundColor: props.theme ? color.drakBackgroundColor : color.backgroundColor,
    borderRadius: 15,
    justifyContent: 'center',
    shadowColor: props.theme ? color.drakFontcolor : color.fontcolor,
    shadowOffset: {
      width: 0,
      height: 4
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,


  }],
  text: {
    fontSize: 20,
    color: 'gray',
    textAlign: 'center'
  }, btn1: {
    width: 100,
    height: 45,
    borderRadius: 10,
    backgroundColor: color.primaryColors,
    justifyContent: 'center',
    alignItems: "center"
  },
  btn: {
    width: 100,
    height: 45,
    borderRadius: 10,
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: "center"
  }, btntext: {
    fontSize: 18,
    color: 'white'
  }
})
