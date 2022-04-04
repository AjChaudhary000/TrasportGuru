import { View, Text, StyleSheet, Image } from 'react-native'
import React from 'react'
import color from '../../contents/color'
import AdminHeader from '../../components/adminHeader'
import icons from '../../contents/icons'
import AdminAddCard from '../../components/adminAddCard'
import { connect } from 'react-redux'
import { getCountTruck } from '../../Redux/Admin/countAddSlice'
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
  }, [token])
  return (
    <View style={styles.container}>
      <AdminHeader name={"Add Transport"} />
      {/* <View style={styles.header}>
        <Text style={styles.headerName}>Add Transport Services</Text>
      </View> */}
      <AdminAddCard icons={icons.truck} name={"Add Truck"} count={props.countTruck} onPress={() => { props.navigation.navigate('AddTruck') }} />
      <AdminAddCard icons={icons.driver} name={"Add Driver"} count={0} onPress={() => { props.navigation.navigate('AddDriver') }} />
      <AdminAddCard icons={icons.tracking} name={"Add Transport "} count={0} />
    </View>
  )
}
const useDispatch = (dispatch) => {
  return {
    getCountTruck: (data) => dispatch(getCountTruck(data))
  };
}
const useSelector = (state) => (

  {
    countTruck: state.count.countTruck,
  }
)
export default connect(useSelector, useDispatch)(AddTransport);
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.backgroundColor,
    //  paddingTop: 50
  }, header: {
    marginTop: Platform.OS === 'android' ? 20 : 40,
    alignItems: 'flex-start',
    marginHorizontal: 20, marginBottom: 30
  },
  headerName: {
    fontSize: 25,
    fontWeight: 'bold',
    letterSpacing: 1,
    color: color.fontcolor
  },
  card: {
    height: 80,
    backgroundColor: color.adminprimaryColors,
    flexDirection: 'row',
    marginHorizontal: 35,
    borderRadius: 20,
    justifyContent: 'center',
    flexDirection: 'row',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  menuIcon: {
    width: '20%',
    justifyContent: 'center',
    alignItems: "center"
  },
  menuname: {
    width: '60%',
    justifyContent: 'center'
  },
  menuclick: {
    width: '15%',
    justifyContent: 'center',
    alignItems: "center"
  },
  menuText: {
    color: "white",
    fontWeight: 'bold',
    fontSize: 20, paddingLeft: 20
  },
  menuiconStyle: {
    width: 50,
    height: 50,
    tintColor: 'white'
  }
})