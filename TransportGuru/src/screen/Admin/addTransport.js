import { View, Text, StyleSheet, Image } from 'react-native'
import React from 'react'
import color from '../../contents/color'
import AdminHeader from '../../components/adminHeader'
import icons from '../../contents/icons'
import AdminAddCard from '../../components/adminAddCard'
import { connect } from 'react-redux'
import { getCountDriver, getCountRoute, getCountTransport, getCountTruck } from '../../Redux/Admin/countAddSlice'
import { getJWTToken } from '../../Redux/helper'

const AddTransport = (props) => {
  const [token, setToken] = React.useState('');

  const fetchToken = async () => {
    try {
      const data = await getJWTToken();
      setToken(data)

    } catch (e) {
      console.log()
    }
  }
  React.useEffect(() => {
    fetchToken()
    props.getCountTruck(token)
    props.getCountDriver(token)
    props.getCountRoute(token)
    props.getCountTransport(token)
  }, [token])
  return (
    <View style={styles.container}>
      <AdminHeader name={"Add Transport"} />
      {/* <View style={styles.header}>
        <Text style={styles.headerName}>Add Transport Services</Text>
      </View> */}
      <AdminAddCard
        icons={icons.truck}
        name={"Add Truck"}
        count={props.countTruck}
        onPress={() => { props.navigation.navigate('AddTruck') }} />
      <AdminAddCard
        icons={icons.driver}
        name={"Add Driver"}
        count={props.countDriver}
        onPress={() => { props.navigation.navigate('AddDriver') }} />
      <AdminAddCard
        icons={icons.tracking}
        name={"Add Route "}
        count={props.countRoute}
        onPress={() => { props.navigation.navigate('AddRoute') }} />
      <AdminAddCard
        icons={icons.addtotruck}
        name={"Add Transport "}
        count={props.countTransport}
        onPress={() => { props.navigation.navigate('AddTrasportDetails') }} />
    </View>
  )
}
const useDispatch = (dispatch) => {
  return {
    getCountTruck: (data) => dispatch(getCountTruck(data)),
    getCountDriver: (data) => dispatch(getCountDriver(data)),
    getCountRoute: (data) => dispatch(getCountRoute(data)),
    getCountTransport: (data) => dispatch(getCountTransport(data))
  };
}
const useSelector = (state) => (

  {
    countTruck: state.count.countTruck,
    countDriver: state.count.countDriver,
    countRoute: state.count.countRoute,
    countTransport: state.count.countTransport,
  }
)
export default connect(useSelector, useDispatch)(AddTransport);
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.backgroundColor,
    //  paddingTop: 50
  }

})