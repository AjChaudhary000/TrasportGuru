import {
  View,
  Text,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import LottieView from 'lottie-react-native';
import color from '../../contents/color';
import { connect } from 'react-redux';
const Confirmation = props => {
  const [isloading, setloadingData] = React.useState(true);
  React.useEffect(() => {
    setTimeout(() => {
      setloadingData(false);
    }, 3000);
  }, []);
  if (isloading) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: props.theme
            ? color.drakBackgroundColor
            : color.backgroundColor,
        }}>
        <StatusBar hidden />
        <View style={{ height: '100%' }}>
          <LottieView
            source={require('../../assets/json/pay.json')}
            autoPlay
            loop
          />
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container(props)}>
      <View
        style={{
          height: '50%',
          backgroundColor: props.theme
            ? color.drakBackgroundColor
            : color.backgroundColor,
        }}>
        <View style={{ height: '100%' }}>
          <LottieView
            source={require('../../assets/json/pay.json')}
            autoPlay
            loop
          />
        </View>
      </View>
      <View style={styles.listBox(props)}>
        <Text style={styles.titleText(props)}>Thank You </Text>
        <Text style={styles.payment(props)}>
          {props?.route?.params?.payment?.toLocaleString('en-IN', {
            maximumFractionDigits: 2,
            style: 'currency',
            currency: 'INR',
          })}
        </Text>
        <TouchableOpacity
          style={styles.btn(props)}
          onPress={() => {
            props.route.params?.type == '0'
              ? props.navigation.popToTop()
              : props.navigation.goBack();
          }}>
          <Text style={{ color: 'white', fontWeight: 'bold' }}>Continue</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const useSelector = state => ({
  theme: state.token.theme,
});
export default connect(useSelector)(Confirmation);
const styles = StyleSheet.create({
  container: props => [
    {
      flex: 1,
      backgroundColor: props.theme
        ? color.drakBackgroundColor
        : color.backgroundColor,
      justifyContent: 'center',
    },
  ],
  listBox: props => [
    {
      minHeight: '40%',
      backgroundColor: props.theme
        ? color.drakBackgroundColor
        : color.backgroundColor,
      marginHorizontal: 20,
      borderRadius: 20,
      justifyContent: 'center',
      shadowColor: props.theme ? color.drakFontcolor : color.fontcolor,
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
      marginVertical: 10,
      padding: 10,
    },
  ],
  titleText: props => [
    {
      textAlign: 'center',
      fontSize: 30,
      fontWeight: 'bold',
      color: props.theme ? color.drakFontcolor : color.fontcolor,
    },
  ],
  btn: props => [
    {
      width: '90%',
      height: 55,
      backgroundColor: props.theme
        ? color.drakPrimaryColors
        : color.primaryColors,
      borderRadius: 10,
      justifyContent: 'center',
      alignItems: 'center',
      marginHorizontal: 10,
      marginVertical: 20,
    },
  ],
  payment: props => [
    {
      textAlign: 'center',
      fontSize: 30,
      fontWeight: 'bold',
      color: props.theme ? color.drakFontcolor : color.fontcolor,
      margin: 20,
    },
  ],
});
