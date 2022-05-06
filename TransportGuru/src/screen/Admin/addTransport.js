import { View, Text, StyleSheet, Image, StatusBar } from 'react-native';
import React from 'react';
import color from '../../contents/color';
import AdminHeader from '../../components/adminHeader';
import icons from '../../contents/icons';
import AdminAddCard from '../../components/adminAddCard';
import { connect } from 'react-redux';
import {
  getCountDriver,
  getCountRoute,
  getCountTransport,
  getCountTruck,
} from '../../Redux/Admin/countAddSlice';
import AnimatedLoader from 'react-native-animated-loader';
const AddTransport = props => {
  React.useEffect(() => {
    props.getCountTruck(props.token);
    props.getCountDriver(props.token);
    props.getCountRoute(props.token);
    props.getCountTransport(props.token);
  }, []);

  return (
    <View style={styles.container(props)}>
      <AnimatedLoader
        visible={props.loading}
        overlayColor="rgba(255,255,255,0.75)"
        source={require('../../assets/json/loder.json')}
        animationStyle={{
          width: 100,
          height: 100,
        }}
        speed={1}>
        <Text>Loading...</Text>
      </AnimatedLoader>
      <AdminHeader name={'Add Transport'} />
      <AdminAddCard
        icons={icons.truck}
        name={'Add Truck'}
        count={props.countTruck}
        onPress={() => {
          props.navigation.navigate('AddTruck');
        }}
      />
      <AdminAddCard
        icons={icons.driver}
        name={'Add Driver'}
        count={props.countDriver}
        onPress={() => {
          props.navigation.navigate('AddDriver');
        }}
      />
      <AdminAddCard
        icons={icons.tracking}
        name={'Add Route '}
        count={props.countRoute}
        onPress={() => {
          props.navigation.navigate('AddRoute');
        }}
      />
      <AdminAddCard
        icons={icons.addtotruck}
        name={'Add Transport '}
        count={props.countTransport}
        onPress={() => {
          props.navigation.navigate('AddTrasportDetails');
        }}
      />
    </View>
  );
};
const useDispatch = dispatch => {
  return {
    getCountTruck: data => dispatch(getCountTruck(data)),
    getCountDriver: data => dispatch(getCountDriver(data)),
    getCountRoute: data => dispatch(getCountRoute(data)),
    getCountTransport: data => dispatch(getCountTransport(data)),
  };
};
const useSelector = state => ({
  countTruck: state.count.countTruck,
  countDriver: state.count.countDriver,
  countRoute: state.count.countRoute,
  countTransport: state.count.countTransport,
  loading: state.count.loading,
  theme: state.token.theme,
  token: state.token.token,
});
export default connect(useSelector, useDispatch)(AddTransport);
const styles = StyleSheet.create({
  container: props => [
    {
      flex: 1,
      backgroundColor: props.theme
        ? color.drakBackgroundColor
        : color.backgroundColor,
    },
  ],
});
