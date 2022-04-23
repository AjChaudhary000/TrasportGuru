import { View, StyleSheet, Platform, Image, ScrollView, TouchableOpacity, Switch, StatusBar } from 'react-native'
import { Paragraph, Caption, Avatar, Text, Title, DarkTheme } from 'react-native-paper'
import React from 'react'
import color from '../../contents/color';
import icons from '../../contents/icons';
import SettingMenu from './settingMenu';
import { connect } from 'react-redux'
import { getUserDetails } from '../../Redux/UserDetails';
import {  removeJWTToken, saveTheme } from '../../Redux/helper';
import Header from '../../components/header';
import { getThemeMode, logoutToken } from '../../Redux/tokenSlice';
import AnimatedLoader from "react-native-animated-loader";
const Setting = (props) => {
  const [isEnabled, setIsEnabled] = React.useState(props.theme);
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

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: props.theme ? color.drakBackgroundColor : color.backgroundColor,
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
      color: props.theme ? color.drakPrimaryColors : color.primaryColors,
      fontWeight: 'bold',
      fontSize: 18
    },
    menuiconStyle: {
      width: 25,
      height: 25,
      tintColor: props.theme ? color.drakPrimaryColors : color.primaryColors
    }
  })
  return (

    <View style={styles.container}>
      {/* <View style={styles.header}>
          <Text style={styles.headerName}>Settings</Text>
        </View> */}
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
      <ScrollView>
        <View style={{ marginTop: 40, overflow: 'hidden', alignSelf: 'center', width: 120, height: 120, borderRadius: 60, borderWidth: 5, borderColor: color.primaryColors }}>
          <Image style={{ width: 110, height: 110, alignSelf: "center" }}
            source={{ uri: props.userData?.image || "https://firebasestorage.googleapis.com/v0/b/trasnsportguru.appspot.com/o/user%2Fuser.jpg?alt=media&token=69b96dfc-7eec-4402-9f61-f6f53d0c0c7e" }} />
        </View>
        <View style={{ marginTop: 10, alignItems: 'center' }}>
          <Title style={{ textAlign: 'center', color: props.theme ? color.drakFontcolor : color.fontcolor }}>{props.userData?.username}</Title>
          <Caption style={{ fontWeight: 'bold', color: 'gray' }}>@{props.userData?.email}</Caption>
        </View>
        {/* </View> */}


        <View style={styles.menu}>

          {/* <View style={{ marginHorizontal: 20 }}>
          <Caption style={{ fontWeight: 'bold', color: 'gray', fontSize: 16 }}>Overview</Caption>
        </View> */}

          <View style={{ marginTop: 30, marginBottom: 30 }}>
            <SettingMenu icon={icons.edit} menuName={"Edit Account"} onPress={() => { props.navigation.navigate('EditAccount', { item: props.userData }) }} />
            <SettingMenu icon={icons.truck} menuName={"Transport Guru Account"} onPress={() => { props.navigation.navigate('TrasportGuruAccount', { type: props.userData?.accountType }) }} />
           
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
            <SettingMenu icon={icons.privacy_policy} menuName={"Privacy Policy"} onPress={() => {  props.navigation.navigate('PrivacyPolicy') }} />
            <SettingMenu icon={icons.accept} menuName={"Terms of service"} onPress={() => {props.navigation.navigate('Termsofservice') }} />
            <SettingMenu icon={icons.support} menuName={"Support"} onPress={() => { props.navigation.navigate('Support') }} />
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
    logoutToken: () => dispatch(logoutToken()),
    getThemeMode: (data) => dispatch(getThemeMode(data))
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
