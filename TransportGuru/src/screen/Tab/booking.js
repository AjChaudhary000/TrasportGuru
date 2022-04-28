import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, ScrollView, Modal, Dimensions } from 'react-native'
import React from 'react'
import { connect } from 'react-redux';
import { HeaderWithBackButton } from '../../components/header'
import color from '../../contents/color';
import icons from '../../contents/icons';
import { getUserDetails } from '../../Redux/UserDetails';
import Toast from 'react-native-simple-toast';
import calcKmFind from '../../components/kmFind';
import { transportListById } from '../../Redux/fetchByIDSlice';
import RadioButtonRN from 'radio-buttons-react-native';
import { payment, setPaymentData } from '../../Redux/paymentSlice';
import { updateTransport } from '../../Redux/Admin/transportSlice';
import { tracking, setTrackingData } from '../../Redux/trackingSlice';
import AnimatedLoader from "react-native-animated-loader";
import RazorpayCheckout from 'react-native-razorpay';
const Booking = (props) => {

  const [modalVisible1, setModalVisible1] = React.useState(false);
  const [amount, setAmount] = React.useState(0)

  React.useEffect(() => {
    props.transportListById({ id: props.route.params.tarsportId, token: props.token })
  }, [])

  const paymentHendle = (price, truckCapicty) => {
    const totalPayment = ((calcKmFind(props.route.params.from.lat,
      props.route.params.from.lng,
      props.route.params.destination.lat,
      props.route.params.destination.lng)) * (props.route.params.capicity) * (price))
    let paymentStatus = "";
    if (totalPayment === amount) {
      paymentStatus = "Completing"
    } else {
      paymentStatus = "Pending"
    }
    const data = {
      ...props.route.params,
      totalPayment: totalPayment,
      paymentHistory: [{ payment: amount }],
      paymentStatus
    }
    const totalCapicity = (Number(props.route.params.capicity) + Number(truckCapicty))
    console.log(totalCapicity)
    props.updateTransport({ data: { capicity: totalCapicity }, id: props.route.params.tarsportId, token: props.token })
    props.payment({ data, token: props.token })
  }
  React.useEffect(() => {
    if (props.paymentData?.status) {
      props.tracking({
        data: {
          tarsportId: props.route.params.tarsportId,
          paymentid: props.paymentData.data._id
        }, token: props.token
      })
      props.setPaymentData([])
    }
    if (props.trackingData?.status) {
      setModalVisible1(false);
      props.setTrackingData([])
      var options = {
        description: 'Transport Guru Payments ',
        image: 'https://i.imgur.com/3g7nmJC.png',
        currency: 'INR',
        key: 'rzp_test_K3zMkXzdEHbAqq',
        amount: '200',
        name: 'Acme Corp',
        prefill: {
          email: 'arjunchaudhary@example.com',
          contact: '9106614742',
          name: 'Arjun chaudhary'
        },
        theme: { color: '#119CB9' }
      }
      RazorpayCheckout.open(options).then((data) => {
        props.navigation.navigate('Confirmation', { payment: amount, type: "0" }); // handle success
        alert(`Success: ${data.razorpay_payment_id}`);
      }).catch((error) => {
        // handle failure
        console.log(error)
        alert(`Error: ${error.code} | ${error.description}`);
        props.navigation.navigate('Confirmation', { payment: amount, type: "0" });
      });

    }
  }, [props])
  console.log(props.paymentData)
  return (
    <View style={styles.container(props)}>
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
        <Text>Loading ...</Text>
      </AnimatedLoader>
      <HeaderWithBackButton name={"Booking Details"} navigation={props.navigation} />
      <ScrollView style={{ marginBottom: 0 }} showsVerticalScrollIndicator={false}>
        <FlatList data={props.transportList} renderItem={(item) => (
          <View style={styles.listBox(props)}>
            <View style={{
              marginHorizontal: 20, flexDirection: "row", justifyContent: 'space-between',
              paddingVertical: 2
            }}>
              <View style={{ width: '20%', justifyContent: 'center' }}>
                <View style={styles.image(props)}>
                  <Image
                    style={{
                      width: 60, height: 60, alignSelf: "center"
                    }}
                    source={{ uri: item.item.tarsportUserId.trasportAccount[0].trasportImage }}
                  />
                </View>
              </View>
              <View style={{ justifyContent: 'center', width: '60%', paddingHorizontal: 10 }}>
                <Text style={{ fontSize: 20, fontWeight: 'bold', color: props.theme ? color.drakPrimaryColors : color.primaryColors }}>{item.item.tarsportUserId.trasportAccount[0].trasportName}</Text>
              </View>
              <View style={{ width: "30%", flexDirection: "row", justifyContent: 'space-between', paddingVertical: 10 }}>
                <TouchableOpacity style={{ width: "50%" }}>
                  <Image source={icons.call} style={styles.icon(props)} />
                </TouchableOpacity>
                <TouchableOpacity style={{ width: "50%" }} onPress={() => {

                  if (item.item?.tarsportUserId._id === props.userData._id) {
                    Toast.show("not found ...")
                  } else {
                    props.navigation.navigate("ChatDetails", { item: item.item?.tarsportUserId })
                  }
                }}>
                  <Image source={icons.message} style={styles.icon(props)} />
                </TouchableOpacity>
              </View>
            </View>

            <View style={{ alignItems: "center" }}>
              <Text style={{ fontWeight: 'bold', color: props.theme ? color.drakFontcolor : color.fontcolor }}>
                {props.route.params.from.name}
              </Text>
              <View style={{ marginHorizontal: 20, marginVertical: 5, flexDirection: "row", justifyContent: 'space-between' }}>
                <View >

                  <Text style={{ color: 'gray', fontWeight: 'bold', fontSize: 14, paddingRight: 2 }}>
                    {new Date(new Date(item.item.Truckdate)
                      .setHours(new Date(item.item.Truckdate)
                        .getHours() + Math.round((calcKmFind(item.item.routeId.from.lat,
                          item.item.routeId.from.lng,
                          props?.route.params.from.lat,
                          props?.route.params.from.lng)) / 45))).toLocaleDateString("en-US", { weekday: 'short', month: 'long', day: 'numeric' })}

                  </Text>
                </View>
                <View >
                  <Text style={{ color: color.primaryColors, fontWeight: 'bold', fontSize: 14 }}>
                    {new Date(new Date(item.item.Truckdate)
                      .setHours(new Date(item.item.Truckdate)
                        .getHours() + Math.round((calcKmFind(item.item.routeId.from.lat,
                          item.item.routeId.from.lng,
                          props?.route.params.from.lat,
                          props?.route.params.from.lng)) / 45))).toLocaleDateString("en-US", { hour: 'numeric', minute: 'numeric', hour12: false }).toString().slice(-5)}
                  </Text>

                </View>

              </View>
            </View>
            <View style={{ alignItems: "center", paddingVertical: 4, flexDirection: 'row', justifyContent: 'center' }}>
              <View style={{ width: '33%', alignItems: "center" }}>
                <Text style={{ fontWeight: 'bold', color: 'gray' }}>Duration</Text>
                <Text style={{ fontWeight: 'bold', color: props.theme ? color.drakFontcolor : color.fontcolor }}>
                  {Math.round((calcKmFind(props.route.params.from.lat,
                    props.route.params.from.lng,
                    props.route.params.destination.lat,
                    props.route.params.destination.lng)) / 45)} hrs </Text>
              </View>
              <View style={{ width: '34%', alignItems: "center" }}>
                <Image source={icons.upToDown} style={{ width: 30, height: 30, tintColor: props.theme ? color.drakPrimaryColors : color.primaryColors }} />
              </View>
              <View style={{ width: '33%', alignItems: "center" }}>
                <Text style={{ fontWeight: 'bold', color: 'gray' }}>Distance</Text>
                <Text style={{ fontWeight: 'bold', color: props.theme ? color.drakFontcolor : color.fontcolor }}>
                  {(calcKmFind(props.route.params.from.lat,
                    props.route.params.from.lng,
                    props.route.params.destination.lat,
                    props.route.params.destination.lng))} Km</Text>
              </View>
            </View>
            <View style={{ alignItems: "center" }}>
              <Text style={{ fontWeight: 'bold', color: props.theme ? color.drakFontcolor : color.fontcolor, textAlign: "center" }}>
                {props.route.params.destination.name}
              </Text>
              <View style={{ marginHorizontal: 20, paddingTop: 5, flexDirection: "row", justifyContent: 'center' }}>
                <View >
                  <Text style={{ color: 'gray', fontWeight: 'bold', fontSize: 14, paddingRight: 2 }}>
                    {new Date(new Date(item.item.Truckdate)
                      .setHours(new Date(item.item.Truckdate)
                        .getHours() + Math.round((calcKmFind(props.route.params.from.lat,
                          props.route.params.from.lng,
                          props.route.params.destination.lat,
                          props.route.params.destination.lng)) / 45))).toLocaleDateString("en-US", { weekday: 'short', month: 'long', day: 'numeric' })}
                  </Text>
                </View>
                <View >
                  <Text style={{ color: color.primaryColors, fontWeight: 'bold', fontSize: 14 }}>
                    {new Date(new Date(item.item.Truckdate)
                      .setHours(new Date(item.item.Truckdate)
                        .getHours() + Math.round((calcKmFind(props.route.params.from.lat,
                          props.route.params.from.lng,
                          props.route.params.destination.lat,
                          props.route.params.destination.lng)) / 45))).toLocaleDateString("en-US", { hour: 'numeric', minute: 'numeric', hour12: false }).toString().slice(-5)}
                  </Text>
                </View>
              </View>
            </View>

            <View style={{ marginVertical: 5, marginHorizontal: 10 }}>
              <Text style={{
                fontSize: 20, color: props.theme ? color.drakFontcolor : color.fontcolor
                , fontWeight: 'bold'
              }}>
                Routes</Text>
            </View>
            {/* route data */}
            <View style={{ flexDirection: 'row', marginVertical: 5, marginHorizontal: 10 }}>
              <View style={{ width: "3%", alignItems: 'flex-end' }}>
                <Image source={icons.journey} style={{ width: 5, height: 50 * (item.item.routeId.routeStop.length + 2), tintColor: props.theme ? color.drakPrimaryColors : color.primaryColors }} />
              </View>
              <View style={{ width: "97%", justifyContent: 'center', paddingBottom: 10 }}>
                <View>
                  <View style={{ margin: 5, flexDirection: 'row' }}>

                    <View style={{ width: '5%', justifyContent: 'center' }}>
                      <Image source={icons.forword} style={{ width: 20, height: 20, tintColor: props.theme ? color.drakPrimaryColors : color.primaryColors }} />
                    </View>
                    <View style={{ width: '95%' }}>
                      <Text style={{ marginHorizontal: 10, fontWeight: 'bold', color: 'gray', fontSize: 16 }}>
                        {item.item.routeId.from.name}</Text>
                    </View>

                  </View>
                  <View style={{ flexDirection: "row", justifyContent: 'space-between', marginHorizontal: 30 }}>
                    <View style={{ alignItems: 'center' }}>
                      <Text style={{ color: props.theme ? color.drakFontcolor : color.fontcolor, }}>
                        {new Date(item.item.Truckdate).toLocaleDateString("en-US", { weekday: 'short', month: 'long', day: 'numeric' })}
                      </Text>
                    </View>

                    <View style={{ alignItems: 'center' }} >
                      <Text style={{ color: props.theme ? color.drakFontcolor : color.fontcolor }}>
                        {new Date(item.item.Truckdate).toLocaleDateString("en-US", { hour: 'numeric', minute: 'numeric', hour12: false }).toString().slice(-5)}
                      </Text>
                    </View>

                  </View>
                </View>
                <FlatList data={item.item.routeId.routeStop} renderItem={(data) => (

                  <View >
                    <View style={{ margin: 5, flexDirection: 'row' }}>

                      <View style={{ width: '5%', justifyContent: 'center' }}>
                        <Image source={icons.forword} style={{ width: 20, height: 20, tintColor: props.theme ? color.drakPrimaryColors : color.primaryColors }} />
                      </View>
                      <View style={{ width: '95%' }}>
                        <Text style={{ marginHorizontal: 10, fontWeight: 'bold', color: 'gray', fontSize: 16 }}>{data.item.stops}</Text>
                      </View>

                    </View>
                    <View style={{ flexDirection: "row", justifyContent: 'space-between', marginHorizontal: 30 }}>
                      <View style={{ alignItems: 'center' }} >
                        <Text style={{ color: props.theme ? color.drakFontcolor : color.fontcolor }}>
                          {new Date(new Date(item.item.Truckdate)
                            .setHours(new Date(item.item.Truckdate)
                              .getHours() + data.item.avgTime)).toLocaleDateString("en-US", { weekday: 'short', month: 'long', day: 'numeric' })}
                        </Text>
                      </View>

                      <View style={{ alignItems: 'center' }}>
                        <Text style={{ color: props.theme ? color.drakFontcolor : color.fontcolor, }}>
                          {new Date(new Date(item.item.Truckdate)
                            .setHours(new Date(item.item.Truckdate)
                              .getHours() + data.item.avgTime)).toLocaleDateString("en-US", { hour: 'numeric', minute: 'numeric', hour12: false }).toString().slice(-6)}
                        </Text>
                      </View>

                    </View>
                  </View>
                )}
                />
                <View>
                  <View style={{ margin: 5, flexDirection: 'row' }}>

                    <View style={{ width: '5%', justifyContent: 'center' }}>
                      <Image source={icons.forword} style={{ width: 20, height: 20, tintColor: props.theme ? color.drakPrimaryColors : color.primaryColors }} />
                    </View>
                    <View style={{ width: '95%' }}>
                      <Text style={{ marginHorizontal: 10, fontWeight: 'bold', color: 'gray', fontSize: 16 }}>
                        {item.item.routeId.destination.name}</Text>
                    </View>

                  </View>
                  <View style={{ marginHorizontal: 30, flexDirection: "row", justifyContent: 'space-between' }}>
                    <View style={{ alignItems: 'center' }}>
                      <Text style={{ color: props.theme ? color.drakFontcolor : color.fontcolor, }}>
                        {new Date(new Date(item.item.Truckdate)
                          .setHours(new Date(item.item.Truckdate)
                            .getHours() + item.item.routeId.destination.avgTime)).toLocaleDateString("en-US", { weekday: 'short', month: 'long', day: 'numeric' })}
                      </Text>
                    </View>

                    <View style={{ alignItems: 'center' }}>
                      <Text style={{ color: props.theme ? color.drakFontcolor : color.fontcolor, }}>
                        {new Date(new Date(item.item.Truckdate)
                          .setHours(new Date(item.item.Truckdate)
                            .getHours() + item.item.routeId.destination.avgTime)).toLocaleDateString("en-US", { hour: 'numeric', minute: 'numeric', hour12: false }).toString().slice(-5)}
                      </Text>
                    </View>

                  </View>
                </View>
              </View>
            </View>

            {/* route data */}

            <View style={{ marginVertical: 5, marginHorizontal: 10 }}>
              <Text style={{
                fontSize: 20, color: props.theme ? color.drakFontcolor : color.fontcolor
                , fontWeight: 'bold'
              }}>
                Payment Types</Text>

              <RadioButtonRN
                data={[
                  {
                    label: `Full Payment [  ${((calcKmFind(props.route.params.from.lat,
                      props.route.params.from.lng,
                      props.route.params.destination.lat,
                      props.route.params.destination.lng)) * (props.route.params.capicity) * (item.item.truckPrice)).toLocaleString('en-IN', {
                        maximumFractionDigits: 2,
                        style: 'currency',
                        currency: 'INR'
                      })} ]`,
                    amount: ((calcKmFind(props.route.params.from.lat,
                      props.route.params.from.lng,
                      props.route.params.destination.lat,
                      props.route.params.destination.lng)) * (props.route.params.capicity) * (item.item.truckPrice))
                  },
                  {
                    label: `Advance Payment  20% [ ${(((calcKmFind(props.route.params.from.lat,
                      props.route.params.from.lng,
                      props.route.params.destination.lat,
                      props.route.params.destination.lng)) * (props.route.params.capicity) * (item.item.truckPrice)) * 0.2).toLocaleString('en-IN', {
                        maximumFractionDigits: 2,
                        style: 'currency',
                        currency: 'INR'
                      })} ]`,
                    amount: ((calcKmFind(props.route.params.from.lat,
                      props.route.params.from.lng,
                      props.route.params.destination.lat,
                      props.route.params.destination.lng)) * (props.route.params.capicity) * (item.item.truckPrice)) * 0.2
                  },
                ]}
                selectedBtn={(e) => { setAmount(e.amount), setModalVisible1(true) }}
                boxStyle={{
                  backgroundColor: props.theme ? color.drakBackgroundColor : color.backgroundColor,
                  borderWidth: 3,
                  borderColor: props.theme ? color.drakPrimaryColors : color.primaryColors,
                }}
                textStyle={{ color: props.theme ? color.drakFontcolor : color.fontcolor, textAlign: 'right' }}

              />
            </View>

            <Modal
              animationType="slide"
              transparent={true}
              visible={modalVisible1}

            >

              <View style={styles.modelBox1(props)}>
                <View style={styles.payText}>
                  <Text style={{
                    color: "gray",
                    paddingBottom: 5
                  }}>Total Payment </Text>
                  <Text style={{
                    color: props.theme ? color.drakFontcolor : color.fontcolor,
                    fontSize: 20
                  }}
                  >{amount?.toLocaleString('en-IN', {
                    maximumFractionDigits: 2,
                    style: 'currency',
                    currency: 'INR'
                  })}</Text>
                </View>
                <TouchableOpacity style={styles.pay(props)}
                  onPress={() => {
                    paymentHendle(item.item.truckPrice, item.item.capicity)
                  }}>
                  <Text style={{ color: 'white', fontWeight: "bold" }}>Pay</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { setModalVisible1(false) }} style={{ alignItems: 'center', bottom: 30, right: 5 }}>
                  <Image source={icons.close} style={{ width: 35, height: 35, tintColor: props.theme ? color.drakPrimaryColors : color.primaryColors, }} />
                </TouchableOpacity>
              </View>
            </Modal>

          </View>
        )} />
      </ScrollView>
    </View>
  )
}
const useDispatch = (dispatch) => {
  return {
    transportListById: (data) => dispatch(transportListById(data)),
    getUserDetails: (data) => dispatch(getUserDetails(data)),
    payment: (data) => dispatch(payment(data)),
    tracking: (data) => dispatch(tracking(data)),
    updateTransport: (data) => dispatch(updateTransport(data)),
    setPaymentData: (data) => dispatch(setPaymentData(data)),
    setTrackingData: (data) => dispatch(setTrackingData(data))
  };
}
const useSelector = (state) => (

  {
    paymentData: state.payment.paymentdata,
    trackingData: state.tracking.trackingdata,
    userData: state.user.userData,
    theme: state.token.theme,
    transportList: state.fetchById.transportList,
    loading: state.fetchById.loading,
    token: state.token.token,
  }
)
export default connect(useSelector, useDispatch)(Booking);
const styles = StyleSheet.create({
  container: (props) => [{
    flex: 1,
    backgroundColor: props.theme ? color.drakBackgroundColor : color.backgroundColor,

  }], listBox: (props) => [{
    minHeight: 150,
    backgroundColor: props.theme ? color.drakBackgroundColor : color.backgroundColor,
    marginVertical: 10,
    padding: 10
  }],
  image: (props) => [{
    overflow: 'hidden',
    alignSelf: 'center',
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 3,
    borderColor: props.theme ? color.drakPrimaryColors : color.primaryColors,
    justifyContent: 'center'
  }],


  pay: (props) => [{
    width: "40%",
    height: 55,
    backgroundColor: props.theme ? color.drakPrimaryColors : color.primaryColors,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: 'center', marginHorizontal: 10
  }], payText: {
    width: "40%",

    marginHorizontal: 10
  },
  icon: (props) => [{
    width: 30,
    height: 30,
    tintColor: props.theme ? color.drakPrimaryColors : color.primaryColors
  }],
  modelBox1: (props) => [{
    width: Dimensions.get('screen').width,
    height: 120,
    position: 'absolute',
    bottom: 0,
    backgroundColor: props.theme ? color.drakBackgroundColor : color.backgroundColor,
    alignSelf: 'center',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    alignItems: "center",
    shadowColor: props.theme ? color.drakFontcolor : color.fontcolor,
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  }],
})